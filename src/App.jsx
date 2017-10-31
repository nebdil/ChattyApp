import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

class App extends Component {
  render() {
    return (
      // <h1>Hello React :)</h1>
      <body>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList>
          <Message />
        </MessageList>
        <ChatBar />
      </body>

    );
  }
}
export default App;
