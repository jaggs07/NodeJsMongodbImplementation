var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
app.set('view engine', 'ejs')
var db;

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://localhost/studentDb', function(err, database) {
  if(err){
  	consoel.log(err)
  }else{
  	db = database;
  }
})

// app.get('/',function(req,res){
// 	  res.sendFile(__dirname + '/index.html')
// })

app.get('/', function(req, res) {
  db.collection('quotes').find().toArray(function(err, result){
  	// console.log(result)
  	// res.send(result)
  	if(err){
  		console.log(err);
  	}else{
  		res.render('index.ejs', {quotes: result})
  	}
  })
})

app.post('/quotes', (req, res) => {

  db.collection('quotes').save(req.body, function(err, result) {
    if (err) {
    	return console.log(err)
    }

    console.log('saved to database')
    res.redirect('/')
  })
})

app.listen(3000, function(){
	console.log("listining on 3000 port");
})