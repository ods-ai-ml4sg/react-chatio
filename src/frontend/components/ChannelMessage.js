import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ChannelMessage extends Component {

  static propTypes = {
    message: PropTypes.string.isRequired
  };

  render() {

    // I think its not correct JS/FP way, but it is explicit at least
    let date = new Date(this.props.message.date * 1000);
    let time = date.toLocaleDateString("en-US") + ' ' + date.toLocaleTimeString("en-US");

    return (
      <div className='channel-message'>
        <div className="channel-message-author">{this.props.message.user}</div>
        <div className="channel-message-date">{time}</div>
        <div className="channel-message-content">{this.props.message.message}</div>
      </div>
    )
  }
}

export default ChannelMessage;
