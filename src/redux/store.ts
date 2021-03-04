import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'

const serializedState = window.localStorage.getItem("state")
const localState = serializedState ? JSON.parse(serializedState) : undefined

const store = configureStore({
    reducer: rootReducer,
    preloadedState: localState
})

store.subscribe(() => {
    const state = store.getState()
    const serialized = JSON.stringify(state)
    window.localStorage.setItem("state", serialized)
})

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducer', () => {
        const newRootReducer = require('./rootReducer').default
        store.replaceReducer(newRootReducer)
    })
}

export default store