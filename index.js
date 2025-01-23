var express = require('express');
var app = express();
var {PythonShell} = require('python-shell');
const {response} = require("express");
var options;
var params = {
	setHeaders: function (res, path, stat) {
		res.set('X-Clacks-Overhead', 'GNU Terry Pratchett');
	}
}

var log = false;

app.use(express.static(__dirname + '/public', params));

app.listen(3000, function() {
	console.log('server running on port 3000'); 
} )

app.get('/page', function (req, res)
{
	printPage(req, res);
});

app.get('/address', function (req, res)
{
	printAddress(req, res);
});

function pythonBabel(err, results, res)
{
	if (err)
	{
		console.log(err);
		return;
	}
	if (log)
		console.log('results: %j', results);
	res.status(200).send(results[2]);
}

function printAddress(req, res)
{
	options = {
		mode: 'text',
		args: ['--checkout', req.query.search]
	};

	PythonShell.run(__dirname + '/library_of_babel.py', options, function callback(err, results)
	{
		pythonBabel(err, results, res)
	});
}

function printPage(req, res) { 
	options = {
	  mode: 'text',
	  args: ['--search', req.query.search.substring(0, 3260)]
	};
	if (log)
		console.log(req.query.search);
	PythonShell.run(__dirname + '/library_of_babel.py', options, function callback(err, results)
	{
		if (log)
			console.log(results);
		pythonBabel(err, results, res)
	});
}

app.get('/', function (req, res)
{
	res.render('index');
});