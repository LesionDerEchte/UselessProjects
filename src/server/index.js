const express = require('express')
const jwt =require('jsonwebtoken')
const cors = require('cors');
const app = express()
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const util = require('util');
const nodemailer = require('nodemailer'); 
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Litec321!',
    database: 'soccermap'
});
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Litec321!',
    database: 'soccermap'
});


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'soccermapauth@gmail.com',
      pass: 'afecgkdiuvqocsgg'
    }
  });


const query = util.promisify(conn.query).bind(conn);
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin:'*'
}
   
));




function getUser(user){
    return new Promise((resolve, reject) => {
        const sqlSelect = "SELECT * FROM users where username = ?"
        db.query(sqlSelect, user, (err, result) => {
            resolve(result);
            if (err) reject(err);
        })

        return
     
    });
  }

  

function getRating(username, stadiumid){
    return new Promise((resolve, reject) => {
        const sqlSelect = "SELECT * FROM ratings where username = ? and stadiumid = ?"
        db.query(sqlSelect, [username, stadiumid], (err, result) => {
            resolve(result);
            if (err) reject(err);
        })

        return
     
    });
  }









const users = []


app.get('/profile', authenticateToken, (req,res)=>{
    res.send(req.user)
})

app.get('/authenticate', (req, res) =>{
    const authHeader = req.headers['authorization']
    
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null)return res.sendStatus(401)
    jwt.verify(token, "rwhgr32jk523kjn5j2332iu532iugi32bgiu32bgiu2bi53i2ub5i32b5ib235iub235", (err, user)=>{
        if(err){
            return res.sendStatus(403)
        }

        res.send(true)
    })
})

app.get('/password/reset', (req, res) =>{
    
    //TODO
})





app.get('/confirmation/:token', (req, res) =>{
   
    
    const token = req.params.token
    if(token == null)return res.sendStatus(401)

    jwt.verify(token, "rwhgr32jk523kjn5j2332iu532iugi32bgiu32bgiu2bi53i2ub5i32b5ib235iub235", (err, user)=>{
        if(err){
            res.send("Something went wrong!")
        }
        res.send("Erfolg, melde dich mit deinem Account an!")
        const sqlUpdate = "UPDATE users SET isAuth = 1 WHERE mail = ?"
        db.query(sqlUpdate, user.user, (err, result) =>{
            if (err) console.log(err);
    })
    })
})


//For testing
app.get('/users', (req,res)=>{
    res.json(users) 
})  


app.post('/register', async (req,res)=>{  //Create a user with POST

    try{
        //In react Umändern, damit die Route gleich aufgerufen wird und hier user mit getUser(user) checken und in db pushen
        const salt =  await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = {username: req.body.username, password: hashedPassword, email: req.body.email}
        users.push(user)
        
        console.log(user)
        const sqlInsert = "INSERT INTO users (username, password, mail, firstname, lastname, favclubid, favstadiumid) VALUES (?, ?, ?, ?, ?, ?, ?)"
        db.query(sqlInsert, [req.body.username, hashedPassword, req.body.email, null, null, null, null], (err, result) =>{
        if (err) console.log(err);
        
    })

        const token = await jwt.sign({ user: req.body.email }, "rwhgr32jk523kjn5j2332iu532iugi32bgiu32bgiu2bi53i2ub5i32b5ib235iub235", {expiresIn: "1d"} )
        const url = `http://localhost:3001/confirmation/${token}`
        const mailOptions = {
            from: 'soccermapauth@gmail.com',
            to: req.body.email,
            subject: 'Authentificaton',
            html:  `Please click this email to confirm your email: <a href="${url}">Click this link</a>`
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          res.status(201).send("User created")


    }
    catch{
        res.status(500).send("Error")
    }
})
app.post('/users/login', async (req,res)=>{
    let data = await getUser(req.body.username).catch(e => { console.log(e) })
    console.log(data)
    if(data.length == 0){
        return  res.status(400).send("Cant find user")
    }
    
    

    
    if(data[0].IsAuth == 0){
        return res.status(400).send("Bitte erst Email bestätigen")
    }

    
        try{
            if(await bcrypt.compare(req.body.password, data[0].password)){ 
            const token = await jwt.sign({ user: req.body.username }, "rwhgr32jk523kjn5j2332iu532iugi32bgiu32bgiu2bi53i2ub5i32b5ib235iub235", {expiresIn: "1d"} )
            res.json({accessToken: token}) 
            }
            
            else{
             res.send("error")
            }
         }
         catch{
             res.status(500).send("Error")
         }

})
     


function authenticateToken(req, res, next){
    
    const authHeader = req.headers['authorization']
    

    
    
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null)return res.sendStatus(401)
    jwt.verify(token, "rwhgr32jk523kjn5j2332iu532iugi32bgiu32bgiu2bi53i2ub5i32b5ib235iub235", (err, user)=>{
        if(err){
            return res.sendStatus(403)
        }
        req.user=user.user
        next()
    })
}




