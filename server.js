let express = require('express');
let app = express();
let mysql = require('mysql');
let cors = require('cors');

let PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json());


// Database Connection
let db = mysql.createConnection({
    user: "sql6427110",
    password: "Fp6YdXYB78",
    host: "sql6.freemysqlhosting.net",
    database: "sql6427110"
},(err) => {
    console.log(err);
})

//Get All Tasks
app.get('/getAllTasks',(req,res) => {
    db.query("SELECT * FROM tasks", (err,result)=>{
        if(err) throw err;
        let message = ""
        if(result === undefined || result.length == 0){
            message = "you don't have any task!";
            return res.json({message: message});
        }
        return res.json(result);
    })
})

// Add New Task
app.post('/addTask',(req,res)=>{
    let title = req.body.title;
    let detail = req.body.detail;

    if(!title || !detail){
        return res.status(400).send({message: "Please provide title and detail!"});
    }else{
        db.query('INSERT INTO tasks (task_title, task_detail) VALUES(?,?)',[title,detail], (err,result)=>{
            if(err) throw err;
            return res.json({data:{title:title,detail:detail},message:"Task added successfully"});
        })
    }
})

// Get All Members
app.get('/getAllMembers', (req, res) => {
    db.query("SELECT * FROM members", (err,result) => {
        if(err)throw err;
        let message = ""
        if(result === undefined || result.length == 0){
            message = "No Members";
            return res.json({message:message});
        }
        return res.json(result);
    })
})

// Get All Projects
app.get('/getAllProjects', (req,res)=> {
    db.query("SELECT * FROM projects", (err,result)=>{
        if(err) throw err;
        let message = ""
        if(result === undefined || result.length == 0){
            message = "You don't have any projects right now!";
            return res.json({message:message});
        }
        return res.json(result);
    })
})



app.get('/',(req,res) => {
    res.json({message:"Welcome to API World!!",author: "Jhenica Guilleno"})
})

app.listen(PORT,()=> {
    console.log('Node Server is running on ',PORT);
})