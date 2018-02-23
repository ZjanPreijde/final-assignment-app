// ./containers/Batch.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { connect as subscribeToWebsocket } from '../actions/websocket'

import { fetchOneBatch, fetchStudents } from '../actions/batches/fetch'

const studentShape = PropTypes.shape({
  studentId: PropTypes.string.isRequired,
  name: PropTypes.string,
  imageUrl: PropTypes.string
})

class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    fetchStudents: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      startsAt: PropTypes.instanceOf(Date).isRequired,
      endsAt: PropTypes.instanceOf(Date).isRequired,
      studentCount: PropTypes.number,
      students: PropTypes.arrayOf(studentShape)
    })
  }

  componentWillMount() {
    const { batch, fetchOneBatch, fetchStudents, subscribeToWebsocket } = this.props
    const { batchId } = this.props.match.params
    console.table(batchId)

    if (!batch) {
      this.props.fetchOneBatch(batchId)
      this.props.fetchStudents(batchId)
    }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps

    if (batch && !batch.studentsCount) {
      this.props.fetchStudents(batch._id)
    }
  }

  render() {
    const { batch } = this.props
    console.table(this.props)

    if (!batch) return ( <div><h1>NO BATCH DEFINED </h1></div> )
    // if (!batch) return null

    const title = "Class " + batch.name
    // <TurnButton
    //   onClick={this.doTurnWithGameId('rock')}
    //   weapon="rock"
    // />
    // <TurnButton
    //   onClick={this.doTurnWithGameId('paper')}
    //   weapon="paper"
    // />
    // <TurnButton
    //   onClick={this.doTurnWithGameId('scissors')}
    //   weapon="scissors"
    // />
    // <JoinGameDialog gameId={game._id} />

    // <div style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }} className="Batch">
    //   <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
    return (
      <div style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }} className="Batch">
        <h1>{title}</h1>
        <p>Students of batch {title}</p>

        <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
            Students ...
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, batches }, { match }) => {
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
  return {
    batch
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneBatch,
  fetchStudents
})(Batch)
