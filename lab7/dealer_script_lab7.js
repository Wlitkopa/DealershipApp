
var fs = require('node:fs')


var magazyn = new Array


// Connecting to Mongodb database
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://Przemek:lab6password@lab6.dylwucr.mongodb.net/test');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Creating a Schema and model
const car = new mongoose.Schema({
  brand: String,
  amount: String,
  sell_cost: String,
  rent_cost: String,
  src: String
});
// const Car = mongoose.model('Car', car);

// Creating a Schema and model
const bought = new mongoose.Schema({
    brand: String,
    name: String,
    surname: String,
    cost: String,
    bought_date: String
  });
const Bought = mongoose.model('Bought', bought);

  // Creating a Schema and model
const rentedd = new mongoose.Schema({
    brand: String,
    name: String,
    surname: String,
    cost: String,
    dataw: String,
    dataz: String,
    datat: String
  });
const Rented = mongoose.model('Rented', rentedd);


function getStorage(path){
  magazyn = fs.readFileSync(path, {encoding:'utf8', flag:'r'}).split('\n')
  for (let i=0; i<magazyn.length; i++){
    magazyn[i] = magazyn[i].split(' ')
    console.log('\nmagazyn[i]: ' + magazyn[i] + '\n')
  }
  // console.log('Zawartość podanego pliku to: ' + magazyn)
}

getStorage('/home/przemek/VSCodeProjects/HTMLProjects/ps_html/lab5/magazyn.txt')


var bougth = new Array
var rented = new Array



function showRented(){
    let message = ""
    console.log('Działa showRented()')

    if (rented.length > 0){
        console.log('Działa showRented if()')
        for (let i=0; i<rented.length; i++){ 
            message += "Wypożyczający: " + rented[i][0] + ' ' + rented[i][1] + '<br>' + '\t\tmarka: ' + rented[i][2] + '<br>' + '\t\tdata wypożyczenia: ' + rented[i][3] + '<br>' + '\t\tdata zwrotu: ' + rented[i][4] + '<br>' + '\t\tkoszt: ' + rented[i][5] + '<br>' + '\t\tdzień złożenia zamówienia: ' + rented[i][6] + '<br>'  + '<br>'
        }
        return message
    }
    else {
        message = "No one has rented a car/trailor yet or all cars/trailors were returned"
        return message
    }
}


function showBought(){
    let message = ""
    console.log('Działa showBought()')
    console.log('bought.length: ' + bougth.length)

    if (bougth.length > 0){
        console.log('Działa showBought if()')
        for (let i=0; i<bougth.length; i++){ 
            message += "Kupujący: " + bougth[i][0] + ' ' + bougth[i][1] + '<br>' + '\t\tmarka: ' + bougth[i][2] + '<br>' + '\t\tkoszt: ' + bougth[i][3] + '<br>' + '\t\tdata kupna: ' + bougth[i][4] + '<br>' + '<br>'
        }
        return message
    }
    else {
        message = "No one has bought a car/trailor yet"
        return message
    }
}


function addCar(command){
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
    }
    add()

}


function wykonaj(user_commands){
    console.log('user_command.length: ' + user_commands.length)
    let commands = user_commands
    console.log('commands: ' + commands)

    for (let i=0; i < commands.length; i++ ){
        commands[i] = commands[i].split(' ');
        console.log(commands[i])
        if ((commands[i].length > 7 || commands[i].length < 4) && commands[i][0].length != 0 && commands[i][7].length != 0){
            console.log(commands[i])
            console.log(commands[i][0].length)
            console.log('Command argument len mismatch')
            let message = 'Command argument len mismatch'
            return message
        }
        if (commands[i][0].length == 0){
            console.log("Przed popem: ")
            console.log(commands)
            commands.pop(-1)
            break
        }
        console.log(commands[i]);
    }

    console.log("After the for loop")
    console.log(commands)
    console.log("==========")
    if (commands[(commands.length - 1)][0].length == 0){
        commands.pop(-1)
    }


    for (let i=0; i < commands.length; i++ ){

        console.log("commands.length: " + commands.length)

        if (commands[i][0] == "sell"){
            sell(commands[i])
        }
        else if (commands[i][0] == "rent"){
            rent(commands[i])
        }
        else if (commands[i][0] == "retur"){
            retur(commands[i])
        }
        else if (commands[i][0] == "add"){
            addCar(commands[i])
        }
        else {
            console.log("Wrong command: ")
            console.log(commands[i][0])
            let message = 'Wrong command: ' + commands[i][0]
            return message
        }
    }    
    console.log(magazyn);

}


