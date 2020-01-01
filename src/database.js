const mongoose = require('mongoose');

const uristring = process.env.MONGODB_URI_ENC || 'mongodb://localhost/argentinaHoy';

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/'+db, {
console.log('Trying to connect to ' + uristring + '...');

mongoose.connect(uristring, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(db => console.log('Mongoose connected to: ' + uristring))
  .catch(err => console.log('Mongoose can\'t connect with: ' + uristring + '. ' + err));