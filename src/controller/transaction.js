const transactionsModel = require('../models/transaction')
const transactionsController = {
    searching: async (req, res) => {
        try {
            const search = req.query.search || ''
            const tes = await transactionsModel.searching(search)
            res.status(200).json({
                data: tes.rows
            })
        }catch(error) {
            console.log(error);
        }
    },
    getAllTransaction: async (req, res) => {
        try{
            const currentPage = Number(req.query.currentPage) || 1
            const numberPerPage = Number(req.query.numberPerPage) || 5
            const startPages = (currentPage - 1) * numberPerPage
            const sortby = req.query.sortby || 'id'
            const sort = req.query.sort || 'ASC'
            const result = await transactionsModel.selectAll(numberPerPage, startPages, sort, sortby)
            const {rows: [count]} = await transactionsModel.countTransaction()
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
    getTransaction: (req, res) => {
        const id = req.params.id
        transactionsModel.getTransaction(id)
        .then(result => res.json(result.rows))
        .catch (error => res.send(error))
    },
    insertTransaction: (req, res) => {
        const {id, address, transaction_detail_id} = req.body

        transactionsModel.insertTransaction(id, address, transaction_detail_id)
        .then(result => res.json(`Transaction Created`))
        .catch(error => res.send(error))
    },
    editTransaction: (req, res) => {
        const id = req.params.id    
        const address = req.body.address

        transactionsModel.editTransaction(id, address)

        .then(result => res.json(`Transaction update success`))
        .catch(error => res.send(error))
    },
    deleteTransaction: (req, res) => {
        const id = req.params.id

        transactionsModel.deleteTransaction(id)
        .then(result => res.json(`Delete product success`))
        .catch(error => res.send(error))
    }
}


module.exports = transactionsController