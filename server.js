const express = require('express');
const hbs = require('hbs');
var app = express(); //constructor for the express application
//app.use(express.static('assets'))
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs')
hbs.registerHelper('getYear',()=>{
  return new Date().getFullYear();
})
app.listen(3000,()=> console.log('Server started on port 3000'))
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home',
    welcMessage: 'Welcome to our website!!'
  })
})
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'about'
  })
})
app.get('/bad',(req,res)=>{
  res.send({
    err: 'NOT AVAILABLE'
  })
})
