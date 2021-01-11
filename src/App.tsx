import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Calendar from './pages/Calendar'
import Day from './pages/Day'
import Write from './pages/Write'

import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Link to="/">Home</Link>
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
      </Router>
    </Provider>
  );
}

export default App;
