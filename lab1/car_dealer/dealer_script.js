



// var magazyn = document.getElementById("magazyn")

var magazyn = [
    ["Fiat_Tipo", 1, 5000, 100, "http://127.0.0.1:5500/lab1/car_dealer/fiat_tipo.jpg"],
    ["Fiat_500", 3, 2000, 300, "http://127.0.0.1:5500/lab1/car_dealer/fiat500.jpg"],
    ["Przyczepa_jednoosiowa", 5, 2500, 200, "http://127.0.0.1:5500/lab1/car_dealer/przyczepa_jedn.jpg"],
    ["Przyczepa_samochodowa", 4, 1500, 500, "http://127.0.0.1:5500/lab1/car_dealer/przyczepa.jpg"]
]

var bougth = new Array;
var rented = new Array;
var cur_user = new Array;
var datawz_ar = new Array;
var user = document.getElementById('user')
var datawz = document.getElementById('datawz')


function actualizeAccessable(){
    for (let i=0; i<magazyn.length; i++){
        let cur_id = magazyn[i][0] + "_sztuki"
        var car_sztuki = document.getElementById(cur_id)
        car_sztuki.childNodes[0].textContent = magazyn[i][1]
        if (magazyn[i][1] == 0){
            car_sztuki.parentNode.style.backgroundColor = "orange" 
        }
        else{
            car_sztuki.parentNode.style.backgroundColor = "white" 
        }
    }
}
actualizeAccessable()


function addCar(){
    let new_car = new Array;
    let new_car_prompt = prompt("car amount sell_cost rent_cost_per_day img_url");
    new_car = new_car_prompt.split(' ')
    magazyn.push(new_car)


//     <div id="Fiat_500_div">
//       <img id="Fiat_500_img" src="fiat500.jpg" alt="Fiat 500" style="width:20%">
//       <a>Fiat_500</a>
//       <a id="Fiat_500_sztuki">Ilość sztuk: </a>
//     </div>

    let demo1 = document.getElementById('Demo1')
    let fragment = document.createDocumentFragment();

    let div = document.createElement('div')
    let fragment2 = document.createDocumentFragment();
    let a = document.createElement('a')
    a.textContent = new_car[0]
    a.setAttribute('style', 'margin-right: 5px;')
    // a.style = "margin: "
    let img = document.createElement('img')
    newid = new_car[0] + '_img'
    img.setAttribute('id', newid)
    img.setAttribute('src', new_car[4])
    img.setAttribute('alt', new_car[0])
    img.setAttribute('style', 'width: 20%; margin-right: 5px;')
    img.addEventListener('click', function(e){
        e.stopPropagation
        sell(['sell', new_car[0], cur_user[0], cur_user[1]])
    })
    let a2 = document.createElement('a')
    newid = new_car[0] + '_sztuki'
    a2.setAttribute('id', newid)
    a2.textContent = 'Ilość sztuk: '
    a2.addEventListener('click', function(e){
        e.stopPropagation
        rent(['rent', new_car[0], cur_user[0], cur_user[1], datawz_ar[0], datawz_ar[1]])
    })
    

    fragment2.appendChild(img)
    fragment2.appendChild(a)
    fragment2.appendChild(a2)

    div.appendChild(fragment2)
    fragment.appendChild(div)
    demo1.appendChild(fragment)

    actualizeAccessable()
    build_chart()

    // Gran_torino 4 2000 400 gran_torino.jpg

}


function actualizeSold(marka){
    let counter = 0

    for (let i=0; i<bougth.length; i++){
        if (marka == bougth[i][2]){
            counter += 1
        }
    }

    let cur_id = marka + "_sold"
    // console.log("cur_id: " + cur_id)
    var car_sztuki = document.getElementById(cur_id)
    car_sztuki.childNodes[0].textContent = counter
}


function actualizeRented(marka){

    // rented.push([imie, nazwisko, marka, dataw, dataz, koszt, today])

    let counter = 0

    for (let i=0; i<rented.length; i++){
        if (marka == rented[i][2]){
            counter += 1
        }
    }

    let cur_id = marka + "_rented"
    // console.log("cur_id: " + cur_id)
    var car_sztuki = document.getElementById(cur_id)
    car_sztuki.childNodes[0].textContent = counter
}



