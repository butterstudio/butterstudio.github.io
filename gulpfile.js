const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
const stripCssComments = require('gulp-strip-css-comments');
const autoprefixer = require('gulp-autoprefixer');
const removeEmptyLines = require('gulp-remove-empty-lines');
const template = require('gulp-template');
const htmlbeautify = require('gulp-html-beautify');
const htmlValidator = require('gulp-w3cjs');

const sassConfig = {
	inputDirectory: 'sass/*.scss',
	outputDirectory: 'css',
	options: {
		outputStyle: 'expanded'
	}
};

const beautifyOptions = {
  'indent_size': 2
};


gulp.task('build-css', function() {
	return gulp
		.src(sassConfig.inputDirectory)
		.pipe(sass(sassConfig.options).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(stripCssComments())
    .pipe(removeEmptyLines({
      removeComments: true
    }))
		.pipe(gulp.dest(sassConfig.outputDirectory));
});

gulp.task('build-work-subpages-html', function () {
  const alma = fs.readFileSync('html/work-subpages/_alma.html', 'utf8');
  const flex = fs.readFileSync('html/work-subpages/_flex.html', 'utf8');
  const kettner = fs.readFileSync('html/work-subpages/_kettner.html', 'utf8');
  const otherhalf = fs.readFileSync('html/work-subpages/_otherhalf.html', 'utf8');
  const arkfoods = fs.readFileSync('html/work-subpages/_arkfoods.html', 'utf8');
  const hifi = fs.readFileSync('html/work-subpages/_hifi.html', 'utf8');
  return gulp.src('html/work-subpages/_work-subpages.html')
    .pipe(template({
      alma,
      kettner,
      flex,
      otherhalf,
      arkfoods,
      hifi
    }))
    .pipe(htmlbeautify(beautifyOptions))
    .pipe(gulp.dest('html/'));
});

gulp.task('build-html', function() {
  const contact = fs.readFileSync('html/_contact.html', 'utf8');
  const dots = fs.readFileSync('html/_dots.html', 'utf8');
  const footer = fs.readFileSync('html/_footer.html', 'utf8');
  const header = fs.readFileSync('html/_header.html', 'utf8');
  const news = fs.readFileSync('html/_news.html', 'utf8');
  const services = fs.readFileSync('html/_services.html', 'utf8');
  const scripts = fs.readFileSync('html/_scripts.html', 'utf8');
  const title = fs.readFileSync('html/_title.html', 'utf8');
  const work = fs.readFileSync('html/_work.html', 'utf8');
  const workSubpages = fs.readFileSync('html/_work-subpages.html', 'utf8');

  return gulp.src('html/index.html')
    .pipe(template({
      contact,
      dots,
      footer,
      header,
      news,
      services,
      scripts,
      title,
      work,
      workSubpages
    }))
    .pipe(htmlbeautify(beautifyOptions))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
	gulp.watch('sass/*/*.scss', gulp.series('build-css'));
  gulp.watch('html/*.html', gulp.series('build-html'));
  gulp.watch('html/work-subpages/*.html', gulp.series('build-work-subpages-html'));
  gulp.watch('index.html', gulp.series('validate-html'));
});

const ERRORS_TO_IGNORE = [
  'Duplicate ID',
  'An “img” element must have an “alt” attribute',
  // TODO: remove these and figure out alternatives
  'frameborder',
  'allowfullscreen'
];

gulp.task('validate-html', () => {
  return gulp.src('index.html')
    .pipe(htmlValidator({
      verifyMessage: function(type, message) {
        for (errorMsg of ERRORS_TO_IGNORE) {
          if (message.indexOf(errorMsg) !== -1) {
            return false;
          }
        }
        return true;
      }
    }))
    .pipe(htmlValidator.reporter())
});
