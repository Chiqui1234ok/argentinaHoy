const path = require('path'),
express = require('express'),
exphbs = require('express-handlebars'),
session = require('express-session'), // fazt
methodOverride = require('method-override'),
passport = require('passport'),
flash = require('connect-flash');
// Inicialización
const app = express();
require('./database');
require('./config/passport');

// Configuración de puerto
app.set('port', process.env.PORT || 3000);

// Vistas
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({                                             // Declaro Handlebars cómo motor para vistas
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');                                         //

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));                                     // Para utilizar DEL o PUT en <form>
app.use(require('cookie-session')({
    secret: 'pepe',
    resave: true,
    saveUninitialized: true,
    // path: '/',
    cookie: { secure: false },
    maxAge: null
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Archivos estáticos
app.use('/', express.static(__dirname + '/public'));
app.use('/planes', express.static(__dirname + '/public'));
app.use('/contacto', express.static(__dirname + '/public'));
app.use('/panel', express.static(__dirname + '/public'));
app.use('/devs', express.static(__dirname + '/public'));

// Ruteo
const routes = {
    index: require('./routes/index'),
    planes: require('./routes/planes'),
    devs: require('./routes/devs')
};
app.use(routes.index, routes.planes, routes.devs);

// Apertura
app.listen(app.get('port'), () => {
    console.log('Server opened in port', app.get('port'));
});