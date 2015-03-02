
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AWSConstants = require('../constants/AWSConstants');

AWSActions = {

  updateInstances: function(instances) {
    AppDispatcher.dispatch({
      actionType: AWSConstants.AWS_EC2_UPDATE,
      instances: instances
    });
  },
}

module.exports = AWSActions;
