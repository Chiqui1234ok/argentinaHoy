const router = require('express').Router();

router.get('/planes', (req, res) => {
    res.send('planes');
});

module.exports = router;