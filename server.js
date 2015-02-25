var express = require('express.io'),
    app = express();


app.http().io()

app.io.route('ec2', require('./handlers/ec2'));
app.io.route('ready', function(req) {
  req.io.emit('talk', {
    message: 'io event from an io route on the server'
  })
})

app.use(express.static('www'));

app.listen(7076)
