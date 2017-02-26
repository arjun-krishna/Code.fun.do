
electricity = [
	'power',
	'electricity',
	'current',
	'voltage',
	'cables',
	'tower',
	'off',
	'dark',
	'light',
	'lamp',
	'outage',
	'circuit',
	'transformer',
	'burst',
	'drops',
	'short'
]

water = [
	'insufficient',
	'dirty',
	'irregular',
	'water'
]

road_transport = [
	'road',
	'holes',
	'bumpy',
	'uneven',
	'pothhole',
	'narrow',
	'tar'
]

traffic_violation = [
	'speeding',
	'motorcycle',
	'car',
	'light',
	'traffic',
	'over',
	'rash',
	'driving',
	'drunk',
	'truck',
	'road'
]

health_and_hygiene = [
	'dirty',
	'clean',
	'dogs',
	'garbage',
	'waste',
	'stink',
	'disgusting',
	'rats',
	'sweage',
	'hygiene'
]

var label = ['electricity','water','road_transport','traffic_violation','health_and_hygiene']
var category_keywords = [electricity,water,road_transport,traffic_violation,health_and_hygiene]

var train = []

var generate_training_samples = function(category_keywords, label, train) {
	for ( var i =0 ; category_keywords.length; i++) {
		for( var j = 0; j < category_keywords[i].length; j++) {
			for (var k = 0; k < category_keywords[i].length; k++) {
				if (j != k) {
					train.push({
						'text' : category_keywords[j]+' '+category_keywords[k],
						'label' : label[i]
					});
				}
			}
		}
	}
}

generate_training_samples(category_keywords, label, train)

const natural = require('natural');

classifer = new natural.BayesClassifier();

for (let i=0; i < train.length; i++) {
	classifer.addDocument(train[i].text, train[i].label);
}

classifer.train();

console.log('classifer : ',classifer.classify('alternating power, it is dark in the night'))

// module.exports = classifier;

