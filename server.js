var express = require('express.io'),
    app = express();

app.http().io()

var sendData = function() {
  var ec2 = require('./handlers/ec2');
  ec2.listEC2(app);
  ec2.listSG(app);
}

interval = null;
var clients = 0;
var poll = null;
app.io.route('ready', function(req) {
  sendData();
  if(clients == 0) {
    poll = setInterval(sendData, 1000*10);
  }
  clients++;

  req.io.emit('talk', {
    message: 'io event from an io route on the server'
  });
  console.log('ENTER: number of clients ' + clients);
})

app.io.route('exit', function(req) {
  var ec2 = require('./handlers/ec2');
  if(clients > 0) clients--;
  if(clients == 0 && poll) {
    clearInterval(poll);
  }
  console.log('EXIT: number of clients ' + clients);
})


app.io.route('ec2SSH', function(req) {
  var ec2 = require('./handlers/ec2');
  ec2.sshEC2(req.data);
});

app.use(express.static('www'));

app.listen(7076)

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
