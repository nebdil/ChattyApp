import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
      <span>
        <div className = "message">
          <span className="message-username">
            {this.props.currentMessage.username}
          </span>
          <span className = "message-content" >
            {this.props.currentMessage.content}
          </span>
         </div>
         {/* <div className="message system">
           Anonymous1 changed their name to nomnom.
         </div> */}
       </span>
    );
  }
}
export default Message;
