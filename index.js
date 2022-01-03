const express = require("express");
const session = require('express-session');
const { redirect } = require("express/lib/response");
const port = process.env.PORT || 3800;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(session({
    secret: 'random string',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const valid_users = [
    {
        name:"sue",
        pass: "123"
    },
    {
        name:"joe",
        pass: "joe"
    },
    {
        name:"micah",
        pass: "iscool"
    }
];

app.get('/', (req,res) => {
    res.redirect("/0");
})

app.get('/login', (req,res) => {
    req.session.destroy(()=>{});
    res.render("index");
})

app.post("/signup", (req,res)=>{
    
    const user = req.body.username;
    const pass = req.body.password;
    const found_user = valid_users.find(usr=>{
        return usr.name == user && usr.pass == pass;
    })
    if(found_user){
        req.session.username = user;
        res.redirect("/0");
    }
    else{
        req.session.destroy(()=>{});
        res.redirect("/login");
    }
})

app.get('/:riches', (req,res) => {
    if(req.session && req.session.username){
        const session_username = req.session.username;
        const riches = req.params['riches'];
        res.render("welcome", {riches: riches, user: session_username});
    }
    else{
        res.redirect("/login");
    }
})

app.get('/adventure/begin', (req,res) => {
    if(req.session && req.session.username){
        const session_username = req.session.username;
        res.render("begin", {user: session_username});
    }
    else{
        res.redirect("/login");
    }
})

app.get('/adventure/left', (req,res) => {
    if(req.session && req.session.username){
        const session_username = req.session.username;
        res.render("advleft", {user: session_username});
    }
    else{
        res.redirect("/login");
    }
})
app.get('/adventure/right', (req,res) => {
    if(req.session && req.session.username){
        const session_username = req.session.username;
        res.render("advright", {user: session_username});
    }
    else{
        res.redirect("/login");
    }
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})