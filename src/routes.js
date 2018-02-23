// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// SignUp
import {
  SchoolHall,
  Batch,
  SignIn
} from './containers'

export default class Routes extends Component {
  render() {
    // <Route path="/sign-up" component={SignUp} />
    return (
      <div>
        <Route exact path="/" component={SchoolHall} />
        <Route path="/batches/:batchId" component={Batch} />
        <Route path="/sign-in" component={SignIn} />
      </div>
    )
  }
}
