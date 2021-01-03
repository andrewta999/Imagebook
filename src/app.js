import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({credentials: true, origin: '*'}))


app.get('/', (req, res) => {
    res.send("Hello")
})


app.listen(3000, () => {
    console.log("App is running")
})