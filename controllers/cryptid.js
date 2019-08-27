const fs = require('fs');
const express = require('express');
const router = express.Router();

//GET ALL cryptids
//This is for mysite.com/cryptids/
router.get('/', (req, res) => {
    //GET DATA FROM FILE
    const cryptids = fs.readFileSync(__dirname + '/../cryptids.json');
    //PARSE the json object from that data
    const cryptidData = JSON.parse(cryptids);
    //RENDER a template
    res.render('cryptids/index.ejs', {
        myCryptids: cryptidData
    });
})

//MAKE A NEW CRYPTID
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
    const index = req.params.idx || 0;

    const cryptid = cryptidData[index];

    res.render('cryptids/show', {
        myCryptid: cryptid
    })
    
});

//DELETE route that removes a cryptid from the DB
router.delete('/:id', (req, res) => {
    const cryptidObjs = fs.readFileSync(__dirname + '/../cryptids.json');
    const cryptidJSON = JSON.parse(cryptidObjs);

    let idx = req.params.idx;
    //SPLICE OUT that one cryptid
    cryptidJSON.splice(idx, 1);

    //WRITE back to fs
    fs.writeFileSync(__dirname + '/../cryptids.json', JSON.stringify(cryptidJSON));
    //redirect to the same page, to hit the GET all route
    res.redirect('/cryptids');
})
// GET the edit form for a particular cryptid
router.get('/:id/edit', (req,res) => {
    const cryptidObjs = fs.readFileSync(__dirname + '/../cryptids.json');
    const cryptidJSON = JSON.parse(cryptidObjs);

    let cryptid = cryptidJSON[req.params.id];

    res.render('cryptids/edit', {
        cryptidId: req.params.id,
        cryptid: cryptid
    });

})

//UPDATE route that mutates one of the items in DB
router.put('/:idx', (req, res) => {
    const cryptidObjs = fs.readFileSync(__dirname + '/../cryptids.json');
    const cryptidJSON = JSON.parse(cryptidObjs);
    //get the particular cryptid we want to edit
    //then change the data inside it to the contents of the form input

    let theCryptidWeWant = cryptidJSON[req.params.idx];

    theCryptidWeWant.name = req.body.name;
    theCryptidWeWant.img_url = req.body.img_url;

    fs.writeFileSync(__dirname + '/../cryptids.json', JSON.stringify(cryptidJSON));
    res.redirect('/cryptids');
})


module.exports = router;