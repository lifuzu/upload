/*Define dependencies.*/

var express=require("express");
// var timeout = require('connect-timeout');
var multer  = require('multer');
var app=express();
var done=false;
app.use(express.static(__dirname + '/public'));
// app.use(timeout('5s'));


function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

/*Configure the multer.*/

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+'-'+Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    done=true;
  }
}));

// app.use(haltOnTimedout);

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
    res.json(req.files);
  }
});

app.post('/ahoy/visits', function(req, res) {
  if (req) {
    // console.log(req.route.stack);
    res.end("Start to visit.");
  }
})
app.post('/ahoy/events', function(req, res) {
  if (req) {
    console.log(req.route.stack);
    res.end("Button clicked.");
  }
})

/*Run the server.*/
app.listen(3100,function(){
    console.log("Working on port 3100");
});
