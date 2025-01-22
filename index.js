var express = require('express');
var app = express();
var {PythonShell} = require('python-shell');
var options;
var log = false;

app.use(express.static(__dirname + '/public'));

app.listen(3000, function() {
	console.log('server running on port 3000'); 
} )

app.get('/',function(req, res)
{
	res.set('X-Clacks-Overhead', 'GNU Terry Pratchet');
	res.render(index.html);
});

app.get('/page', printPage);

app.get('/address', printAddress);

function pythonBabel(err, results, res)
{
	if (err)
	{
		console.log(err);
		PythonShell.run(__dirname + '/library_of_babel.py', options, function callback(err, results)
		{
			pythonBabel(err, results, res)
		});
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