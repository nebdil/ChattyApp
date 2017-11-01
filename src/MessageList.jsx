import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {
    console.log("Rendering <App/>");
    const arr = this.props.messagesArr;
    return (
      <main className="messages">
        {arr.map(function(e) {
          return <Message currentMessage={e} key={e.id}/>
        })}
      </main>
    );
  }
}
