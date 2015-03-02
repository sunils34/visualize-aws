var Footer = require('./Footer.react');
var React = require('react');
var AWSMixin = require('../mixins/aws.mixin');

var AWSApp = React.createClass({
  mixins:[AWSMixin],
  render: function() {
      return (
        <span>
        <Footer instances={this.state.instances} />
        </span>
      );
  }
});

module.exports = AWSApp;
