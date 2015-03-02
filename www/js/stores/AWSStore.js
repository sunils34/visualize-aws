var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AWSConstants = require('../constants/AWSConstants');
var assign = require('object-assign');

var EC2_CHANGE_EVENT = 'ec2-change';

_AWS = {EC2Instances : []};

/**
 * Update EC2List
 * @param  {array} array The list of EC2 Instances
 */
function updateEC2List(reservations) {
  //update title
  //
  var instances = [];
  reservations.forEach(function(i) {
    instances = instances.concat(i.Instances);
  });
  _AWS.EC2Instances = instances;
}

var AWSStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
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
    default:
      // no op
  }
});

module.exports = AWSStore;
