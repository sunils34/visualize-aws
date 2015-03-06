var React = require('react');
var AWSMixin = require('../mixins/aws.mixin');
var AWSActions = require('../actions/AWSActions');

var EC2Item = React.createClass({

  render: function() {
    return (
      <a href="#" onClick={this._onSSHClick} className="col one-fourth ec2-instance">{this.props.instance.Name}</a>
    );
  },

  _onSSHClick: function() {
    AWSActions.sshInto(this.props.instance);
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
      <div>
      <h4 class="section-title" id="grid">EC2 Instances</h4>
      <div className="container" id="ec2-instances">{ec2items}</div>
      </div>
    );
  }
});

module.exports = EC2Section;
