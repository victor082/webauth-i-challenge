const router = require('express').Router();

const User = require('../user/user-model');
const restricted = require('../auth/restrictedmiddleware.js');

router.get('/', restricted, (req, res) => {
    User.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})

module.exports = router;