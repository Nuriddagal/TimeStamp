// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
const dateReg = /^\/(api)\/(\d{4})-(\d{1,2})-(\d{1,2})$||^\/(api)\/(\d{2,})/ 
const dateFinder = /(\d{4})-(\d{1,2})-(\d{1,2})|(\d+)/
app.get(dateReg, function (req, res){
  if(req.url === "/null"){
    return
  }
  const dateToParse = req.url.match(dateFinder)[0]
  let dateUnix = ""
  let normalDate = ""
  if(!/^(\d{4})-(\d{1,2})-(\d{1,2})/.test(dateToParse)){
    dateUnix = dateToParse
    normalDate = new Date(parseFloat(dateToParse))
  }else{
    normalDate = new Date(dateToParse)
    dateUnix = Date.parse(dateToParse)
  }
  if(normalDate.toString() === "Invalid Date"){
    res.json({error: normalDate.toString()})
  } else{
    const dateToString = new Date(normalDate)
    res.json( {unix: dateUnix, utc: dateToString.toUTCString()} );
  }
}) 
app.get("/api", function(req, res){
  res.json({unix: Date.parse(new Date()), utc: new Date.toUTCString()})
})
app.get("/api/whoami", function(req, res){
  console.log(req)
  res.json({ipaddress: req.rawHeaders[req.rawHeaders.length-7], language: req.rawHeaders[9], software: req.rawHeaders[3]})
})
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
