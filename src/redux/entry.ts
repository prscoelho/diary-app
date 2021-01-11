import {
    createEntityAdapter,
    createSlice,
    createAction,
} from "@reduxjs/toolkit"

export type Entry = {
    id: string; // unique random id
    date_id: string; // YYYY/MM/DD
    title: string;
    content: string   // entry content
}

export type EntryDeleted = {
    id: string,
    date_id: string
}

const deleteEntry = createAction<EntryDeleted>("entries/delete")

export const entryAdapter = createEntityAdapter<Entry>({
    sortComparer: (a, b) => a.id.localeCompare(b.id),
})


const entriesSlice = createSlice({
    name: "entries",
    initialState: entryAdapter.getInitialState(),
    reducers: {
        createEntry: entryAdapter.addOne,
        updateEntry: entryAdapter.updateOne,
    },
    extraReducers: (builder) => {
        builder.addCase(deleteEntry, (state, action) => {
            entryAdapter.removeOne(state, action.payload.id)
        })
    }
})

export default entriesSlice.reducer

const { createEntry, updateEntry } = entriesSlice.actions

export { createEntry, updateEntry, deleteEntry };