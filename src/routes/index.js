const router = require('express').Router(),
request = require('request'),
{ dolarHoy } = require('../helpers/dolarHoy');

router.get('/', (req, res) => {
    request('localhost:3000/dev/dolar-hoy', function (body) {
        // res.send(body);
        console.log(body);
        res.send('ok');
    });
});


module.exports = router;