const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
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
  });
};
function handleMessage(message) {
  wss.broadcast(message);
}
function broadcastBack(message) {
  console.log(`Received: ${message}`)
  wss.broadcast(message);
}
