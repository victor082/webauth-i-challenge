const bcrypt = require('bcryptjs');
const router = require('express').Router();
const User = require('../user/user-model.js');

router.post('/register', (req, res) => {
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

router.post('/login', (req, res) => {
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

router.delete('/', (req, res) => {
    if (req.session) {
        req.session.destroy();
    }
    res.status(200).json({ message: 'Bye! Hope to see ya again!'})
})

module.exports = router;
