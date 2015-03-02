var express = require('express.io'),
    app = express();

app.http().io()

interval = null;
var clients = 0;
var poll = null;
app.io.route('ready', function(req) {
  var ec2 = require('./handlers/ec2');
  ec2.list(app);
  if(clients == 0) {
    poll = setInterval(function(){ec2.list(app);}, 1000*10);
  }
  clients++;

  req.io.emit('talk', {
    message: 'io event from an io route on the server'
  });
  console.log('ENTER: number of clients ' + clients);
})

app.io.route('exit', function(req) {
  var ec2 = require('./handlers/ec2');
  ec2.list(app);
  if(clients > 0) clients--;
  if(clients == 0 && poll) {
    clearInterval(poll);
  }
  console.log('EXIT: number of clients ' + clients);
})

app.use(express.static('www'));

app.listen(7076)

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
