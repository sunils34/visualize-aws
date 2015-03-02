var React = require('react');
console.log('render app');
var AWSApp = require('./components/AWSApp.react');
var Sidebar = require('./components/Sidebar.react');
var AppDispatcher = require('./dispatcher/AppDispatcher');
AWSActions = require('./actions/AWSActions');

var sections = [
  {
    "title" : "EC2",
    "subtitles"  : [
      { "title":"EC2 Instances", "id": "ec2-instances"},
      { "title":"Security Groups", "id":"ec2-security-groups"},
      { "title":"Elastic Load Balancers", "id": "ec2-elb"},
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
