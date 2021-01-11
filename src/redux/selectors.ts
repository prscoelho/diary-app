import { RootState } from './rootReducer'
import { dayAdapter } from './day'
import { entryAdapter } from './entry'


export const daySelectors = dayAdapter.getSelectors((state: RootState) => state.days)
export const entrySelectors = entryAdapter.getSelectors((state: RootState) => state.entries)
