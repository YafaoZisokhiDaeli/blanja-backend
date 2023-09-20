const productsModel = require('../models/products')
const commonsHelper = require('../helper/common')
const client = require('../config/redis')
const createError = require('http-errors')

const productsController = {
    searching: async (req, res) => {
        try {
            const search = req.query.search || ''
            const tes = await productsModel.searching(search)
            res.status(200).json({
                data: tes.rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    getAllProduct: async (req, res) => {
        try {
            const currentPage = Number(req.query.currentPage) || 1
            const numberPerPage = Number(req.query.numberPerPage) || 10
            const startPages = (currentPage - 1) * numberPerPage
            const sortby = req.query.sortby || 'id'
            const sort = req.query.sort || ''
            const result = await productsModel.selectAll(numberPerPage, startPages, sort, sortby)
            const { rows: [count] } = await productsModel.countProduct()
            const totalData = parseInt(count.count)
            const totalPages = Math.ceil(totalData / numberPerPage)
            res.status(200).json({
                pagination: {
                    currentPage,
                    numberPerPage,
                    totalData,
                    totalPages
                },
                data: result.rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    getProduct: (req, res) => {
        const id = Number(req.params.id)
        productsModel.getProduct(id)
            .then(result => {
                client.setEx(`products/${id}`, 60 * 60, JSON.stringify(result.rows))
                commonsHelper.response(res, result.rows, 200, "Get data success from database")
            }
            )
            .catch(error => res.send(error))
    },
    insertProduct: async (req, res) => {
        const PORT = process.env.PORT || 5000
        const DB_HOST = process.env.DB_HOST || 'localhost'
        const photo = req.file.filename
        const { rows: [count] } = await productsModel.countProduct()
        const id = Number(count.count) + 1
        const { name, stock, price, description } = req.body

        productsModel.insertProduct(id, name, stock, price, `http://${DB_HOST}:${PORT}/img/${photo}`, description)
            .then(result =>
                commonsHelper.response(res, result.rows, 200, "Insert Success")
            )
            .catch(error => res.send(error))
    },
    editProduct: async (req, res) => {
        const PORT = process.env.PORT || 5000
        const DB_HOST = process.env.DB_HOST || 'localhost'
        const photo = req.file.filename
        const id = Number(req.params.id)
        const { name, stock, price, description } = req.body
        const { rowCount } = await productsModel.findProductID(id);
        if (!rowCount) {
            return next(createError(403, "ID is Not Found"));
        }

        productsModel.editProduct(id, name, stock, price, `http://${DB_HOST}:${PORT}/img/${photo}`, description)
            .then(result => commonsHelper.response(res, result.rows, 200, "Update Success"))
            .catch(error => res.send(error))
    },
    deleteProduct: (req, res) => {
        const id = req.params.id

        productsModel.deleteProduct(id)
            .then(result => res.json(`Delete product success`))
            .catch(error => res.send(error))
    }
}


module.exports = productsController