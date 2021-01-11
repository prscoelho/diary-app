import { createAction } from '@reduxjs/toolkit'

import { Entry } from './types'

export type EntryDeleted = {
    id: string,
    date_id: string
}

export const createEntry = createAction<Entry>("entries/create")
export const deleteEntry = createAction<EntryDeleted>("entries/delete")