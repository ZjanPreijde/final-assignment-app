// NOT USED, for reference only
// .src/components/batches/JoinBatchDialog.js

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import joinBatch from '../../actions/batches/join.old.js'

class JoinBatchDialog extends PureComponent {
  static propTypes = {
    open: PropTypes.bool,
  }

  joinBatch = () => {
    const { joinBatch, batch } = this.props
    joinBatch(batch)
  }

  render() {
    const { currentUser, isStudent } = this.props

    if (isStudent) return null

    const actions = [
      <Link to="/">
        <FlatButton
          label="No Thanks"
          primary={true} />
      </Link>,
      <RaisedButton
        label="Join Batch"
        primary={true}
        keyboardFocused={true}
        onClick={this.joinBatch}
      />,
    ]

    return (
      <div>
        <Dialog
          title="Join Batch"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={this.handleClose}
        >
          Hey <strong>{currentUser.name || 'there'}!</strong> Would you like to join this class?
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, batches }, { batchId }) => {
  const batch = batches.filter((g) => (g._id === batchId))[0]
  const isStudent = batch && batch.students.filter((p) => (p.userId === currentUser._id)).length > 0

  return {
    batch,
    currentUser,
    isStudent,
    open: batch && !isStudent && batch.students.length < 2
  }
}

export default connect(mapStateToProps, { joinBatch })(JoinBatchDialog)
