var http=require('http');
var fs=require('fs');
var server=http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('Helloworld');
}).listen(9000);

var BinaryServer=require('binaryjs').BinaryServer,
fs=require('fs');
var binaryServer=new BinaryServer({server:server,path:'/binjs-endpoint'});
//server to tell the constructor that has a server ,only to attach 
//path tell that path is the ws communication way
var i=0;
var clients=[];
binaryServer.on('connection',function(client){
	console.log('a new connection created the num is '+i);
	clients.push(client);
	i++;
	//var file=fs.createReadStream('../Files/1.jpg');
	//client.send(file);
	//var stream=client.createStream();//create the duplex tunnel
	//file.pipe(stream);
	client.on('stream',function(stream){
		console.log('stream!stream!');
		
		// var writestream=fs.createWriteStream('hello3.mp4');
		// stream.pipe(writestream);
		// stream.on('end',function(){
		// 	console.log('get the end!!');
		// });
		if(clients[0]){
			console.log('clients1 exsits');
			var dest=clients[1].createStream();
			
			stream.on('end',function(){
				console.log('relay end');
			});
			stream.pipe(dest);
			// dest.on('end',function(){
			// 	console.log('relay end!');
			// });
		}
	});
});
/*
//attch to express.js is like this
var http = require('http');
var app = require('express')();

// create a server with the express app as a listener
var server = http.createServer(app).listen(9000);

// attach BinaryServer to the base http server
*/
