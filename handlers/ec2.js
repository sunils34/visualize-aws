var AWS = require('aws-sdk');
var applescript = require('applescript');
var util = require('util');
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

var script = 'set my_boxes to {"%s"}\n';

var sshEC2 = function(instance) {

  //TODO handle cases when ec2 user and pemfile isn't set
  var fs = require('fs');
  fs.readFile('./applescripts/connectwithpem.scpt', 'utf8', function(err, data) {
    if (err) throw err;
    var s = util.format(data, instance.PublicIpAddress, process.env.AWS_EC2_SSH_USER, process.env.AWS_EC2_SSH_PEMFILE);

    applescript.execString(s, function(err, rtn) {
      if (err) {
      }
    });
  });
}


module.exports = {
  'listEC2': listEC2,
  'listSG': listSG,
  'sshEC2': sshEC2
}
