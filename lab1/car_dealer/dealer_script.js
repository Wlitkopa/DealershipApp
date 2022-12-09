



// var magazyn = document.getElementById("magazyn")

var magazyn = [
    ["Fiat_Tipo", 1, 5000, 100, "http://127.0.0.1:5500/lab1/car_dealer/fiat_tipo.jpg"],
    ["Fiat_500", 3, 2000, 300, "http://127.0.0.1:5500/lab1/car_dealer/fiat500.jpg"],
    ["Przyczepa_jednoosiowa", 5, 2500, 200, "http://127.0.0.1:5500/lab1/car_dealer/przyczepa_jedn.jpg"],
    ["Przyczepa_samochodowa", 4, 1500, 500, "http://127.0.0.1:5500/lab1/car_dealer/przyczepa.jpg"]
]

var bougth = new Array;
var rented = new Array;



function wykonaj(){

    var commands = document.forms[0].elements[0].value.split('\n');
    for (let i=0; i < commands.length; i++ ){
        commands[i] = commands[i].split(' ');
        console.log(commands[i])
        if ((commands[i].length > 7 || commands[i].length < 4) && commands[i][0].length != 0 && commands[i][7].length != 0){
            console.log(commands[i])
            console.log(commands[i][0].length)
            console.log('Command argument len mismatch')
            return
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
        else {
            console.log("Wrong command: ")
            console.log(commands[i][0])
            return
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

    
    if (availability(marka, 1) == 1){
        console.log("Car is not available")
        return
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

    build_chart()
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
        return
    }
    else{
        console.log("Wszystko ok z typami zmiennych")
    }

    console.log(a_w)
    console.log(a_z)

    if (a_w[2] > a_z[2]){
        console.log("Previous date error")
        return
    }


    if (a_w[2] == a_z[2] && a_w[1] > a_z[1]){
        console.log("Previous date error")
        return
    }


    if (a_w[1] == a_z[1] && a_w[0] > a_z[0]){
    console.log("Previous date error")
    return
    }

    if (availability(marka, 1) == 1){
        console.log("Car is not available")
        return
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




    build_chart()
    console.log("===============")

}


function retur(command){

    // rent ford Alicja Kaczka 20-11-2003 25-11-2003
    // rented.push([imie, nazwisko, marka, dataw, dataz, koszt, today])

    console.log("DZIAŁA RETUR =============")
    let marka = command[1]
    let imie = command[2]
    let nazwisko = command[3]
    let msc = 0

    if (availability(marka, 0) == 1){
        console.log("Car is not available")
        return
    }

    for (let i=0; i < magazyn.length; i++){
        if (magazyn[i][0] == marka){
            console.log(magazyn[i])
            msc = i
            break
        }
    }

    if (rented.length == 0){
        console.log("There is not a person with given name and surname that rented a car/trailer from us or this person did not rent given car")
        return
    }

    for (let i=0; i < rented.length; i++){
        if (rented[i][0] == imie && rented[i][1] == nazwisko && rented[i][2] == marka){
            console.log(magazyn[i])
            rented.pop(i)
            console.log("Rented po popie:" )
            console.log(rented)
            msc = i
            break
        }
        else if (i == (rented.length - 1)){
            console.log("There is not a person with given name and surname that rented a car/trailer from us")
            return
        }
    }



    console.log("Magazyn przed oddaniem: ")
    console.log(magazyn[msc])
    magazyn[msc][1] += 1

    console.log("Magazyn po oddaniu: ")
    console.log(magazyn[msc])
    console.log("===============")


    build_chart()
    console.log("===============")

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



// CANVAS


build_chart()

function build_chart(){

    var e = document.getElementById('canvas');
    var c = e.getContext('2d');

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

