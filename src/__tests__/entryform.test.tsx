import { fireEvent, screen, wrapperRender } from '../test-utils'
import '@testing-library/jest-dom/extend-expect'
import { Route } from 'react-router-dom'

import EntryForm from '../components/EntryForm'
import rootReducer from '../redux/rootReducer'
import { createEntry, Entry } from '../redux/entry'

test('loads the write page of a new entry', async () => {
    wrapperRender(<EntryForm date="2020-03-22" />)
    expect(screen.getByRole('textbox', { name: "title input" })).toBeEmpty()
    expect(screen.getByRole('textbox', { name: "content input" })).toBeEmpty()
})

test('loads the write page of an existing entry', async () => {
    const e: Entry = {
        id: '1',
        date_id: '2021-03-22',
        title: 'This is the title',
        content: 'This is the content? Wow.'
    }
    const initialState = rootReducer(undefined, createEntry(e))
    wrapperRender(<EntryForm date={e.date_id} entry_id={e.id} />, { initialState })

    expect(screen.getByRole('textbox', { name: "title input" })).toHaveValue(e.title)
    expect(screen.getByRole('textbox', { name: "content input" })).toHaveValue(e.content)
})

test('loads the write page of a new entry and creates it', async () => {
    let date = "2020-03-22"
    wrapperRender(
        <>
            <EntryForm date={date} />
            <Route path={`/day/${date}`}>
                Success
            </Route>
        </>)

    fireEvent.change(
        screen.getByLabelText('title input'),
        { target: { value: "The title" } }
    )
    // button should be disabled
    expect(screen.getByRole("button")).toBeDisabled()

    fireEvent.change(
        screen.getByLabelText('content input'),
        { target: { value: "The content" } }
    )
    expect(screen.getByRole("button")).not.toBeDisabled()

    fireEvent.click(screen.getByRole("button"))
    // the EntryForm redirects on submit, so if the success route is rendering, we know the action fired
    expect(screen.getByText("Success")).toBeInTheDocument()
})