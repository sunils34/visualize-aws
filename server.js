var express = require('express'),
    index = require('./routes/index'),
    app = express();

app.use(express.static('www'));

app.all('*', function(req, res, next) {
    next();
});

app.get('/', index.home);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
