const fs = require('fs');

const router = require('express').Router();

router.get('/', (req, res) => {
    //GET DATA FROM FILE
    const dinosaurs = fs.readFileSync(__dirname + '/../dinosaurs.json');
    //PARSE the json object from that data
    const dinoData = JSON.parse(dinosaurs);
    res.render('dinosaurs/index.ejs', {
        myDinos: dinoData
    });
})

router.post('/', (req, res) => {
    console.log(req.body);
    let dinosaurs = fs.readFileSync(__dirname + '/../dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs);
    dinoData.push(req.body);
    fs.writeFileSync(__dirname + '/../dinosaurs.json', JSON.stringify(dinoData));

    res.redirect('/dinosaurs');
})

router.get('/new', (req, res) => {
    res.render('dinosaurs/new')
})

router.get('/:idx', (req, res) => {
    const dinosaurs = fs.readFileSync(__dirname + '/../dinosaurs.json');
    const dinoData = JSON.parse(dinosaurs);
    //get the idx value from the url parameters
    let dinoIndex = parseInt(req.params.idx);
    res.render('dinosaurs/show', {
        myDino: dinoData[dinoIndex]
    })
})


module.exports = router;