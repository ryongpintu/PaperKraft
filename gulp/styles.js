gulp = require('gulp'),
postcss = require('gulp-postcss'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
nested = require('postcss-nested');



gulp.task('styles', function(){
   
   return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, nested]))
	.on('error',function(errorInfo){
        console.log(errorInfo.toString());
		this.emit('end');
	})
	.pipe(gulp.dest('./app/temp/styles'));

	
});