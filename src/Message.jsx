//bring react in
import React, {Component} from 'react';

//construct what messages are rendering && send out
export default class Message extends Component {
  render() {
    const {content, color, type, username} = this.props.currentMessage;
    if (type == 'incomingMessage') {
      return (
        <div className="message">
          <span className="message-username" style={{color}}>
            {username || 'Anonymous'}
          </span>
          <span className="message-content" >
            {content}
          </span>
         </div>
      )
    } else if (type == 'incomingNotification'){
      return (
          <div className="message system">{content}</div>
      )
    }
  }
}
