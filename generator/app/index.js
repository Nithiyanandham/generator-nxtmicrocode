'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

  prompting: function() {

    var done = this.async();

    this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name?',
    },{
      type    : 'input',
      name    : 'microservice',
      message : 'Your microservice name (hint: type/domain/application/version)?',
    },{
      type    : 'confirm',
      name    : 'entitlements',
      message : 'Enable entitlements?',
      default : true
    }]).then(function (answers) {

      this.name = answers.name;
      this.microservice = answers.microservice;
      this.entitlements = answers.entitlements;

      done();

    }.bind(this));
  },


  writing: function() {

    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath(this.name + '/.gitignore')
    );

    this.fs.copy(
      this.templatePath('_jshintrc'),
      this.destinationPath(this.name + '/.jshintrc')
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath(this.name + '/package.json'), {
        name: this.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(this.name + '/README.md'), {
        name: this.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('config/app.yml'),
      this.destinationPath(this.name + '/config/app.yml'), {
        name: this.name,
        microservice: this.microservice
      }
    );

    if(this.entitlements){
      this.fs.copy(
        this.templatePath('config/entitlements.json'),
        this.destinationPath(this.name + '/config/entitlements.json')
      );
    }

    this.fs.copyTpl(
      this.templatePath('app.js'),
      this.destinationPath(this.name + '/app.js'), {
        microservice: this.microservice
      }
    );

    this.fs.copy(
      this.templatePath('lib'),
      this.destinationPath(this.name + '/lib')
    );

    this.fs.copy(
        this.templatePath('test'),
        this.destinationPath(this.name + '/test')
    );
  }
});
