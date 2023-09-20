const categoryModel = require('../models/category')
const categoryController = {
    searching: async (req, res) => {
        try {
            const search = req.query.search || ''
            const tes = await categoryModel.searching(search)
            res.status(200).json({
                data: tes.rows
            })
        }catch(error) {
            console.log(error);
        }
    },
    getAllCategory: async (req, res) => {
        try{
            const currentPage = Number(req.query.currentPage) || 1
            const numberPerPage = Number(req.query.numberPerPage) || 5
            const startPages = (currentPage - 1) * numberPerPage
            const sortby = req.query.sortby || 'id'
            const sort = req.query.sort || 'ASC'
            const result = await categoryModel.selectAll(numberPerPage, startPages, sort, sortby)
            const {rows: [count]} = await categoryModel.countCategory()
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
        }catch(error) {
            console.log(error);
        }
    },
    getCategory: (req, res) => {
        const id = req.params.id
        categoryModel.getCategory(id)
        .then(result => res.json(result.rows))
        .catch (error => res.send(error))
    },
    insertCategory: (req, res) => {
        const {id, name, stock, price, category_id, transactions_id} = req.body

        categoryModel.insertCategory(id, name, stock, price, category_id, transactions_id)
        .then(result => res.json(`Category Created`))
        .catch(error => res.send(error))
    },
    editCategory: (req, res) => {
        const id = req.params.id    
        const name = req.body.name

        categoryModel.editCategory(id, name)

        .then(result => res.json(`Category update success`))
        .catch(error => res.send(error))
    },
    deleteCategory: (req, res) => {
        const id = req.params.id

        categoryModel.deleteCategory(id)
        .then(result => res.json(`Delete Category success`))
        .catch(error => res.send(error))
    }
}


module.exports = categoryController