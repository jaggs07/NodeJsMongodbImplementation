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
  	console.log(err)
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

    res.redirect('/')
  })
})

app.get('/deleteUser/:name', function(req, res) { 

	var uname = req.params.name;
	db.collection('quotes').remove({"name":uname},function(err,result) { 
		if(err){
			res.send(new Error("Cannot delete"));
		}
		res.send(result);
	})
})

app.put('/updateUser/:name', function(req, res) {

    var userToUpdate = req.params.name;
    db.collection('quotes').update({ name: 'awon'}, {$set: {name: userToUpdate}}, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

app.listen(3000, function(){
	console.log("listining on 3000 port");
})