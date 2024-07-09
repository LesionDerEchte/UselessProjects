const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Litec321!',
    database: 'soccermap'
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/test/',(req, res)=>{
    res.send("working!");
});

app.get('/users/select/user/',(req, res)=>{
    const sqlSelect = "SELECT * FROM users"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

app.get('/users/select/user/:username',(req, res)=>{
    const username = req.params.username

    const sqlSelect = "SELECT * FROM users WHERE username = ?"
    db.query(sqlSelect, username, (err, result) => {
        res.send(result);
        console.log(err);
    })
});


app.post('/users/insert/user/', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const mail = req.body.mail
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const favclubid = req.body.favclubid
    const favstadiumid = req.body.favstadiumid
    
    const sqlInsert = "INSERT INTO users (username, password, mail, firstname, lastname, favclubid, favstadiumid) VALUES (?, ?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [username, password, mail, firstname, lastname, favclubid, favstadiumid], (err, result) =>{
        console.log(result);
    })
});

app.delete('/users/delete/user/:username', (req, res) => {
    const username = req.params.username
    
    const sqlDelete = "DELETE FROM users WHERE username = ?"
    db.query(sqlDelete, username, (err, result) =>{
        if (err) console.log(err);
    })
});

app.put('/users/update/password/', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    
    const sqlUpdate = "UPDATE users SET password = ? WHERE username = ?"
    db.query(sqlUpdate, [password, username], (err, result) =>{
        if (err) console.log(err);
    })
});

app.listen(3001, () => {
    console.log("running on port 3001");
});