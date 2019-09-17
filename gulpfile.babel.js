import { src, dest, watch, series, parallel } from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import imagemin from 'gulp-imagemin';
import webpack from 'webpack-stream';
import named from 'vinyl-named';
import browserSync from 'browser-sync';

const PRODUCTION = yargs.argv.prod;

export const styles = async () => {
    src('src/scss/bundle.scss')
        .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(PRODUCTION, postcss([autoprefixer])))
        .pipe(gulpif(PRODUCTION, cleanCss({compatibility: 'ie8'})))
        .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
        .pipe(dest('resources/assets/css'))
        .pipe(server.stream());
    // done();
    // return true;
}

export const images = (done) => {
    src('src/images/**/*.{jpg,jpeg,png,svg,gif}')
        .pipe(gulpif(PRODUCTION, imagemin()))
        .pipe(dest('resources/assets/images'));
    done();
    return true;
}

export const watchForChanges = () => {
    watch('src/scss/**/*.scss', styles);
    // watch('src/images/**/*.{jpg,jpeg,png,svg,gif}', series(images, reload));
    watch('src/js/**/*.js', series(scripts, reload));
    watch('**/*.php', reload);
}

const server = browserSync.create();

export const serve = (done) => {
    server.init({
        proxy: 'localhost' //<- change this
    });
    done();
}

export const reload = (done) => {
    server.reload();
    done();
}

export const scripts = () => {
    return src('src/js/bundle.js')
        .pipe(named())
        .pipe(webpack({
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                ]
            },
            mode: PRODUCTION ? 'production' : 'development',
            devtool: !PRODUCTION ? 'inline-source-map' : false,
            output: {
                filename: '[name].js'
            },
        }))
        .pipe(dest('resources/assets/js'));
}

export const dev = series(parallel(styles, scripts), serve, watchForChanges);

export default dev;