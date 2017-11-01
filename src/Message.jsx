import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <App/>");
    console.log(this.props.currentMessage.type)
    if (this.props.currentMessage.type == 'incomingMessage') {
      return (
          <div className = "message">
            <span className="message-username">
              {this.props.currentMessage.username}
            </span>
            <span className = "message-content" >
              {this.props.currentMessage.content}
            </span>
           </div>
      )
    } else if (this.props.currentMessage.type == 'incomingNotification'){
      return (
          <div className = "message system">{this.props.currentMessage.content}</div>
      )
    }
  }
}
export default Message;
