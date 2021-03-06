var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AWSConstants = require('../constants/AWSConstants');
var assign = require('object-assign');

var EC2_CHANGE_EVENT = 'ec2-change';

_AWS = {
  EC2Instances : [],
  SGGroups : []
};

/**
 * Update EC2List
 * @param  {array} array The list of EC2 Instances
 */
function updateEC2List(reservations) {

  //get names for each instance
  var getName = function(instance) {
    var name = null;
    if(instance.Tags) {
      instance.Tags.forEach(function(x) {
        if(x.Key == "Name") {
          name = x.Value;
          return;
        }
      });
    }
    return (name) ? name : instance.InstanceId;
  }

  var instances = [];
  reservations.forEach(function(i) {
    instances = instances.concat(i.Instances);
  });
  instances.forEach(function(i) {
    i.Name = getName(i);
  });

  //sort by name
  instances.sort(function(a, b) {
    return (a.Name > b.Name) ? 1 : -1 ;
  });

  _AWS.EC2Instances = instances;
}

/**
 * Update SG List
 * @param  {array} array The list of SG Groups
 */
function updateSGList(reservations) {
  //update title
  _AWS.SGGroups = reservations
}

var AWSStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of running instances.
   * @return {object}
   */
  getRunningInstances: function() {
    var instances = [];
    _AWS.EC2Instances.forEach(function(i) {
      //running state
      if(i.State.Code==16) {
        instances.push(i);
      }
    });
    return instances;
  },
  /**
   * Get the entire collection of security groups.
   * @return {object}
   */
  getSecurityGroups: function() {
    return _AWS.SGGroups;
  },

  emitChange: function() {
    this.emit(EC2_CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(EC2_CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(EC2_CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case AWSConstants.AWS_EC2_UPDATE:
      updateEC2List(action.instances);
      AWSStore.emitChange();
      break;
    case AWSConstants.AWS_SG_UPDATE:
      updateSGList(action.groups);
      AWSStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = AWSStore;
