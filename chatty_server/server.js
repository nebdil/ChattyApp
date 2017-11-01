const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (client) => {
  console.log('Client connected');
  client.on('message', handleMessage);
  client.on('close', () => console.log('Client disconnected'));
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
  let mssg = JSON.stringify(msg)
  wss.broadcast(mssg);
}
