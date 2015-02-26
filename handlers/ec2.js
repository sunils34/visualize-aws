var AWS = require('aws-sdk');
var ec2 = new AWS.EC2();

var list = function(app) {
  ec2.describeInstances(function(error, data) {
    if (error) {
      console.log(error); // an error occurred
    } else {
      var reservations = data.Reservations;
      app.io.broadcast('ec2:list', {
        reservations: data.Reservations
      });
    }
  });
};

module.exports = {
  'list': list
}
