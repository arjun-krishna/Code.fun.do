var mongoose = require('mongoose');

var AdminSchema = mongoose.Schema({
    name: {type :String , required : true, unique : true},
    password : {type :String , required : true},
    ward : {type :String , required : true},
    area : {type :String , required : true},
   	city : {type :String , required : true},
   	state : {type :String , required : true},
   	rank : {type : Number, required : true},
   	department : {type :String , required : true},
   	tags : [String]
});

// var Admin = mongoose.model('Admin', AdminSchema);

module.exports =  AdminSchema;