function sell(command){

    // rent ford Alicja Kaczka 20-11-2003 25-11-2003

    console.log("DZIAŁA SELL =============")

    let imie = command[2]
    let nazwisko = command[3]
    let marka = command[1]
    let msc = 0
    let koszt = 0

    if (imie == undefined || nazwisko == undefined){
        console.log("Enter the username data")
        let message = "Enter the username data"
        return message
    }

    
    if (availability(marka, 1) == 1){
        console.log("Car is not available")
        let message = "Car is not available"
        return message
        }

    for (let i=0; i < magazyn.length; i++){
        if (magazyn[i][0] == marka){
            msc = i
            break
        }
    }

    koszt = magazyn[msc][2]
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;


    bougth.push([imie, nazwisko, marka, koszt, today])
    console.log("Kupione: ")
    console.log(bougth)

    for (let i=0; i < bougth.length; i++){
        console.log(bougth[i])
    }

    console.log("===============")
}


function rent(command){

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
        return message
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
        return message
    }
    else{
        console.log("Wszystko ok z typami zmiennych")
    }

    console.log(a_w)
    console.log(a_z)

    if (a_w[2] > a_z[2]){
        console.log("Previous date error")
        let message = 'Previous date error'
        return message
    }


    if (a_w[2] == a_z[2] && a_w[1] > a_z[1]){
        console.log("Previous date error")
        let message = 'Previous date error'
        return message
    }


    if (a_w[1] == a_z[1] && a_w[0] > a_z[0]){
    console.log("Previous date error")
    let message = 'Previous date error'
    return message
    }

    if (availability(marka, 1) == 1){
        console.log("Car is not available")
        let message = 'Car is not available'
        return message
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
    

    for (let i=0; i < magazyn.length; i++){
        if (magazyn[i][0] == marka){
            console.log(magazyn[i])
            msc = i
            break
        }
    }

    koszt = parseInt(magazyn[msc][3])*dni
    console.log("koszt: ")
    console.log(koszt)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;

    rented.push([imie, nazwisko, marka, dataw, dataz, koszt, today])

    console.log("Wypożyczone: ")

    for (let i=0; i < rented.length; i++){ 
        console.log(rented[i])
    }

    let message = 'Car succesfully rented'
    return message

}


function retur(command){

    // rent ford Alicja Kaczka 20-11-2003 25-11-2003
    // rented.push([imie, nazwisko, marka, dataw, dataz, koszt, today])

    console.log("DZIAŁA RETUR =============")
    let marka = command[1]
    console.log("marka: ", marka)
    let imie = command[2]
    let nazwisko = command[3]
    let msc = 0
    let koszt = 0

    if (availability(marka, 0) == 1){
        console.log("Car is not available")
        let message = 'Car is not available'
        return message
    }

    for (let i=0; i < magazyn.length; i++){
        if (magazyn[i][0] == marka){
            console.log(magazyn[i])
            console.log("WYBRANO MIEJSCE Z MAGAZYNU")
            msc = i
            console.log("msc: " + msc)
            console.log("marka: " + marka)
            break
        }
    }

    if (rented.length == 0){
        console.log("There is not a person with given name and surname that rented a car/trailer from us or this person did not rent given car")
        let message = 'There is not a person with given name and surname that rented a car/trailer from us or this person did not rent given car'
        return message
    }

    for (let i=0; i < rented.length; i++){
        if (rented[i][0] == imie && rented[i][1] == nazwisko && rented[i][2] == marka){
            console.log(magazyn[i])
            rented.pop(i)
            console.log("Rented po popie:" )
            console.log(rented)
            break
        }
        else if (i == (rented.length - 1)){
            console.log("There is not a person with given name and surname that rented a car/trailer from us")
            let message = 'There is not a person with given name and surname that rented a car/trailer from us'
            return message
        }
    }



    console.log("Magazyn przed oddaniem: ")
    console.log(magazyn[msc])
    magazyn[msc][1] += 1

    console.log("Magazyn po oddaniu: ")
    console.log(magazyn[msc])
    console.log("===============")

    let message = 'Car successfully returned'
    return message

}


