const Pool = require('../config/db')

const searching = (search) => {
    return Pool.query(`SELECT * FROM transaction WHERE address LIKE '%${search}%'`)
}

const selectAll = (numberPerPage, startPages, sort, sortby) => {
    return Pool.query(`SELECT * FROM transaction ORDER BY ${sortby} ${sort} LIMIT ${numberPerPage} OFFSET ${startPages}`)
}

const countTransaction = () => {
    return Pool.query(`SELECT COUNT(*) FROM transaction`)
}

const getTransaction = (id) => {
    return Pool.query(`SELECT * FROM transaction WHERE id=${id}`)
}

const insertTransaction = (id, address, transaction_detail_id) => {
    return Pool.query(
        `INSERT INTO transaction (id, address, transaction_detail_id) VALUES (${id}, '${address}', ${transaction_detail_id})`
        )
}

const editTransaction = (id, address) => {
    return Pool.query(`UPDATE transaction SET address='${address}' WHERE id=${id}`)
}

const deleteTransaction = (id) => {
    return Pool.query(`DELETE FROM transaction WHERE id=${id}`)
}






module.exports = {searching, selectAll, countTransaction, getTransaction, insertTransaction, editTransaction, deleteTransaction}