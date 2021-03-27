import dayReducer, { dayAdapter, Day } from '../redux/day'
import { createEntry, deleteEntry, Entry, EntryDeleted } from '../redux/entry'

// There is no point in testing the entry reducer, it's only calling the entity Adapter from redux-toolkit

describe('day reducer', () => {
    it('should create a day on new entry', () => {
        const e: Entry = {
            id: '1',
            date_id: '2021-03-22',
            title: 'This is the title',
            content: 'This is the content? Wow.'
        }
        const nextState = dayReducer(undefined, createEntry(e))
        const selectors = dayAdapter.getSelectors()
        const expectedDay: Day = {
            date: '2021-03-22',
            entries: ['1']
        }
        // there should only be one day in the state, containing one entry
        expect(selectors.selectAll(nextState)).toEqual([expectedDay])
    })
    it('should add entry id to day if day already exists', () => {
        const first: Entry = {
            id: '1',
            date_id: '2021-03-22',
            title: 'This is the title',
            content: 'This is the content? Wow.'
        }
        const initialState = dayReducer(undefined, createEntry(first))

        const second: Entry = {
            id: '2',
            date_id: '2021-03-22',
            title: 'This is another title',
            content: 'More content.'
        }

        const nextState = dayReducer(initialState, createEntry(second))
        const selectors = dayAdapter.getSelectors()
        const expectedDay: Day = {
            date: '2021-03-22',
            entries: ['1', '2']
        }
        // there should only be one day in the state, containing two entries
        expect(selectors.selectAll(nextState)).toEqual([expectedDay])
    })
    it('should not remove day on deleteEntry if day still has entries', () => {
        const first: Entry = {
            id: '1',
            date_id: '2021-03-22',
            title: 'This is the title',
            content: 'This is the content? Wow.'
        }

        const second: Entry = {
            id: '2',
            date_id: '2021-03-22',
            title: 'This is another title',
            content: 'More content.'
        }

        const initialState = dayReducer(dayReducer(undefined, createEntry(first)), createEntry(second))

        const entryToDelete: EntryDeleted = {
            id: first.id,
            date_id: first.date_id
        }

        const nextState = dayReducer(initialState, deleteEntry(entryToDelete))
        const selectors = dayAdapter.getSelectors()
        const expectedDay: Day = {
            date: '2021-03-22',
            entries: ['2']
        }
        // should have removed entry 1
        expect(selectors.selectAll(nextState)).toEqual([expectedDay])
    })

    it('should remove day on deleteEntry if it\'s the last entry of that day', () => {
        const first: Entry = {
            id: '1',
            date_id: '2021-03-22',
            title: 'This is the title',
            content: 'This is the content? Wow.'
        }

        const initialState = dayReducer(undefined, createEntry(first))

        const entryToDelete: EntryDeleted = {
            id: first.id,
            date_id: first.date_id
        }

        const nextState = dayReducer(initialState, deleteEntry(entryToDelete))
        const selectors = dayAdapter.getSelectors()

        // there should be no day in state
        expect(selectors.selectAll(nextState)).toEqual([])
    })
})