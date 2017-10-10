var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var app = express();
var blogModel = require('./Blog.model'); // Verify if the Model is working or not.
var userRouter  = require('.././routes/users.js'); // This route isn't working check again Abhishek



/******* Specifying Body parser ***/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended:true
}));

/***************/




/**** Below is the Connection file to the databse and instance of the DB   *****/
mongoose.connect('mongodb://ds153845.mlab.com:53845/shytoon', { url_decode_auth : true, user : "shytoon", pass : "Pass@12345"});
var db = mongoose.connection;
db.on('error', function(error){
  console.log('shit');
  console.log(JSON.stringify(error));
});
db.once('open', function() {
  console.log('we are connected in shytoon blog Module');
});
var port = 3000;
app.listen(port,function(){
console.log('Listening to port 3000');
});
/***************************/





/********* Routes *********/
app.get('/create-blog',function(req,res){
res.send('Hellow this is index page');
var blogModeInsert = new blogModel(
{
	title:"This is first Entry"
}
);
blogModeInsert.save().then(function(blogModeInsert)
{
	res.send("This is First entrry");
});
});

app.get('/blog-list',function(req,res){
blogModel.find({})
.exec(function(err,books){
	if(err){
		res.send("An error has occured" + err);
	}else{
		console.log(books);
		res.json(books);
	}
});
});


app.get('/blog/:id',function(req,res){
		console.log("id passed", req.params.id);
		 blogModel.findById(req.params.id).exec(function(err,book){
			if(err){
				console.log("Something went wrong" + book);
			}else{
				console.log("The Book is" + book);
				res.json(book);
			}
		});
});


app.put('/blog/:id',function(req,res){

		blogModel.findOneAndUpdate({
			_id:req.body.id
		},{
			$set:{
				title:req.body.title
			}
		},function(err,blog){
				if(err){
					console.log("Something has went please try again");
				}else{
					console.log(blog);
					res.status(204);
				}
			});
});



app.post('/postBlog',function(req,res){

		
	var newBlog = new blogModel();
			newBlog.title = req.body.title
			newBlog.save(function(err,blog){
				if(err){
					res.send("There is some problem in saving");
				}else{
					console.log(blog);
					res.send(blog);
				}


			});



});



app.post('/postBlog2',function(req,res){	

	blogModel.create(req.body,function(err,blog){

		if(err)
		{
			console.log("some problem");
		}else{
			console.log(blog);
			res.send(blog);
		}

	});

});







/**************************/





