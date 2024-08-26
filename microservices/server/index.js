const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { default: axios } = require('axios')


const app = express()

const authUrl = "http://localhost:3000/"
const postUrl = "http://localhost:3001/"

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true,
}))






app.post('/register', async (req, res) => {
    try {
        console.log("caaled");
        const result = await axios.post(authUrl + 'register', req.body, { withCredentials: true })
        console.log("result", result);
        res.status(200).json({ message: "Server runing", result })
    } catch (error) {
        console.log(error.response.data);
        res.status(500).json({ message: error.response.data.message })
    }
})

app.post('/login', async (req, res) => {
    try {
        const result = await axios.post(authUrl + 'login', req.body, { withCredentials: true })
        const cookies = result.headers['set-cookie'];
        if (cookies) {
            cookies.forEach(cookie => {
                res.append('Set-Cookie', cookie);
            });
        }
        res.status(result.status).json(result.data)
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: error || "assa" })
    }
})






app.get('/', async (req, res) => {
    try {
        const { user } = req.cookies
        const { page, searchVal } = req.query
        const result = await axios.get(postUrl, {
            headers: {
                Cookie: `user=${user}`
            },
            params: { page, searchVal }
        })
        res.status(result.status).json(result.data)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})
app.post('/', async (req, res) => {
    try {
        const { user } = req.cookies
        const result = await axios.post(postUrl, req.body, {
            headers: {
                Cookie: `user=${user}`
            }
        })
        res.status(result.status).json(result.data)
    } catch (error) {
        res.status(500).json({ message: "error" })
    }
})
app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { user } = req.cookies
        const result = await axios.delete(postUrl + id, {
            headers: {
                Cookie: `user=${user}`
            }
        })
        res.status(result.status).json(result.data)
    } catch (error) {
        res.status(500).json({ message: "error" })
    }
})

app.listen(5000, () => {
    console.log("SERVER RUNNING");
})