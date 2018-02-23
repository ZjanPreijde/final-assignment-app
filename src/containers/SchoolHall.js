// src/containers/SchoolHall.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
// import JoinBatchIcon from 'material-ui/svg-icons/social/person-add'
// let ActionIcon = JoinBatchIcon
// rightIcon={<ActionIcon />}
import { connect as subscribeToWebsocket } from '../actions/websocket'

// import fetchBatches, { fetchStudents } from '../actions/batches/fetch'
import fetchBatches from '../actions/batches/fetch'
import CreateBatchButton from '../components/batches/CreateBatchButton'

import './SchoolHall.css'

class SchoolHall extends PureComponent {
  isSignedIn = !!this.props.currentUser && !!this.props.currentUser._id

  componentWillMount() {
    this.props.fetchBatches()
    this.props.subscribeToWebsocket()
  }

  goToBatch = batchId => event => this.props.push(`/batches/${batchId}`)

  renderBatch = (batch, index) => {

    // if (!batch.studentCount) { this.props.fetchStudents(batch) }
    // const title = batch.studentCount.toString() + ' Students'

    const title = 'Batch ' + batch.name + ' : 1_000_000 Students'

    return (
      <MenuItem
        key={index}
        onClick={this.goToBatch(batch._id)}
        primaryText={title} />
    )
  }

  render() {
    if (this.isSignedIn) {
    return (
      <div className="SchoolHall">
        <h1>School Hall</h1>
        <h2>Teacher : {this.props.currentUser.name}</h2>
        <CreateBatchButton />
        <Paper className="paper">
          <Menu>
            {this.props.batches.map(this.renderBatch)}
          </Menu>
        </Paper>
      </div>
    )
    } else {
    return (
      <div className="SchoolHall">
        <h1>School Hall</h1>
      </div>
    )
    }
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches, currentUser })

export default connect(mapStateToProps,
  { fetchBatches, subscribeToWebsocket, push })(SchoolHall)
