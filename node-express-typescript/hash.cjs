import crypto from 'crypto'



const script = `
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
  x.className = x.className.replace("w3-show", "");
}
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
  buildLogo()

  function actualizeCars(allCars){
    console.log('Zachodzi actualizeCars')
    let carsObj = document.getElementById('carsAccord')
    let demo1 = document.getElementById('Demo1')
    demo1.innerHTML = ''

    for (let i=0; i < allCars.length; i++){

          let fragment = document.createDocumentFragment();

          let div = document.createElement('div')
          div.setAttribute('class', 'w3-border w3-border-black w3-round w3-margin')
          let fragment2 = document.createDocumentFragment();

          let a = document.createElement('a')
          a.textContent = allCars[i].brand + '\r\n' + ' Koszt zakupu: ' + allCars[i].sell_cost + ' Koszt wypożyczenia: ' + allCars[i].rent_cost

          let img = document.createElement('img')
          img.setAttribute('src', allCars[i].src)
          img.setAttribute('alt', allCars[i].brand)
          img.setAttribute('style', 'width: 20%; margin-right: 5px;')
          img.addEventListener('click', function(e){
              e.stopPropagation
              console.log('Tutaj ma być sell')
              sell(allCars[i].brand)
          })

          let a2 = document.createElement('a')
          a2.textContent = 'Ilość sztuk: ' + allCars[i].amount
          a2.addEventListener('click', function(e){
              e.stopPropagation
              console.log('Tutaj ma być rent')
              rentRetur('rent:' + allCars[i].brand)
          })
          
          fragment2.appendChild(img)
          fragment2.appendChild(a)
          fragment2.appendChild(a2)

          div.appendChild(fragment2)
          fragment.appendChild(div)
          demo1.appendChild(fragment)
    }
  }


  function actualizeBoughts(allBoughts){
    console.log('Wchodzi w actualizeBoughts')

    let carsObj = document.getElementById('carsAccord')
    let demo2 = document.getElementById('Demo2')
    demo2.innerHTML = ''
    console.log('Wchodzi w actualizeBoughts')

    for (let i=0; i < allBoughts.length; i++){

          let fragment = document.createDocumentFragment();

          let div = document.createElement('div')
          div.setAttribute('class', 'w3-border w3-border-black w3-round w3-margin')
          let fragment2 = document.createDocumentFragment();

          let a = document.createElement('a')
          a.textContent = allBoughts[i].brand + '\r\n' + ' Kupujący: ' + allBoughts[i].name + ' ' + allBoughts[i].surname + ' Koszt: ' + allBoughts[i].cost + ' Data zakupu: ' + allBoughts[i].bought_date
          
          fragment2.appendChild(a)

          div.appendChild(fragment2)
          fragment.appendChild(div)
          demo2.appendChild(fragment)
    }
  }


  function actualizeRented(allRented){
    console.log('Wchodzi w actualizeRented')

    let carsObj = document.getElementById('carsAccord')
    let demo3 = document.getElementById('Demo3')
    demo3.innerHTML = ''

    for (let i=0; i < allRented.length; i++){

          let fragment = document.createDocumentFragment();

          let div = document.createElement('div')
          div.setAttribute('class', 'w3-border w3-border-black w3-round w3-margin')
          div.addEventListener('click', function(e){
              e.stopPropagation
              console.log('Tutaj ma być retur')
              rentRetur('retur:' + allRented[i].brand + ' ' +  allRented[i].name + ' ' + allRented[i].surname)
          })

          let fragment2 = document.createDocumentFragment();

          let a = document.createElement('a')
          a.textContent = allRented[i].brand + '\r\n' + ' Kupujący: ' + allRented[i].name + ' ' + allRented[i].surname + ' Koszt: ' + allRented[i].cost + ' Data wypożyczenia: ' + allRented[i].dataw + ' Data zwrotu: ' + allRented[i].dataz + ' Data zakupu: ' + allRented[i].bought_date
          
          fragment2.appendChild(a)

          div.appendChild(fragment2)
          fragment.appendChild(div)
          demo3.appendChild(fragment)
    }
  }


  function sendData(data) {

    let temp = data
    temp = data.split(':')

    console.log('Zaczynam sendData')
    var headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    fetch('/', {method: 'PUT', body: 'data=' + data, headers: {'Content-Type':'application/x-www-form-urlencoded'}}) // Execution of the (asynchronous) query to the web server — a promise is created
    .then(function (response) { // if the promise is fulfilled
        if (!response.ok)
            throw Error(response.statusText);
        if (response.headers.get("Content-Type") !== 'application/json') {
      
            const result = response.text();
            async function getContent(){
                let a = await result
                a = JSON.parse(a)

                console.log('Wiadomość zwrotna: ' + a.message)

                if (a.message == 'UserSuccess'){
                  let obj = document.getElementById('curUser')
                  let obj2 = document.getElementById('operResult')

                  obj.innerHTML = temp[1]
                  obj2.innerHTML = 'Użytkownik został ustawiony'
                }

                else if (a.message == 'DatesSuccess'){
                  let obj1 = document.getElementById('curDataw')
                  let obj2 = document.getElementById('curDataz')
                  let obj3 = document.getElementById('operResult')

                  let daty = temp[1].split(' ')
                  obj1.innerHTML = 'Data wypożyczenia: ' + daty[0]
                  obj2.innerHTML = 'Data zwrotu: ' + daty[1]
                  obj3.innerHTML = 'Daty zostały ustawione'

                }
                
                else {

                  console.log('a.message: ' + a.message)

                  if (a.message == 'Samochód został dodany poprawnie'){

                    let allCars = a.cars
                    actualizeCars(allCars)
                  }

                  let obj3 = document.getElementById('operResult')
                  obj3.innerHTML = a.message
                  
                }
            }

            getContent()

        }
        else {
            //If the received data is a JSON document
            const result = response.json();
            window.alert(result); // show the Promise object
            console.log(result);
        }
    })
    .catch(function (error) { // if the promise is rejected
        window.alert(error);
    });
  }


  function sell(brand) {
    console.log('Zaczynam postFetchAPI')
    var headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    fetch('/', {method: 'POST', body: 'brand=' + brand, headers: {'Content-Type':'application/x-www-form-urlencoded'}}) // Execution of the (asynchronous) query to the web server — a promise is created
    .then(function (response) { // if the promise is fulfilled
        if (!response.ok)
            throw Error(response.statusText);
        if (response.headers.get("Content-Type") !== 'application/json') {
            // If the received data is plain text or an XML document

      
            const result = response.text();
            async function getContent(){
                let a = await result
                a = JSON.parse(a)

                console.log('Wiadomość zwrotna: ' + a.message)

                if (a.message == 'Successfully bought'){
                  let allCars = a.cars
                  console.log('allCars: ' + allCars)
                  let allBought = a.bought
                  actualizeCars(allCars)
                  actualizeBoughts(allBought)

                }


                let obj3 = document.getElementById('operResult')
                obj3.innerHTML = a.message

            }
            getContent()

        }
        else {
            //If the received data is a JSON document
            const result = response.json();
            console.log(result);
        }
    })
    .catch(function (error) { // if the promise is rejected
        window.alert(error);
    });
}


  function rentRetur(data) {
    console.log('Zaczynam postFetchAPI')
    var headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    fetch('/', {method: 'DELETE', body: 'data=' + data, headers: {'Content-Type':'application/x-www-form-urlencoded'}}) // Execution of the (asynchronous) query to the web server — a promise is created
    .then(function (response) {
        if (!response.ok)
            throw Error(response.statusText);
        if (response.headers.get("Content-Type") !== 'application/json') {

      
            const result = response.text();
            async function getContent(){
                let a = await result
                a = JSON.parse(a)
                console.log('Wiadomość zwrotna: ' + a.message)

                if (a.message == 'Successfully rented' || a.message == 'Car successfully returned'){
                  let allCars = a.cars
                  let allRented = a.rented
                  actualizeCars(allCars)
                  actualizeRented(allRented)
                }

                  let obj3 = document.getElementById('operResult')
                  obj3.innerHTML = a.message
                
            }
            getContent()
        }
        else {
            //If the received data is a JSON document
            const result = response.json();
            console.log(result);
        }
    })
    .catch(function (error) { // if the promise is rejected
        window.alert(error);
    });
}


document.getElementsByName('user')[0]
  .addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    console.log('Użytkownik: ' + document.getElementsByName('user')[0].value)
    sendData('user:' + document.getElementsByName('user')[0].value)
  }
  });

document.getElementsByName('dates')[0]
  .addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    console.log('Daty: ' + document.getElementsByName('dates')[0].value)
    sendData('dates:' + document.getElementsByName('dates')[0].value)
  }
});

//- var demo1 = document.getElementById('carsAccord')
//- demo1.addEventListener('click', function(){
//-   console.log('Działa click')
//-   if (demo1.className.indexOf("w3-show") == -1) {
//-     demo1.className += "w3-show";
//-   } 
//-   else {
//-     demo1.className = demo1.className.replace("w3-show", "");
//-   }
//-   })

var logo = document.getElementById('canvas1')
logo.addEventListener('dblclick', function(){
  console.log('Działa dblclick')
  let new_car_prompt = prompt("car   amount   sell_cost   rent_cost_per_day   img_url");
  sendData('add:' + new_car_prompt)
})`

const hash = crypto.createHash('sha256').update(script).digest('hex');
console.log('hash: ' + hash)
