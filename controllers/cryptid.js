const fs = require('fs');
const router = require('express').Router();

router.get('/', (req, res) => {
    //GET DATA FROM FILE
    const cryptids = fs.readFileSync(__dirname + '/../cryptids.json');
    //PARSE the json object from that data
    const cryptidData = JSON.parse(cryptids);
    res.render('cryptids/index.ejs', {
        myCryptids: cryptidData
    });
})

router.post('/', (req, res) => {
    // console.log(req.body);
    let cryptids = fs.readFileSync(__dirname + '/../cryptids.json')
    let cryptidData = JSON.parse(cryptids);
    cryptidData.push(req.body);
    fs.writeFileSync(__dirname + '/../cryptids.json', JSON.stringify(cryptidData));

    res.redirect('/cryptids');
})

router.get('/new', (req, res) => {
    res.render('cryptids/new')
})

router.get('/:idx', (req, res) => {
    const cryptids = fs.readFileSync(__dirname + '/../cryptids.json');
    const cryptidData = JSON.parse(cryptids);
    //get the idx value from the url parameters
    let cryptidIndex = parseInt(req.params.idx);
    res.render('cryptids/show', {
        myCryptid: cryptidData[cryptidIndex]
    })
})


module.exports = router;