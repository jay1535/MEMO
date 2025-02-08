const connectToMongo  = require('./db')
const express = require('express')

connectToMongo()
const app = express()
const port = 5000
const cors = require('cors')
app.use(express.json())
app.use(cors())

// respond with "hello world" when a GET request is made to the homepage

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))



app.listen(port,()=>{
    console.log(`${port}`)
})