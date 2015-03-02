var React = require('react');
var ReactPropTypes = React.PropTypes;
var EC2Mixin = require('../mixins/ec2.mixin');

var Title = React.createClass({
  mixins:[EC2Mixin],
  render: function () {
    var allInstances = this.state.instances;
    var ec2count = (allInstances) ? allInstances.length: 0;
    return (
      <title>{ec2count} AWS</title>
    )
  }
});

module.exports = Title;
