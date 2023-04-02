/**
 * Gulp Main Config Setup.
 * Reference: https://github.com/gulpjs/gulp#sample-gulpfilejs
 * Github: https://github.com/gulpjs/gulp
 * 
 * Babel Setup for Browserlist.
 * Reference:
 *  - https://github.com/browserslist/browserslist
 *  - https://babeljs.io/docs/en/babel-preset-env#browserslist-integration
 * 
 * Browser List Compatibiltiy Setup Reference:
 *  - https://stackoverflow.com/a/43076327
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com> (https://lorddashme.github.io/)
 */
var fs = require('fs');
var del =  require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var gzip = require('gulp-gzip');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var autoPrefixer = require('gulp-autoprefixer');

/**
 * Read scripts configuration file.
 */
var scriptsConfig = JSON.parse(fs.readFileSync('scripts.json', 'utf8'));

/**
 * Read styles configuration file.
 */
var stylesConfig = JSON.parse(fs.readFileSync('styles.json', 'utf8'));

/**
 * Prepare hardcoded path setup for tasks.
 */
var paths = {
  scripts: {
    src: 'src/js/**/*.*',
    dest: {
      plugins: 'dist/js/plugins',
      third_party: 'dist/js/third_party',
      commons: 'dist/js/commons',
      components: 'dist/js/components',
      pages: 'dist/js/pages/'
    }
  },
  styles: {
    src: 'src/scss/**/*.*',
    dest: {
      plugins: 'dist/css/plugins',
      third_party: 'dist/css/third_party',
      commons: 'dist/css/commons',
      components: 'dist/css/components',
      pages: 'dist/css/pages/'
    }
  }
};

/**
 * The Filtered Mapping Using File Path Function.
 * 
 * This function filters each module and file that the path is included.
 * 
 * @param {String} filePath The file path that will use as the needle.
 * @param {Object} mapping The haystack that the filpath will be use as filter.
 * 
 * @returns {Object}
 */
function filteredMappingUsingFilePath(filePath, mapping) {

  var affectedFiles = {};

  var setAffectedFile = function (module, file, srcPath) {
    
    if (typeof affectedFiles[module] === 'undefined') {
      affectedFiles[module] = {};
    }

    affectedFiles[module][file] = srcPath;

  };

  for (var module in mapping) {

    var files = mapping[module];

    for (var file in files) {

      if (typeof files[file] === 'object') {

        if (files[file].includes(filePath)) {
          setAffectedFile(module, file, files[file]);
        }

      } else if (filePath === files[file]) {
        setAffectedFile(module, file, files[file]);
        break;
      }
    }
  }

  return affectedFiles;
}

/**
 * Script Task Pipe Line Registry Function.
 * 
 * @param {String} module The module that will be use to separate objects.
 * @param {String} file  The file or key of specific source file.
 * @param {Object} files The file source in key value pair or array format.
 * @param {String} taskNameSuffix Use to set task as unique to the other.
 * 
 * @returns {VoidFunction}
 */
function scriptTaskPipeLineRegistry(module, file, files, taskNameSuffix) {
  
  (function (item) {

    gulp.task(item + '_script_' + module + '_task' + taskNameSuffix, function () {
      
      if (files[item].includes('.min')) {
        return gulp.src(files[item], { sourcemaps: true })
          .pipe(concat(item + '.js'))
          .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest(paths.scripts.dest[module]));
      } else {
        return gulp.src(files[item], { sourcemaps: true })
          .pipe(babel())
          .pipe(uglify())
          .pipe(concat(item + '.js'))
          .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest(paths.scripts.dest[module]));
      }

    });
  })(file);

  // For GZIP version.
  (function (item) {
    gulp.task(item + '_script_gz_' + module + '_task' + taskNameSuffix, function () {
      
      if (files[item].includes('.min')) {
        return gulp.src(files[item], { sourcemaps: true })
          .pipe(concat(item + '.gz.js'))
          .pipe(gzip({ append: false }))
          .pipe(gulp.dest(paths.scripts.dest[module]));
      } else {
        return gulp.src(files[item], { sourcemaps: true })
          .pipe(babel())
          .pipe(uglify())
          .pipe(concat(item + '.gz.js'))
          .pipe(gzip({ append: false }))
          .pipe(gulp.dest(paths.scripts.dest[module]));
      }

    });
  })(file);
}

