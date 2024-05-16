const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDb = require('./config/connectDB')
const path = require('path')

dotenv.config()

connectDb()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/api/v1/users', require('./routes/userRoutes'))
app.use('/api/v1/transactions', require('./routes/transactionRoutes'))

app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

const PORT = 8080 || process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`.bgCyan.white)
})