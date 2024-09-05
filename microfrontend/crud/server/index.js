const express   =  require('express')
const mongoose   =  require('mongoose')
const cors   =  require('cors')


const app =  express()


const Todo = mongoose.model("todos", new mongoose.Schema({
    task:{type:String, required:true},
    desc:{type:String, required:true},
}))

app.use(cors({origin:"http://localhost:4200",credentials:true}))

app.use(express.json());


app.get("/api", async (req,res) => {
    const result = await Todo.find();    
    res.status(200).json({message:"Todo fetch success", todos:result})
})


app.post("/api/add-todo", async (req,res) => {
    const result = await Todo.create(req.body)
    res.status(200).json({message:"Todo fetch success", result})
})



app.delete("/api/delete-todo/:id", async (req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"Todo fetch success", result})
})


app.put("/api/update-todo", async (req,res) => {
    const result = await Todo.findByIdAndUpdate(req.body._id,req.body)
    res.status(200).json({message:"Todo fetch success", result})
})







mongoose.connect("mongodb://localhost:27017/test");

mongoose.connection.once("open",()=>{
    console.log("Mongoose connected");
    app.listen(3000 , console.log("Server running")
    )
    
})


