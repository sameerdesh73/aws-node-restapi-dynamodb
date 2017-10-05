var express        = require('express');

var app            = express();

//Add the routes
// routes = require('./routes/todo')(app);

app.listen(8080);
console.log('Magic happens on port 8080'); 			// shoutout to the user

// First example router
app.get('/', function(req, res) {
  res.send("Hello world!");
});
