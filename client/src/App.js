import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch, Link } from 'react-router-dom'
import BubblePage from './components/BubblePage'
import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path='/BubblePage' component={BubblePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
