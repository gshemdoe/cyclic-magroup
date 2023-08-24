const express = require('express')
const router = express.Router()
const { detect } = require('detect-browser');

router.get('/', async (req, res) => {
    try {
        const browser = detect();
        if (browser) {
            console.log(browser.name);
            console.log(browser.version);
            console.log(browser.os);
            console.log(browser)
        }
        res.render('1home/home')
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router