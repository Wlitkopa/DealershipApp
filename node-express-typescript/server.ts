
import express, { Express, Request, response, Response } from "express";
import morgan from "morgan";
import rateLimit from 'express-rate-limit'
import * as fs from 'fs';
import qs, { stringify, ParsedUrlQuery } from "querystring";
import helmet from 'helmet'
import session from 'express-session';
import csurf from 'csurf';
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cors from 'cors'

// import GoogleStrategy from 'passport-google-oauth20';
import {Strategy as GoogleStrategy } from 'passport-google-oauth20';
// var FacebookStrategy = require('passport-facebook');
import {Strategy as FacebookStrategy} from 'passport-facebook'


const rateLimiterUsingThirdParty = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
    max: 100,
    message: 'You have exceeded the 100 requests in 24 hrs limit!', 
    standardHeaders: true,
    legacyHeaders: false,
  });



// const mongoose = require('mongoose');
import { Schema, model, connect, Document, Model, NumberExpression } from 'mongoose';
import path from "path";
import OAuth2Strategy from "passport-oauth2";
import { resourceUsage } from "process";
// const { brotliCompress } = require('node:zlib')

const app: Express = express()
const reg = new RegExp('/*.jpg')



// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3001',);
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept",
//     );
    
//     next();
//   });

// app.use('/login/google', cors({
//     origin: '*',
//     methods: "GET, POST, PATCH, DELETE, PUT",
//     allowedHeaders: "Content-Type, Authorization",
// }));


// app.use('/oauth2/redirect/google', cors({
//     origin: '*',
//     methods: "GET, POST, PATCH, DELETE, PUT",
//     allowedHeaders: "Content-Type, Authorization",
// }), (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// });


// app.options('*', cors())


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
         res.send(200);
     } else {
         next();
     }
    });

// app.use('/login/google', cors({
//     origin: '*',
//     methods: "GET, POST, PATCH, DELETE, PUT",
//     allowedHeaders: "Content-Type, Authorization",
// }), (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// });


// app.use(
//     cors({
//         origin: '*',
//         methods: "GET, POST, PATCH, DELETE, PUT",
//         allowedHeaders: "Content-Type, Authorization",
//        })
//     );


// app.use(cors());


// app.use(cors({origin: "*"}));



// To prevent DDoS attack
// app.use('/download', rateLimit())
app.use(rateLimiterUsingThirdParty);

// Configuring the application
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.locals.pretty = app.get('env') === 'development';


// Determining the contents of the middleware stack
app.use(morgan('dev'));
// app.use(express.static(__dirname + '/public'));


