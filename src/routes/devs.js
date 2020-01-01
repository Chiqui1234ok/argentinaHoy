const router = require('express').Router(),
{ dolarHoy } = require('../helpers/dolarHoy');

router.get('/devs', (req, res) => {
    res.send('<h1>¡Hola dev!</h2>');
});

router.get('/devs/dolar-hoy', dolarHoy, (req, res) => {

});

module.exports = router;