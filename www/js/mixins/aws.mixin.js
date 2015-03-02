
var AWSStore = require('../stores/AWSStore');
function getAWSState() {
  return {
    "ec2-instances": AWSStore.getRunningInstances()
  };
}


var AWSMixin = {

  _onChange: function() {
    this.setState(getAWSState());
  },
  getInitialState: function() {
    return getAWSState();
  },

  componentDidMount: function() {
    AWSStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AWSStore.removeChangeListener(this._onChange);
  },
}

module.exports = AWSMixin;
