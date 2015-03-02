var React = require('react');
console.log('render app');
var AWSApp = require('./components/AWSApp.react');
var Sidebar = require('./components/Sidebar.react');
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

io = io.connect()
// Emit ready event.
io.emit('ready');
// Listen for the talk event.
io.on('talk', function(data) {
  //example
  console.log('io connected');
});
io.on('ec2:list', function(data) {
  //example
  AWSActions.updateInstances(data.reservations);
});
window.addEventListener("beforeunload", function(e){
  io.emit('exit');
  // Do something
}, false);
