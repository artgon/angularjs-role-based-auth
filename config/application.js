/* Exports an object that defines
 *  all of the configuration needed by the projects'
 *  depended-on grunt tasks.
 *
 * You can familiarize yourself with all of Lineman's defaults by checking out the parent file:
 * https://github.com/testdouble/lineman/blob/master/config/application.coffee
 */

module.exports = require(process.env['LINEMAN_MAIN']).config.extend('application', {

  // configuration for grunt-angular-templates
  ngtemplates: {
    role_based_auth: { // "app" matches the name of the angular module defined in app.js
      options: {
        base: "app/templates"
      },
      src: "app/templates/**/*.html",
      // puts angular templates in a different spot than lineman looks for other templates in order not to conflict with the watch process
      dest: "generated/angular/template-cache.js"
    }
  },

    // configure lineman to load additional angular related npm tasks
  loadNpmTasks: [
    "grunt-angular-templates"
  ],

   // We don't use coffee script
  removeTasks: {
    common: ["coffee", "less", "handlebars", "jst"]
  },

  // task override configuration
  prependTasks: {
    common: ["ngtemplates"] // ngtemplates runs in dist and dev
  },

  // grunt-angular-templates expects that a module already be defined to inject into
  // this configuration orders the template inclusion _after_ the app level module
  concat: {
    js: {
      src: ["<banner:meta.banner>", "<%= files.js.vendor %>", "<%= files.coffee.generated %>", "<%= files.js.app %>", "<%= files.ngtemplates.dest %>"],
      separator: ";"
    }
  },


  pages: {
    dev: {
      context: {
        base: '/',
        js: "js/app.js",
      }
    },
  },


  // configures grunt-watch-nospawn to listen for changes to, and recompile angular templates
  watch: {
    ngtemplates: {
      files: "app/templates/**/*.html",
      tasks: ["ngtemplates", "concat"]
    }
  }
});
