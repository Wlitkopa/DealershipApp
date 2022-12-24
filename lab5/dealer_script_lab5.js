
import * as fs from 'node:fs';
import { measureMemory } from 'node:vm';


var magazyn = new Array

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
var cur_user = new Array
var datawz_ar = new Array


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



function wykonaj(user_commands, response){

    var commands = user_commands.split('\n')
    let message = ""

    for (let i=0; i < commands.length; i++ ){
        commands[i] = commands[i].split(' ');
        console.log(commands[i])
        if ((commands[i].length > 7 || commands[i].length < 4) && commands[i][0].length != 0 && commands[i][7] != undefined){
            console.log(commands[i])
            console.log(commands[i][0].length)
            console.log('Command argument len mismatch')
            message = 'Command argument len mismatch'
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
            return sell(commands[i], response)
        }
        else if (commands[i][0] == "rent"){
            return rent(commands[i], response)
        }
        else if (commands[i][0] == "retur"){
            return retur(commands[i], response)
        }
        else {
            console.log("Wrong command: ")
            console.log(commands[i][0])
            message = "Wrong command: " + commands[i][0]
            return message
        }
    }

    console.log(magazyn);

}


function sell(command, response){

    // rent ford Alicja Kaczka 20-11-2003 25-11-2003

    console.log("DZIAŁA SELL =============")

    let imie = command[2]
    let nazwisko = command[3]
    let marka = command[1]
    let msc = 0
    let message = ""

    if (imie == undefined || nazwisko == undefined){
        console.log("Enter the username data")
        message = "Enter the username data"
        return message
        }

    
    if (availability(marka, 1, response) == 1){
        console.log("Car is not available")
        message = "Car is not available"
        return message
    }

    for (let i=0; i < magazyn.length; i++){
        if (magazyn[i][0] == marka){
            msc = i
            break
        }
    }

    let koszt = magazyn[msc][2]
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
        message += "Kupujący: " + bougth[i][0] + ' ' + bougth[i][1] + '\n' + '  marka: ' + bougth[i][2] + '\n' + '  koszt: ' + bougth[i][3] + '\n' + '  data kupna: ' + bougth[i][4] + '\n'
    }



    response.write('bought: ' + bougth)
    console.log("===============")

    return message
}


function rent(command, response){

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
    let msc = 0
    let message = ""

    if (imie == undefined || nazwisko == undefined){
        response.write("Enter the username data")
        message = "Enter the username data"
        return message
    }

    if (dataw == undefined || dataz == undefined){
        response.write('Enter dates properly')
        message = "Enter dates properly"
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
        message = "As a day, month and year enter the number"
        return message
    }
    else{
        console.log("Wszystko ok z typami zmiennych")
    }

    console.log(a_w)
    console.log(a_z)

    if (a_w[2] > a_z[2]){
        console.log("Previous date error")
        message = "Previous date error"
        return message
    }


    if (a_w[2] == a_z[2] && a_w[1] > a_z[1]){
        console.log("Previous date error")
        message = "Previous date error"
        return message
    }


    if (a_w[1] == a_z[1] && a_w[0] > a_z[0]){
    console.log("Previous date error")
    message = "Previous date error"
    return message
    }

    if (availability(marka, 1, response) == 1){
        console.log("Car is not available")
        message = "Car is not available"
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

    let koszt = parseInt(magazyn[msc][3])*dni
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
        message += "Wypożyczający: " + rented[i][0] + ' ' + rented[i][1] + '\n' + '  marka: ' + rented[i][2] + '\n' + '  data wypożyczenia: ' + rented[i][3] + '\n' + '  data zwrotu: ' + rented[i][4] + '\n' + '  koszt: ' + rented[i][5] + '\n' + '  dzień złożenia zamówienia: ' + rented[i][6] + '\n'
    }

    response.write('rented: ' + rented)
    console.log("===============")

    return message

}


function retur(command, response){

    // rent ford Alicja Kaczka 20-11-2003 25-11-2003
    // rented.push([imie, nazwisko, marka, dataw, dataz, koszt, today])

    console.log("DZIAŁA RETUR =============")
    let marka = command[1]
    console.log("marka: ", marka)
    let imie = command[2]
    let nazwisko = command[3]
    let msc = 0
    let message = ""

    if (availability(marka, 0, response) == 1){
        console.log("Car is not available")
        message = "Car is not available"
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
        message = "There is not a person with given name and surname that rented a car/trailer from us or this person did not rent given car"
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
            message = "There is not a person with given name and surname that rented a car/trailer from us"
            return message
        }
    }



    console.log("Magazyn przed oddaniem: ")
    console.log(magazyn[msc])
    magazyn[msc][1] += 1

    console.log("Magazyn po oddaniu: ")
    console.log(magazyn[msc])
    console.log("===============")


    response.write('rented: ' + rented)
    console.log("===============")

    for (let i=0; i < rented.length; i++){ 
        console.log(rented[i])
        message += "Wypożyczający: " + rented[i][0] + ' ' + rented[i][1] + '\n' + '  marka: ' + rented[i][2] + '\n' + '  data wypożyczenia: ' + rented[i][3] + '\n' + '  data zwrotu: ' + rented[i][4] + '\n' + '  koszt: ' + rented[i][5] + '\n' + '  dzień złożenia zamówienia: ' + rented[i][6] + '\n'
    }

    return message
}


function availability(marka, cmd, response){

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
            console.log('There is not given car brand in storage')
            response.write('There is not given car brand in storage')

            return 1
        }
    }
    
    console.log("magazyn[msc]" + magazyn[msc])

    if (cmd == 1){
        console.log("Zaszedł ten if")

        if (magazyn[msc][1] == 0){
            console.log('There is not a single car of this brand left in storage')
            response.write('There is not a single car of this brand left in storage')

            return 1
        }
        else{
            magazyn[msc][1] -= 1
        }

    }
    console.log("==============")

}



export {wykonaj, sell, rent, retur, availability, showBought, showRented}