// Connecting to Mongodb database
main().catch(err => console.log(err));
async function main() {
  await connect('mongodb+srv://Przemek:lab6password@lab6.dylwucr.mongodb.net/test');
// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


// To prevent exposing about used frameworks to attackers
app.use(helmet({crossOriginEmbedderPolicy: false}));
// app.use(helmet({permittedCrossDomainPolicies: true}))
app.use(helmet.contentSecurityPolicy({
  directives: {
    styleSrc: ["https://www.w3schools.com/w3css/4/w3.css", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css", "'self'",
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css", "'unsafe-inline'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    scriptSrcAttr: ["'self'", "'unsafe-inline'"],
    connectSrc: ["'self'", "https://accounts.google.com/o/oauth2/*", "https://www.facebook.com/v3.2/dialog/*"],
    fontSrc: ["'self'", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/webfonts/", "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/fonts/bootstrap-icons.woff2?24e3eb84d0bcaf83d77f904c78ac1f47",
                "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/fonts/bootstrap-icons.woff?24e3eb84d0bcaf83d77f904c78ac1f47"],
    defaultSrc: ["'self'"],
    frameAncestors: ["'self'"],
    formAction: ["'self'"],

  },
}));


// "'sha256-YK7amfyP1EyKNu5SYnkYDdM172P0IsCn1Ndz8cnSSkc='", 

// 'sha256-e1IqRLTuXBnx2/tjLle8tOg38404/M78TgBd5VkuaYU=', 'sha256-6F5FKqWmJ0Ei59f4z9SNqJLOO7ygJ9xPn1UXlsFRk0I=', 
// 'sha256-oBFTyWUR8pji6AIv/Z4Dxq5rvbCAf88+YvElwUlpT2o=', 'sha256-1NkfmhNaD94k7thbpTCKG0dKnMcxprj9kdSKzKR6K/k=',
// 'sha256-6F5FKqWmJ0Ei59f4z9SNqJLOO7ygJ9xPn1UXlsFRk0I=', 'sha256-oBFTyWUR8pji6AIv/Z4Dxq5rvbCAf88+YvElwUlpT2o=',
// 'sha256-6F5FKqWmJ0Ei59f4z9SNqJLOO7ygJ9xPn1UXlsFRk0I=', 'sha256-oBFTyWUR8pji6AIv/Z4Dxq5rvbCAf88+YvElwUlpT2o=',
// 'sha256-7cSMvY9sXu0npgNOu3GvEHQ9Szuu2Kqk/0ZtwZvsWWg=', 'sha256-7cSMvY9sXu0npgNOu3GvEHQ9Szuu2Kqk/0ZtwZvsWWg=',
// 'nonce-2726c7f26c',     res.header('Access-Control-Allow-Credentials', 'true')

// , "'sha256-WW1ThadSlVCww9MAwH9Yq7OaEGvfWyH9rfyBzPaLU1w='"



// To prevent executintrueg requests on user's behalf
app.use(cookieParser());
app.use(morgan('dev'));
// require('./')(app);

app.use(session({ secret: 'SECRET' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session



//   file deepcode ignore HardcodedNonCryptoSecret: <please specify a reason of ignoring this>
//   deepcode ignore HardcodedNonCryptoSecret: <please specify a reason of ignoring this>
passport.use(new GoogleStrategy({
    clientID: '1041064661866-o3dft4me2kln0ceh3up11n2las5h4ogm.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/oauth2/redirect/google',
    scope: [ 'profile' ],
    state: true
  },
    async function verify(accessToken, refreshToken, profile, cb) {

        let potUser: any = await userData.find({id: profile.id})
        console.log('Weszło w passport.use')
        console.log('profile: ' + profile)
        console.log('potUser: ' + potUser)
        console.log('profile.displayName: ' + profile.displayName)
        console.log('profile.id: ' + profile.id)

        if (Array.isArray(potUser)){
            console.log('To jest array')
            console.log('potUser.length: ' + potUser.length)
        }
        else{
            console.log('To nie jest array')
        }

        if (potUser == 0){
            console.log('Weszło w if')
            let curUser = {name: profile.displayName, id: profile.id, link: 'https://accounts.google.com'}
            var newUser = new userData(curUser)
            await newUser.save()
            return cb(null, newUser)

        }
        else {
            console.log('Weszło w else')
            return cb(null, potUser)
        }

    // db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', ['https://accounts.google.com', profile.id], function(err, cred) {
    //   if (err) { return cb(err); }
      
    //   if (!cred) {
    //     // The account at Google has not logged in to this app before.  Create a
    //     // new user record and associate it with the Google account.
    //     db.run('INSERT INTO users (name) VALUES (?)', [profile.displayName], function(err) {
    //       if (err) { return cb(err); }

    //       var id = this.lastID;
    //       db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [id, 'https://accounts.google.com', profile.id], function(err) {
    //         if (err) { return cb(err); }
    //         var user = {
    //           id: id,
    //           name: profile.displayName
    //         };
    //         return cb(null, user);
    //       });
    //     });
    //   } 
    //   else {
    //     // The account at Google has previously logged in to the app.  Get the
    //     // user record associated with the Google account and log the user in.
    //     db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, row) {
    //       if (err) { return cb(err); }
    //       if (!row) { return cb(null, false); }
    //       return cb(null, row);
    //     });
    //   }
    // });
  }
));

passport.use(new FacebookStrategy({
    clientID: '906219650568814',
    clientSecret: '436f5472ee45660ed04ea157f6a180fe',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  async function verify(accessToken, refreshToken, profile, cb) {

    let potUser: any = await userData.find({id: profile.id})
    console.log('Weszło w passport.use')


    if (potUser === undefined){
        let curUser = {name: profile.displayName, id: profile.id, link: 'https://accounts.google.com'}
        var newUser = new userData(curUser)
        await newUser.save()
        return cb(null, newUser)

    }
    else {
        return cb(null, potUser)
    }
  }
));


passport.serializeUser(function(user: any, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user: any, done) {
    done(null, user);
  });

// Creating a Schema and model of car in storage
const car: Schema = new Schema({
    brand: String,
    amount: String,
    sell_cost: String,
    rent_cost: String,
    src: String
  });
  const Car = model('Car', car);
  
  
  // Creating a Schema and model of bought cars
  const bought: Schema = new Schema({
    brand: String,
    name: String,
    surname: String,
    cost: String,
    bought_date: String
  });
  const Bought = model('Bought', bought);
  
  
  // Creating a Schema and model of rented cars
  const rentedd: Schema = new Schema({
    brand: String,
    name: String,
    surname: String,
    cost: String,
    dataw: String,
    dataz: String,
    bought_date: String
  });
  const Rented = model('Rented', rentedd);  

  var user: string[]
  var dates: string[]

  // Creating a Schema and model of car in storage
  const dataUser: Schema = new Schema({
    name: String,
    id: String,
    link: String,
  });
  const userData = model('dataUser', dataUser);

  enum WrongData {
    WrongAdd = 'Samochód dodaj poprawnie:  marka  ilość  koszt_kupna  koszt_wypożyczenia  img_url(src)',
    WrongUser = 'Enter the user data properly: name  surname',
    ToLittleBody = 'Nie przesłano nic w body',
    ToMuchBody = 'Przesłano za dużo w body',
    NoCarInStorage = 'There is no such car brand in the storage',
    NoCarLeft = 'There is no left car of this brand',
    NoPersonOrCarRented = 'There is not a person with given name and surname that rented a car/trailer from us or this person did not rent given car',
    PreviousDateError = 'Previous date error',
    WrongDates = 'Enter the dates properly'

  }


// function addCar(command: string[], res: Response): void{
//   // let new_car_prompt = prompt("car amount sell_cost rent_cost_per_day img_url");
//   // new_car = new_car_prompt.split(' ')

//   // Gran_torino 4 2000 400 gran_torino.jpg

//   var new_car = new Car({ brand: command[1], amount: command[2], sell_cost: command[3], rent_cost: command[4], src: command[5] });

  
//   async function add(res: Response): Promise<void | JSON>{
//       await new_car.save();
//       let message = 'Car successfully added'
//       let cars: JSON[] = await Car.find()
//       res.send({message: message, cars: cars})

//   }
//   add(res)
// }


// async function boughtPull(res: Response, command: string[]): Promise<void | JSON>{

//     console.log("DZIAŁA boughtPull =============")
//     console.log('com_arr: ' + command)
  
//     // let command = com_arr.split(' ')
  
//     let toBuy = await Car.find({brand: command[1]})
//     console.log('toBuy: ' + toBuy)
//     // console.log('bought[0]: ' + bought[0])
//     console.log('command: ' + command)
  
//     let imie = command[2]
//     let nazwisko = command[3]
//     let marka = command[1]
//     let koszt = 0
  
//     if (imie == undefined || nazwisko == undefined){
//       console.log('imie: ' + imie)
//       console.log('nazwisko: ' + nazwisko)
//       console.log(WrongData.WrongUser)
//       let message = WrongData.WrongUser
//       res.send({message: message}); 
//       return
//     }
  
//     if (toBuy[0] == undefined){
//       console.log(WrongData.NoCarInStorage)
//       let message = WrongData.NoCarInStorage
//       res.send({message: message});  
//       return
//     }
  
//     console.log('toBuy[0].amount: ' + toBuy[0].amount)
    
//     if (toBuy[0].amount == 0){
//       console.log(WrongData.NoCarLeft)
//       let message = WrongData.NoCarLeft
//       res.send({message: message});  
//       return
//     }
//     else {
//       let new_amount = toBuy[0].amount-1
//       console.log('new_amount: ' + new_amount)
//       await Car.updateOne({brand: toBuy[0].brand}, {$set: { amount: new_amount}})
//     }
  
  
//     koszt = toBuy[0].sell_cost
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, '0');
//     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = today.getFullYear();
  
//     let Passtoday: string = mm + '-' + dd + '-' + yyyy;
  
  
//     const new_bought = new Bought({ brand: marka, name: imie, surname: nazwisko, cost: koszt, bought_date: Passtoday });
//     console.log('Dodaję nowy kupiony samochód')
//     console.log('new_car.brand: ' + new_bought.brand);
//     console.log('new_car.amount: ' + new_bought.amount);
//     console.log('new_car.sell_cost: ' + new_bought.sell_cost);
//     console.log('new_car.rent_cost: ' + new_bought.rent_cost);
//     console.log('new_car.src: ' + new_bought.src);
//     await new_bought.save();
//     let bought = await Bought.find()
//     let cars = await Car.find()
//     let message = 'Successfully bought'
  
//     res.send({message: message, bought: bought, cars: cars});  
  
//     console.log("===============")
  
//   }


//   async function returPull(res: Response, command: string[]): Promise<void | JSON>{
//     // rent ford Alicja Kaczka 20-11-2003 25-11-2003
//     // rented.push([imie, nazwisko, marka, dataw, dataz, koszt, today])

//     console.log('returCommand: ' + command)
  
//     let toReturn = await Rented.find({brand: command[1], name: command[2], nazwisko: command[3]})
//     let toIncrease = await Car.find({brand: command[1]})
  
//     console.log('toReturn[0]: ' + toReturn[0])
  
//     console.log("DZIAŁA RETUR =============")
  
//     if (toReturn[0] == undefined){
//         console.log(WrongData.NoPersonOrCarRented)
//         let message = WrongData.NoPersonOrCarRented
//         let rented = await Rented.find();
//         let cars = await Car.find()  
//         res.send({message: message, cars: cars, rented: rented}); 
//         return 
//     }
//     else {
//       let new_amount = parseInt(toIncrease[0].amount)+1
//       console.log('new_amount: ' + new_amount)
//       await Car.updateOne({brand: toIncrease[0].brand}, {$set: {amount: new_amount}})
//       console.log('=========== id do usunięcia: ' + toReturn[0]._id)
//       await Rented.deleteOne({ _id: toReturn[0]._id })
      
//       let message = 'Car successfully returned'
//       let rented = await Rented.find();
//       let cars = await Car.find()
  
//       res.send({message: message, rented: rented, cars: cars}) 
//       return
//     }
//   }


//   async function rentedPull(res: Response, command: string[]): Promise<void | JSON>{
//     let toRent = await Car.find({brand: command[1]})
//     console.log('toRent[0]: ' + toRent[0])
  
  
//       // rent ford Alicja Kaczka 20-11-2003 25-11-2003
  
//       console.log("DZIAŁA RENT =============")
  
//       let imie: string = command[2]
//       let nazwisko: string = command[3]
//       let marka: string = command[1]
//       let dataw: string = command[4]
//       let dataz: string = command[5]
//       let a_w = new Array
//       let a_z = new Array
//       let dniw: number = 0
//       let dniz: number = 0
//       let dni: number = 0
//       let koszt: string
    
//       if (dataw == undefined || dataz == undefined){
//           console.log("Enter the date of rent and return")
//           let message = "Enter the date of rent and return"
//           res.send({message: message});  
//           return
//       }

//       if (a_w == undefined || a_z == undefined){
//         console.log("Enter the username data")
//         let message = "Enter the username data"
//         res.send({message: message});  
//         return
//     }   
  
//       if (toRent[0] == undefined){
//         console.log('There is no such car brand in the storage')
//         let message = 'There is no such car brand in the storage'
//         res.send({message: message});  
//         return
//       }
    
    
//       a_w = dataw.split('-')
//       a_z = dataz.split('-')
    
      
//       a_w[0] = parseInt(a_w[0])
//       a_w[1] = parseInt(a_w[1])
//       a_w[2] = parseInt(a_w[2])
//       a_z[0] = parseInt(a_z[0])
//       a_z[1] = parseInt(a_z[1])
//       a_z[2] = parseInt(a_z[2])
      
    
//       if (isNaN(a_w[0]) || isNaN(a_w[1]) || isNaN(a_w[2]) || isNaN(a_z[0]) || isNaN(a_z[1]) || isNaN(a_z[2])){
//           console.log("As a day, month and year enter the number")
//           let message = "As a day, month and year enter the number"
//           res.send({message: message})
//           return
//       }
//       else{
//           console.log("Wszystko ok z typami zmiennych")
//       }
    
//       console.log(a_w)
//       console.log(a_z)
    
//       if (a_w[2] > a_z[2]){
//           console.log("Previous date error")
//           let message = 'Previous date error'
//           res.send({message: message});  
//           return
//       }
    
    
//       if (a_w[2] == a_z[2] && a_w[1] > a_z[1]){
//           console.log("Previous date error")
//           let message: string = 'Previous date error'
//           res.send({message: message});  
//           return 
//       }
    
//       if (a_w[1] == a_z[1] && a_w[0] > a_z[0]){
//       console.log("Previous date error")
//       let message: string = 'Previous date error'
//       res.send({message: message});  
//       return
//       }
    
//       if (toRent[0].amount == 0){
//           console.log("There is no car of this brand left in the storage")
//           let message = 'There is no car of this brand left in the storage'
//           res.send({message: message});  
//           return
//       }
//       else {
//           let new_amount = toRent[0].amount-1
//           console.log('new_amount: ' + new_amount)
//           await Car.updateOne({brand: toRent[0].brand}, {$set: { amount: new_amount}})    
//       }
      
    
//       dniw += a_w[0] + a_w[1]*30 + a_w[2]*365
//       dniz += a_z[0] + a_z[1]*30 + a_z[2]*365
    
//       console.log("dniw: ")
//       console.log(dniw)
//       console.log("dniz: ")
//       console.log(dniz)
//       console.log("Difference: ")
//       dni = dniz - dniw
//       console.log(dni)
      
  
    
//       koszt = String(parseInt(toRent[0].rent_cost)*dni)
//       console.log("koszt: ")
//       console.log(koszt)
//       var today = new Date()
//       var dd: string = String(today.getDate()).padStart(2, '0');
//       var mm: string = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//       var yyyy: string = String(today.getFullYear());
    
//       let Passtoday: string = mm + '-' + dd + '-' + yyyy;
      
//       const new_rent = new Rented({ brand: marka, name: imie, surname: nazwisko, cost: koszt, dataw: dataw, dataz: dataz, bought_date: Passtoday });
//       console.log('Dodaję nowy wypożyczony samochód')
//       console.log('new_car.brand: ' + new_rent.brand);
//       console.log('new_car.src: ' + new_rent.src);
//       await new_rent.save();
//       let rented: JSON[] = await Rented.find()
//       let cars: JSON[] = await Car.find()
  
//       let message: string = 'Successfully rented'
//       res.send({message: message, rented: rented, cars: cars}); 
  
//       return
  
//   }
 

class CarClass {
    brand: string | string[]
    amount: string | undefined
    sell_cost: string | undefined
    rent_cost: string | undefined
    src: string | undefined
    user_name: string | undefined
    user_surname: string | undefined
    dataw: string | undefined
    dataz: string | undefined


    constructor(brand: string, amount: string | undefined, sell_cost: string | undefined, rent_cost: string | undefined, src: string | undefined) {
        this.brand = brand
        this.amount = amount
        this.sell_cost = sell_cost
        this.rent_cost = rent_cost
        this.src = src
        if (user !== undefined){
            this.user_name = user[0]
            this.user_surname = user[1]
        }
        else {
            this.user_name = undefined
            this.user_surname = undefined    
        }
        if (dates !== undefined){
            this.dataw = dates[0]
            this.dataz = dates[1]    
        }
        else {
            this.dataw = undefined
            this.dataz = undefined    
        }


      }
}


class Admin extends CarClass {
    
    constructor(brand: string, amount: string | undefined, sell_cost: string | undefined, rent_cost: string | undefined, src: string | undefined){
        super(brand, amount, sell_cost, rent_cost, src)
    }

    addCar(res: Response): void{
     
        // Gran_torino 4 2000 400 gran_torino.jpg
      
        var new_car = new Car({ brand: this.brand, amount: this.amount, sell_cost: this.sell_cost, rent_cost: this.rent_cost, src: this.src });
      
        async function add(res: Response, brand: String | string[]): Promise<void | JSON>{

            await new_car.save();
            let message = 'Samochód został dodany poprawnie'
            let cars: JSON[] = await Car.find()
            res.cookie('3pcookie', 'value', { sameSite: 'strict', secure: true, httpOnly: true });
            res.send({message: message, cars: cars})

        }
        add(res, this.brand)
      }


      async boughtPull(res: Response): Promise<void | JSON>{

        console.log("DZIAŁA boughtPull =============")
        // console.log('com_arr: ' + command)
      
        // let command = com_arr.split(' ')
      
        let toBuy = await Car.find({brand: this.brand})
        console.log('toBuy: ' + toBuy)
        // console.log('bought[0]: ' + bought[0])
        // console.log('command: ' + command)
      
        console.log('imie: ' + this.user_name)
        console.log('nazwisko: ' + this.user_surname)

        let marka = this.brand
        let koszt: string = ''
      
        if (this.user_name === undefined || this.user_surname === undefined){
          console.log('imie: ' + this.user_name)
          console.log('nazwisko: ' + this.user_surname)
          console.log(WrongData.WrongUser)
          let message: string = WrongData.WrongUser
          res.send({message: message}); 
          return
        }
      
        if (toBuy[0] === undefined){
          console.log(WrongData.NoCarInStorage)
          let message: string = WrongData.NoCarInStorage
          res.send({message: message});  
          return
        }
      
        console.log('toBuy[0].amount: ' + toBuy[0].amount)
        
        if (toBuy[0].amount == 0){
          console.log(WrongData.NoCarLeft)
          let message: string = WrongData.NoCarLeft
          res.send({message: message});  
          return
        }

        else {
          let new_amount: string = String(parseInt(toBuy[0].amount)-1)
          console.log('new_amount: ' + new_amount)
          await Car.updateOne({brand: toBuy[0].brand}, {$set: { amount: new_amount}})
        }
      
      
        koszt = toBuy[0].sell_cost
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
      
        let Passtoday: string = mm + '-' + dd + '-' + yyyy;
      
      
        const new_bought = new Bought({ brand: marka, name: this.user_name, surname: this.user_surname, cost: koszt, bought_date: Passtoday });

        await new_bought.save();
        let bought: JSON[] = await Bought.find()
        let cars: JSON[] = await Car.find()
        let message: string = 'Successfully bought'
        res.cookie('3pcookie', 'value', { sameSite: 'strict', secure: true, httpOnly: true });
        res.send({message: message, bought: bought, cars: cars});  
      
        console.log("===============")
      
      }

}


class Client extends CarClass {
    constructor(brand: string, amount: string | undefined, sell_cost: string | undefined, rent_cost: string | undefined, src: string | undefined){
        super(brand, amount, sell_cost, rent_cost, src)
    }


    async returPull(res: Response): Promise<void | JSON>{
        // rent ford Alicja Kaczka 20-11-2003 25-11-2003
        // rented.push([imie, nazwisko, marka, dataw, dataz, koszt, today])
    
        // console.log('returCommand: ' + command)
      
        let toReturn = await Rented.find({brand: this.brand, name: this.user_name, nazwisko: this.user_surname})
        let toIncrease = await Car.find({brand: this.brand})
      
        console.log('toReturn[0]: ' + toReturn[0])
      
        console.log("DZIAŁA RETUR =============")
      
        if (toReturn[0] == undefined){
            console.log(WrongData.NoPersonOrCarRented)
            let message = WrongData.NoPersonOrCarRented
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
          res.cookie('3pcookie', 'value', { sameSite: 'strict', secure: true, httpOnly: true });
      
          res.send({message: message, rented: rented, cars: cars}) 
          return
        }
      }

    async rentedPull(res: Response): Promise<void | JSON>{
    let toRent = await Car.find({brand: this.brand})
    console.log('toRent[0]: ' + toRent[0])
    
    
        // rent ford Alicja Kaczka 20-11-2003 25-11-2003
    
        console.log("DZIAŁA RENT =============")
    
        let a_w: any[] = []
        let a_z: any[] = []
        let dniw: number = 0
        let dniz: number = 0
        let dni: number = 0
        let koszt: string
    
        if (this.dataw == undefined || this.dataz == undefined){
            console.log(WrongData.WrongDates)
            let message = WrongData.WrongDates
            res.send({message: message});  
            return
        }

        if (this.user_name === undefined || this.user_surname == undefined){
            console.log(WrongData.WrongUser)
            let message = WrongData.WrongUser
            res.send({message: message});  
        return
        }   
    
        if (toRent[0] == undefined){
        console.log(WrongData.NoCarInStorage)
        let message = WrongData.NoCarInStorage
        res.send({message: message});  
        return
        }
    
    
        a_w = this.dataw.split('-')
        a_z = this.dataz.split('-')
    
        
        a_w[0] = parseInt(a_w[0])
        a_w[1] = parseInt(a_w[1])
        a_w[2] = parseInt(a_w[2])
        a_z[0] = parseInt(a_z[0])
        a_z[1] = parseInt(a_z[1])
        a_z[2] = parseInt(a_z[2])
        
    
        if (Number.isNaN(a_w[0]) || Number.isNaN(a_w[1]) || Number.isNaN(a_w[2]) || Number.isNaN(a_z[0]) || Number.isNaN(a_z[1]) || Number.isNaN(a_z[2])){
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
            let message: string = 'Previous date error'
            res.send({message: message});  
            return 
        }
    
        if (a_w[1] == a_z[1] && a_w[0] > a_z[0]){
        console.log("Previous date error")
        let message: string = 'Previous date error'
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
        
    
    
        koszt = String(parseInt(toRent[0].rent_cost)*dni)
        console.log("koszt: ")
        console.log(koszt)
        var today = new Date()
        var dd: string = String(today.getDate()).padStart(2, '0');
        var mm: string = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy: string = String(today.getFullYear());
    
        let Passtoday: string = mm + '-' + dd + '-' + yyyy;
        
        const new_rent = new Rented({ brand: this.brand, name: this.user_name, surname: this.user_surname, cost: koszt, dataw: this.dataw, dataz: this.dataz, bought_date: Passtoday });
        console.log('Dodaję nowy wypożyczony samochód')
        console.log('new_car.brand: ' + new_rent.brand);
        console.log('new_car.src: ' + new_rent.src);
        await new_rent.save();
        let rented: JSON[] = await Rented.find()
        let cars: JSON[] = await Car.find()
    
        let message: string = 'Successfully rented'
        res.cookie('3pcookie', 'value', { sameSite: 'strict', secure: true, httpOnly: true });
        res.send({message: message, rented: rented, cars: cars}); 
    
        return
    
    }
    

}


app.get('/', function (req, res): void {
    async function getmethod(res: Response){
        // let rented = await Rented.find()
        // let bought = await Bought.find()
        let cars: JSON[] = await Car.find()
        let rented: JSON[] = await Rented.find()
        let bought: JSON[] = await Bought.find()
        // res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
        // res.setHeader("Access-Control-Allow-Origin", "https://accounts.google.com/o/oauth2/v2/*");

        res.cookie('3pcookie', 'value', { sameSite: 'strict', secure: true, httpOnly: true });
        res.render('index1', {cars: cars, bought: bought, rented: rented});
    }
      getmethod(res)
});


app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('Successful authentication, redirecting to home')
    res.redirect('/');
  });



app.get('/login/google', passport.authenticate('google'), function(req, res){
    console.log('Weszło w /login/google, ustawiam res.setHeader')
    res.setHeader('Access-Control-Allow-Origin', '*');
});

app.get('/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/', failureMessage: true }),
  function(req, res: any) {

    async function log(req: Request, res: any){
        console.log('Weszło w app.get(/oauth2/redirect/google)')
        console.log(res.req.user)

        console.log(res.req.user.name)
        let userTemp: String = res.req.user[0].name
        let cars: JSON[] = await Car.find()
        let rented: JSON[] = await Rented.find()
        let bought: JSON[] = await Bought.find()
        
        let temp1 = String(userTemp).split(' ')
        if (temp1.length > 1){
            console.log('Array temp1: ' + temp1)
            user = temp1
        }
        else {
            console.log('temp1: ' + temp1)
            user = temp1
            console.log('user[0]: ' + user[0])
            user[1] = ' '
            console.log('user[1]: ' + user[1])

        }

        res.render('index1', {userName: userTemp, cars: cars, bought: bought, rented: rented});
    }


    log(req, res)
  });


function getFileSystemPath(imgPath: string, res: Response) {
	imgPath = imgPath.replace(/%2e/ig, '.');
	imgPath = imgPath.replace(/%2f|%5c/ig, '/');

	const normalizedPath = path.normalize(imgPath);
	if (!normalizedPath.startsWith('/home/przemek/VSCodeProjects/HTMLProjects/ps_html/lab9/obrazy/')) {
		// throw new Error('Illegal path supplied in the input url: ' + imgPath);
        console.log('Illegal path supplied in the input url: ' + imgPath)
        let message = 'Something went wrong. Try again later'
        res.send({message: message})
        return 0
	}

	return path.join(normalizedPath);
}


app.get(reg, function ( req , res ): void {
    let n: string = req.originalUrl
    console.log('req.originalUrl: ' + req.originalUrl)
    let dirs: string[] = n.split('/')
    console.log('dirs: ' + dirs)
    console.log("inserting car image ")
    
    let lenDirs = dirs.length

    console.log('dirs.length: ' + lenDirs)

    let obraz = dirs[lenDirs-1]
    console.log('OBRAZ: ' + obraz)


    let imgPath = `/home/przemek/VSCodeProjects/HTMLProjects/ps_html/lab9/obrazy/${obraz}`
	imgPath = imgPath.replace(/%2e/ig, '.');
	imgPath = imgPath.replace(/%2f|%5c/ig, '/');
    let toCheck = path.normalize(imgPath);
    let securePath = getFileSystemPath(toCheck, res)
    if (securePath == 0){
        return
    }

    let fileToLoad: Buffer = fs.readFileSync(securePath);
    res.writeHead(200, {'Content-Type':  'image/jpg' });
    // res.setHeader('Content-Type', 'application/json');
    res.end(fileToLoad, 'binary');
}
)

app.put('/', function(req, res): void{

    var body: string = ''
    req.on('data', function (data: string) {
        body += data;
        console.log('body: ' + body)
        console.log('data: ' + data)

    });

    req.on('end', function () {
        var put: ParsedUrlQuery = qs.parse(body);
        // console.log('put varable cvalue: ' + put)
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
                let sendedData: string |  string[] | undefined = put.data
                if (sendedData == undefined){
                    let message: string = WrongData.ToLittleBody
                    res.send({message: message})
                    return
                }
                else if (Array.isArray(sendedData)){
                    let message: string = WrongData.ToMuchBody
                    res.send({message: message})
                    return
                }
                let sendedData2 = sendedData.split(':')
                console.log('sendedData: ' + sendedData2)
                if (sendedData2[0] == 'user'){
                    console.log('sendedData[1]: ' + sendedData2[1])
                    user = sendedData2[1].split(' ')
                    res.type('text/plain');
                    res.cookie('3pcookie', 'value', { sameSite: 'strict', secure: true, httpOnly: true });
                    res.send({message: 'UserSuccess'});
                }
                else if (sendedData2[0] == 'dates'){
                    console.log('sendedData[1]: ' + sendedData2[1])
                    dates = sendedData2[1].split(' ')
                    res.type('text/plain');
                    res.cookie('3pcookie', 'value', { sameSite: 'strict', secure: true, httpOnly: true });
                    res.send({message: 'DatesSuccess'});
                }
                else if (sendedData2[0] == 'add'){
                    console.log('sendedData[1]: ' + sendedData2[1])
                    let temp1 = sendedData2[1].split(' ')
                    console.log('sendedData[1].split(" "): ' + temp1)
                    res.type('text/plain');
                    if (temp1.length != 5){
                        res.send({message: WrongData.WrongAdd});
                    }
                    else {
                        let sampleCar = new Admin(temp1[0], temp1[1], temp1[2], temp1[3], temp1[4])
                        // command = ['add', temp1[0], temp1[1], temp1[2], temp1[3], temp1[4]]
                        // console.log('command: ' + command)
                        // console.log('command[2]: ' + command[2])
                        // addCar(command, res)
                        sampleCar.addCar(res)
                    }


                }
        }
    })

})


app.post('/', function (req: Request, res: Response): void{
    // console.log(req.query.imie)
    // Return the greeting in the format preferred by the WWW client
    var body: string = ''
    req.on('data', function (data) {
        body += data;
        console.log('body: ' + body)
    });

    req.on('end', function () {
        var post: ParsedUrlQuery = qs.parse(body);
        if (post.brand == undefined){
            let message = WrongData.WrongUser
            res.send({message: message})
            return
        }
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
                // let command = new Array
                // command = ['sell', post.brand, user[0], user[1]]
                let sampleCar = new Admin(String(post.brand), undefined, undefined, undefined, undefined)
                sampleCar.boughtPull(res)
        }
    })
    

});


