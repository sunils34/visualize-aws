
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
}

module.exports = AWSActions;
