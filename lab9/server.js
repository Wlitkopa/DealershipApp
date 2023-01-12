
const express = require('express');
const logger = require('morgan');
var fs = require('node:fs')
var qs = require('querystring');
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const helmet = require('helmet')


// Configuring the application
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.locals.pretty = app.get('env') === 'development';

// Determining the contents of the middleware stack
app.use(logger('dev'));
// app.use(express.static(__dirname + '/public'));

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

  const reg = new RegExp('/*.jpg')

  var user = ''
  var dates = ''


function addCar(command, res){
  // let new_car_prompt = prompt("car amount sell_cost rent_cost_per_day img_url");
  // new_car = new_car_prompt.split(' ')

  // Gran_torino 4 2000 400 gran_torino.jpg

  var new_car = new Car({ brand: command[1], amount: command[2], sell_cost: command[3], rent_cost: command[4], src: command[5] });

  
  async function add(res){
      await new_car.save();
      let message = 'Car successfully added'
      let cars = await Car.find()
      let bought = await Bought.find()
      let rented = await Rented.find()
      res.send({message: 'Samochód został dodany poprawnie', cars: cars})

  }
  add(res)
  
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
      res.send({message: message}); 
      return
    }
  
    if (toBuy[0] == undefined){
      console.log('There is no such car brand in the storage')
      let message = 'There is no such car brand in the storage'
      res.send({message: message});  
      return
    }
  
    console.log('toBuy[0].amount: ' + toBuy[0].amount)
    
    if (toBuy[0].amount == 0){
      console.log("There is no left car of this brand")
      let message = "There is no left car of this brand"
      res.send({message: message});  
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
    console.log('Dodaję nowy kupiony samochód')
    console.log('new_car.brand: ' + new_bought.brand);
    console.log('new_car.amount: ' + new_bought.amount);
    console.log('new_car.sell_cost: ' + new_bought.sell_cost);
    console.log('new_car.rent_cost: ' + new_bought.rent_cost);
    console.log('new_car.src: ' + new_bought.src);
    await new_bought.save();
    let bought = await Bought.find()
    let cars = await Car.find()
  
  
    let message = 'Successfully bought'
  
    res.send({message: message, bought: bought, cars: cars});  
  
    console.log("===============")
  
  }


  async function returPull(res, command){
    // rent ford Alicja Kaczka 20-11-2003 25-11-2003
    // rented.push([imie, nazwisko, marka, dataw, dataz, koszt, today])

    console.log('returCommand: ' + command)
  
    let toReturn = await Rented.find({brand: command[1], name: command[2], nazwisko: command[3]})
    let toIncrease = await Car.find({brand: command[1]})
  
    console.log('toReturn[0]: ' + toReturn[0])
  
    console.log("DZIAŁA RETUR =============")
  
    if (toReturn[0] == undefined){
        console.log("There is not a person with given name and surname that rented a car/trailer from us or this person did not rent given car")
        let message = 'There is not a person with given name and surname that rented a car/trailer from us or this person did not rent given car'
        let rented = await Rented.find();
        let cars = await Car.find()  
        res.send({message: message, cars: cars, rented: rented}); 
        return 
    }
    else {
      let new_amount = parseInt(toIncrease[0].amount)+1
      console.log('new_amount: ' + new_amount)
      await Car.updateOne({brand: toIncrease[0].brand}, {$set: {amount: new_amount}})
      console.log('=========== id do usunięcia: ' + toReturn[0]._id)
      await Rented.deleteOne({ _id: toReturn[0]._id })
      
      let message = 'Car successfully returned'
      let rented = await Rented.find();
      let cars = await Car.find()
  
      res.send({message: message, rented: rented, cars: cars}) 
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
    
      if (dataw == undefined || dataz == undefined){
          console.log("Enter the date of rent and return")
          let message = "Enter the date of rent and return"
          res.send({message: message});  
          return
      }

      if (a_w == undefined || a_z == undefined){
        console.log("Enter the username data")
        let message = "Enter the username data"
        res.send({message: message});  
        return
    }   
  
      if (toRent[0] == undefined){
        console.log('There is no such car brand in the storage')
        let message = 'There is no such car brand in the storage'
        res.send({message: message});  
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
          res.send({message: message})
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
          res.send({message: message});  
          return
      }
    
    
      if (a_w[2] == a_z[2] && a_w[1] > a_z[1]){
          console.log("Previous date error")
          let message = 'Previous date error'
          res.send({message: message});  
          return 
      }
    
      if (a_w[1] == a_z[1] && a_w[0] > a_z[0]){
      console.log("Previous date error")
      let message = 'Previous date error'
      res.send({message: message});  
      return
      }
    
      if (toRent[0].amount == 0){
          console.log("There is no car of this brand left in the storage")
          let message = 'There is no car of this brand left in the storage'
          res.send({message: message});  
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
      console.log('Dodaję nowy wypożyczony samochód')
      console.log('new_car.brand: ' + new_rent.brand);
      console.log('new_car.src: ' + new_rent.src);
      await new_rent.save();
      let rented = await Rented.find()
      let cars = await Car.find()
  
      let message = 'Successfully rented'
      res.send({message: message, rented: rented, cars: cars}); 
  
      return
  
  }
 

app.get('/', function (req, res) {
    async function getmethod(res){
        // let rented = await Rented.find()
        // let bought = await Bought.find()
        let cars = await Car.find()
        let rented = await Rented.find()
        let bought = await Bought.find()
        res.render('index1', {cars: cars, bought: bought, rented: rented});
    }
      getmethod(res)
});


app.get(reg, function ( req , res ) {
    let n = req.originalUrl
    console.log('req.originalUrl: ' + req.originalUrl)
    let dirs = n.split('/')
    console.log('dirs: ' + dirs)
    console.log("inserting car image ")
    let fileToLoad = fs.readFileSync('/home/przemek/VSCodeProjects/HTMLProjects/ps_html/lab9/obrazy/' + dirs[1]);
    res.writeHead(200, {'Content-Type':  'image/jpg' });
    res.end(fileToLoad, 'binary');
}
)


app.put('/', function(req, res){

    var body = ''
    req.on('data', function (data) {
        body += data;
        console.log('body: ' + body)
    });

    req.on('end', function () {
        var put = qs.parse(body);
        // use post['blah'], etc.
        switch (req.accepts(['html', 'text', 'json', 'xml'])) {
            case 'json':
                // Send the JSON greeting
                res.type('application/json');
                res.json({ welcome: "Hello World" });
                console.log("The server sent a JSON document to the browser");
                break;
    
            case 'xml':
                // Send the XML greeting
                res.type('application/xml');
                res.send('<welcome>Hello World</welcome>');
                console.log("The server sent an XML document to the browser");
                break;
    
            default:
                // Send the text plain greeting
                let sendedData = put.data
                sendedData = sendedData.split(':')
                console.log('sendedData: ' + sendedData)
                if (sendedData[0] == 'user'){
                    console.log('sendedData[1]: ' + sendedData[1])
                    user = sendedData[1].split(' ')
                    res.type('text/plain');
                    res.send({message: 'UserSuccess'});
                }
                else if (sendedData[0] == 'dates'){
                    console.log('sendedData[1]: ' + sendedData[1])
                    dates = sendedData[1].split(' ')
                    res.type('text/plain');
                    res.send({message: 'DatesSuccess'});
                }
                else if (sendedData[0] == 'add'){
                    console.log('sendedData[1]: ' + sendedData[1])
                    let temp1 = sendedData[1].split(' ')
                    console.log('sendedData[1].split(" "): ' + temp1)
                    res.type('text/plain');
                    let command = new Array
                    if (temp1.length != 5){
                        res.send({message: 'Samochód dodaj poprawnie:  marka  ilość  koszt_kupna  koszt_wypożyczenia  img_url(src)'});
                    }
                    else {
                        command = ['add', temp1[0], temp1[1], temp1[2], temp1[3], temp1[4]]
                        console.log('command: ' + command)
                        console.log('command[2]: ' + command[2])
                        addCar(command, res)

                    }


                }
        }
    })

})


app.post('/', function (req, res) {
    // console.log(req.query.imie)
    // Return the greeting in the format preferred by the WWW client
    var body = ''
    req.on('data', function (data) {
        body += data;
        console.log('body: ' + body)
    });

    req.on('end', function () {
        var post = qs.parse(body);
        // use post['blah'], etc.
        switch (req.accepts(['html', 'text', 'json', 'xml'])) {
            case 'json':
                // Send the JSON greeting
                res.type('application/json');
                res.json({ welcome: "Hello World" });
                console.log("The server sent a JSON document to the browser");
                break;
    
            case 'xml':
                // Send the XML greeting
                res.type('application/xml');
                res.send('<welcome>Hello World</welcome>');
                console.log("The server sent an XML document to the browser");
                break;
    
            default:
                // Send the text plain greeting
                console.log("Działa POST");
                let command = new Array
                command = ['sell', post.brand, user[0], user[1]]
                boughtPull(res, command)
        }
    })
    

});


app.delete('/', function (req, res) {
    // console.log(req.query.imie)
    // Return the greeting in the format preferred by the WWW client
    var body = ''
    req.on('data', function (data) {
        body += data;
        console.log('body: ' + body)
    });

    req.on('end', function () {
        var del = qs.parse(body);
        // use post['blah'], etc.
        switch (req.accepts(['html', 'text', 'json', 'xml'])) {
            case 'json':
                // Send the JSON greeting
                res.type('application/json');
                res.json({ welcome: "Hello World" });
                console.log("The server sent a JSON document to the browser");
                break;
    
            case 'xml':
                // Send the XML greeting
                res.type('application/xml');
                res.send('<welcome>Hello World</welcome>');
                console.log("The server sent an XML document to the browser");
                break;
    
            default:
                // Send the text plain greeting
                console.log("Działa DELETE");
                let data = del.data
                let temp2 = data.split(':')
                let command = new Array

                if (temp2[0] == 'retur'){
                    console.log('To jest Array')
                    temp2 = temp2[1].split(' ')
                    command = ['retur', temp2[0], temp2[1], temp2[2]]
                    returPull(res, command)
                }
                else {
                    console.log('To jest string')
                    console.log('temp2: ' + temp2)
                    console.log('temp2[1]: ' + temp2[1])
                   
                    command = ['rent', temp2[1], user[0], user[1], dates[0], dates[1]]
                    rentedPull(res, command)
                }

        }
    })
    

});


// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});

