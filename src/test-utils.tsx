// test-utils.js
import React from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import reducer, { RootState } from './redux/rootReducer'
import rootReducer from './redux/rootReducer'
import { Entry } from './redux/entry'

interface WrapperRenderOptions extends RenderOptions {
    initialState?: RootState,
    store?: any
}

function render(
    ui: React.ReactElement,
    {
        initialState,
        store = createStore(reducer, initialState),
        ...renderOptions
    }: WrapperRenderOptions = {}
) {
    function Wrapper({ children }: any) {
        return <Provider store={store}><MemoryRouter>{children}</MemoryRouter></Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }