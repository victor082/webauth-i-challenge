const db = require('../database/dbConfig.js')

module.exports = {
    add,
    find,
    findBy,
    findById,
}

function find() {
    return db('user')
    .select('id', 'username', 'password');
}

function findBy(filter) {
    return db('user')
    .where(filter)
}

function add(user) {
    return db('user')
    .insert(user, 'id')
    .then(ids => {
        const [id] = ids
        return findById(id)
    })
}

function findById(id) {
    return db('user')
    .where({ id })
    .first()
}