'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  init: function () {
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.log(chalk.green('All is done! Thank you for using Frodigo Front-End-Sass  generator!'));
      }

    });
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the peachy ' + chalk.red('FrontEndSass') + ' generator!'
    ));

    var prompts = [];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('sass-lint.yml'),
        this.destinationPath('.sass-lint.yml')
      );
      this.fs.copy(
        this.templatePath('_bitbucket-pipelines.yml'),
        this.destinationPath('bitbucket-pipelines.yml')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('_Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );

      this.directory('development', './development/', 'template');

    }
  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  }
});
