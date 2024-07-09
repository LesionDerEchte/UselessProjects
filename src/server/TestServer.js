
const express = require("express");
const app = express();



app.use(express.urlencoded({extended: true})); 
app.use(express.json());   


app.post("/users", (req, res) => {
  console.log(req.body);
  res.status(201).send("Success")
});

app.listen(3000, () => console.log(`App is running`));