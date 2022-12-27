
// import * as fs from 'node:fs';
var fs = require('node:fs')

// No use of any template system
var express = require('express')
var logger = require('morgan')
var app = express()
var x = 1;
var y = 2;




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




// Determining the contents of the middleware stack
app.use(logger('dev'));                            // Place an HTTP request recorder on the stack — each request will be logged in the console in 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// *** Route definitions ***

// The first route
app.get('/', function (req, res) {
  res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossorigin="anonymous">
    <title>Your first page</title>
  </head>
  <body>
    <main class="container">
      <h1>Hello World</h1>
      <a>${x} + ${y} = ${x + y}</a>
    </main>
    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossorigin="anonymous">
    </script>
  </body>
</html>
`); // Send a response to the browser
});


app.get('/json/:name', function (req, res) {

    var url = new URL(req.url, `http://${req.headers.host}`)
    var table = '<tr>' + '<th style="text-align:center">x</th>' + '<th style="text-align:center">operation</th>' + '<th style="text-align:center">y</th>' + '<th style="text-align:center">result</th>' + '</tr>'
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

        table += '<tr style="border-bottom: thin solid black">' + '<td style="text-align:center">' + a + '</td>' + '<td style="text-align:center"' + operation+ '</td>' + '<td style="text-align:center">' + b + '</td>' + '<td style="text-align:center">' + result + '</td>' + '</tr>'


    }



    res.send(`<!DOCTYPE html>
    <html lang="en">
    <style>
        tr {
          border-bottom:1px solid black;
        }
    </style>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
            rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
            crossorigin="anonymous">
        <title>Your first page</title>
      </head>
      <body>
        <main class="container">
          <h1>Hello World, json route</h1>
          <table>
            ${table}
          </table>
        </main>
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
            crossorigin="anonymous">
        </script>
      </body>
    </html>
    `);
});


app.get('/calculate/:operation/:x/:y', function(req, res){


  // Setting variables
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
      result = a + b
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


  // Response to client
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <style>
      tr {
        border-bottom:1px solid black;
      }
  </style>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous">
      <title>Your first page</title>
    </head>
    <body>
      <main class="container">
        <h1>Hello World, calc route</h1>
        <p>${x} ${operation} ${y} = ${result}</p>
      </main>
      <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
          crossorigin="anonymous">
      </script>
    </body>
  </html>
  `);
  

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
    var table = '<tr>' + '<th style="text-align:center">x</th>' + '<th style="text-align:center">operation</th>' + '<th style="text-align:center">y</th>' + '</tr>'
    console.log('rows: ' + rows);
    console.log('rows[0].operation: ' + rows[0].operation)


    for (let i=0; i<rows.length; i++){
      let a = parseInt(rows[i].x)
      let b = parseInt(rows[i].y)
      let operation = rows[i].operation

      table += '<tr style="border-bottom: thin solid black">' + '<td style="text-align:center">' + a + '</td>' + '<td style="text-align:center">' + operation + '</td>' + '<td style="text-align:center">' + b + '</td>' + '</tr>'


  }

      // Response to client
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <style>
        tr {
          border-bottom:1px solid black;
        }
    </style>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
            rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
            crossorigin="anonymous">
        <title>Your first page</title>
      </head>
      <body>
        <main class="container">
          <h1>Hello World, results route</h1>
          <table>
            ${table}
          </table>
        </main>
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
            crossorigin="anonymous">
        </script>
      </body>
    </html>
    `);

  }
  dataPull()


})


// The application is to listen on port number 3000
app.listen(3000, function () {
  console.log('The application is available on port 3000');
});
