import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import user_route from './route/user_route'
import image_route from './route/image_route'

require('dotenv').config()

const app = express()

// use some library middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({credentials: true, origin: '*'}))

// connect to database
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB")
})


// map all routes to the app
app.use('/api', user_route)
app.use('/api', image_route)

// catch authentication and authorization error
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message})
    }else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err)
    }
})

// Hello route
app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})