
var fs = require('node:fs')
// Application using the 'Pug' template system
var express = require('express'),
    logger = require('morgan');
var app = express();
var x = 4;
var y = 5;


// Connecting to Mongodb database
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://Przemek:lab6password@lab6.dylwucr.mongodb.net/test');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Creating a Schema and model
const rowSchema = new mongoose.Schema({
  x: String,
  y: String,
  operation: String
});
const Row = mongoose.model('Row', rowSchema);




// Configuring the application
app.set('views', __dirname + '/views');               // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');                        // Use the 'Pug' template system
app.locals.pretty = app.get('env') === 'development'; // The resulting HTML code will be indented in the development environment
// Determining the contents of the middleware stack
app.use(logger('dev'));                            // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory


// *** Route definitions ***

// The first route
app.get('/', function (req, res) {
    let result = parseInt(x) + parseInt(y)
    res.render('index', {x: x, y: y, result: result}); // Render the 'index' view
});

app.get('/json/:name', function (req, res) {

    var url = new URL(req.url, `http://${req.headers.host}`)
    var data = new Array
    var table = '<br />tr' + '<br />\t\tth x' + '<br />\t\tth #[strong respected]operation' + '\b\r' +  '<br />\t\tth y' + '<br />\t\tth result'
    console.log('url: ' + url)
    console.log('url.password: ' + url.password)
    console.log('url.pathname: ' + url.pathname)

    let temp = url.pathname.split(':')
    let j_file = temp[1]
    let j_content = fs.readFileSync(j_file)
    console.log('j_content: ' + j_content)
    console.log('j_file: ' + j_file)

    let j_data = JSON.parse(j_content)
    console.log('j_data: ' + j_data)
    console.log('j_data[0].operation: ' + j_data[0].operation)

    for (let i=0; i<j_data.length; i++){
        let a = parseInt(j_data[i].x)
        let b = parseInt(j_data[i].y)
        let operation = j_data[i].operation
        let result = 0
        if (operation == '+'){
            result = a + b
        }
        else if (operation == '-'){
            result = a-b
        }
        else if (operation == '*'){
            result = a*b
        }
        else if (operation == '/'){
            result = a/b
        }
        else {
            result = "Invalid operation"
        }
        
        if (result == "Invalid operation"){
            console.log(result + ": '" + operation + "'")
        }
        else {
            console.log(a + operation + b + '=' + result)
        }

        table += '<br />tr\n\t\t' + 'td' + a + '<br />\t\ttd' + operation + '<br />\t\ttd' + b + '<br />\t\ttd' + result
        data.push([a, operation, b, result])

    }

    res.render('index', {data: data})

})


app.get('/calculate/:operation/:x/:y', function(req, res){

    var url = new URL(req.url, `http://${req.headers.host}`)
    console.log('url: ' + url)
    console.log('url.password: ' + url.password)
    console.log('url.pathname: ' + url.pathname)
  
    let temp = url.pathname.split(':')
    let operation = temp[1].replace('/', '')
    let x = temp[2].replace('/', '')
    let y = temp[3].replace('/', '')
    let result = 0
    console.log('temp: ' + temp)
    console.log('operation: ' + operation)
    console.log('x: ' + x)
    console.log('y: ' + y)
  
    let a = parseInt(x)
    let b = parseInt(y)
    if (operation == '+'){
        result = a+b
    }
    else if (operation == '-'){
        result = a-b
    }
    else if (operation == '*'){
        result = a*b
    }
    else if (operation == 'div'){
        result = a/b
    }
    else {
        result = "Invalid operation"
    }
    
    if (result == "Invalid operation"){
        console.log(result + ": '" + operation + "'")
    }
    else {
        console.log(a + operation + b + '=' + result)
    }
  
    res.render('index', {x: x, y:y, operation: operation, result: result});


    // Adding current data to database
    const cur_row = new Row({ x: x, y: y, operation: operation });
    console.log('cur_row.x: ' + cur_row.x);
    console.log('cur_row.y: ' + cur_row.y);
    console.log('cur_row.operation: ' + cur_row.operation);
    
    async function add(){
        await cur_row.save();
    }
    add()

  });


  app.get('/results', function(req, res){

    async function dataPull(){
      let rows = await Row.find();
      console.log('rows: ' + rows);
      console.log('rows[0].operation: ' + rows[0].operation)

      // Response to client
      res.render('index', {rows: rows});  
    }
    
    dataPull()
  
  })


// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});
