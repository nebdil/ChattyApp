import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'Bob'
      },
      messages: []
    }
    this.socket = {
      ws: new WebSocket("ws://localhost:3001")
    }

    this._handleMessageChange = this._handleMessageChange.bind(this)
    this.setState = this.setState.bind(this)
  }

  componentDidMount() {
    this.socket.ws;
    console.log('Connected to server')
    this.socket.ws.onmessage = ev => {
      var message = JSON.parse(ev.data)
      console.log(message)
      const messages = this.state.messages.concat(message)
      this.setState({messages})
    }
  }
  render() {
    return (<span>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messagesArr={this.state.messages} />
      <ChatBar currentUserName={this.state.currentUser.name} getMessage={this._handleMessageChange}/>
    </span>)
  }
  _handleMessageChange(e){
    if (e.charCode == 13) {
      const newMessage = {username: "Bob", content: e.target.value}
      this.socket.ws.send(JSON.stringify(newMessage))
    }
  }
}
