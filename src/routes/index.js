const router = require('express').Router(),
request = require('request'),
{ dolarHoy } = require('../helpers/dolarHoy');

router.get('/', (req, res) => {
    request('https://argentina-hoy.herokuapp.com/devs/dolar-hoy', function (body) {
        // res.send(body);
        console.log(body);
        res.send('ok');
    });
});


module.exports = router;