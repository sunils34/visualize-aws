var React = require('react');
var ReactPropTypes = React.PropTypes;

var Footer = React.createClass({
  render: function () {
    var allInstances = this.props.instances;
    var ec2count = (allInstances) ? allInstances.length: 0;
    return (
      <span>{ec2count}</span>
    )
  }
});
module.exports = Footer;
