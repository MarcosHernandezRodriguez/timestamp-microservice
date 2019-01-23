// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log("MY START:");
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//The API endpoint is GET [project_url]/api/timestamp/:date_string?
app.get("/api/prueba", function(req, res){
  res.json({prueba: 1});
});

/*
app.get('/:word/:word2', function(req, res){
  res.json({"word": req.params.word, "word2": req.params.word2, "query": req.query});
  console.log(req.params);
  console.log(req.query);
});
*/

// 3. If the date string is empty it should be equivalent to trigger new Date(), i.e. the service uses the current timestamp.
app.get('/api/timestamp', function(req, res){
    res.json({"Date": new Date()});
});

app.get('/api/timestamp/:date', function(req, res){
  String.prototype.isNumber = function(){return /^\d+$/.test(this);}
  
  if(req.params.date.includes("-")){
    res.json({"unix": new Date(req.params.date).getTime(), "utc" : new Date(req.params.date).toUTCString()});
  }else if(req.params.date.isNumber()){
    res.json({"unix": new Date(parseInt(req.params.date)).getTime(), "utc" : new Date(parseInt(req.params.date)).toUTCString()});
  }else{
    res.json({"error" : "Invalid Date"});
  }
  
  console.log(req.params.date.isNumber());
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});