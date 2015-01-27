/*Define dependencies.*/

var express=require("express");
var multer  = require('multer');
var app=express();
var done=false;

/*Configure the multer.*/

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    done=true;
  }
}));

/*Handling routes.*/

app.get('/',function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post('/api/upload',function(req,res){
  if (req.body.url) {
    console.log(req.body.url);
    res.end("Url uploaded.");
  }
  if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }
});

/*Run the server.*/
app.listen(3000,function(){
    console.log("Working on port 3000");
});