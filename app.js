const express = require("express");
const app = express();
const port = 4400;
app.use(express.json());
const data = [
    { id: 1, task: "Item-1" },
    { id: 2, task: "Item-2" },
];

//get  all method is here

app.get("/todos", (req, res) => {
    res.status(200).json({ message: "Welome to the home page ", data: data });
});

//post todos request

app.post("/todos", (req, res) => {
    const id = data[data.length === 0] ? 1 : data[data.length - 1].id + 1;
    const newTodos = {
        id: id,
        task: req.body.task,
    };

    data.push(newTodos);
    res.status(200).json({ message: "User Is create now !" });
});

//geting one item/todos

app.get("/todos/:id", (req, res) => {
    // console.log(req.params.id);
    const getAll = data.find((item) => item.id == req.params.id);
    res.status(200).json({ message: "ID founded", getAll });
});

//put /patch/ updating
app.put("/todos/:id", (req, res) => {
    const updated = data.findIndex((item) => item.id == req.params.id);
    if (updated === -1) {
        res.status(404).json({ Error: "Not found", updated })
    }
    const edittodo = (data[updated].task = req.body.task);
    res.status(200).json({ message: "Todo is updated !!!!" })
});



//deleted /deleing 


app.delete('/todos/:id', (req, res) => {
    const deleteq = data.findIndex((item => item.id == req.params.id))
    if (deleteq == -1) {
        res.status(404).json({ error: "This is not Found" })
    }
    const deleted = data.splice(deleteq, 1);
    res.status(200).json({ message: "DELETED Succeed!! Deleted" })
})

app.listen(port, (req, res) => {
    console.log("Sever is Running Now in Port 4400 !!!!!");
});
