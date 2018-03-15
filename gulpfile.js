var gulp = require ("gulp"), //Importamos la librería en memoria
    sass = require ("gulp-sass"), //Nombre del paquete Sass descargado con Npm
    notify = require ("gulp-notify"), //Notificaciones en el escritorio en lugar de en la consola
    browserSync = require("browser-sync"), //liveReload y sincronización entre navegadores
    gulpImport = require("gulp-html-import"), //permite utilizar la directiva @import similar al @include de PHP
    tap = require("gulp-tap"), 
    browserify = require("browserify"), //permite utilizar "@require" en archivos js para importar librerias descargadas con "npm"
    buffer = require("gulp-buffer"), 
    sourcemaps = require("gulp-sourcemaps"), //debug js y css .maps
    htmlmin = require("gulp-htmlmin"), //minificar html
    uglify = require("gulp-uglify"), //minificar javascript
    postcss = require("gulp-postcss"), //para que funcionen autoprefixer y cssnano
    autoprefixer = require("autoprefixer"), //crossbrowsing
    cssnano = require("cssnano"), //minificar CSS
    imagemin = require("gulp-imagemin"),
    responsive = require("gulp-responsive");

browserSync.create(); //Crea una instancia de browserSync

/*http://www.codevoila.com/post/32/customize-bootstrap-using-bootstrap-sass-and-gulp*/

// source and distribution folder
var source = 'src/',
dest = 'dist/';

// Bootstrap scss source
var bootstrapSass = {
    in: './node_modules/bootstrap-sass/'
};

// Our scss source folder: .scss files
var scss = {
    in: source + 'scss/style.scss',
    out: dest,
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

// Bootstrap scss source
var bootstrapJs = {
    in: './node_modules/bootstrap-sass/'
};

// Bootstrap fonts source
var fonts = {
    in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
    out: dest + 'fonts/'
};

// FONTS TASK to copy Bootstrap required fonts to dist folder
gulp.task('fonts', function () {
    gulp.src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});
//definimos la tarea por defecto --> comando: gulp o gulp default
//Solo tenemos que ejecutar una vez este comando, 
//a partir de ahora cada vez que guardemos automáticamente se compilará el archivo .scss*/
gulp.task("default", ["imgArticles", "imgProfiles", "videoArticles", "html", "sass", "js"], function () {
    browserSync.init({
        //server: "./dist/",
        proxy: "http://127.0.0.1:3200/",
        // Don't show any notifications in the browser.
        notify: false,
        browser: ["google chrome", "firefox"]
    });
    //observa cambios en archivos Sass y entonces ejecuta la tarea 'sass'
    gulp.watch([source + "scss/*.scss", source + "scss/**/*"], ["sass"]);
    //Observa cambios en archivos Html y entonces ejecuta la tarea 'html'
    gulp.watch([source + "*.html", source + "**/*.html"], ["html"]);
    //Observa cambios en los archivos js y entonces ejecuta la tarea 'js'
    gulp.watch([source + "*.js", source + "js/**/*.js"], ["js"]);
});

//COMPILAR SASS --> comando: compile-sass
gulp.task("sass", ['fonts'], function () {
    gulp.src(scss.in)
        .pipe(sourcemaps.init())//antes de transformar los sass, comienza a capturar los sourcemaps
        //.pipe(sass().on("error", sass.logError)) //lo compilamos con gulp-sass
        //Si queremos manejar nosotros el error podemos hacerlo así:
        .pipe(sass(scss.sassOpts).on("error", function (error)  {
            return notify().write(error);
        }))
        .pipe(postcss([ //postcss herramientas con plugins para transformar CSS
            autoprefixer(),
            cssnano()      //comprime y minifica el CSS
        ]))
        .pipe(sourcemaps.write("./")) // guarda el sourcemaps (.map) en la misca carpeta que el CSS
        .pipe(gulp.dest(scss.out))
        .pipe(browserSync.stream()) 
        .pipe(notify("SASS Compilado 🤘🏻"))
});

// copiar e importar html
gulp.task("html", function () {
    //coge todos los archivos html que estén en la carpeta 'src'
    gulp.src(source + "*.html")
        //Una vez cargados todos esos html haces un pipe de gulpImport y
        //te paso la carpeta donde van a estar todos esos trocitos de html que vas a poder importar ("components")
                        
        .pipe(gulpImport([source + "components/"])) //reemplaza los imports de los html
        .pipe(htmlmin({collapseWhitespace: true})) //minifica el HTML
        //una vez importados, déjame los archivos resultantes en la carpeta "dist"
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream())
        .pipe(notify("HTML importado 🤘🏻"))
});

gulp.task("js", function () {
    gulp.src([source + "js/main.js", "./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js" ])
    .pipe(tap(function (file) {// a través del pipe, la funcion "tap" recibe como parámetro (file) el fichero cargado en "src" (Es decir "main.js") 
        //tap nos permite ejecutar una función por cada fichero seleccionado en gulp.src
        //reemplazamos el contenido del fichero "main.js" por lo que nos devuelve browserify pasándole el fichero
        file.contents = browserify(file.path, {debug: true}) //creamos una instancia de browserify en base al archivo.
                        .transform("babelify", {presets: ["es2015"]}) //traduce nuestro código de ES6 -> ES5
                        //BABELIFY no hace falta que lo importemos, xq al decirle a browserify que utilice "babelify", browserify lo importa internamente
                        .bundle() //compilamos el archivo
                        .on("error", function (error) { //control de errores
                            return notify().write(error);
                        });
    }))
    //para enviarlo a "dist", como hemos modificado el archivo, lo tenemos que convertir en un "buffer". Porque Gulp funciona con 
    //pipes y estos pipes son pipes en memoria.
    .pipe(buffer()) //convertimos a buffer para que funcione el siguiente pipe (gulp.dest)
    .pipe(sourcemaps.init({loadMaps: true})) //captura los sourcemaps del archivo fuente 
    .pipe(uglify())//minificamos el javaScript
    .pipe(sourcemaps.write('./')) //guarda los sourcemaps en el mismo directorio que el archivo fuente (ej.main.js.map)
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream())
    .pipe(notify("JS Compilado"));
});

//Tarea que optimiza y crea las imágenes responsive
gulp.task("imgArticles", function () {
    gulp.src("src/img/articles/*")
        .pipe(responsive({
            '*.jpg': [
                { width: 360, rename: { suffix: "-360px"}},
                { width: 480, rename: { suffix: "-480px"}},
                { width: 640, rename: { suffix: "-640px"}},
                { width: 768, rename: { suffix: "-768px"}},
                { width: 960, rename: { suffix: "-960px"}},
                { width: 1280, rename: { suffix: "-1280px"}},
                { width: 1500, rename: { suffix: "-1500px"}}
            ]
        }))
        .pipe(imagemin()) //imagemin despues de responsive
        .pipe(gulp.dest("dist/img/articles/"));
});

gulp.task("imgProfiles", function () {
    gulp.src("src/img/profiles/*")
        .pipe(responsive({
            '*.jpg': [
                { width: 60, rename: { suffix: "-60px"}},
                { width: 120, rename: { suffix: "-120px"}}
            ]
        }))
        .pipe(imagemin()) //imagemin despues de responsive
        .pipe(gulp.dest("dist/img/profiles/"));
});

gulp.task("videoArticles", function () {
    gulp.src("src/video/articles/*")
        .pipe(gulp.dest("dist/video/articles/"));
});