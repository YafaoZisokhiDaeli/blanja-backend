const Pool = require('../config/db')

const searching = (search) => {
    return Pool.query(`SELECT * FROM category WHERE name LIKE '%${search}%'`)
}

const selectAll = (numberPerPage, startPages, sort, sortby) => {
    return Pool.query(`SELECT * FROM category ORDER BY ${sortby} ${sort} LIMIT ${numberPerPage} OFFSET ${startPages}`)
}

const countCategory = () => {
    return Pool.query(`SELECT COUNT(*) FROM category`)
}

const getCategory = (id) => {
    return Pool.query(`SELECT * FROM category WHERE id=${id}`)
}

const insertCategory = (id, name) => {
    return Pool.query(`INSERT INTO category (id, name) VALUES (${id}, '${name}')`)
}

const editCategory = (id, name) => {
    return Pool.query(`UPDATE category SET name='${name}' WHERE id=${id}`)
}

const deleteCategory = (id) => {
    return Pool.query(`DELETE FROM category WHERE id=${id}`)
}






module.exports = {searching, selectAll, countCategory, getCategory, insertCategory, editCategory, deleteCategory}