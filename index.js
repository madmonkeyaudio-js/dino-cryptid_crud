const express = require('express');
const layouts = require('express-ejs-layouts')
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

app.use(layouts);
app.use('/', express.static('static'));

app.use('/dinosaurs', require('./controllers/dinosaur'));
app.use('/cryptids', require('./controllers/cryptid'));


app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('*', (req, res) => {
    res.render('404.ejs');
})

app.listen(8000, () => {
    console.log('The server is live @ 8000!')
});