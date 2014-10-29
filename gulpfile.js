var gulp = require('gulp');

var gulpBowerFiles = require('gulp-bower-files');

// grab libraries files from bower_components, minify and push in /public
gulp.task('libs', function() {

	var jsFilter = gulpFilter('*.js');
	var cssFilter = gulpFilter('*.css');
	var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

	return gulp.src(mainBowerFiles())

		// grab vendor js files from bower_components, minify and push in /public
		.pipe(jsFilter)
		.pipe(gulp.dest(dest_path + '/js/vendor'))
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest(dest_path + '/js/vendor'))
		.pipe(jsFilter.restore())

		// grab vendor css files from bower_components, minify and push in /public
		.pipe(cssFilter)
		.pipe(gulp.dest(dest_path + '/css'))
		.pipe(minifycss())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest(dest_path + '/css'))
		.pipe(cssFilter.restore())

		// grab vendor font files from bower_components and push in /public
		.pipe(fontFilter)
		.pipe(flatten())
		.pipe(gulp.dest(dest_path + '/fonts'))
});

gulp.task('default', ['libs']);