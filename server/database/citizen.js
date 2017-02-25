var mongoose = require('mongoose');

var CitizenSchema = mongoose.Schema({
    name: {type :String , required : true, unique: true},
    password : {type :String , required : true},
    ward : {type :String , required : true},
    area : {type :String , required : true},
   	city : {type :String , required : true},
   	state : {type :String , required : true}
});

// var Citizen = mongoose.model('Citizen', CitizenSchema);

module.exports =  CitizenSchema;