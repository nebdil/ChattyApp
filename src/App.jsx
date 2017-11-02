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
      messages: [],
      users: 0
    }
    this.socket = {
      ws: new WebSocket("ws://localhost:3001")
    }

    this._handleMessageChange = this._handleMessageChange.bind(this)
    this._handleNameChange = this._handleNameChange.bind(this)
    this.setState = this.setState.bind(this)
  }

  componentDidMount() {
    this.socket.ws;
    console.log('Connected to server')
    this.socket.ws.onmessage = ev => {
      var message = JSON.parse(ev.data)
      if (message.type == 'incomingMessage') {
        const messages = this.state.messages.concat(message)
        this.setState({messages})
      } else if (message.type == "incomingNotification") {
        const messages = this.state.messages.concat(message)
        this.setState({messages})
        console.log('in incomingNotification')
      } else if (message.type == 'online') {
        this.setState({users: message.size})
      }
    }
    this.socket.ws.onclose = e => {
      this.setState({users: e.data})
    }
  }
  render() {

    return (<span>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="navbar-count">{this.state.users} users online</p>
      </nav>
      <MessageList messagesArr={this.state.messages}/>
      {/* notificationChange={this._handleNotification} */}
      <ChatBar currentUserName={this.state.currentUser.name} getMessage={this._handleMessageChange} getUsername={this._handleNameChange}/>
    </span>)
  }
  _handleMessageChange(e) {
    if (e.charCode == 13) {
      const newMessage = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        content: e.target.value
      }
      this.socket.ws.send(JSON.stringify(newMessage))
    }
  }
  _handleNameChange(e) {
    if (e.charCode == 13) {
      const newNotification = {
        username: this.state.currentUser.name,
        type: 'postNotification',
        content: `${this.state.currentUser.name} changed their name to ${e.target.value}.`
      }
      this.socket.ws.send(JSON.stringify(newNotification))
      this.state.currentUser.name = e.target.value
    }
  }
  _getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
