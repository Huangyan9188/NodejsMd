


var http=require('http');
var server=http.createServer(function(req,res){
	//req is an http.IncomingMessage which is a readable stream
	//res is an http.ServerResponse which is writable stream


	var body='';
	//if not set encoding you will get buffer object
	req.setEncoding('utf8');

	//Readable stream emit data onces a listener is added
	req.on('data',function(chunk){
		body+=chunk;
		console.log('the chunk length is %d',chunk.length);
		console.log('please get these bytes as soon as possible');
		console.log('Another testing the .read()function');
		console.log(req.read());
		/*the read function returns data from the internal buffer if there is no data
		it will return null, if size is null, it will return all the data in the buffer*/
	
		/*
		//here is the controlling demo of req.pose
		//and req.resume
		req.pause();
		setTimeout(function(){
			req.resume();
		},1000);
		*/


	});

	req.on('readable',function(){
		console.log("in here, it means a chunk of data can be read from the stream");
		var chunk;
		while(null !==(chunk =req.read())){
			console.log(chunk.length);
		}
	});
	// "2" is data, 2 is data '2' is not json data,a is also not data
	//the event tells you that you have got all the body
	
	//to make stream into flow-mode ,flow to teh end
	//req.resume();//keep emitting data event
	req.on('end',function(){
		console.log('in here, means there is no data to be provided');
		try{
			console.log("get the data:"+body);
			var data=JSON.parse(body);
		}catch(e){
			//means bad json
			res.statusCode=400;
			/*
			//writable.end([chunk],[encoding],[callback]);
			callback is the callback function when the stream is finished
			and call write after end will calling error
			*/
			return res.end('error'+e.message);
		}
		//.write is to write something to users
		/*
		//writable.write(chunk,[encoding],[callback]);
		//
		*/
		res.write("got the data");
		res.on('drain',function(){
			console.log('continue to write data into the stream');
		});
		res.end();
		res.on('finish',function(){
			console.log('the writeable stream is ended');
		});
	});

	req.on('close',function(){
		console.log('In here, it means the resources has been closed');
	});
});	

server.listen(1337);

// curl localhost:1337 -d '"hello'