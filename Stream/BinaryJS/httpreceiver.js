var http=require('http');
var fs=require('fs');
var writeStream=fs.createWriteStream('hello.jpg');
http.createServer(function(req,res){
	res.end("httpserver");
}).listen(9002);
var BinaryClient=require('binaryjs').BinaryClient('ws://localhost:9000/binjs-endpoint');
BinaryClient.on('stream',function(stream){
	console.log('here comes the stream');
	// stream.on('data',function(data){
	// 	console.log('here comes the data');
	// });
	// var self=this;
	// stream.on('end',function(){
	// 	self.send('hello');
	// });
	stream.pipe(writeStream);
});