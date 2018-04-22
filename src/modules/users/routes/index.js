const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
    console.log("Inside");
    res.send("Users");
    next()
});

module.exports = router;