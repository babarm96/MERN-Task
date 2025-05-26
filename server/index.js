const express = require('express')
const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';

var cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

var userRoutes = require('./routes/userRoutes')
app.use('/', userRoutes)


app.get('/', (req, res) => {

    return res.status(200).json({ message: 'Server is up..' })
})



app.listen(PORT, HOST, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

