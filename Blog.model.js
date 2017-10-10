var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
title:String,
created_at:{
type:Date,
default:Date.now
},
comments:[
{
	noOfComments:Number
}
],
meta:[
{
	votes:Number,
	favourites:Number
}
],
created_by:Number
});


module.exports = mongoose.model('Blog',blogSchema);
