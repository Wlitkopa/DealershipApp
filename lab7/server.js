
// import { check_file } from '..cw4/zadanie3.js';
// import * as http from 'http';
// import * as fs from 'node:fs';
var fs = require('node:fs')
var http = require('http')
var qs = require('querystring')
const express = require('express')
const logger = require('morgan')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const helmet = require('helmet')
app.use(helmet({crossOriginEmbedderPolicy: false}));

app.use(helmet.contentSecurityPolicy({
  directives: {
    styleSrc: ["https://www.w3schools.com/w3css/4/w3.css", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css", "'self'", "'unsafe-inline'",
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"],
  },
}));

// Configuring the application
app.set('views', __dirname + '/views');               // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');                        // Use the 'Pug' template system
app.locals.pretty = app.get('env') === 'development'; // The resulting HTML code will be indented in the development environment
// Determining the contents of the middleware stack
app.use(logger('dev'));                               // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
// app.use(express.static(__dirname + '/public'));    // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));


// configure our application
// const Express = require('express');
// import * as Express from 'express'
// const app = new Express();
// app.use(Express.static(__dirname + '/obrazy'));

const reg = new RegExp('/*.jpg')

// Connecting to Mongodb database
const mongoose = require('mongoose');
const { brotliCompress } = require('node:zlib')
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://Przemek:lab6password@lab6.dylwucr.mongodb.net/test');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Creating a Schema and model of car in storage
const car = new mongoose.Schema({
  brand: String,
  amount: String,
  sell_cost: String,
  rent_cost: String,
  src: String
});
const Car = mongoose.model('Car', car);


// Creating a Schema and model of bought cars
const bought = new mongoose.Schema({
  brand: String,
  name: String,
  surname: String,
  cost: String,
  bought_date: String
});
const Bought = mongoose.model('Bought', bought);


// Creating a Schema and model of rented cars
const rentedd = new mongoose.Schema({
  brand: String,
  name: String,
  surname: String,
  cost: String,
  dataw: String,
  dataz: String,
  bought_date: String
});
const Rented = mongoose.model('Rented', rentedd);

// var url = new URL(request.url, `http://${request.headers.host}`); // Create the URL object



// sell Fiat_Tipo Henryk Kaczka
// rent Fiat_Tipo Henryk Kaczka 23-10-2002 25-10-2002
// retur Fiat_Tipo Henryk Kaczka 23-10-2002 25-10-2002

function addCar(command, res){
  // let new_car_prompt = prompt("car amount sell_cost rent_cost_per_day img_url");
  // new_car = new_car_prompt.split(' ')


  // Gran_torino 4 2000 400 gran_torino.jpg

  const new_car = new Car({ brand: command[1], amount: command[2], sell_cost: command[3], rent_cost: command[4], src: command[5] });
  console.log('Dodaję nowy samochód')
  console.log('new_car.brand: ' + new_car.brand);
  console.log('new_car.amount: ' + new_car.amount);
  console.log('new_car.sell_cost: ' + new_car.sell_cost);
  console.log('new_car.rent_cost: ' + new_car.rent_cost);
  console.log('new_car.src: ' + new_car.src);

  
  async function add(){
      await new_car.save();
      let message = 'Car successfully added'
      let cars = await Car.find()
      let bought = await Bought.find()
      let rented = await Rented.find()
      res.render('index_get', {message: message, cars: cars, bought: bought, rented: rented})

  }
  add()
  
}


function generatehtml(response){

    response.write(`<!DOCTYPE html>
    <html lang="en">
      <!-- Zmień wartość "lang" z 'en' na 'pl' -->
    
      <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, initial-scale=1">
        <link rel="stylesheet"
            href="animations.css"
            media="screen"
            type="text/css">
        <link rel="stylesheet"
              href="https://www.w3schools.com/w3css/4/w3.css"><!-- Icons -->
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
        <link rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
        <title>
          Wypożyczalnia samochodów
        </title>
      </head>
      <body style="height: 100%;">
    
        <header class="w3-display-container w3-border w3-amber w3-padding w3-container w3-cell-row w3-border-amber w3-large">
          <div>
            <div class="w3-left"><i class="fa fa-car w3-xxlarge"></i></div>
          
            <div class="w3-right  w3-hide-small"><button class="w3-button w3-border w3-round w3-padding w3-right w3-border-black w3-amber w3-hide-small w3-yellow">Szukaj</button></div>
            <div class="w3-right w3-margin-right  w3-hide-small"><input class="w3-input w3-right w3-round w3-margin-right" placeholder="szukaj"></div>
            
    
            <div class="w3-dropdown-click w3-right w3-margin-right w3-hide-small">
              <button onclick="myFunction()" class="w3-button w3-margin-right w3-hide-small"><i class="fa fa-caret-down"></i>&nbsp;&nbsp; Pojazdy</button>
              <div id="large" class="w3-dropdown-content w3-bar-block w3-border w3-margin-right w3-round w3-border-grey w3-hide-small">
                <a class="w3-bar-item w3-button">Samochody</a>
                <a class="w3-bar-item w3-button">Przyczepy</a>
              </div>
            </div>
    
            <!-- <div class="w3-dropdown-click w3-right w3-margin-right w3-hide-large w3-hide-medium">
              <button onclick="myFunction()" class="w3-bar-item w3-button w3-padding w3-margin-right w3-border w3-border-black w3-round">&#9776;</button>
              <div id="small" class="w3-dropdown-content w3-bar-block w3-border w3-margin-right w3-round w3-border-grey w3-hide-small">
                <a class="w3-bar-item w3-button">Samochody</a>
                <a class="w3-bar-item w3-button">Przyczepy</a>
              </div>
            </div> -->
    
    
            <div>
              <a href="javascript:void(0)" class="w3-bar-item w3-button w3-right w3-border w3-border-black w3-round w3-hide-large w3-hide-medium w3-yellow" onclick="myFunction()">&#9776;</a>
            </div>
    
            <div id="small" class="w3-bar-block w3-amber w3-hide w3-hide-large w3-hide-medium">
              <a href="#" class="w3-bar-item w3-button w3-border w3-border-black w3-round w3-yellow">Samochody</a>
              <a href="#" class="w3-bar-item w3-button w3-border w3-border-black w3-round w3-yellow">Przyczepy</a>
              <input class= "w3-hide-large w3-hide-medium w3-border w3-border-black w3-round" type="text" placeholder="Szukaj">
                  <button class="w3-hide-large w3-button w3-hide-medium w3-border w3-border-black w3-round w3-yellow">Szukaj</button>
          </div>
    
          </div>
        </header>
    
            <!-- CANVAS  -->
            <canvas id="canvas"
            width="700"
            height="400"
            style="border:1px solid #000000; position: relative; z-index: 1; clear: both; position:sticky; float: right; margin: 10px; top: 0px;"
            class="w3-right"
            role="img" 
            aria-label="Bar Chart Values of avaiable cars">
        Wygląda na to, że twoja przeglądarka nie obsługuje elementu "canvas" / It looks like your browser does not support the "canvas" element
            </canvas>
    
            <canvas id="canvas1"
            width="200"
            height="300"
            style="border:1px solid #000000; position:sticky; float: right; margin: 10px; top: 0px;"
            class="w3-right">
      Wygląda na to, że twoja przeglądarka nie obsługuje elementu "canvas" / It looks like your browser does not support the "canvas" element
            </canvas>
    
    
        <button onclick="AccordFunction('Demo1')" class="w3-btn w3-block w3-amber w3-left-align w3-border w3-border-black w3-round w3-margin-bottom w3-margin-top" style="width: 20%; margin-left: 4px;">Dostępne samochody</button>
        <div id="Demo1" class="w3-hide w3-margin-bottom" style="width: 20%">
          <div id="Fiat_Tipo_div">
            <img id="Fiat_Tipo_img" src="fiat_tipo.jpg" alt="Fiat Tipo" style="width:20%">
            <a>Fiat_Tipo</a>
            <a id="Fiat_Tipo_sztuki">Ilość sztuk: </a>
          </div>
    
          <div id="Fiat_500_div">
            <img id="Fiat_500_img" src="fiat500.jpg" alt="Fiat 500" style="width:20%">
            <a>Fiat_500</a>
            <a id="Fiat_500_sztuki">Ilość sztuk: </a>
          </div>
    
          <div id="Przyczepa_jednoosiowa_div">
            <img id="Przyczepa_jednoosiowa_img" src="przyczepa_jedn.jpg" alt="Przyczepa jednoosiowa" style="width:20%">
            <a>Przyczepa_jednoosiowa</a>
            <a id="Przyczepa_jednoosiowa_sztuki">Ilość sztuk: </a>
          </div>
    
          <div id="Przyczepa_samochodowa_div">
            <img id="Przyczepa_samochodowa_img" src="przyczepa.jpg" alt="Fiat Tipo" style="width:20%">
            <a>Przyczepa_samochodowa</a>
            <a id="Przyczepa_samochodowa_sztuki">Ilość sztuk: </a>
          </div>
    
        </div>
                
    
    
        <form method="GET" action="/submit" class="w3-margin">
            <textarea id="commandarea" name="command" rows="4" cols="50" placeholder="Enter the command (<sell, rent, retur>   <car>    <name>   <surname>    <rent_date>    <return_date>)"></textarea>
            <br>
            <input type="submit">
        </form>
    

        <p name="rezultat_komendy" class="w3-border w3-border-black w3-round w3-margin w3-padding w3-left" style="width: 20%;">
            <a>Rezultat komendy: </a>
            <br>
            <a>${wykonaj(url.searchParams.get('command'), response)}</a>
        </p>



        <p name="kupione" class="w3-border w3-border-black w3-round w3-margin w3-padding w3-left" style="width: 20%;">
            <a>Kupione: </a>
            <br>
            <br>
            <a>${showBought()}</a>
        </p>

        <p name="wypozyczone" class="w3-border w3-border-black w3-round w3-margin w3-padding w3-left" style="width: 20%;">
            <a>Wypożyczone: </a>
            <br>
            <br>
            <a>${showRented()}</a>
        </p>
       
      
        <footer class="w3-border w3-border-light-green w3-light-green w3-bottom">
          <a class="w3-text-white w3-margin"><i class='far fa-copyright'></i>&nbsp;AGH Company </a>
        </footer>
    
    
        <script>
          function myFunction() {
            var x = document.getElementById("large");
            if (x.className.indexOf("w3-show") == -1) {
              x.className += " w3-show";
            } else { 
              x.className = x.className.replace(" w3-show", "");
            }
            var y = document.getElementById("small");
            if (y.className.indexOf("w3-show") == -1) {
              y.className += " w3-show";
            } else { 
              y.className = y.className.replace(" w3-show", "");
            }
          }
    
          function slow_animation(){
            document.getElementById('small').className = 'dropdown';
          }
    
    
          function AccordFunction(id) {
            var x = document.getElementById(id);
            if (x.className.indexOf("w3-show") == -1) {
              x.className += " w3-show";
            } else { 
              x.className = x.className.replace(" w3-show", "");
            }
          }
          </script>    
    
      </body>
    </html>`)

}


async function returPull(res, command){
  // rent ford Alicja Kaczka 20-11-2003 25-11-2003
  // rented.push([imie, nazwisko, marka, dataw, dataz, koszt, today])

  let toReturn = await Rented.find({brand: command[1], name: command[2], nazwisko: command[3]})
  let toIncrease = await Car.find({brand: command[1]})

  console.log('toReturn[0]: ' + toReturn[0])

  console.log("DZIAŁA RETUR =============")

  if (toReturn[0] == undefined){
      console.log("There is not a person with given name and surname that rented a car/trailer from us or this person did not rent given car")
      let message = 'There is not a person with given name and surname that rented a car/trailer from us or this person did not rent given car'
      res.render('index_get', {message: message}); 
      return 
  }
  else {
    let new_amount = parseInt(toIncrease[0].amount)+1
    console.log('new_amount: ' + new_amount)
    await Car.updateOne({brand: toIncrease[0].brand}, {$set: { amount: new_amount}})
    console.log('=========== id do usunięcia: ' + toReturn[0]._id)
    await Rented.deleteOne({ _id: toReturn[0]._id })
    
    let message = 'Car successfully returned'
    let rented = await Rented.find();
    let bought = await Bought.find()
    let cars = await Car.find()

    res.render('index_get', {message: message, rented: rented, bought: bought, cars: cars}) 
    return
  }
}

async function rentedPull(res, command){
  let toRent = await Car.find({brand: command[1]})
  console.log('toRent[0]: ' + toRent[0])


    // rent ford Alicja Kaczka 20-11-2003 25-11-2003

    console.log("DZIAŁA RENT =============")

    let imie = command[2]
    let nazwisko = command[3]
    let marka = command[1]
    let dataw = command[4]
    let dataz = command[5]
    let a_w = new Array
    let a_z = new Array
    let dniw = 0
    let dniz = 0
    let dni = 0
    let koszt = 0
  
    if (imie == undefined || nazwisko == undefined){
        console.log("Enter the username data")
        let message = "Enter the username data"
        res.render('index_get', {message: message});  
        return
    }

    if (toRent[0] == undefined){
      console.log('There is no such car brand in the storage')
      let message = 'There is no such car brand in the storage'
      res.render('index_get', {message: message});  
      return
    }
  
  
    a_w = dataw.split('-')
    a_z = dataz.split('-')
  
    
    a_w[0] = parseInt(a_w[0])
    a_w[1] = parseInt(a_w[1])
    a_w[2] = parseInt(a_w[2])
    a_z[0] = parseInt(a_z[0])
    a_z[1] = parseInt(a_z[1])
    a_z[2] = parseInt(a_z[2])
    
  
    if (isNaN(a_w[0]) || isNaN(a_w[1]) || isNaN(a_w[2]) || isNaN(a_z[0]) || isNaN(a_z[1]) || isNaN(a_z[2])){
        console.log("As a day, month and year enter the number")
        let message = "As a day, month and year enter the number"
        res.render('index_get', {message: message});  
        return
    }
    else{
        console.log("Wszystko ok z typami zmiennych")
    }
  
    console.log(a_w)
    console.log(a_z)
  
    if (a_w[2] > a_z[2]){
        console.log("Previous date error")
        let message = 'Previous date error'
        res.render('index_get', {message: message});  
        return
    }
  
  
    if (a_w[2] == a_z[2] && a_w[1] > a_z[1]){
        console.log("Previous date error")
        let message = 'Previous date error'
        res.render('index_get', {message: message});  
        return 
    }
  
    if (a_w[1] == a_z[1] && a_w[0] > a_z[0]){
    console.log("Previous date error")
    let message = 'Previous date error'
    res.render('index_get', {message: message});  
    return
    }
  
    if (toRent[0].amount == 0){
        console.log("There is no car of this brand left in the storage")
        let message = 'There is no car of this brand left in the storage'
        res.render('index_get', {message: message});  
        return
    }
    else {
        let new_amount = toRent[0].amount-1
        console.log('new_amount: ' + new_amount)
        await Car.updateOne({brand: toRent[0].brand}, {$set: { amount: new_amount}})    
    }
    
  
    dniw += a_w[0] + a_w[1]*30 + a_w[2]*365
    dniz += a_z[0] + a_z[1]*30 + a_z[2]*365
  
    console.log("dniw: ")
    console.log(dniw)
    console.log("dniz: ")
    console.log(dniz)
    console.log("Difference: ")
    dni = dniz - dniw
    console.log(dni)
    

  
    koszt = parseInt(toRent[0].rent_cost)*dni
    console.log("koszt: ")
    console.log(koszt)
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
  
    today = mm + '-' + dd + '-' + yyyy;
    
    const new_rent = new Rented({ brand: marka, name: imie, surname: nazwisko, cost: koszt, dataw: dataw, dataz: dataz, bought_date: today });
    console.log('Dodaję nowy samochód')
    console.log('new_car.brand: ' + new_rent.brand);
    console.log('new_car.src: ' + new_rent.src);
    await new_rent.save();
    let rented = await Rented.find()
    let bought = await Bought.find()
    let cars = await Car.find()

    let message = 'Successfully rented'
    res.render('index_get', {message: message, rented: rented, bought: bought, cars: cars}); 

    return

}

async function boughtPull(res, command){

  console.log("DZIAŁA boughtPull =============")
  console.log('com_arr: ' + command)

  // let command = com_arr.split(' ')

  let toBuy = await Car.find({brand: command[1]})
  console.log('toBuy: ' + toBuy)
  // console.log('bought[0]: ' + bought[0])
  console.log('command: ' + command)

  let imie = command[2]
  let nazwisko = command[3]
  let marka = command[1]
  let koszt = 0

  if (imie == undefined || nazwisko == undefined){
    console.log('imie: ' + imie)
    console.log('nazwisko: ' + nazwisko)
    console.log("Enter the username data")
    let message = "Enter the username data"
    res.render('index_get', {message: message}); 
    return
  }

  if (toBuy[0] == undefined){
    console.log('There is no such car brand in the storage')
    let message = 'There is no such car brand in the storage'
    res.render('index_get', {message: message});  
    return
  }

  console.log('toBuy[0].amount: ' + toBuy[0].amount)
  
  if (toBuy[0].amount == 0){
    console.log("There is no left car of this brand")
    let message = "There is no left car of this brand"
    res.render('index_get', {message: message});  
    return
  }
  else {
    let new_amount = toBuy[0].amount-1
    console.log('new_amount: ' + new_amount)
    await Car.updateOne({brand: toBuy[0].brand}, {$set: { amount: new_amount}})
  }


  koszt = toBuy[0].sell_cost
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '-' + dd + '-' + yyyy;


  const new_bought = new Bought({ brand: marka, name: imie, surname: nazwisko, cost: koszt, bought_date: today });
  console.log('Dodaję nowy samochód')
  console.log('new_car.brand: ' + new_bought.brand);
  console.log('new_car.amount: ' + new_bought.amount);
  console.log('new_car.sell_cost: ' + new_bought.sell_cost);
  console.log('new_car.rent_cost: ' + new_bought.rent_cost);
  console.log('new_car.src: ' + new_bought.src);
  await new_bought.save();
  let bought = await Bought.find()
  let rented = await Rented.find()
  let cars = await Car.find()


  let message = 'Successfully bought'

  res.render('index_get', {message: message, bought: bought, rented: rented, cars: cars});  

  console.log("===============")

}


router.get('/', function ( req , res ) {
    console.log("Creating a response using index_get")
    async function getmethod(res){
      let rented = await Rented.find()
      let bought = await Bought.find()
      let cars = await Car.find()

      res.render('index_get', {rented: rented, bought: bought, cars: cars})
    }
    getmethod(res)

}
)

router.get(reg, function ( req , res ) {
    let n = req.originalUrl
    console.log('req.originalUrl: ' + req.originalUrl)
    let dirs = n.split('/')
    console.log('dirs: ' + dirs)
    console.log("inserting fiat_tipo.jpg ")
    let fileToLoad = fs.readFileSync('/home/przemek/VSCodeProjects/HTMLProjects/ps_html/lab7/obrazy/' + dirs[1]);
    res.writeHead(200, {'Content-Type':  'image/jpg' });
    res.end(fileToLoad, 'binary');
}
)

router.post('/client' , function ( req , res ) {
  console.log('req.body: ' + req.body)
  console.log('req.body.command: ' + req.body.command)
  var commands = req.body.command.split('\n')
  console.log('commands: ' + commands)
  let temp = commands[0]
  console.log('temp: ' + temp)
  temp = temp.split(' ')
  console.log('temp[0]: ' + temp[0])

  if (temp[0] === 'rent'){
    rentedPull(res, commands[0].split(' '))
  }
  else if (temp[0] === 'retur') {
    returPull(res, commands[0].split(' '))
  }
  else {
    console.log('temp[0][0]: ' + temp[0][0])
    console.log('WRONG COMMAND FOR CLIENT')
    res.render('index_get')
  }

});



router.post('/admin' , function ( req , res ) {
  console.log('req.body: ' + req.body)
  console.log('req.body.command: ' + req.body.command)
  var commands = req.body.command.split('\n')
  console.log('commands: ' + commands)
  let temp = commands[0]
  console.log('temp: ' + temp)
  temp = temp.split(' ')
  console.log('temp[0]: ' + temp[0])



  if (temp[0] === 'sell'){
    // allPull(res)
    boughtPull(res, commands[0].split(' '))
  }

  else if(temp[0] === 'add'){
    addCar(commands[0].split(' '), res)
  }

  else {
    console.log('WRONG COMMAND FOR ADMIN')
    let message = 'Wrong command for admin'
    res.render('index_get', {message: message})
  }

});

app.use('/', router)

app.listen(3001, function () {
    console.log('The application is available on port 3001');
});

