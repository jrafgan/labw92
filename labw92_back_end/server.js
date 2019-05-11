const express = require('express');
const config = require('./config');
const cors = require('cors');
const mongoose = require('mongoose');
const categories = require('./app/categories');
const users = require('./app/users');
const products = require('./app/products');
const expressWs = require('express-ws');
const app = express();

expressWs(app);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = 8003;
const activeConnections = {};

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
  app.use('/products', products);
  app.use('/categories', categories);
  app.use('/users', users);

  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });
});

app.ws('/chat', (ws, req) => {
  const id = nanoid();
  console.log('client connected! id = ', id);

  activeConnections[id] = ws;

  let username = '';

  ws.on('message', msg => {
    let decodedMessage;
    try {
      decodedMessage = JSON.parse(msg);
    } catch (e) {
      return console.log('Not a valid message ');
    }

    switch (decodedMessage.type) {
      case 'SET_USERNAME': //{type : 'SET_USERNAME', username: 'John Doe'}
        username = decodedMessage.username;
        break;
      case 'CREATE_MESSAGE': //{type: 'CREATE_MESSAGE', text: 'Hello'}
        // {type: 'NEW_MESSAGE', text: 'Hello'}
        Object.keys(activeConnections).forEach(connId => {
          const conn = activeConnections[connId];
          conn.send(JSON.stringify({
            type: 'NEW_MESSAGE',
            message: {
              username,
              text: decodedMessage.text
            }
          }))
        });
        break;

      default:
        console.log('Not valid message type :  ', decodedMessage.type);
    }

    ws.send(msg);

  });

  ws.on('close', msg => {
    console.log('client disconnected id = ', id);
    delete activeConnections[id];
  })
});