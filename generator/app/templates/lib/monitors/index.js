'use strict';

const VitalSigns = require('vitalsigns');

module.exports = () => {

  let vitals = new VitalSigns();

  // Add a custom monitor
  vitals.monitor(require('./example-monitor'));

  // Add a health check for the custom monitor
  vitals.unhealthyWhen('example', 'status').equals("DOWN");

  return vitals;
};
