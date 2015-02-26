var express = require('express.io'),
    app = express();

app.http().io()

interval = null;
app.io.route('ready', function(req) {
  var ec2 = require('./handlers/ec2');
  ec2.list(app);
  if(!interval) {
    interval = setInterval(function(){ec2.list(app);}, 1000*10);
  }
  req.io.emit('talk', {
    message: 'io event from an io route on the server'
  });
})

app.use(express.static('www'));

app.listen(7076)

