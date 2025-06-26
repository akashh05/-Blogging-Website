const express = require('express');
const router = express.Router();

const aboutService = require('../services/about.service');

router.get('/about', async (req, res, next) => {
    try {

        // Render the about page
        res.render('about', { year: new Date().getFullYear() });
    } catch (error) {
        next(error);
    }
});
 
module.exports = router;
