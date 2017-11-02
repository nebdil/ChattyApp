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
  var color = {type: 'color', color: _getRandomColor()};
  var colorStr = JSON.stringify(color);
  client.send(colorStr);
  var mssgSize = JSON.stringify(size);
  wss.broadcast(mssgSize);
  client.on('message', handleMessage);
  client.on('close', () => {
    var sizeClose = {size: wss.clients.size, type: 'offline'}
    var mssgSizeClose = JSON.stringify(sizeClose)
    wss.broadcast(mssgSizeClose)
  })
});
//how to broadcast
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
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
//function to get a random color to assign to the user's message
function _getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color
}
