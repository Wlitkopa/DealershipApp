

const express = require('express');
const logger = require('morgan');
var qs = require('querystring');
const cors = require('cors');



/************* */

const app_3000 = express();

// Configuring the application
app_3000.set('views', __dirname + '/views');
app_3000.set('view engine', 'pug');
app_3000.locals.pretty = app_3000.get('env') === 'development';
app_3000.use(logger('dev'));

app_3000.get('/', function (req, res) {
    // res.send('Response from 3000');
    res.render('s1')
});
app_3000.listen(3000, function () {
    console.log('The application is available on port 3000');
});


/************* */

const app_3001 = express();
// app_3001.use(cors({
//     origin: 'http://localhost:3001/'
// }));

app_3001.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app_3001.use(logger('dev'));

app_3001.get('/', function (req, res) {
    // res.type('text/plain');
    res.type('application/xml');

    // console.log(req)
    let lDate = new Date()
    lDate = `${lDate}`
    lDate = lDate.split(' ')
    console.log('Data: ' + lDate[0] + ' ' + lDate[1] + ' ' + lDate[2] + ' ' + lDate[3])
    console.log('Czas: ' + lDate[4])
    let line = `<div>
    <span id='date'> Data: ${lDate[0]} ${lDate[1]} ${lDate[2]} ${lDate[3]}  </span>
    <span id='time'> Czas: ${lDate[4]}  </span>
    <span id='kot'> Kot  </span>

 </div>`
    res.send(line)
});

app_3001.listen(3001, function () {
    console.log('The application is available on port 3001');
});

/************* */

console.log("To stop the server, press 'CTRL + C'");
