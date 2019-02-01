const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; // to listen for 3000 if original port doesn't exist
var app = express(); //constructor for the express application

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getYear',()=>{
  return new Date().getFullYear();
})

app.set('view engine','hbs')
app.listen(port,()=> console.log(`Server started on port ${port}`))

var logRequests = (req,res,next)=>{
  var timeNow = new Date().toString();
  var log = `Request received, TIME: ${timeNow} URL: ${req.url} METHOD: ${req.method}\n`;
  fs.appendFile('server.log',log,(err)=>{
    if(err)
    console.log('Unable to append');
  });
  next();
}
var redirectToMaintenance = (req,res,next)=>{
  res.render('maintenance.hbs')
}
app.use(logRequests)
app.use(redirectToMaintenance)
app.use(express.static(__dirname+'/assets'))
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
