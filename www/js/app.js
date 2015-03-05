var React = require('react');
console.log('render app');
var AWSApp = require('./components/AWSApp.react');
var Sidebar = require('./components/Sidebar.react');
var EC2Section = require('./components/EC2.react');
var AppDispatcher = require('./dispatcher/AppDispatcher');
AWSActions = require('./actions/AWSActions');
var EC2Mixin = require('./mixins/aws.mixin');

var sections = [
  {
    "title" : "EC2",
    "subtitles"  : [
      { "title":"EC2 Instances", "id": "ec2-instances",  "mixin":EC2Mixin},
      { "title":"Security Groups", "id":"ec2-security-groups", "mixin":null},
      { "title":"Elastic Load Balancers", "id": "ec2-elb", "mixin":null}
    ]
  }
]

React.render(
  <Sidebar sections={sections}/>,
  $('#js-sidebar-container')[0]
);

React.render(
  <EC2Section />,
  $('#ec2List')[0]
);

io = io.connect()
// Emit ready event.
io.emit('ready');

// Listen for the talk event.
io.on('talk', function(data) {
  console.log('io connected');
});

io.on('ec2:ec2list', function(data) {
  AWSActions.updateEC2(data.reservations);
});

io.on('ec2:sglist', function(data) {
  AWSActions.updateSG(data.reservations);
});
window.addEventListener("beforeunload", function(e){
  io.emit('exit');
  // Do something
}, false);
