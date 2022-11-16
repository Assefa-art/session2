const express = require('express')
const mongoose = require('mongoose')
const URL = `mongodb+srv://atlas:Atlaspassword1@cluster0.ren1g2l.mongodb.net/?retryWrites=true&w=majority`
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const userRoute = require('./routes/userRoute')

// COnnection will be created with the database
mongoose.connect(URL)
const db = mongoose.connection

// Incase some error encountered during connection
db.on('error', () => {
    console.log('Error connecting to DB')
})

// To show success message for the user
db.once('open', ()=>{
    console.log('DB connected')
})


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/users', userRoute)



app.listen(4000, () => {
    console.log('Server running on port 4000.')
})