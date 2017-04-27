var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var _ = require('lodash');

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


app.get('/', function(req, res) {
  db.collection('quotes').find().toArray(function(err, result){
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

app.get('/deleteuser/:name', function(req, res) { 

	var uname = req.params.name;
	db.collection('quotes').remove({"name":uname},function(err,result) { 
		if(err){
			res.send(new Error("Cannot delete"));
		}else{
		    res.send(result);

		}
	})
})

app.listen(3000, function(){
	console.log("listining on 3000 port");
})