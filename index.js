const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


//app.use(express.static('static'));
const path = require('path');
app.use(express.static(path.join(__dirname, 'static')));


/**
 * Include all the routes
 */
require('./route/routes')(app);

app.use((err, req, res, next)=>{
    res.end('Problem...');
    console.log(err);
});

const server = app.listen(3000, function () {
    console.log("On :3000");
});