function availability(marka, cmd){

    let msc = 0
    console.log("DZIAŁA AVAILABILITY ==============")
    console.log("cmd: " + cmd)
    
    for (let i=0; i < magazyn.length; i++){
        if (magazyn[i][0] == marka){
            msc = i
            break
        }
        else if (i == (magazyn.length - 1)){
            console.log(marka)
            console.log('There is not given car brand in magazine')
            return 1
        }
    }
    
    console.log("magazyn[msc]" + magazyn[msc])

    if (cmd == 1){
        console.log("Zaszedł ten if")

        if (magazyn[msc][1] == 0){
            console.log('There is not a single car of this brand left in storage')
            return 1
        }
        else{
            magazyn[msc][1] -= 1
        }

    }
    console.log("==============")

}


// LOGO ANIMATION

function logoAnimation(){

    let logo = document.getElementById('canvas1')

    const logoSpinning = [
        { transform: 'rotateY(0) scale(1)' },
        { transform: 'rotateY(360deg) scale(0)' }
      ];


    const logoTiming = {
    duration: 4000,
    iterations: 1,
    }

    logo.animate(logoSpinning, logoTiming)
}


// CANVAS   

function build_chart(){

    let e = document.getElementById('canvas');
    let c = e.getContext('2d');

    c.beginPath()
    c.clearRect(0, 0, canvas.width, canvas.height);

    console.log("CANVAS ===============")
    console.log(canvas.width, canvas.height)
    console.log(e.width, e.height)

    
    var image = new Image();
    image.src='fiat_tipo.jpg';
    image.onload = function(){
       c.drawImage(this, 50, 320, this.width/20, this.height/20);   
    }

    var image2 = new Image();
    image2.src='fiat500.jpg';
    image2.onload = function(){
       c.drawImage(this, 200, 320, this.width/22, this.height/20);   
    }

    var image3 = new Image();
    image3.src='przyczepa_jedn.jpg';
    image3.onload = function(){
       c.drawImage(this, 370, 320, this.width/5, this.height/5);   
    }

    var image4 = new Image();
    image4.src='przyczepa.jpg';
    image4.onload = function(){
       c.drawImage(this, 540, 315, this.width/11, this.height/11);   
    }
    
    
    c.beginPath();
    var minVal, maxVal,
    xScalar, yScalar,
    numSamples, y;
    // data sets -- set literally or obtain from an ajax call
    var dataName = [];
    var dataValue = [];

    for (let i=0; i < magazyn.length; i++){
        dataValue.push(magazyn[i][1])
        dataName.push(magazyn[i][0])
    }
    
    // set these values for your data
    numSamples = 3;
    maxVal = 10;
    var stepSize = 1;
    var colHead = 30;
    var rowHead = 60;
    var margin = 10;
    var header = "Number"

    c.fillStyle = "black"
    yScalar = (3*e.height/4 - colHead) / (maxVal);
    xScalar = (3*e.width/4 - rowHead) / (numSamples + 1);
    c.strokeStyle = "rgba(128,128,255, 0.5)"; // light blue line

    // // print column header
    // c.beginPath();
    // c.font = "14pt Helvetica"
    // c.fillText(header, 0, colHead - margin);

    // print row header and draw horizontal grid lines
    c.font = "12pt Helvetica"
    var count =  0;
    for (scale = maxVal; scale >= 0; scale -= stepSize) {
        y = colHead + (yScalar * count * stepSize);
        c.fillText(scale, margin, y + margin);
        c.moveTo(rowHead, y)
        c.lineTo(e.width, y)
        count++;
    }
    c.stroke();

    // label samples
    xScalar += 8
    c.font = "14pt Helvetica";
    c.textBaseline = "bottom";
    for (i = 0; i < 4; i++) {
        calcY(dataValue[i]);
        c.fillText(dataName[i], xScalar * (i + 1), y - margin);
    }

    // set a color and a shadow
    c.fillStyle = "green";

    // translate to (3*e.height/4 - colHead) and scale x,y to match data
    c.translate(0, 3*e.height/4);
    c.scale(xScalar, -1 * yScalar);

    // draw bars
    for (i = 0; i < 4; i++) {
        c.fillRect(i + 1, 0, 0.5, dataValue[i]);
    }
    
    c.resetTransform()
    c.scale(1, 1);

    c.beginPath()
    
    var image = new Image();
    image.src='fiat_tipo.jpg';
    image.onload = function(){
       c.drawImage(this, e.width/2, e.height, this.width/20, this.height/20);   
    }

    var image2 = new Image();
    image2.src='fiat500.jpg';
    image2.onload = function(){
       c.drawImage(this, 200, 320, this.width/22, this.height/20);   
    }

    var image3 = new Image();
    image3.src='przyczepa_jedn.jpg';
    image3.onload = function(){
       c.drawImage(this, 370, 320, this.width/5, this.height/5);   
    }

    var image4 = new Image();
    image4.src='przyczepa.jpg';
    image4.onload = function(){
       c.drawImage(this, 540, 315, this.width/11, this.height/11);   
    }
    
    function calcY(value) {    
        y = (3*e.height/4 - colHead) - value * yScalar;
        }

    console.log("===================")
}

