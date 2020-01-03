const router = require('express').Router(),
fetch = require('node-fetch');

router.get('/', async (req, res) => {
    await fetch('https://argentina-hoy.herokuapp.com/devs/dolar-hoy', {method: 'Get'})
    .then(res => res.json())
    .then((dollar) => {
        res.render('index', {
            dollar
        });
    });
});


module.exports = router;