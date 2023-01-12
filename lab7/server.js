
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
// const { rent } = require('./dealer_script_lab7')
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
      let rented = await Rented.find();
      let bought = await Bought.find()
      let cars = await Car.find()  
      res.render('index_get', {message: message, cars: cars, bought: bought, rented: rented}); 
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

    if (dataz == undefined || dataw == undefined){
      console.log("Enter the rent and return date")
      let message = "Enter the rent and return date"
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

    async function wrongComm(){
      console.log('WRONG COMMAND FOR CLIENT')
      let message = 'Wrong command for client'
      let rented = await Rented.find()
      let bought = await Bought.find()
      let cars = await Car.find()
      res.render('index_get', {message: message, cars: cars, bought: bought, rented: rented})
    }

    wrongComm()
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

    async function wrongComm(){
      console.log('WRONG COMMAND FOR ADMIN')
      let message = 'Wrong command for admin'
      let rented = await Rented.find()
      let bought = await Bought.find()
      let cars = await Car.find()
      res.render('index_get', {message: message, cars: cars, bought: bought, rented: rented})
    }

    wrongComm()
  }

});

app.use('/', router)

app.listen(3001, function () {
    console.log('The application is available on port 3001');
});

