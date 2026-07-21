const { src, dest, watch, parallel, series } = require('gulp');
const sass         = require('gulp-sass')(require('sass'));
const sourcemaps   = require('gulp-sourcemaps');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano      = require('cssnano');
const terser       = require('gulp-terser');
const rename       = require('gulp-rename');

const paths = {
  scss:    'src/scss/app.scss',
  js:      'src/js/**/*.js',
  destCss: 'public/build/css',
  destJs:  'public/build/js',
};

function css() {
  return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.destCss));
}

function cssBuild() {
  return src(paths.scss)
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(dest(paths.destCss));
}

function javascript() {
  return src(paths.js)
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.destJs));
}

function dev(done) {
  watch('src/scss/**/*.scss', css);
  watch(paths.js, javascript);
  done();
}

exports.css        = css;
exports.javascript = javascript;
exports.dev        = series(parallel(css, javascript), dev);
exports.build      = parallel(cssBuild, javascript);