function buildLogo(){
    let e = document.getElementById('canvas1');
    let can = e.getContext('2d');

    can.globalCompositeOperation = 'xor';


    can.lineWidth = 8;
    // c.strokeStyle='#353433';
    can.fillStyle='#fffed6';
    can.fillRect(0, 0, 640, 480);
    can.beginPath();

    can.lineWidth = 3; 
    can.strokeStyle='#55fa47';
    can.fillStyle='#7d97ff';
    can.arc(e.width / 2 + e.width / 7, e.height / 2 + e.height / 6, e.height/8, 0 * Math.PI, 2 * Math.PI, false);
    can.fill();
    can.stroke();

    can.beginPath();
    can.lineWidth = 3; 
    can.strokeStyle='#7de7ff';
    can.fillStyle='#7d97ff';
    can.arc(e.width / 2 -  e.width / 7, e.height / 2 + e.height / 6, e.height/8, 0 * Math.PI, 2 * Math.PI, false);
    can.fill();
    can.stroke();

    can.beginPath();
    can.lineWidth = 3; 
    can.strokeStyle='#ff8d7d';
    can.fillStyle='#7d97ff';
    can.arc(e.width / 2, e.height / 2, e.height/8, 0 * Math.PI, 2 * Math.PI, false);
    can.fill();
    can.stroke();

    can.beginPath();
    can.lineWidth = 3; 
    can.strokeStyle='#7d97ff';
    can.fillStyle='#7d97ff';
    can.arc(e.width / 2, e.height / 2 + e.height / 9, e.height/12, 0 * Math.PI, 2 * Math.PI, false);
    can.fill();
    can.stroke();

    can.beginPath();
    can.moveTo(e.width / 2 + e.width / 7, e.height / 2 + e.height / 6);
    can.lineTo(e.width / 2 -  e.width / 7, e.height / 2 + e.height / 6);
    can.stroke();
    can.beginPath();
    can.moveTo(e.width / 2 - e.width / 7, e.height / 2 + e.height / 6);
    can.lineTo(e.width / 2, e.height / 2);
    can.stroke();
    can.beginPath();
    can.moveTo(e.width / 2, e.height / 2);
    can.lineTo(e.width / 2 + e.width / 7, e.height / 2 + e.height / 6 );
    can.stroke();

    can.beginPath();
    can.moveTo(e.width / 2, e.height / 2);
    can.lineTo(e.width / 2 + e.width / 7 + 5, e.height / 2 +  e.height/23);
    can.strokeStyle='#ff8d7d';
    can.stroke();
    can.beginPath();
    can.moveTo(e.width / 2, e.height / 2);
    can.lineTo(e.width / 2 - e.width / 7 - 5, e.height / 2 +  e.height/23);
    can.stroke();

    can.beginPath();
    can.moveTo(e.width / 2 + e.width / 7, e.height / 2 + e.height / 6);
    can.lineTo(e.width / 2 + e.width / 7 + 5, e.height / 2 +  e.height/23);
    can.strokeStyle='#55fa47';
    can.stroke();
    can.beginPath();
    can.moveTo(e.width / 2 + e.width / 7, e.height / 2 + e.height / 6);
    can.lineTo(e.width / 2,  e.height / 2 + e.height / 6 + e.height / 16 + 4);
    can.stroke();

    can.beginPath();
    can.moveTo(e.width / 2 - e.width / 7, e.height / 2 + e.height / 6);
    can.lineTo(e.width / 2 - e.width / 7 - 5, e.height / 2 +  e.height/23);
    can.strokeStyle='#7de7ff';
    can.stroke();
    can.beginPath();
    can.moveTo(e.width / 2 - e.width / 7, e.height / 2 + e.height / 6);
    can.lineTo(e.width / 2,  e.height / 2 + e.height / 6 + e.height / 16 + 4);
    can.stroke();

}

function kot(){
    console.log('===== Działa import kot =====')
}

function pies(){
    console.log('===== Działa import pies =====')
}


module.exports = {wykonaj, sell, rent, retur, availability, showBought, showRented, addCar, kot, pies, Car, Bought, Rented};
// module.exports = {kot, pies};


