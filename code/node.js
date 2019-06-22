const express = require('express');
const session = require('cookie-session');
const bodyParser= require('body-parser');
const urlencodedParser =bodyParser.urlencoded({extended:false});

const app =express();

/* us use the session */
app.use(session(
{secret:'todotopsecret'}))
/*if the not have todolist inside the session us creat one as a empty array */
.use((req,res,next)=>{
    if(typeof(req.session.todolist)==='undefined'){
       req.session.todolist=[];
    }
    next();
})
/* display todolist and a formulaire  */
.get('/todo',(req,res)=>{
   res.render('todo.ejs',{todolist: req.session.todolist});
})
/* us add item inside the todolist */
.post('/todo/add/',urlencodedParser,(req,res)=>{
    if(req.body.newtodo !=''){
        req.session.todolist.push(req.body.newtodo)
    }
    res.redirect('/todo');
})
/*to delete item of the todolist*/
.get('/todo/delete/:id',(req,res)=>{
    if(req.params.id !=''){
        req.session.todolist.splice(req.params.id,1);
    }
    res.redirect('/todo');
})
/* to return in todolist if the ask page it's n't found */
.use((req,res,next)=>{
    res.redirect('/todo');
})
.listen(3000)