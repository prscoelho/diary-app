import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Route, BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from '../redux/rootReducer'
import { createEntry, Entry } from '../redux/entry'
import Day from '../pages/Day'

let store = createStore(rootReducer, undefined)

let e1: Entry = {
    id: '1',
    date_id: "2021-03-27",
    title: "T 1",
    content: "C 1"
}
let e2: Entry = {
    id: '2',
    date_id: "2021-03-27",
    title: "T 2",
    content: "C 2"
}
let e3: Entry = {
    id: '3',
    date_id: "2021-03-28",
    title: "T 3",
    content: "C 3"
}

store.dispatch(createEntry(e1))
store.dispatch(createEntry(e2))
store.dispatch(createEntry(e3))

const Component = () => <Provider store={store}>
    <BrowserRouter >
        <Route path="/day/:date">
            <Day />
        </Route>
        <Route path="/entry/:date">
            Creating new entry
        </Route>
    </BrowserRouter>
</Provider>

test('loads a day with no entries', async () => {
    window.history.pushState({}, "Test", "/day/2021-03-26")
    render(<Component />)
    expect(screen.queryByText("No entries...")).toBeInTheDocument()
})

test('loads a day with one entry', async () => {
    window.history.pushState({}, "Test", "/day/2021-03-28")
    render(<Component />)
    expect(screen.queryByText("No entries...")).not.toBeInTheDocument()
    // Should only render entry 3
    expect(screen.getByText(e3.title)).toBeInTheDocument()
    expect(screen.getByText(e3.content)).toBeInTheDocument()
    // Entries 1 and 2 should not render
    expect(screen.queryByText(e1.title)).not.toBeInTheDocument()
    expect(screen.queryByText(e1.content)).not.toBeInTheDocument()
    expect(screen.queryByText(e2.title)).not.toBeInTheDocument()
    expect(screen.queryByText(e2.content)).not.toBeInTheDocument()
})

test('loads a day with multiple entries', async () => {
    window.history.pushState({}, "Test", "/day/2021-03-27")
    render(<Component />)
    expect(screen.queryByText("No entries...")).not.toBeInTheDocument()
    // Should render entries 1 and 2
    expect(screen.getByText(e1.title)).toBeInTheDocument()
    expect(screen.getByText(e1.content)).toBeInTheDocument()
    expect(screen.getByText(e2.title)).toBeInTheDocument()
    expect(screen.getByText(e2.content)).toBeInTheDocument()
    // Entry 3 should not render
    expect(screen.queryByText(e3.title)).not.toBeInTheDocument()
    expect(screen.queryByText(e3.content)).not.toBeInTheDocument()
})

test('navigates to create new entry on + button click', async () => {
    window.history.pushState({}, "Test", "/day/2021-03-26")
    render(<Component />)
    fireEvent.click(screen.getByLabelText("Create new entry"))
    expect(screen.getByText("Creating new entry"))
})