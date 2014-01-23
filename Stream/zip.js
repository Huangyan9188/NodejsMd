/*
	pipe is to pulls all the data from readable stream, and 
writes them into the destination ,which normally the writeable 
stream. pipe automatically managing the flow so that the destination is 
not overwhelmed by a fast readable stream
r.pipe(w,OPTION)
OPTION:is the {} object, such as 
	{end:false}---when source get the 'end', the destination keeps open
		things like the process.stderr and process.stdout never closed

r.unpipe(w) is the reverse operation of r.pipe
if w is undefined like r.unpipe() which means all the pipes on the readable 
stream r will be removed

*/

var fs=require('fs');
var zlib=require('zlib');
exports.zip=function(src,dest){
	var readable=fs.createReadStream(src);
	var zpipe=zlib.createGzip();
	var writeable=fs.createWriteStream(dest);
	writeable.on('pipe',function(src){
		console.log('got the pipe');
	});
	readable.pipe(zpipe).pipe(writeable);
	return;
};
