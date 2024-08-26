const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')

const PORT = 3001


const Posts = mongoose.model("posts", new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    rate: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },

}, { timestamps: true }))




const app = express();

app.use(express.json());
app.use(cookieParser());


const userProtcted = (req, res, next) => {
    const { user } = req.cookies
    if (!user) {
        return res.status(401).json({ message: "No cookie found" })
    }
    next()
}



app.get('/', userProtcted, async (req, res) => {
    const { user } = req.cookies
    const { page, searchVal } = req.query
    console.log("user", req.cookies, searchVal);
    const count = await Posts.countDocuments({ userId: user })
    const query = searchVal ? { $and: [{ title: { $regex: searchVal, $options: 'i' } }, { userId: user }] } : { userId: user }
    const result = await Posts.find(query).skip(page * 5).limit(5)
    res.status(200).json({ message: "post fetch success ", result, count })
});

app.post('/', userProtcted, async (req, res) => {
    const { user } = req.cookies
    console.log("add user-cookie", user);
    const { title, desc, rate } = req.body;
    if (!title || !desc || !rate || !user) {
        console.log("user add called");
        return res.status(400).json({ message: "All Fileds are required" })
    }
    const result = await Posts.create({ title, desc, rate, userId: user })
    res.status(200).json({ message: "post add success ", result });
});
app.delete('/:id', userProtcted, async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "All Fileds are required" })
    }
    const result = await Posts.findByIdAndDelete(id)
    res.status(200).json({ message: "post delete success ", result });
});




app.use("*", (req, res) => {
    res.status(404).json({ message: "No resource found" })
})



mongoose.connect("mongodb://localhost:27017/micorservice-test-2")


mongoose.connection.once('open', () => {
    console.log("MONGOOSE CONNECted");
    app.listen(PORT, console.log("User SERVER RUNNING"))
})