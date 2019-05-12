const mongoose = require('mongoose');
const config = require('./config');
const Message = require('./models/Message');
const User = require('./models/User');
const nanoid = require('nanoid');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [user2, user1, admin, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12, user13, user14] = await User.create(
        {
            username: 'John',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'Alan',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'admin',
            password: '123',
            role: 'moderator',
            token: nanoid()
        },
        {
            username: 'Abraham',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'Alen',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'Alex',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'Bob',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'Brandon',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'Bill',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'Craig',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'Christof',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'Callen',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'Dan',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'Dave',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'Farrel',
            password: '123',
            role: 'user',
            token: nanoid()
        },
    );



    await Message.create(
        {
            user: user1.username,
            text: 'One of the most frustrating things an aspiring developer can do',
        },
        {
            user: user2.username,
            text: 'is try to come up with practical ideas for their next project.',
        },
        {
            user: user3.username,
            text: 'I found myself running into this very problem. I’ve got lots of ideas',
        },
        {
            user: user4.username,
            text: 'and I wanted to challenge myself. I also knew I wanted to make something',
        },
        {
            user: user5.username,
            text: 'that was more interactive, an application',
        },
        {
            user: user6.username,
            text: 'that resembled something that people would actually use.',
        },
        {
            user: user7.username,
            text: 'What I ended up with was a simple SMS-like application',
        },
        {
            user: user8.username,
            text: 'One of the most frustrating things an aspiring developer can do',
        },
        {
            user: user9.username,
            text: 'complete with a bot that spoke back to the user with responses generated in lorem ipsum.',
        },
        {
            user: user10.username,
            text: 'In this post',
        },
        {
            user: user11.username,
            text: 'I’ll walk through the process of setting up the data,',
        },
        {
            user: user12.username,
            text: 'developing the algorithm for the bot',
        },
        {
            user: user13.username,
            text: ' DOM manipulation',
        },
        {
            user: user14.username,
            text: 'asynchronous Javascript, and lastly, some of the bugs I encountered along the way.',
        },
        {
            user: admin.username,
            text: 'Bottling Latin',
        },
        {
            user: user1.username,
            text: 'I started my project',
        },
        {
            user: user2.username,
            text: 'by figuring out how to create an object',
        },
        {
            user: user3.username,
            text: 'that contained all of the lorem ipsum',
        },
        {
            user: user4.username,
            text: 'from which my bot could pick and choose.',
        },
        {
            user: user5.username,
            text: 'I headed over to the handy Lorem Ipsum Generator',
        },
        {
            user: user6.username,
            text: 'and generated about 25 paragraphs worth of text. ',
        },
        {
            user: user7.username,
            text: 'From this I’d need to create a simple application',
        },
        {
            user: user8.username,
            text: 'to transform this text into a usable Javascript object.',
        },
        {
            user: user9.username,
            text: 'I knew my bot would need to pick words at random,',
        },
        {
            user: user10.username,
            text: 'but I wanted to do so in a way that resembled regular speech patterns.',
        },
        {
            user: user11.username,
            text: 'So, I went about to filter the text into unique words and then sort by word length.',
        },
        {
            user: user12.username,
            text: 'The resulting parsing application can be found here.',
        },
        {
            user: user13.username,
            text: 'Please feel free',
        },
        {
            user: user14.username,
            text: 'to view the source code.',
        },
        {
            user: admin.username,
            text: 'The interface is quite simple:',
        },
        {
            user: user1.username,
            text: 'two text boxes',
        },
        {
            user: user2.username,
            text: 'the first an input which takes in our source text',
        },{
            user: user3.username,
            text: 'in this case, lorem ipsum, ',
        },
    );

    return connection.close();
};

run().catch(error => {
    console.error('Something went wrong!', error);
});