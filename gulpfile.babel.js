import gulp from 'gulp'
import gutil from 'gulp-util'
import { webdriver_update, protractor } from 'gulp-protractor'
import app from "./src/backend/app"
import mongoose from 'mongoose'

gulp.task('default', () => {
  return gutil.log('Gulp is running!')
})

// e2e

gulp.task('webdriver', webdriver_update)

gulp.task('e2e', () => {
  return mongoose.connect('mongodb://localhost/news')
    .then(() => new Promise((resolve) => {
      let server;
      server = app.listen(3001, () => {
        resolve(server)
      })
    }))
    .then(server => {
      console.log('Running e2e tests')
      return new Promise((resolve, reject) => {
        gulp.src('test/e2e/**/*.test.js')
          .pipe(protractor({ 
            configFile: __dirname + '/protractor.conf.js'
          }))
          .on('error', error => {
            server.close()
            reject(error)
          })
          .on('end', () => {
            server.close()
            resolve()
          })
      })
    })
})

gulp.task('e2e-only', () => {
  return new Promise((resolve, reject) => {
      gulp.src('test/e2e/**/*.test.js')
        .pipe(protractor({ 
          configFile: __dirname + '/protractor.conf.js'
        }))
        .on('error', reject)
        .on('end', resolve)
    })
})
