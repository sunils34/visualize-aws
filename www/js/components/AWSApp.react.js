var Footer = require('./Footer.react');
var React = require('react');
var EC2Mixin = require('../mixins/ec2.mixin');

var AWSApp = React.createClass({
  mixins:[EC2Mixin],
  render: function() {
      return (
        <span>
        <Footer instances={this.state.instances} />
        </span>
      );
  }
});

module.exports = AWSApp;
