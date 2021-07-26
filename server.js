let express = require('express');
let app = express();
let mysql = require('mysql');
let cors = require('cors');
let bodyParser = require('body-parser')

let PORT = process.env.PORT || 3000

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());


// Database Connection
// let db = mysql.createConnection({
//     user: "root",
//     password: "27091999",
//     host: "localhost",
//     database: "task_management"
// },(err) => {
//     console.log(err);
// })

let db = mysql.createConnection({
    user: "sql6427110",
    password: "Fp6YdXYB78",
    host: "sql6.freemysqlhosting.net",
    database: "sql6427110"
},(err) => {
    console.log(err);
})

///////////// TASKS ////////////////////////////

//Get All Tasks
// app.get('/getAllTasks',(req,res) => {
//     db.query("call sp_get_tasks()", (err,result)=>{
//         if(err) throw err;
//         let message = ""
//         if(result === undefined || result.length == 0){
//             message = "you don't have any task!";
//             return res.json({message: message});
//         }
//         return res.json(result);
//     })
// })

// Get Task By ID
// app.get('/getTask', (req,res) => {
//     let id = req.query.id;
//     if(!id){
//         return res.status(400).json({message: "Please Provide Task ID!"});
//     }else{
//         db.query("select * from tasks,projects,members,statuses where member_id = members.id and project_id = projects.id and tasks.status_id = statuses.id and tasks.id = ?", id, (err,result)=>{
//             if(err) throw err;
//             let message = ""
//             if(result === undefined || result.length == 0){
//                 message = "Task not found.";
//                 return res.json({message:message});
//             }
//             return res.json(result);
//         })
//     }
// })

// // Add New Task
// app.post('/addTask',(req,res)=>{
//     let title = req.body.title;
//     let detail = req.body.detail;

//     if(!title || !detail){
//         return res.status(400).send({message: "Please provide title and detail!"});
//     }else{
//         db.query('INSERT INTO tasks (task_title, task_detail) VALUES(?,?)',[title,detail], (err,result)=>{
//             if(err) throw err;
//             return res.json({data:{title:title,detail:detail},message:"Task added successfully"});
//         })
//     }
// })


/////////////////////////////////////////////////////////////////////



///////////// MEMBERS ////////////////////////////

// Get All Members
app.get('/getAllMembers', (req, res) => {
    db.query("call sp_get_member()", (err,result) => {
        if(err)throw err;
        let message = ""
        if(result === undefined || result.length == 0){
            message = "No Members";
            return res.json({message:message});
        }
        return res.json(result);
    })
})

// Get Member By ID
// app.get('/getMember',(req,res)=> {
//     let id = req.query.id;

//     if(!id){
//         return res.status(400).send({message: "Please Provide Member ID!"});
//     }else{
//         db.query("SELECT * FROM members WHERE id = ?", id, (err,result)=>{
//             if(err)throw err;
//             let message = ""
//             if(result === undefined || result.length == 0){
//                 message = "Member not found";
//                 return res.send({message:message});
//             }else{
//                 return res.send(result);
//             }
//         })
//     }
// })



/////////////////////////////////////////////////



///////////// PROJECTS ////////////////////////////

// Get All Projects
// app.get('/getAllProjects', (req,res)=> {
//     db.query("SELECT * FROM projects", (err,result)=>{
//         if(err) throw err;
//         let message = ""
//         if(result === undefined || result.length == 0){
//             message = "You don't have any projects right now!";
//             return res.json({message:message});
//         }
//         return res.json(result);
//     })
// })

// // Get Project by ID
// app.get('/getProject',(req,res)=>{
//     let id = req.query.id;

//     if(!id){
//         return res.status(400).send({message: "Please provide project id"})
//     }else{
//         db.query("SELECT * FROM projects WHERE id = ?",id,(err,result)=>{
//             if(err) throw err;
//             let message = ""
//             if(result === undefined || result.length == 0){
//                 message = "Project not found";
//                 return res.send({message : message})
//             }
//             return res.send(result);
//         })
//     }
// })
///////////////////////////////////////////////////////


app.get('/',(req,res) => {
    res.json({message:"Welcome to API World!!",author: "Jhenica Guilleno"})
})

app.listen(PORT,()=> {
    console.log('Node Server is running on ',PORT);
})