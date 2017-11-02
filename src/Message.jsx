import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <App/>");
    // console.log(this.props.colorOfUser)
    if (this.props.currentMessage.type == 'incomingMessage') {
      return (
        <div className = "message">
          <span className="message-username" style={{color: this.props.currentMessage.color}}>
            {this.props.currentMessage.username || 'Anonymous'}
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
