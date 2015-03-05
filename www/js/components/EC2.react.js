var React = require('react');
var AWSMixin = require('../mixins/aws.mixin');

var EC2Item = React.createClass({

  render: function() {
    return (
      <a href="#" className="col one-fourth ec2-instance">{this.props.instance.Name}</a>
    );
  }
});

var EC2Section = React.createClass({

  mixins:[AWSMixin],
  render: function() {
    instances = this.state['ec2-instances'];
    var ec2items = [];
    instances.forEach(function(i) {
      ec2items.push(<EC2Item instance={i} />);
    });
    return (
      <div className="container" id="ec2-instances">{ec2items}</div>
    );
  }
});

module.exports = EC2Section;
