'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);

    // `controllerName` is a required argument.
    this.argument('controllerName', { type: String, required: true });
  },

  writing: function() {
    this.fs.copy(
      this.templatePath('controller.js'),
      this.destinationPath('lib/controllers/'+ this.controllerName +".js")
    )
  }
});
