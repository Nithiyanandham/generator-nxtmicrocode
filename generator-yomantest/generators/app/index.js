'use strict';
const camelCase = require('camelcase');
const decamelize = require('decamelize');
const { existsSync } = require('fs');
const Generator = require('yeoman-generator');
const { resolve } = require('path');
const upperCamelCase = require('uppercamelcase');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // This makes `componentName` a required argument.
    this.argument('packageName', { type: String, required: false });
    this.argument('applicationName', { type: String, required: false });
    this.argument('ptype', { type: String, required: false });
  }

  async start() {
    this.log('Process started ..........');
    const PTYPE_HELLO_SPRINGBOOT = 'hello-springboot';
    const PTYPE_SYNC_REST = 'restful-service';
    const PTYPE_SYNC_SOAP = 'soap-service';
    const PTYPE_ASYNC_RMQ = 'rmq-service';
    const PTYPE_ASYNC_KAFKA = 'kafka-service';

    const ptypes = {
      PTYPE_HELLO_SPRINGBOOT,
      PTYPE_SYNC_REST,
      PTYPE_SYNC_SOAP,
      PTYPE_ASYNC_RMQ,
      PTYPE_ASYNC_KAFKA
    };

    const defaultAppName = 'nxtTestAppNam';

    const answers = await this.prompt([
      {
        type: 'confirm',
        name: 'triggerproject',
        message: 'Ready to generate the Microservices code ? ',
        default: true
      },
      {
        type: 'list',
        choices: Object.values(ptypes),
        name: 'ptype',
        message: 'Project Type:'
      },
      {
        type: 'input',
        name: 'packageName',
        message: 'Folder Name:',
        default: 'eiscodegenpackage',
        filter: value => upperCamelCase(value.trim())
      },
      {
        type: 'input',
        name: 'applicationName',
        message: 'Spring boot app name:',
        default: defaultAppName,
        filter: value => value.trim() || defaultAppName
      }
    ]);

    const { packageName, applicationName, ptype } = answers;

    if (!packageName) {
      this.log('ERROR: name must not be empty');
      return;
    }

    this.log('Operation process ....');

    const config = {
      ptype,
      applicationName,
      packageName
    };

    this.log('Creating the outputDir.......');

    // @todo https://github.com/yeoman/yo/issues/603
    const cwd = process.env.INIT_CWD || this.contextRoot;
    const outputDir = resolve(cwd, packageName);

    // create destination folder
    this.destinationRoot(outputDir);

    this.log('outputDir is : ', outputDir);

    switch (ptype) {
      case PTYPE_HELLO_SPRINGBOOT:
        this._writeSpringApplication(config);
        break;
      case PTYPE_SYNC_REST:
        this._writeSpringApplication(config);
        break;
      default:
        this.log(`ERROR: Unsupported type: ${ptype}`);
    }
  }

  _writeSpringApplication(config) {
    this.log('Reached Level 4');
    this.fs.copyTpl(
      this.templatePath(`pom.xml.ejs`),
      this.destinationPath(`pom.xml`),
      config
    );

    this.log('Reached Level 5');
    this.fs.copyTpl(
      this.templatePath('src/main/java/com/example/test/demorest/DemoRestApplication.java.ejs'),
      this.destinationPath(`src/main/java/com/dell/it/eis/${config.packageName}/${config.applicationName}Application.java`),
      config
    );
  }

  _verify() {
    this.log('Verifying...');
    if (existsSync(name)) {
      this.error('ERROR: The destination folder for the component already exists.');
    }
  }

};