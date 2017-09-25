/*Define dependencies.*/

const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');
const mkdirp = require('mkdirp');
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

/*Configure the multer.*/

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const dir = path.join('./uploads', file.mimetype);
    mkdirp(dir, function (err) {
      if (err) console.log(err);
      else callback(null, dir);
    });
    
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname.substring(0, 4) + '-' + Date.now());
  }
});
// max upload 9 files
const upload = multer({ storage : storage }).array('file', 9);


/*Handling routes.*/

app.get('/',function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post('/api/file_upload',function(req,res){
  upload(req, res, function(err) {
    // console.log(req.body);
    // console.log(req.files);
    if(err) {
      // console.error(err);
      console.log(err);
      return res.end("Error uploading file.");
    }
    res.json(req.files);
  });
});

// ahoy
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
app.listen(8100,function(){
    console.log("Working on port 8100");
});
