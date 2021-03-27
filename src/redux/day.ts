import {
    createEntityAdapter,
    createReducer,
} from "@reduxjs/toolkit"

import { createEntry, deleteEntry } from "./entry"

export type Day = {
    date: string,
    entries: string[]
}

export const dayAdapter = createEntityAdapter<Day>({
    selectId: (day) => day.date,
    sortComparer: (a, b) => a.date.localeCompare(b.date)
})

const daysReducer = createReducer(dayAdapter.getInitialState(), (builder) => {
    builder
        .addCase(createEntry, (state, action) => {
            const date = action.payload.date_id
            const entry_id = action.payload.id

            // add day to entities if it doesn't exist
            if (state.entities[date] === undefined) {
                const day: Day = {
                    date: action.payload.date_id,
                    entries: [entry_id]
                }
                dayAdapter.addOne(state, day)
            } else { // or simply mutate day entries if it does
                state.entities[date]?.entries.push(entry_id)
            }
        })
        .addCase(deleteEntry, (state, action) => {
            const date = action.payload.date_id

            // remove day entity if entry being removed is the last entry in day
            if (state.entities[date]?.entries.length === 1) {
                dayAdapter.removeOne(state, date)
            } else {
                const entry_id = action.payload.id;
                const index = state.entities[date]?.entries.findIndex(id => id === entry_id)
                if (index !== undefined && index !== -1) {
                    state.entities[date]?.entries.splice(index, 1)
                }
            }
        })
})

export default daysReducer