// src/components/batches/CreateBatchButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
// import StarIcon from 'material-ui/svg-icons/content/add-box'
// import StarIcon from 'material-ui/svg-icons/content/add-circle'
// import StarIcon from 'material-ui/svg-icons/content/add-circle-outline'
import StarIcon from 'material-ui/svg-icons/content/add'

import createBatch from '../../actions/batches/create'

class CreateBatchButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateBatchButton">
        <RaisedButton
          label="Create batch"
          primary={true}
          onClick={this.props.createBatch}
          icon={<StarIcon />} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createBatch })(CreateBatchButton)