function sztuki(marka, id){
    var car_sztuki = document.getElementById(id)
    for (let i=0; i<magazyn.length; i++){
        if (magazyn[i][0] == marka){
            car_sztuki.innerHTML += magazyn[i][1]
            return
        }
    }
}

    
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

    if (imie == undefined || nazwisko == undefined){
        console.log("Enter the username data")
        return
    }

    
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
    // actualizeSold(marka)
    actualizeAccessable()

    let users = document.getElementById('Demo2')
    let fragment = document.createDocumentFragment();

    let div = document.createElement('div')
    div.style = "border: thin solid black; padding: 2px; margin: 2px;"
    let fragment2 = document.createDocumentFragment();
    let a = document.createElement('a')
    a.textContent = imie + ' ' + nazwisko + ' kupił(a): ' + marka


    fragment2.appendChild(a)
    div.appendChild(fragment2)
    
    fragment.appendChild(div)
    users.appendChild(fragment)

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

    if (imie == undefined || nazwisko == undefined){
        console.log("Enter the username data")
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
    // actualizeRented(marka)
    actualizeAccessable()


    let users = document.getElementById('Demo3')
    let fragment = document.createDocumentFragment();

    let div = document.createElement('div')
    div.style = "border: thin solid black; padding: 2px; margin: 2px;"
    let fragment2 = document.createDocumentFragment();
    let a = document.createElement('a')
    a.textContent = imie + ' ' + nazwisko + ' wypożyczył(a): ' + marka

    fragment2.appendChild(a)
    div.appendChild(fragment2)

    div.addEventListener('click', function(){
        retur(['retur', marka, imie, nazwisko, dataw, dataz])
        div.parentNode.removeChild(div)
    })

    fragment.appendChild(div)
    users.appendChild(fragment)

    console.log("===============")

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

    if (availability(marka, 0) == 1){
        console.log("Car is not available")
        return
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
        return
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
    actualizeAccessable()

    console.log("===============")

}


user.addEventListener("keydown", function(e) {
    if (e.code === "Enter") {
        cur_user = user.value.split(' ')
        console.log("cur_user: " + cur_user)
    }
});

datawz.addEventListener("keydown", function(e) {
    if (e.code === "Enter") {
        datawz_ar = datawz.value.split(' ')
        console.log("datawz_ar: " + datawz_ar)
    }
});



var Fiat_Tipo_img = document.getElementById('Fiat_Tipo_img')  // img Fiat_Tipo
Fiat_Tipo_img.addEventListener('click', function(e){
    e.stopPropagation
    sell(['sell', 'Fiat_Tipo', cur_user[0], cur_user[1]])
})

var Fiat_500_img = document.getElementById('Fiat_500_img') // img Fiat_500
Fiat_500_img.addEventListener('click', function(e){
    e.stopPropagation
    sell(['sell', 'Fiat_500', cur_user[0], cur_user[1]])
})
var Przyczepa_jednoosiowa_img = document.getElementById('Przyczepa_jednoosiowa_img') // img Przyczepa_jednoosiowa
Przyczepa_jednoosiowa_img.addEventListener('click', function(e){
    e.stopPropagation
    sell(['sell', 'Przyczepa_jednoosiowa', cur_user[0], cur_user[1]])
})
var Przyczepa_samochodowa_img = document.getElementById('Przyczepa_samochodowa_img') // img Przyczepa_samochodowa
Przyczepa_samochodowa_img.addEventListener('click', function(e){
    e.stopPropagation
    sell(['sell', 'Przyczepa_samochodowa', cur_user[0], cur_user[1]])
})





var Fiat_Tipo_sztuki = document.getElementById('Fiat_Tipo_sztuki')  // img Fiat_Tipo
Fiat_Tipo_sztuki.addEventListener('click', function(e){
    e.stopPropagation
    rent(['rent', 'Fiat_Tipo', cur_user[0], cur_user[1], datawz_ar[0], datawz_ar[1]])
})

var Fiat_500_sztuki = document.getElementById('Fiat_500_sztuki') // img Fiat_500
Fiat_500_sztuki.addEventListener('click', function(e){
    e.stopPropagation
    rent(['rent', 'Fiat_500', cur_user[0], cur_user[1], datawz_ar[0], datawz_ar[1]])
})
var Przyczepa_jednoosiowa_sztuki = document.getElementById('Przyczepa_jednoosiowa_sztuki') // img Przyczepa_jednoosiowa
Przyczepa_jednoosiowa_sztuki.addEventListener('click', function(e){
    e.stopPropagation
    rent(['rent', 'Przyczepa_jednoosiowa', cur_user[0], cur_user[1], datawz_ar[0], datawz_ar[1]])
})
var Przyczepa_samochodowa_sztuki = document.getElementById('Przyczepa_samochodowa_sztuki') // img Przyczepa_samochodowa
Przyczepa_samochodowa_sztuki.addEventListener('click', function(e){
    e.stopPropagation
    rent(['rent', 'Przyczepa_samochodowa', cur_user[0], cur_user[1], datawz_ar[0], datawz_ar[1]])
})

var logo = document.getElementById('canvas1')
logo.addEventListener('dblclick', function(){
    window.requestAnimationFrame(logoAnimation)
    addCar()
})



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


function removeAllText(element) {

    // loop through all the nodes of the element
    var nodes = element.childNodes;

    for(var i = 0; i < nodes.length; i++) {

        var node = nodes[i];

        // if it's a text node, remove it
        if(node.nodeType == Node.TEXT_NODE) {

            node.parentNode.removeChild(node);


            i--; // have to update our incrementor since we just removed a node from childNodes

        } else

        // if it's an element, repeat this process
        if(node.nodeType == Node.ELEMENT_NODE) {

            removeAllText(node);

        }
    }
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


build_chart()
buildLogo()

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


