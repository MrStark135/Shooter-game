const http = require('http');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 5000;

function listener(req, res)
{
	let url = req.url;
	let prevUrl = url;
	for(; true ;)
	{
		prevUrl = url;
		url = url.replace('%20', ' ');
		if(prevUrl == url)
		{
			break;
		}
	}
	console.log('url: ', url);
	
	let filePath = path.join(__dirname, 'public', (url == '/') ? 'index.html' : url);
	
	console.log(filePath);
	
	// set the correct Content-Type, according to the file extension
	let contentType = 'text/html';
	let ext = path.extname(filePath);
	switch(ext)
	{
		//any new extension to be supported must be added manually
		case '.js':
		{
			contentType = 'text/javascript';
			break;
		}
		case '.css':
		{
			contentType = 'text/css';
			break;
		}
		case '.json':
		{
			contentType = 'application/json';
			break;
		}
		case '.png':
		{
			contentType = 'image/png'
		}
		default: break;
	}
	
	console.log(contentType);

	// read the requested file
	fs.readFile(filePath, null, function(error, content)
	{
		if(error)
		{
			res.writeHead(404, '', { 'Content-Type': 'text/html' });
			res.write('The page you are looking for does not exist');
			res.end();
			
			return;
		}
		
		res.writeHead(200, 'Everything went fine', { 'Content-Type': contentType });
		res.write(content);
		res.end();
	});
}

const server = http.createServer(listener);

server.listen(PORT, "", undefined, errorCheck);
function errorCheck(error)
{
	if(error)
	{
		console.log(error);
	}
	else
	{
		console.log('Server created successfully. Listening on port ' + PORT);
	}
}