app.get('/test/',(req, res)=>{
    res.send("working!");
});

//Select *

app.get('/clubs/select/',(req, res)=>{
    const sqlSelect = "SELECT * FROM clubs"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/games/select/',(req, res)=>{
    const sqlSelect = "SELECT G.id, G.date, CONCAT('http://localhost/league/',L.id,'.png') AS imageLeague, L.name AS league, CONCAT('http://localhost/logo/',H.id,'.png') AS imageHome, H.name AS home, CONCAT('http://localhost/logo/',A.id,'.png') AS imageAway, A.name AS away, s.name AS stadium, g.link FROM games G INNER JOIN leagues L on G.leagueid = L.id INNER JOIN clubs H ON G.clubidhome=H.id INNER JOIN clubs A ON G.clubidaway=A.id INNER JOIN stadiums S ON G.stadiumid = S.id"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/leagues/select/',(req, res)=>{
    const sqlSelect = "SELECT * FROM leagues"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/stadiums/select/',(req, res)=>{
   
    const sqlSelect = "SELECT * FROM stadiums"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })

    
});

app.get('/following/select/',(req, res)=>{
    const sqlSelect = "SELECT * FROM following"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/likes/select/',(req, res)=>{
    const sqlSelect = "SELECT * FROM likes"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/ratings/select/',(req, res)=>{
    const sqlSelect = "SELECT * FROM ratings"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/users/select/',(req, res)=>{
    const sqlSelect = "SELECT * FROM users"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/countries/select/',(req, res)=>{
    const sqlSelect = "SELECT DISTINCT country FROM stadiums ORDER BY country"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/regions/select/',(req, res)=>{
    const sqlSelect = "SELECT DISTINCT region FROM stadiums ORDER BY region"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/cities/select/',(req, res)=>{
    const sqlSelect = "SELECT DISTINCT city FROM stadiums ORDER BY city"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

// Returns data set if user is following
app.get('/following/check', authenticateToken, (req, res)=>{
    const userid = req.user
    const followingid = req.body.followingid

    console.log(userid + " : " + followingid)
   
    
    const sqlSelect = "SELECT * FROM following where userid = ? and followingid = ?"
    db.query(sqlSelect, [userid, followingid], (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.post('/countries/selectdefinite/',(req, res)=>{
    const city = req.body.city
    const region = req.body.region

    let sqlSelect = "SELECT DISTINCT country FROM stadiums"

    if(city !== null && city !== "all"){
        sqlSelect += " WHERE CITY = '" + city + "'"
        if(region !== null && region !== "all"){
            sqlSelect += " && REGION = '" + region + "'"
        }
    }
    else if(region !== null && region !== "all"){
        sqlSelect += " WHERE REGION = '" + region + "'"
    }

    sqlSelect += " ORDER BY country"
    
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.post('/regions/selectdefinite/',(req, res)=>{
    const country = req.body.country
    const city = req.body.city

    let sqlSelect = "SELECT DISTINCT region FROM stadiums"

    if(country !== null && country !== "all"){
        sqlSelect += " WHERE COUNTRY = '" + country + "'"
        if(city !== null && city !== "all"){
            sqlSelect += " && CITY = '" + city + "'"
        }
    }
    else if(city !== null && city !== "all"){
        sqlSelect += " WHERE CITY = '" + city + "'"
    }

    sqlSelect += " ORDER BY region"
    
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.post('/cities/selectdefinite/',(req, res)=>{
    const country = req.body.country
    const region = req.body.region

    let sqlSelect = "SELECT DISTINCT city FROM stadiums"

    if(country !== null && country !== "all"){
        sqlSelect += " WHERE COUNTRY = '" + country + "'"
        if(region !== null && region !== "all"){
            sqlSelect += " && REGION = '" + region + "'"
        }
    }
    else if(region !== null && region !== "all"){
        sqlSelect += " WHERE REGION = '" + region + "'"
    }

    sqlSelect += " ORDER BY city"
    
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});


//SELECT FOR FILTER

app.post('/stadiums/filter/',authenticateToken,(req, res)=>{
    const country = req.body.country
    const region = req.body.region
    const city = req.body.city
    const openingMax = req.body.openingMax
    const openingMin = req.body.openingMin
    const capacityMax = req.body.capacityMax
    const capacityMin = req.body.capacityMin
    const visited = req.body.visited
    const username = req.user
    
    const order = req.body.order
    const direction = req.body.direction
    

    let base = 'SELECT S.* FROM stadiums S '
    let where = 'WHERE S.name <> "Beispielstadion" '
    let orderby = 'ORDER BY '

    if(country !== null && country !== "all"){
        where += 'AND S.country = "' + country + '" '
    }
    if(region !== null && region !== "all"){
        where += 'AND S.region = "' + region + '" '
    }
    if(city !== null && city !== "all"){
        where += 'AND S.city = "' + city + '" '
    }
    if(openingMax !== null){
        where += 'AND S.opening <= ' + openingMax + ' '
    }
    if(openingMin !== null){
        where += 'AND S.opening >= ' + openingMin + ' '
    }
    if(capacityMax !== null){
        where += 'AND S.capacity <= ' + capacityMax + ' '
    }
    if(capacityMin !== null){
        where += 'AND S.capacity >= ' + capacityMin + ' '
    }
    if(visited == "yes"){
        base += 'INNER JOIN ratings R ON S.id=R.stadiumID '
        where += 'AND R.username = "' + username + '" GROUP BY S.id '
    }
    else if(visited == "no"){
        where += 'AND s.id NOT IN (SELECT DISTINCT R.stadiumID FROM ratings R WHERE R.username = "' + username + '") '
    }

    let sqlSelect = base + where

    if(order === 'name'){
        orderby += 'name '
    }
    else if(order === 'country'){
        orderby += 'country '
    }
    else if(order === 'region'){
        orderby += 'region '
    }
    else if(order === 'city'){
        orderby += 'city '
    }
    else if(order === 'opening'){
        orderby += 'opening '
    }
    else if(order === 'capacity'){
        orderby += 'capacity '
    }

    if(direction === 'ASC'){
        orderby += 'ASC'
    }
    else if (direction === 'DESC'){
        orderby += 'DESC'
    }

    sqlSelect += orderby

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })

});

//SELECT DEFINITE

app.get('/clubs/select/:id',(req, res)=>{
    const id = req.params.id
	
	const sqlSelect = "SELECT * FROM clubs WHERE id = ?"
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/games/select/:id',(req, res)=>{
    const id = req.params.id
	
	const sqlSelect = "SELECT * FROM games WHERE id = ?"
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/leagues/select/:id',(req, res)=>{
	const id = req.params.id
	
    const sqlSelect = "SELECT * FROM leagues WHERE id = ?"
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/stadiums/select/:id',(req, res)=>{
    const id = req.params.id
	
	const sqlSelect = "SELECT S.*, C.id AS clubid, C.name AS clubname, C.short, E.id AS eventid, E.name AS eventname FROM stadiums S LEFT OUTER JOIN clubs C ON S.id=C.stadiumid LEFT OUTER JOIN eventToStadium ES ON S.id=ES.stadiumid LEFT OUTER JOIN events E ON ES.eventid = E.id WHERE S.id = ? "
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/users/select/:username', authenticateToken,(req, res)=>{
    const username = req.params.username
    
    const sqlSelect = "SELECT U.username, S.name AS stadium, C.name AS club FROM users U LEFT OUTER JOIN stadiums S ON U.favstadiumid = s.id LEFT OUTER JOIN clubs C ON U.favclubid = C.id WHERE username = ?"
    db.query(sqlSelect, username, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/ratings/select/:id',(req, res)=>{
    const id = req.params.id
	
	const sqlSelect = "SELECT *, (aussicht + ausstattung + essen + standort + stimmung)/5 AS gesamt FROM ratings WHERE stadiumid = ?"
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

//Custom Select Definite

app.get('/getRatingAverage/gesamt/:id',(req, res)=>{
    const id = req.params.id
	
	const sqlSelect = "SELECT AVG(aussicht + ausstattung + essen + standort + stimmung)/5 as gesamt FROM ratings WHERE stadiumid = ?"
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/getRatingAmount/gesamt/:id',(req, res)=>{
    const id = req.params.id
	
	const sqlSelect = "SELECT COUNT(id) AS anzahl FROM ratings WHERE stadiumid = ?"
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/getNumberOfLikes/:username',(req, res)=>{
    const id = req.params.username
	
	const sqlSelect = "SELECT COUNT(R.id) as anzahl FROM likes L INNER JOIN ratings R ON L.ratingID=R.id WHERE R.username = ?"
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/getNumberOfLiked/:username',(req, res)=>{
    const id = req.params.username
	
	const sqlSelect = "SELECT COUNT(id) as anzahl FROM likes WHERE userid = ?"
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/getNumberOfRatings/:username',(req, res)=>{
    const id = req.params.username
	
	const sqlSelect = "SELECT COUNT(id) as anzahl FROM ratings WHERE username = ?"
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/getFavoriteRating/:username',(req, res)=>{
    const id = req.params.username
	
	const sqlSelect = "SELECT s.name AS stadium, message, COUNT(R.id) AS anzahl, (aussicht + ausstattung + essen + standort + stimmung)/5 AS gesamt FROM ratings R LEFT OUTER JOIN likes L ON R.id = L.ratingid INNER JOIN stadiums S ON R.stadiumid = S.id WHERE username = ? GROUP BY r.id ORDER BY anzahl DESC, r.id DESC LIMIT 1"
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/rating/getNumberOfLikes/:rating',(req, res)=>{
    const id = req.params.rating
	
	const sqlSelect = "SELECT COUNT(R.id) as anzahl FROM likes L INNER JOIN ratings R ON L.ratingID=R.id WHERE R.id = ?"
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});



app.get('/ratings/user/:id', authenticateToken,(req, res)=>{
    const username = req.user
    const stadiumid = req.params.id
    
	
	const sqlSelect = "SELECT *, (aussicht + ausstattung + essen + standort + stimmung)/5 AS gesamt FROM ratings WHERE username = ? AND stadiumid = ?"
    db.query(sqlSelect, [username, stadiumid], (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

app.get('/ratings/selectbyuser/',authenticateToken,(req, res)=>{ // Route for own map
    const username = req.user
	
	const sqlSelect = "SELECT DISTINCT R.*, S.*, C.name AS club, C.id AS clubid, E.name AS event, E.id AS eventid FROM ratings R INNER JOIN stadiums S on R.stadiumid = S.id LEFT OUTER JOIN clubs C ON S.id=C.stadiumid LEFT OUTER JOIN eventToStadium ES ON S.id=ES.stadiumid LEFT OUTER JOIN events E ON ES.eventid = E.id WHERE username = ?"
    //SELECT DISTINCT S.* FROM stadiums S LEFT OUTER JOIN clubs C ON S.id=C.stadiumid LEFT OUTER JOIN eventToStadium ES ON S.id=ES.stadiumid LEFT OUTER JOIN events E ON ES.eventid = E.id WHERE S.name like ? OR S.country like ? OR S.region like ? OR S.city like ? OR e.name like ? OR c.name like ? OR c.short like ?
    db.query(sqlSelect, username, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

//For getting data about favclub, favstadium
app.get('/users/:username',(req, res)=>{
    const username = req.params.username
	
	const sqlSelect = "SELECT favclubid, favstadiumid FROM users WHERE username = ?"
    db.query(sqlSelect, username, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

// Route for User map
app.get('/ratings/selectbyuserinfo/:username',authenticateToken,(req, res)=>{
    const username = req.params.username
	
	const sqlSelect = "SELECT * FROM ratings R INNER JOIN stadiums S on R.stadiumid = S.id WHERE username = ?"
    db.query(sqlSelect, username, (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});

//Searchfield
app.get('/stadiums/select/search/:name',(req, res)=>{
    const name = "%" + req.params.name+ "%"
	
	const sqlSelect = "SELECT DISTINCT S.* FROM stadiums S LEFT OUTER JOIN clubs C ON S.id=C.stadiumid LEFT OUTER JOIN eventToStadium ES ON S.id=ES.stadiumid LEFT OUTER JOIN events E ON ES.eventid = E.id WHERE S.name like ? OR S.country like ? OR S.region like ? OR S.city like ? OR e.name like ? OR c.name like ? OR c.short like ?"
    db.query(sqlSelect, [name, name, name, name, name, name, name], (err, result) => {
        res.send(result);
        if (err) console.log(err);
    })
});


//Insert

app.post('/following/insert/' , authenticateToken, (req, res) => {
 
    const userid = req.user
    const follwingid = req.body.followingid


    if(userid === follwingid){
        res.status(500).send('Cant Follow your own Account');
        return
    }
    
    const sqlInsert = "INSERT INTO following (userid, followingid) VALUES (?, ?)"
    db.query(sqlInsert, [userid, follwingid], (err, result) =>{
        if (err) console.log(err);
    })
});

app.post('/likes/insert/', authenticateToken, (req, res) => {
    const userid = req.user
    const ratingid = req.body.ratingid
    
    const sqlInsert = "INSERT INTO likes (userid, ratingid) VALUES (?, ?)"
    db.query(sqlInsert, [userid, ratingid], (err, result) =>{
        if (err) console.log(err);
    })
});

app.post('/ratings/insert/', authenticateToken, async (req, res) => {
   
    const userid = req.user
    const stadiumid = req.body.stadiumid
    const aussicht = req.body.aussicht
    const ausstattung = req.body.ausstattung
    const essen = req.body.essen
    const standort = req.body.standort
    const stimmung = req.body.stimmung
    const message = req.body.message

    data = await getRating(userid, stadiumid).catch(e => { console.log(e) })
    

    if(data.length != 0){
       res.status(400).send("Bereits bewertet")
    }
    else{

  
 
    
    const sqlInsert = "INSERT INTO ratings (username, stadiumid, aussicht, ausstattung, essen, standort, stimmung, message) VALUES (?, ?, ?, ?, ?,?,?,?)"
    db.query(sqlInsert, [userid, stadiumid, aussicht, ausstattung, essen, standort, stimmung, message], (err, result) =>{
        if (err) console.log(err);
        res.send("ok")
    })
        }
   
});

app.post('/users/insert/', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const mail = req.body.mail
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const favclubid = req.body.favclubid
    const favstadiumid = req.body.favstadiumid
    
    const sqlInsert = "INSERT INTO users (username, password, mail, firstname, lastname, favclubid, favstadiumid) VALUES (?, ?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [username, password, mail, firstname, lastname, favclubid, favstadiumid], (err, result) =>{
        if (err) console.log(err);
    })
});


//Update

app.put('/ratings/update/', (req, res) => {
    const id = req.body.id
    const userid = req.body.userid
    const gameid = req.body.gameid
    const aussicht = req.body.aussicht
    const ausstattung = req.body.ausstattung
    const essen = req.body.essen
    const standort = req.body.standort
    const stimmung = req.body.stimmung
    const message = req.body.message
    
    const sqlUpdate = "UPDATE ratings SET userid = ?, gameid = ?, aussicht = ?, ausstattung = ?, essen = ?, standort = ?, stimmung = ?,rating = ?, message = ? WHERE id = ?"
    db.query(sqlUpdate, [userid, gameid, aussicht, ausstattung, essen, standort, stimmung, message, id], (err, result) =>{
        if (err) console.log(err);
    })
});

app.put('/users/update/', (req, res) => {
    const id = req.body.id
    const username = req.body.username
    const password = req.body.password
    const mail = req.body.mail
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const favclubid = req.body.favclubid
    const favstadiumid = req.body.favstadiumid
    
    const sqlUpdate = "UPDATE users SET username = ?, password = ?, mail = ?, firstname = ?, lastname = ?, favclubid = ?, favstadiumid = ? WHERE id = ?"
    db.query(sqlUpdate, [username, password, mail, firstname, lastname, favclubid, favstadiumid, id], (err, result) =>{
        if (err) console.log(err);
    })
});





//Change Clubid - get because put doesnt work at all
app.get('/users/update/favclub/:favclubid',authenticateToken, (req, res) => {
    
    const favclubid = req.params.favclubid
    const user = req.user
    
    
    const sqlUpdate = "UPDATE users set favclubid = ? WHERE username = ?"
    db.query(sqlUpdate, [favclubid, user], (err, result) =>{
        if (err) res.send(err);
        if(result) res.send(result)
    })
});

//Change Stadiumid

app.get('/users/update/favstadium/:favstadiumid', authenticateToken, (req, res) => {
   
    const favstadiumid = req.params.favstadiumid
    const user = req.user
    
    const sqlUpdate = "UPDATE users SET favstadiumid = ? WHERE username = ?"
    db.query(sqlUpdate, [favstadiumid, user], (err, result) =>{
        if (err) console.log(err);
       
    })
});


//Delete

app.delete('/following/delete/:id', (req, res) => {
    const id = req.params.id
    
    const sqlDelete = "DELETE FROM following WHERE id = ?"
    db.query(sqlDelete, id, (err, result) =>{
        if (err) console.log(err);
    })
});

app.post('/likes/delete', (req, res) => {
    const userid = req.body.userid
    const ratingid = req.body.ratingid
    const sqlDelete = "DELETE FROM likes WHERE userid = ? AND ratingid = ?"
    db.query(sqlDelete, [userid, ratingid], (err, result) =>{
        if (err) console.log(err);
    })
});

app.delete('/ratings/delete/:id',authenticateToken, (req, res) => {

    const stadiumid = req.params.id
    const username = req.user


    const sqlDelete = "DELETE FROM ratings WHERE username = ? and stadiumid = ?"
    db.query(sqlDelete, [username, stadiumid], (err, result) =>{
        if (err) console.log(err);
        return res.send("ok")
    })
});

app.delete('/users/delete/:username', (req, res) => {
    const username = req.params.username
    
    const sqlDelete = "DELETE FROM users WHERE username = ?"
    db.query(sqlDelete, username, (err, result) =>{
        if (err) console.log(err);
    })
});

app.listen(3001, () => {
    console.log("running on port 3001");
});