/**
 * Style Task Pipe Line Registry Function.
 * 
 * @param {String} module The module that will be use to separate objects.
 * @param {String} file  The file or key of specific source file.
 * @param {Object} files The file source in key value pair or array format.
 * @param {String} taskNameSuffix Use to set task as unique to the other.
 * 
 * @returns {VoidFunction}
 */
function styleTaskPipeLineRegistry(module, file, files, taskNameSuffix) {

  (function (item) {
    gulp.task(item + '_style_' + module + '_task' + taskNameSuffix, function () {
      
      if (files[item].includes('.min')) {
        return gulp.src(files[item], { sourcemaps: true })
          .pipe(concat(item + '.css'))
          .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest(paths.styles.dest[module]));
      } else {
        return gulp.src(files[item], { sourcemaps: true })
          .pipe(sass())
          .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
          .pipe(autoPrefixer())
          .pipe(concat(item + '.css'))
          .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest(paths.styles.dest[module]));
      }
      
    });
  })(file);
}

/**
 * Command for the script processing.
 */
function buildScript(filePath) {

  var filteredScriptConfig = filteredMappingUsingFilePath(filePath, scriptsConfig);

  for (var scriptConfig in filteredScriptConfig) {

    var files = filteredScriptConfig[scriptConfig];
    var module = scriptConfig;

    (function (files, module) {

      for (var file in files) {

        scriptTaskPipeLineRegistry(module, file, files, '_optimized');

        gulp.series([file + '_script_' + module + '_task_optimized', file + '_script_gz_' + module + '_task_optimized'])();

      }

    })(files, module);
  }
}

/**
 * Command for the scripts processing.
 */
function buildScripts() {

  var consolidatedTasks = [];

  for (var scriptConfig in scriptsConfig) {

    var files = scriptsConfig[scriptConfig];
    var module = scriptConfig;

    (function (files, module) {

      for (var file in files) {

        scriptTaskPipeLineRegistry(module, file, files, '');
    
        consolidatedTasks.push(file + '_script_' + module + '_task');
        consolidatedTasks.push(file + '_script_gz_' + module + '_task');

      }

    })(files, module);
  }

  gulp.task('build_scripts', 
    gulp.series(consolidatedTasks)
  );
}

/**
 * Command for the style processing.
 */
 function buildStyle(filePath) {

  var filteredStyleConfig = filteredMappingUsingFilePath(filePath, stylesConfig);

  for (var styleConfig in filteredStyleConfig) {

    var files = filteredStyleConfig[styleConfig];
    var module = styleConfig;

    (function (files, module) {

      for (var file in files) {

        styleTaskPipeLineRegistry(module, file, files, '_optimized');
    
        gulp.series(file + '_style_' + module + '_task_optimized')();

      }

    })(files, module);
  }
}

/**
 * Command for the styles processing.
 */
function buildStyles() {

  var consolidatedTasks = [];

  for (var styleConfig in stylesConfig) {

    var files = stylesConfig[styleConfig];
    var module = styleConfig;

    (function (files, module) {

      for (var file in files) {

        styleTaskPipeLineRegistry(module, file, files, '');
    
        consolidatedTasks.push(file + '_style_' + module + '_task');

      }

    })(files, module);
  }

  gulp.task('build_styles',
    gulp.series(consolidatedTasks)
  );
}

/**
 * Command for the clean dist module.
 */
function clean() {
  return del(['dist/'], { force: true });
}

/**
 * Register gulp task commands.
 */
buildScripts();
buildStyles();

exports.clean = clean;
exports.assets = gulp.series('build_scripts', 'build_styles');

/**
 * Command for the watch file changes.
 */
exports.watch = function () {
  
  gulp.watch(paths.scripts.src)
    .on('change', function (filePath) {
      buildScript(filePath.replace(/(\\)/gm, '/'));
    });

  gulp.watch(paths.styles.src)
    .on('change', function (filePath) {
      buildStyle(filePath.replace(/(\\)/gm, '/'));
    });
};
