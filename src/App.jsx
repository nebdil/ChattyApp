//bring every component in
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: '',
        color: '' //for the user's designated color
      },
      messages: [],
      users: 0, //for counting how many people are online
    }
    this.socket = {
      ws: new WebSocket("ws://localhost:3001")
    }
    //bind this' so that other components will know where to refer to
    this._handleMessageChange = this._handleMessageChange.bind(this)
    this._handleNameChange = this._handleNameChange.bind(this)
    this.setState = this.setState.bind(this)
  }
  componentDidMount() {
    this.socket.ws;
    this.socket.ws.onmessage = ev => {
      var message = JSON.parse(ev.data)
      if (message.type == 'incomingMessage') {
        const messages = this.state.messages.concat(message)
        this.setState({messages})
      } else if (message.type == "incomingNotification") {
        const messages = this.state.messages.concat(message)
        this.setState({messages})
      } else if (message.type == 'online') {
        this.setState({users: message.size})
      } else if (message.type == 'offline') {
        this.setState({users: message.size})
      } else if (message.type == 'color') {
        this.setState({currentUser: {color: message.color}})
      }
    }
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="navbar-count">{this.state.users} users online</p>
        </nav>
        <MessageList messagesArr={this.state.messages} />
        <ChatBar currentUserName={this.state.currentUser.name} getMessage={this._handleMessageChange} getUsername={this._handleNameChange}/>
    </div>)
  }
  _handleMessageChange(e) {
    if (e.charCode == 13) {
      const newMessage = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        color: this.state.currentUser.color,
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
        content: `${this.state.currentUser.name || 'Anonymous'} changed their name to ${e.target.value}.`
      }
      this.socket.ws.send(JSON.stringify(newNotification))
      this.state.currentUser.name = e.target.value
    }
  }
}