app.delete('/', function (req: Request, res: Response): void {
    // console.log(req.query.imie)
    // Return the greeting in the format preferred by the WWW client
    var body: string = ''
    req.on('data', function (data) {
        body += data;
        console.log('body: ' + body)
    });

    req.on('end', function () {
        var del: ParsedUrlQuery = qs.parse(body);
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
                let data: string | string[] | undefined = del.data
                if (data == undefined){
                    console.log('del.data: ' + del.data)
                    let message: string = WrongData.ToLittleBody
                    res.cookie('3pcookie', 'value', { sameSite: 'strict', secure: true, httpOnly: true });
                    res.send({message: message})
                    return
                }
                else if (Array.isArray(data)){
                    let message: string = WrongData.ToMuchBody
                    res.cookie('3pcookie', 'value', { sameSite: 'strict', secure: true, httpOnly: true });
                    res.send({message: message})
                    return
                }
                let temp2 = data.split(':')

                if (temp2[0] == 'retur'){
                    console.log('To jest Array')
                    temp2 = temp2[1].split(' ')
                    let sampleCar = new Client(temp2[0], undefined, undefined, undefined, undefined)
                    sampleCar.returPull(res)

                }
                else {
                    console.log('To jest string')
                    console.log('temp2: ' + temp2)
                    console.log('temp2[1]: ' + temp2[1])
                    if (data == undefined){
                        console.log('del.data: ' + del.data)
                        let message: string = WrongData.ToLittleBody
                        res.cookie('3pcookie', 'value', { sameSite: 'strict', secure: true, httpOnly: true });
                        res.send({message: message})
                        return
                    }
                    else if (Array.isArray(data)){
                        let message: string = WrongData.ToMuchBody
                        res.cookie('3pcookie', 'value', { sameSite: 'strict', secure: true, httpOnly: true });
                        res.send({message: message})
                        return
                    }
                   
                    // command = ['rent', temp2[1], user[0], user[1], dates[0], dates[1]]
                    let sampleCar = new Client(temp2[1], undefined, undefined, undefined, undefined)
                    sampleCar.rentedPull(res)
                }

        }
    })
    

});














app.use(csurf({ cookie: true }));

// The application is to listen on port number 3000
app.listen(3000, function (): void {
    console.log('The application is available on port 3000');
});


