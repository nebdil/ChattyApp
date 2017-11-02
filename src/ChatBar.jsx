//Import react
import React, {Component} from 'react';

//Make chatbar & send to parent
export default class ChatBar extends Component {
  render() {
    const {currentUserName, getMessage, getUsername} = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue = {currentUserName} onKeyPress= {getUsername}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={getMessage} />
      </footer>
    )
  }
}
