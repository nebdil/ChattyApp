import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

class App extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
      <span>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList>
          <Message />
        </MessageList>
        <ChatBar />
      </span>

    );
  }
}
export default App;
