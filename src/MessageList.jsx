import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {
    console.log("Rendering <App/>");
    const messages = this.props.messagesArr;
    return (
      <div>
        <main className="messages">
          {messages.map(function(e) {
            return <Message currentMessage={e} key={e.id}/>
          })}
        </main>
      </div>
    );
  }
}
