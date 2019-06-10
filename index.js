const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs')

const db = require('./database/dbConfig.js');
const User = require('./user/user-model.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send("It's alive!");
  });

server.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8)

    user.password = hash

    User.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(error => {
        res.status(500).json(error)
    });
})

server.post('/login', (req, res) => {
    let { username , password } = req.body;

    User.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome back ${user.username}.`})
        } else {
            res.status(401).json({ message: 'Invalid username or password. Please try again.'})
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.get('/users', restricted, (req, res) => {
    User.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})

function restricted(req, res, next) {
    const { username, password } = req.headers;

    if (username  && password) {
        User.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                next();
            } else {
                res.status(401).json({ message: 'Invalid username or password. Please try again.' })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
    } else {
        res.status(400).json({ message: 'Please provide credentials'})
    }
}

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
