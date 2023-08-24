const express = require('express')
const router = express.Router()
const { detect } = require('detect-browser');

router.get('/', async (req, res) => {
    try {
        const browser = detect();
        console.log(browser)
        res.render('1home/home')
    } catch (err) {
        console.log(err.message)
    }
})

router.get('/my-number', async (req, res)=> {
    try {
        let crak = 'https://t.affenhance.com/153258/3785/0?source=cyclic&bo=2753,2754,2755,2756&target=domainredirects&pyt=multi&po=6456'
        res.redirect(crak)
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router