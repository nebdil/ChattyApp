import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <App/>");
    const {currentUserName, getMessage} = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue = {currentUserName} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={getMessage} />
      </footer>)
  }
}
export default ChatBar;
