'use strict';

/**
 * Example Monitor.
 */
module.exports = {
  name: "example",
  report: () => {

    // Example healthy status
    let status = 'CONNECTED';
    let connectionString = 'uri://example/';

    return {
      status: status === "CONNECTED" ? "UP" : "DOWN",
      connectionState:  status,
      connectionString: connectionString
    };
  }
};
