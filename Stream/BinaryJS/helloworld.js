var BinaryServer=require('binaryjs').BinaryServer;
var fs=require('fs');
var server=BinaryServer({port:9000});

server.on('connection',function(client){
	console.log('here comes a client');
	var file=fs.createReadStream('../Files/1.jpg');
	client.send(file);
});