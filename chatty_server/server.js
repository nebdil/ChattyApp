const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (client) => {
  var size = {size: wss.clients.size, type: 'online'};
  var mssgSize = JSON.stringify(size);
  wss.broadcast(mssgSize);
  console.log('Client connected');
  console.log(wss.clients.size);
  client.on('message', handleMessage);
  client.on('close', () => wss.broadcast(mssgSize));
});
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
    console.log(data)
  });
};
function handleMessage(message) {
  let msg = JSON.parse(message)
  msg.id = uuidv1();
  if (msg.type == "postMessage"){
    msg.type = 'incomingMessage';
    let mssg = JSON.stringify(msg)
    wss.broadcast(mssg);
  } else if (msg.type == "postNotification"){
    msg.type = 'incomingNotification';
    let mssg = JSON.stringify(msg)
    wss.broadcast(mssg);
  }
}
