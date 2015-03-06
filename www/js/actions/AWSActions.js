
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AWSConstants = require('../constants/AWSConstants');

AWSActions = {

  updateEC2: function(instances) {
    AppDispatcher.dispatch({
      actionType: AWSConstants.AWS_EC2_UPDATE,
      instances: instances
    });
  },

  updateSG: function(groups) {
    AppDispatcher.dispatch({
      actionType: AWSConstants.AWS_SG_UPDATE,
      groups: groups
    });
  },

  sshInto: function(instance) {
    AppDispatcher.dispatch({
      actionType: AWSConstants.AWS_EC2_SSH,
      instance: instance
    });
  }
}

//Handles all backend actions
// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case AWSConstants.AWS_EC2_SSH:
      console.log(action.instance);
      io.emit('ec2SSH', action.instance);
      break;
    default:
      // no op
  }
});

module.exports = AWSActions;
