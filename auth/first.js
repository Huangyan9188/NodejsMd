var express=require("express");
var http=require('http');
var app=express();

//app.use(express.basicAuth('foo','bar'));
// app.use(express.basicAuth(function(user,pass){
// 	return (user ==='foo1')&&(pass==="bar1") ;
// }));


var auth1=express.basicAuth("foo3","bar3");
var auth2=express.basicAuth(function(user,pass){
	console.log(user);
	consoel.log(pass);
	return user==="foo4" && pass==="bar4";
});
var auth3=express.basicAuth(function(user,pass,callback){
	console.log("auth3");
	console.log(user);
	consoel.log(pass);
	if(user==="foo4" && pass==="bar4"){
		callback(null,true);
	}
	else callback(null,false);
});

app.get("/auth1",auth1,function(req,res){
	res.send("congratulation!!!! you can be here!!");
});
// use and get can get different result
// app.use("/auth1",auth1,function(req,res){
// 	res.send("congratulation!!!! you can be here!!");
// });
app.use(express.basicAuth(function(user,pass,callback){
	if(user==="foo2"){
		callback(null,true);
	}
	else callback(null,false);
}));
app.use(function(req,res){
	res.send("helloworld");
});
http.createServer(app).listen(3200);
console.log("The server is listening on 3200");