var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var model  = require('./database')

// connect to the Database 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ECP');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected to the Database!');
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
	res.send('ECP-Server v1.0.0');
});


// SIGN-UP Functions
// citizen signup
app.post('/citizen/signup', function(req, res) {

	// console.log(req.body);
	var citizen = new model['Citizen'](req.body);
	citizen.save(function (err, data) {
		if (err) {
			console.error(err);
			res.sendStatus(406);
		} else {
			res.sendStatus(200);
		}
	});
});

// admin signup
app.post('/admin/signup', function(req, res) {

	var admin = new model['Admin'](req.body);
	admin.save(function (err, data) {
		if (err) {
			console.error(err);
			res.sendStatus(406);
		} else {
			res.sendStatus(200);
		}
	});
});

// LOGIN Functions
app.post('/citizen/login',function (req, res) {
	
	try {
		 model["Citizen"].find({name: req.body.name}, function(err, data) {
				if (err) {
					console.log(err);
					res.sendStatus(403); 
				} else {
					console.log(data);
					if (data.length == 0) {
						res.sendStatus(406); // user not present
					} else {
						if (data[0].password == req.body.password) {
							res.json(data[0]);
						} else {
							res.sendStatus(401); // incorrect password!
						}

					}
				}
		 });
	} catch(e) {
		res.sendStatus(500);
	}
});

app.post('/admin/login',function (req, res) {
	
	try {
		 model["Admin"].find({name: req.body.name}, function(err, data) {
				if (err) {
					console.log(err);
					res.sendStatus(403); 
				} else {
					console.log(data);
					if (data.length == 0) {
						res.sendStatus(406); // user not present
					} else {
						if (data[0].password == req.body.password) {
							res.sendStatus(200);
						} else {
							res.sendStatus(401); // incorrect password!
						}

					}
				}
		 });
	} catch(e) {
		res.sendStatus(500);
	}
});

// add a complaint
app.post('/complaint/new', function (req, res) {
	var complaint = new model['Complaint'](req.body);
	complaint.save(function (err, data) {
		if (err) {
			console.error(err);
			res.sendStatus(406);
		} else {
			res.sendStatus(200);
		}
	});
});

app.get('/complaint/:id', function (req, res) {
	try {
		 model["Complaint"].findById(req.params.id, function(err, data) {
				if (err) {
					console.log(err);
					res.sendStatus(403); 
				} else {
					console.log(data);
					res.json(data);
				}
		 });
	} catch(e) {
		res.sendStatus(500);
	}
});

app.get('/complaint/:id/upvote/', function (req, res) {
	try {
		 model["Complaint"].findById(req.params.id, function(err, data) {
				if (err) {
					console.log(err);
					res.sendStatus(403); 
				} else {
					console.log(data);
					data.upvotes+=1
					data.save(function (err, data) {
						if (err) {
							console.error(err);
							res.sendStatus(406);
						} else {
							res.sendStatus(200); 
						}
					})
				}
		 });
	} catch(e) {
		res.sendStatus(500);
	}
})

app.post('/complaint/:id/addassignee/', function (req, res) {
	try {
		 model["Complaint"].findById(req.params.id, function(err, data) {
				if (err) {
					console.log(err);
					res.sendStatus(403); 
				} else {
					console.log(data);
					data.assignee = req.body.name;
					data.save(function (err, data) {
						if (err) {
							console.error(err);
							res.sendStatus(406);
						} else {
							res.sendStatus(200); 
						}
					})
				}
		 });
	} catch(e) {
		res.sendStatus(500);
	}
})

app.post('/complaint/:id/open/', function (req, res) {
	try {
		 model["Complaint"].findById(req.params.id, function(err, data) {
				if (err) {
					console.log(err);
					res.sendStatus(403); 
				} else {
					console.log(data);
					data.status = 'Open';
					data.save(function (err, data) {
						if (err) {
							console.error(err);
							res.sendStatus(406);
						} else {
							res.sendStatus(200); 
						}
					})
				}
		 });
	} catch(e) {
		res.sendStatus(500);
	}
})

app.post('/complaint/:id/close/', function (req, res) {
	try {
		 model["Complaint"].findById(req.params.id, function(err, data) {
				if (err) {
					console.log(err);
					res.sendStatus(403); 
				} else {
					console.log(data);
					data.status = 'Closed';
					data.save(function (err, data) {
						if (err) {
							console.error(err);
							res.sendStatus(406);
						} else {
							res.sendStatus(200); 
						}
					})
				}
		 });
	} catch(e) {
		res.sendStatus(500);
	}
})

app.get('/newsfeed/:name', function (req, res) {
	try {
		 model["Complaint"].find({}, function(err, data) {
				if (err) {
					console.log(err);
					res.sendStatus(403); 
				} else {
					console.log(data);
					res.json(data)
				}
		 });
	} catch(e) {
		res.sendStatus(500);
	}
});

app.post('/complaint/:id/newcomment', function (req, res) {
	var comment = new model['Comment'](req.body);
	comment.save(function (err, data) {
		if (err) {
			console.error(err);
			res.sendStatus(406);
		} else {
			model["Complaint"].findOne({'_id':req.params.id}, function(err, data){
				if(err){
					console.log(err);
					res.sendStatus(404); 
				}
				else {
					data.comments.push(comment)
					data.save(function (err, data) {
						if (err) {
							console.error(err);
							res.sendStatus(406);
						} else {
							console.log(data);
							res.sendStatus(200); 
						}
					})	
				}
			})
		}
	});
});


app.listen(3000, function () {
	console.log('ECP Server listening on port 3000!')
});

