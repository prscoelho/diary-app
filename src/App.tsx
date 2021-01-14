import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Calendar from './pages/Calendar'
import Day from './pages/Day'
import Write from './pages/Write'

import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="mx-10 sm:mx-24 lg:mx-36 xl:mx-auto xl:max-w-5xl">
          <Switch>
            <Route path="/day/:date">
              <Day />
            </Route>
            <Route path="/entry/:date/:id?">
              <Write />
            </Route>
            <Route path="/">
              <Calendar />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
