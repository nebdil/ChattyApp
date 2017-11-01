import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <App/>");
    const {currentUserName, getMessage, getUsername} = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue = {currentUserName} onChange= {getUsername}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={getMessage} />
      </footer>)
  }
}
export default ChatBar;
