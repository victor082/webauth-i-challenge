// // const User = require('../user/user-model')
// // const bcrypt = require('bcryptjs')

// module.exports = function restricted(req, res, next) {
//     // const { username, password } = req.headers;

//     // if (username  && password) {
//     //     User.findBy({ username })
//     //     .first()
//     //     .then(user => {
//     //         if (user && bcrypt.compareSync(password, user.password)) {
//     //             next();
//     //         } else {
//     //             res.status(401).json({ message: 'Invalid username or password. Please try again.' })
//     //         }
//     //     })
//     //     .catch(error => {
//     //         res.status(500).json(error)
//     //     })
//     // } else {
//     //     res.status(400).json({ message: 'Please provide credentials'})
//     // }

//     if (req.session && req.session.username) {
//         next();
//     } else {
//         res.status(401).json({ message: 'You are not authorized to see this content.'})
//     }
// }

const bcrypt = require('bcryptjs');

const Users = require('../user/user-model');

// middleware
module.exports = function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ message: 'Please provide credentials' });
  }
};
