module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    "babel": {
      options: {
        sourceMap: true,
        plugins: ["transform-react-jsx"],
        presets: ["babel-preset-es2015"]
      },
      dist: {
        files: {
          "build/edge-example.js": "src/edge-example.js",
          "build/main.js": "src/main.js"
        }
      }
    },
    "uglify": {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          "build/edge-example.min.js": "build/edge-example.js",
          "build/main.min.js": "build/main.js"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", ["babel", "uglify"]);
};
