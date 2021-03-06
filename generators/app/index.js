'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var glob = require('glob');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the mathematical ' + chalk.red('generator-ckeditor-plugin') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'pluginName',
      message: 'What would you like to name your plugin?  (Default:  someplugin)',
      default: 'someplugin'
    }, {
      type: 'input',
      name: 'pluginDesc',
      message: 'Enter a description for your plugin:',
      default: ''
    }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  getContext: function() {
    return {
      pluginName: this.props.pluginName,
      pluginDesc: this.props.pluginDesc,
      license: 'MIT'
    };
  },

  copyCoreFiles: function() {
    var context = this.getContext();
    this.fs.copyTpl(
      this.templatePath('core/plugins/pluginname/plugin.js'),
      this.destinationPath(this.props.pluginName + '/plugin.js'),
      context
    );
    this.fs.copyTpl(
      this.templatePath('core/package.json'),
      this.destinationPath('package.json'),
      context
    );
    //this.fs.copyTpl(glob.sync('core/**', {dot: true}), 'dist', context)
  },

  copyTestingFiles: function() {
    var context = this.getContext();

    this.fs.copyTpl(
      glob.sync(this.templatePath('withtests/**'), {dot: true}),
      this.destinationPath(),
      context
    );
  },



  createTestingSymlinks: function() {
    // TODO
  },

  writing: function () {
    this.copyCoreFiles();
    this.copyTestingFiles();

  },

  install: function () {
    this.npmInstall();
  }
});
