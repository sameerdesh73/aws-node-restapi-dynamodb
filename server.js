console.log('No value for Port yet:', process.env.PORT);
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
console.log('Now the value for Port is:', process.env.PORT);

var express        = require('express');

var app            = express();

// require our routes/users.js file 
var todoApiRoute = require("./routes/todo");


// First example router
app.get('/', function(req, res) {
  res.send("Welcome to todo application");
});

app.use('/v1/todo', todoApiRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT);
//console.log(process.env);
console.log(process.env.PORT);

console.log('Magic happens on port ' + PORT); 			// shoutout to the user
