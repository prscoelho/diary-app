import dayReducer from '../redux/day'
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
        expect(dayReducer(undefined, createEntry(e))).toEqual(
            {
                ids: ['2021-03-22'],
                entities: {
                    [e.date_id]: {
                        date: e.date_id,
                        entries: ['1']
                    }
                }
            })
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

        expect(dayReducer(initialState, createEntry(second))).toEqual(
            {
                ids: ['2021-03-22'],
                entities: {
                    [first.date_id]: {
                        date: first.date_id,
                        entries: ['1', '2']
                    }
                }
            })
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

        expect(dayReducer(initialState, deleteEntry(entryToDelete))).toEqual(
            {
                ids: ['2021-03-22'],
                entities: {
                    [first.date_id]: {
                        date: first.date_id,
                        entries: [second.id]
                    }
                }
            })
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

        expect(dayReducer(initialState, deleteEntry(entryToDelete))).toEqual(
            {
                ids: [],
                entities: {}
            })
    })
})