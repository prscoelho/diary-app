import { fireEvent, screen, wrapperRender } from '../test-utils'
import '@testing-library/jest-dom/extend-expect'
import { Route } from 'react-router-dom'

import Entry from '../components/Entry'
import rootReducer from '../redux/rootReducer'
import { createEntry, Entry as EntryType } from '../redux/entry'

test('loads an entry from redux state', async () => {
    const e: EntryType = {
        id: '1',
        date_id: '2021-03-22',
        title: 'This is the title',
        content: 'This is the content? Wow.'
    }
    const initialState = rootReducer(undefined, createEntry(e))
    wrapperRender(<Entry entry_id={e.id} />, { initialState })
    expect(screen.getByRole("heading")).toHaveTextContent(e.title)
    expect(screen.getByText(e.content)).toBeInTheDocument()
})

test('opens entry menu dropdown on button click', async () => {
    const e: EntryType = {
        id: '1',
        date_id: '2021-03-22',
        title: 'This is the title',
        content: 'This is the content? Wow.'
    }
    const initialState = rootReducer(undefined, createEntry(e))
    wrapperRender(<Entry entry_id={e.id} />, { initialState })
    expect(screen.queryAllByRole("menuitem")).toHaveLength(0)

    fireEvent.click(screen.getByRole("button"))
    expect(screen.queryAllByRole("menuitem")).toHaveLength(2)
    expect(screen.getByText("Edit")).toBeInTheDocument()
    expect(screen.getByText("Delete")).toBeInTheDocument()
})

test('navigates to edit page on edit menu click', async () => {
    const e: EntryType = {
        id: '1',
        date_id: '2021-03-22',
        title: 'This is the title',
        content: 'This is the content? Wow.'
    }
    const initialState = rootReducer(undefined, createEntry(e))
    wrapperRender(<>
        <Route path="/" >
            <Entry entry_id={e.id} />
        </Route>
        <Route path={`/entry/${e.date_id}/${e.id}`}>
            Success
        </Route>
    </>, { initialState })

    expect(screen.queryByText("Success")).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole("button"))
    fireEvent.click(screen.getByText("Edit"))

    expect(screen.queryByText("Success")).toBeInTheDocument()
})
