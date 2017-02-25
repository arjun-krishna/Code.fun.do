var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
    name : {type :String , required : true},
    comment : {type :String , required : true},
    //admin_tags : [{ type : mongoose.Schema.ObjectId, ref: 'Admin' }],
    timestamp : {type :Date , required : true, default:Date.now}
});

// var Comment = mongoose.model('Comment', CommentSchema);

module.exports =  CommentSchema;