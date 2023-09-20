const Pool = require('../config/db')

const searching = (search) => {
    return Pool.query(`SELECT * FROM products WHERE name LIKE '%${search}%'`)
}

const selectAll = (numberPerPage, startPages, sort, sortby) => {
    return Pool.query(`SELECT * FROM products ORDER BY ${sortby} ${sort} LIMIT ${numberPerPage} OFFSET ${startPages}`)
}

const countProduct = () => {
    return Pool.query(`SELECT COUNT(*) FROM products`)
}

const getProduct = (id) => {
    return Pool.query(`SELECT * FROM products WHERE id=${id}`)
}

const insertProduct = (id, name, stock, price, photo, description) => {
    return Pool.query(
        `INSERT INTO products (id, name, stock, price, photo, description) VALUES (${id}, '${name}', ${stock}, ${price}, '${photo}', '${description}')`
        )
}

const editProduct = (id, name, stock, price, photo, description) => {
    return Pool.query(`UPDATE products SET name='${name}', stock=${stock}, price=${price}, photo='${photo}', description='${description}' WHERE id=${id}`)
}

const deleteProduct = (id) => {
    return Pool.query(`DELETE FROM products WHERE id=${id}`)
}

const findProductID = (id) => {
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM products WHERE id=${id}`,(error,result)=>{
        if(!error){
        resolve(result);
        }else{
        reject(error);
        }
    })
    )
}




module.exports = {searching, selectAll, countProduct, getProduct, insertProduct, editProduct, deleteProduct, findProductID}