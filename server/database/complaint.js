var mongoose = require('mongoose');
var CommentSchema = require('./comments.js')

var ComplaintSchema = mongoose.Schema({
    title : {type:String, required :true},
    filled_by : {type :String , required : true},
    timeline : { type: Number, default: 0 },
    status : {type : String, default : "Open"},
    assignee : String,
    timestamp : {type :Date , default: Date.now},
    upvotes : { type: Number, default: 0 },
    location : { "lat" : 	Number, "long": Number},
	  ward : {type :String , required : true},
    area : {type :String , required : true},
   	city : {type :String , required : true},
   	state : {type :String , required : true},
   	description : {type :String , required : true},
   	tags : [String],
   	img: { data: Buffer, contentType: String },
   	comments : [CommentSchema]
});

// var Complaint = mongoose.model('Citizen', ComplaintSchema);

module.exports =  ComplaintSchema;