const router = require('express').Router();

const User = require('../user/user-model');
const restricted = require('../auth/restrictedmiddleware.js');

router.get('/', restricted, (req, res) => {
    res.send('Welcome to the member only page!')
})

module.exports = router;