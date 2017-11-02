//get react & each message
import React, {Component} from 'react';
import Message from './Message.jsx';

//Make message list & send to parent
export default class MessageList extends Component {
  render() {
    const messages = this.props.messagesArr;
    return (
      <div>
        <main className="messages">
          {messages.map(function(e) {
            return <Message currentMessage={e} key={e.id} />
          })}
        </main>
      </div>
    )
  }
}
