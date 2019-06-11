const db = require('../database/dbConfig.js')

module.exports = {
    add,
    find,
    findBy,
    findById,
}

function find() {
    return db('user')
    .select('id', 'username');
}

function findBy(filter) {
    return db('user')
    .where(filter)
}

async function add(user) {
    const [id] = await db('user')
    .insert(user) //, 'id'
    // .then(ids => {
    //     const [id] = ids
    //     return findById(id)
    // })
    return findById(id);
}

function findById(id) {
    return db('user')
    .where({ id })
    .first()
}