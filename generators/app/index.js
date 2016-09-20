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
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }, {
      type: 'input',
      name: 'pluginName',
      message: 'What would you like to name your plugin?  (Default:  someplugin)',
      default: 'someplugin'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  getContext: function() {
    return {
      pluginName: this.props.pluginName
    };
  },

  copyCoreFiles: function() {
    var context = this.getContext();
    this.fs.copyTpl(
      this.templatePath('core/plugins/pluginname/plugin.js'),
      this.destinationPath(this.props.pluginName + '/plugin.js'),
      {
        pluginName: this.props.pluginName
      }
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

  pullSubmoduledCKEditor: function() {
    // TODO
  },

  createTestingSymlinks: function() {
    // TODO
  },

  writing: function () {
    this.copyCoreFiles();
    this.copyTestingFiles();
  },

  install: function () {
    this.installDependencies();
  }
});
