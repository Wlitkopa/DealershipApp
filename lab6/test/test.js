
//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");


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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// UNIT test begin
describe('GET /', function() {
      it('respond with html', function(done) {
         server
         .get('/')
         .expect('Content-Type', /html/)
         .expect(200, done);
      });
});

// app1.js
describe('GET /', function() {
      it('app1.js - respond with html', function(done) {
         server
         .get('/')
         .expect('Content-Type', /html/)
         .expect(200, `
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
      <a>1 + 2 = 3</a>
    </main>
    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossorigin="anonymous">
    </script>
  </body>
</html>\n`, done);
      });
});

// app2.js
describe('GET /', function() {
      it('app2.js - respond with html', function(done) {
         server
         .get('/')
         .expect('Content-Type', /html/)
         .expect(200,`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <title>Your first page</title>
    <style>
       


tr {
    border: 1px solid black;
}
/* 
td {
    border-top: 1px solid black;
    padding: 1em;
} */
    </style>
  </head>
  <body>
    <main class="container">
      <h1>Hello World</h1>
      <p>4 + 5 = 9</p>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
  </body>
</html>` , done);
      });
});


var assert = require('chai').assert
var chai = require('chai');
chai.use(require('chai-json'));

// app1.js - arithmetic computations test
describe('GET /json/:operations.json', function() {
  it('app1.js - respond with html and proper computations given in table', function(done) {
     server
     .get('/json/:operations.json')
     .expect('Content-Type', /html/)
     .expect(200,`<!DOCTYPE html>
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
            <tr><th style="text-align:center">x</th><th style="text-align:center">operation</th><th style="text-align:center">y</th><th style="text-align:center">result</th></tr><tr style="border-bottom: thin solid black"><td style="text-align:center">5</td><td style="text-align:center"+</td><td style="text-align:center">3</td><td style="text-align:center">8</td></tr><tr style="border-bottom: thin solid black"><td style="text-align:center">10</td><td style="text-align:center"-</td><td style="text-align:center">4</td><td style="text-align:center">6</td></tr><tr style="border-bottom: thin solid black"><td style="text-align:center">7</td><td style="text-align:center"*</td><td style="text-align:center">4</td><td style="text-align:center">28</td></tr><tr style="border-bottom: thin solid black"><td style="text-align:center">56</td><td style="text-align:center"/</td><td style="text-align:center">8</td><td style="text-align:center">7</td></tr><tr style="border-bottom: thin solid black"><td style="text-align:center">1</td><td style="text-align:center"kot</td><td style="text-align:center">0</td><td style="text-align:center">Invalid operation</td></tr>
          </table>
        </main>
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
            crossorigin="anonymous">
        </script>
      </body>
    </html>
    `, done);
  });
});

// app2.js - arithmetic computations test
describe('GET /json/:operations.json', function() {
  it('app2.js - respond with html and proper computations given in table', function(done) {
     server
     .get('/json/:operations.json')
     .expect('Content-Type', /html/)
     .expect(200,`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <title>Your first page</title>
    <style>
       


tr {
    border: 1px solid black;
}
/* 
td {
    border-top: 1px solid black;
    padding: 1em;
} */
    </style>
  </head>
  <body>
    <main class="container">
      <h1>Hello World</h1>
      <table width="100%" cellspacing="0" cellpadding="0" border="0">
        <thead>
          <tr>
            <th>x</th>
            <th>operation</th>
            <th>y</th>
            <th>result</th>
          </tr>
        </thead>
        <tbody></tbody>
        <tr>
          <td>5</td>
          <td>+</td>
          <td>3</td>
          <td>8</td>
        </tr>
        <tr>
          <td>10</td>
          <td>-</td>
          <td>4</td>
          <td>6</td>
        </tr>
        <tr>
          <td>7</td>
          <td>*</td>
          <td>4</td>
          <td>28</td>
        </tr>
        <tr>
          <td>56</td>
          <td>/</td>
          <td>8</td>
          <td>7</td>
        </tr>
        <tr>
          <td>1</td>
          <td>kot</td>
          <td>0</td>
          <td>Invalid operation</td>
        </tr>
      </table>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
  </body>
</html>`, done);
  });
}); 


// app1.js - arithmetic computations test
describe('GET /json/:operations.json', function() {
  it('app1.js - testing json file', function(done) {
     server
     .get('/json/:operations.json')
     .expect('Content-Type', /html/)
     .expect(200, done);
     testFile = "/home/przemek/VSCodeProjects/HTMLProjects/ps_html/lab6/hello_world/operations.json"
     let expect = require('chai').expect
     expect(testFile).to.be.a.jsonFile().and.contain.jsonWithProps({ x: '5' });
     expect(testFile).to.be.a.jsonFile().and.contain.jsonWithProps({ operation: '*' });
     expect(testFile).to.be.a.jsonFile().and.contain.jsonWithProps({ y: '8' });
     expect(testFile).to.be.a.jsonFile().and.contain.jsonWithProps({ operation: '+' });
  });
});

