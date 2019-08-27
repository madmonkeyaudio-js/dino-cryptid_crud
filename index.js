const express = require('express');
const layouts = require('express-ejs-layouts')
const app = express();
const methodOverride = require('method-override');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
//Method Override middleware intercepts incoming POST requests
//and if they have _method=PUT or _method=DELETE in the query string
//It'll handle it as the respective HTTP verb
app.use(methodOverride('_method'))

//USE LAYOUTS
app.use(layouts);
app.use('/', express.static('static'));

//USE CONTROLLERS
app.use('/dinosaurs', require('./controllers/dinosaur'));
app.use('/cryptids', require('./controllers/cryptid'));

//THE ONLY PAGE NOT USING A CONTROLLER
app.get('/', (req, res) => {
    res.render('home.ejs');
})

//THE 404 PAGE IN CASE SOMETHING GETS TYPED IN WRONG!!
app.get('*', (req, res) => {
    res.render('404.ejs');
})

//THE SERVER IS LISTENING
app.listen(8001, () => {
    console.log('The server is live @ 8001!')
});