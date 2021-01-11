import {
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit"

import { Entry } from './types'
import { createEntry, deleteEntry } from "./shared_actions"

export const entryAdapter = createEntityAdapter<Entry>({
    sortComparer: (a, b) => a.id.localeCompare(b.id),
})


const entriesSlice = createSlice({
    name: "entries",
    initialState: entryAdapter.getInitialState(),
    reducers: {
        updateEntry: entryAdapter.updateOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEntry, (state, action) => {
                entryAdapter.addOne(state, action.payload)
            })
            .addCase(deleteEntry, (state, action) => {
                entryAdapter.removeOne(state, action.payload.id)
            })
    }
})

export default entriesSlice.reducer

const { updateEntry } = entriesSlice.actions

export { updateEntry };