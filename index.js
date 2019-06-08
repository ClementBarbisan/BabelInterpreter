// import express JS module into app 
// and creates its variable. 
var express = require('express'); 
var app = express();
let {PythonShell} = require('python-shell');


app.use(express.static(__dirname + '/public'));
// Creates a server which runs on port 3000 and 
// can be accessed through localhost:3000 
app.listen(3000, function() { 
	console.log('server running on port 3000'); 
} )

app.get('/',function(req, res)
{
	res.render(index.html);
});

// Function callName() is executed whenever 
// url is of the form localhost:3000/name 
app.get('/page', printPage); 

function printPage(req, res) { 
	let options = {
	  mode: 'text',
	  args: ['--search', req.query.search]
	};
	 
	PythonShell.run('library_of_babel.py', options, function (err, results) {
	  if (err) throw err;
	  // results is an array consisting of messages collected during execution
	  console.log('results: %j', results);
	  res.status(200).send(results[2]);
	});
} 

// save code as start.js 
