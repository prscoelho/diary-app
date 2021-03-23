import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import rootReducer, { RootState } from './redux/rootReducer'

interface WrapperRenderOptions extends RenderOptions {
    initialState?: RootState,
    store?: any
}

function wrapperRender(
    ui: React.ReactElement,
    {
        initialState,
        store = createStore(rootReducer, initialState),
        ...renderOptions
    }: WrapperRenderOptions = {}
) {
    function Wrapper({ children }: any) {
        return <Provider store={store}><MemoryRouter>{children}</MemoryRouter></Provider>
    }
    return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { wrapperRender }