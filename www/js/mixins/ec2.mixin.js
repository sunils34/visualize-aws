
var AWSStore = require('../stores/AWSStore');
function getAWSState() {
  return {
    instances: AWSStore.getInstances()
  };
}


var EC2Mixin = {

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

module.exports = EC2Mixin;