// app2.js - arithmetic computations test
describe('GET /json/:operations.json', function() {
  it('app2.js - testing json file', function(done) {
     server
     .get('/json/:operations.json')
     .expect('Content-Type', /html/)
     .expect(200, done);
     testFile = "/home/przemek/VSCodeProjects/HTMLProjects/ps_html/lab6/hello_world/operations.json"
     let expect = require('chai').expect
     expect(testFile).to.be.a.jsonFile().and.contain.jsonWithProps({ x: '5' });
     expect(testFile).to.be.a.jsonFile().and.contain.jsonWithProps({ operation: '*' });
     expect(testFile).to.be.a.jsonFile().and.contain.jsonWithProps({ y: '8' });
     expect(testFile).to.be.a.jsonFile().and.contain.jsonWithProps({ operation: '+' });
  });
}); 



// app1.js - results route
describe('GET /results', function() {
  it('app1.js - respond with html and table created with database data', function(done) {
     server
     .get('/results')
     .expect('Content-Type', /html/)
     .expect(200,`<!DOCTYPE html>
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
            <tr><th style="text-align:center">x</th><th style="text-align:center">operation</th><th style="text-align:center">y</th></tr><tr style="border-bottom: thin solid black"><td style="text-align:center">22</td><td style="text-align:center">*</td><td style="text-align:center">4</td></tr><tr style="border-bottom: thin solid black"><td style="text-align:center">30</td><td style="text-align:center">div</td><td style="text-align:center">6</td></tr><tr style="border-bottom: thin solid black"><td style="text-align:center">9</td><td style="text-align:center">*</td><td style="text-align:center">7</td></tr><tr style="border-bottom: thin solid black"><td style="text-align:center">100</td><td style="text-align:center">-</td><td style="text-align:center">13</td></tr>
          </table>
        </main>
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
            crossorigin="anonymous">
        </script>
      </body>
    </html>
    `, done);

  });
});

// app2.js - results route
describe('GET /results', function() {
  it('app2.js - respond with html and table created with database data', function(done) {
     server
     .get('/results')
     .expect('Content-Type', /html/)
     .expect(200,`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <title>Your first page</title>
    <style>
       


tr {
    border: 1px solid black;
}
/* 
td {
    border-top: 1px solid black;
    padding: 1em;
} */
    </style>
  </head>
  <body>
    <main class="container">
      <h1>Hello World</h1>
      <p> +  = </p>
      <table width="100%" cellspacing="0" cellpadding="0" border="0">
        <thead>
          <tr>
            <th>x</th>
            <th>operation</th>
            <th>y</th>
          </tr>
        </thead>
        <tbody></tbody>
        <tr>
          <td>22</td>
          <td>*</td>
          <td>4</td>
        </tr>
        <tr>
          <td>30</td>
          <td>div</td>
          <td>6</td>
        </tr>
        <tr>
          <td>9</td>
          <td>*</td>
          <td>7</td>
        </tr>
        <tr>
          <td>100</td>
          <td>-</td>
          <td>13</td>
        </tr>
      </table>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
  </body>
</html>`, done);
  });

}); 



// app1.js - calc route
describe('GET /calculate/:*/:24/:4', function() {
  it('app1.js - respond with html and proper computation', function(done) {
     server
     .get('/calculate/:*/:24/:4')
     .expect('Content-Type', /html/)
     .expect(200,`<!DOCTYPE html>
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
        <p>24 * 4 = 96</p>
      </main>
      <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
          crossorigin="anonymous">
      </script>
    </body>
  </html>
  `, done);


  async function deleteNew(){
    const doc = await Row.findOne({x: "24"});

    // Delete the document so Mongoose won't be able to save changes
    console.log('================================')
    console.log('doc._id: ' + doc._id)
    console.log('================================')
    await Row.deleteOne({ _id: doc._id });

  }
  deleteNew()
  


  });
});

// app2.js - calc route
describe('GET /calculate/:div/:92/:2', function() {
  it('app2.js - respond with html and proper computation', function(done) {
     server
     .get('/calculate/:div/:92/:2')
     .expect('Content-Type', /html/)
     .expect(200,`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <title>Your first page</title>
    <style>
       


tr {
    border: 1px solid black;
}
/* 
td {
    border-top: 1px solid black;
    padding: 1em;
} */
    </style>
  </head>
  <body>
    <main class="container">
      <h1>Hello World</h1>
      <p>92 div 2 = 46</p>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
  </body>
</html>`, done);
  });

  async function deleteNew(){
    const doc = await Row.findOne({x: "92"});

    // Delete the document so Mongoose won't be able to save changes
    console.log('================================')
    console.log('doc._id: ' + doc._id)
    console.log('================================')
    await Row.deleteOne({ _id: doc._id });
  }

  deleteNew()
}); 





