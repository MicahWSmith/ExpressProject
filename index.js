const express = require("express");
const port = process.env.PORT || 3800;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/', (req,res) => {
    res.redirect("/0");
})

app.get('/login', (req,res) => {
    res.render("index");
})

app.post("/signup", (req,res)=>{
    const user = req.body.username;
    res.send(`Welcome ${user}`);
})

app.get('/:riches', (req,res) => {
    const riches = req.params['riches'];
    res.render("welcome", {riches: riches});
})

app.get('/adventure/begin', (req,res) => {
    res.render("begin");
})

app.get('/adventure/left', (req,res) => {
    res.render("advleft");
})
app.get('/adventure/right', (req,res) => {
    res.render("advright");
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})