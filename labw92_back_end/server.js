const express = require('express');
const config = require('./config');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const users = require('./app/users');
const Message = require('./models/Message');
const expressWs = require('express-ws');
const app = express();
const nanoid = require('nanoid');

expressWs(app);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = 8003;
const activeConnections = {};

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
    app.use('/users', users);


    app.ws('/chat', async (ws, req) => {


        const token = req.query.token;
        if (!token) {
            return ws.close();
        }

        const user = await User.findOne({token});
        if (!user) {
            return ws.close();
        }

        const id = nanoid();

        activeConnections[id] = {user, ws};

        const usernames = Object.keys(activeConnections).map(connId => {
            const conn = activeConnections[connId];
            return conn.user.username;
        });

        ws.on('open', () => {
            Object.keys(activeConnections).forEach(async connId => {
                console.log('this is users', usernames);
                const conn = activeConnections[connId];

                conn.ws.send(JSON.stringify({
                    type: 'ACTIVE_USERS',
                    usernames
                }));

            });
        });

        ws.send(JSON.stringify({
            type: 'ACTIVE_USERS',
            usernames
        }));

        console.log('this is usernames ', usernames);



        ws.send(JSON.stringify({
            type: 'LATEST_MESSAGES',
            messages: await Message.find().sort({datetime: -1}).limit(30)
        }));

        ws.on('message', async msg => {

            let decodedMessage;
            try {
                decodedMessage = JSON.parse(msg);
            } catch (e) {
                return console.log('Not a valid message ');
            }

            switch (decodedMessage.type) {

                case 'CREATE_MESSAGE':
                    const messageData = {
                        user: user.username,
                        text: decodedMessage.text
                    };

                    const message = new Message(messageData);
                    await message.save();
                    Object.keys(activeConnections).forEach(async connId => {

                        const conn = activeConnections[connId];
                        const messages = await Message.find().sort({datetime: -1}).limit(30);

                        conn.ws.send(JSON.stringify({
                            type: 'NEW_MESSAGE',
                            message: messages,
                        }));

                    });

                    break;

                default:
                    console.log('Not valid message type :  ', decodedMessage.type);
            }
        });

        ws.on('close', msg => {
            console.log('client disconnected id = ', id);
            delete activeConnections[id];
            console.log(activeConnections[id]);
            Object.keys(activeConnections).forEach(async connId => {

                const conn = activeConnections[connId];
                conn.ws.send(JSON.stringify({
                    type: "DELETED_USER",
                    username: user.username
                }));

            });
        })
    });

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});