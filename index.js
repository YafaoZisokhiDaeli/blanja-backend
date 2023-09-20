require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const createError = require('http-errors')
const productsRouter = require('./src/routes/products')
const categoryRouter = require('./src/routes/category')
const transactionsRouter = require('./src/routes/transaction')
const userRouter = require('./src/routes/user')


app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/products', productsRouter)
app.use('/category', categoryRouter)
app.use('/transactions', transactionsRouter)
app.use('/user', userRouter)
app.use('/img', express.static('./upload'))


app.all('*', (req, res, next) => {
    next(new createError.NotFound())
})
app.use((err, req, res, next) => {
    const messageError = err.message || 'Internal server error'
    const statusCode = err.status || 500

    res.status(statusCode).json({
        message: messageError
    })
})


app.listen(8080, () => {
    console.log(`Server running on  http://localhost:8080`)
})