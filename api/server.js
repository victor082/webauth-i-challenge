const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session)

const userRouter = require('../user/user-router.js');
const authRouter = require('../auth/auth-router.js');

const server = express();

const sessionConfig = {
    name: 'Victor SID', // will be sid default
    secret: 'this is a secret, lets keep it like that.',
    resave: false, // if there are no changes to the session, don't save it.
    saveUninitialized: true, // for GDPR compliance
    cookie: {
        maxAge: 1000 * 60 * 10, // this is in milliseconds
        secure: false, // send cookie only over https, set to true in actual production.
        httpOnly: true, // always set to true, it means client JS can't access the cookie.
    },
    store: new KnexSessionStore({
        knex: require('../database/dbConfig.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 30,
    }),
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.use('/users', userRouter);
server.use('/auth', authRouter);

module.exports = server;