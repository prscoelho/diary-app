import { combineReducers } from '@reduxjs/toolkit'

import entryReducer from './entry'
import dayReducer from './day'

const rootReducer = combineReducers({
    days: dayReducer,
    entries: entryReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer