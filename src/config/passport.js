const passport = require('passport');
const passportLocal = require('passport-local');

const User = require('../models/users');

passport.use(new passportLocal({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({email: email}); // Busco el usuario
    if(!user) {
        return done(null, false, {message: 'Este usuario no existe'}); // tipo de error (boolean), usuario encontrado (null si no se encontró), mensaje
    } else {
        const match = await user.matchPassword(password);
        if(match) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Contraseña incorrecta'});
        }
    }
}));

passport.serializeUser((user, done) => { // toma un usuario y callback
    done(null, user.id); // almaceno el usuario y su sesión
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});