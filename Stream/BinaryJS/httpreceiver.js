var http=require('http');
var fs=require('fs');
var writeStream=fs.createWriteStream('hello9.mp4');
http.createServer(function(req,res){
	res.end("httpserver");
}).listen(9002);
var BinaryClient=require('binaryjs').BinaryClient('ws://localhost:9000/binjs-endpoint');
var total=0;
BinaryClient.on('stream',function(stream){
	console.log('here comes the stream');
	// stream.on('data',function(data){
	// 	console.log('here comes the data');
	// });
	 var self=this;
	stream.on('data',function(data){
		total+=data.length;
		console.log('the total recieved:'+total);
	});
	stream.on('end',function(){
		console.log('relay end');
	});
	stream.pipe(writeStream);

});