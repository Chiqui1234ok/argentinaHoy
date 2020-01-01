const mongoose = require('mongoose');              //
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSch = new Schema({
    isAdmin:  {
        type: Boolean,
        default: true
    },
    name:               String,                        // Nombre del usuario
    email: {
        type:           String,                        // Email del usuario
        required:       true
    },
    password: {
        type:           String,                        // Contraseña del usuario
        required:       true
    },
    date: {
        type:           Date,
        default:        Date.now
    },
    dni1:               String,                        // Frente del DNI
    dni2:               String                         // Reverso del DNI
});

UserSch.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

UserSch.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('users', UserSch);