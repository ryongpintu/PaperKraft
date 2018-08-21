gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
nested = require('postcss-nested'),
browserSync = require('browser-sync').create();





gulp.task('styles', function(){
   
   return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, nested]))
	.on('error',function(errorInfo){
        console.log(errorInfo.toString());
		this.emit('end');
	})
	.pipe(gulp.dest('./app/temp/styles'));

	
});


gulp.task('watch', function(){

	browserSync.init({
      notify:false,
      server:{

      	baseDir:"app"
      }


	});


  watch('./app/index.html', function(){


  	browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function(){


  	gulp.start('cssInject');
  });


});

gulp.task('cssInject',['styles'] ,function(){

gulp.src('./app/temp/styles/styles.css')
.pipe(browserSync.stream());

});
