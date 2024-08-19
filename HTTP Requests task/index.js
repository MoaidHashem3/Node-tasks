const express = require("express")
const fs = require('fs')
const app = express()

app.use(express.json())

app.get('/todos',(req,res)=>{
    let todos= JSON.parse(fs.readFileSync("todo.json", "utf8"));
     res.send(todos);
 })


app.patch("/patch/todos/:id", (req, res) => {
    let id = req.params.id;
    // console.log(req.body);
    let { title } = req.body;
    let todos = JSON.parse(fs.readFileSync("./todo.json", "utf8"));
    let todo = todos.find((todo) => todo.id == id);
    if (todo) {
        todo.title = title;
        fs.writeFileSync("./todo.json", JSON.stringify(todos));
        res.json({ message: "Edited ", data: todo });
    } else {
        res.json({ message: "SORRY there is no todo Found with this id" });
    }
});

app.get('/todos/:id',(req,res)=>{
    let todos= JSON.parse(fs.readFileSync("todo.json", "utf8"));
    let id = req.params.id;
    let todo = todos.find((todo) => todo.id == id);
     res.send(todo);
 })
 
app.post('/post/todo', (req,res)=>{
    let { title } = req.body;
    let todos = JSON.parse(fs.readFileSync("./todo.json", "utf8"));
    let highestID= todos.slice(-1)[0].id;
    let new_todo={
        id: highestID+1,
        title: title
    }
    todos.push(new_todo);
    fs.writeFileSync("./todo.json", JSON.stringify(todos));
    res.json({ message: "Added ", data: new_todo });
})
app.delete('/delete/todo/:id', (req,res)=>{
    let id = req.params.id;
    let todos= JSON.parse(fs.readFileSync("todo.json", "utf8"));
    let index = todos.findIndex((todo) => todo.id == id);
    if (index !== -1) {
        let deletedTodo = todos.splice(index, 1)[0];
        fs.writeFileSync("./todo.json", JSON.stringify(todos));
        res.json({ message: "Deleted ", data: deletedTodo });
    } else {
        res.json({ message: "SORRY there is no todo Found with this id" });
    }
})

app.put('/put/todo/:id',(req,res)=>{
    let id = req.params.id;
    let todos= JSON.parse(fs.readFileSync("todo.json", "utf8"));
    let index = todos.findIndex((todo) => todo.id == id);
    if (index!==-1) {
        todos[index] = { ...todos[index], ...req.body };
        fs.writeFileSync("./todo.json", JSON.stringify(todos));
        res.json({ message: "Updated ", data: todos[index] });
    } else {
        res.json({ message: "SORRY there is no todo Found with this id" });
    }
})

app.listen(3000,()=>{

})