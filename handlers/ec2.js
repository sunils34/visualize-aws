var AWS = require('aws-sdk');
var ec2 = new AWS.EC2();

var listEC2 = function(app) {
  ec2.describeInstances(function(error, data) {
    if (error) {
      console.log(error); // an error occurred
    } else {
      var reservations = data.Reservations;
      app.io.broadcast('ec2:ec2list', {
        reservations: data.Reservations
      });
    }
  });
};


var listSG = function(app) {
  ec2.describeSecurityGroups(function(error, data) {
    if (error) {
      console.log(error); // an error occurred
    } else {
      var reservations = data.Reservations;
      app.io.broadcast('ec2:sglist', {
        reservations: data.SecurityGroups
      });
    }
  });
};

module.exports = {
  'listEC2': listEC2,
  'listSG': listSG
}
