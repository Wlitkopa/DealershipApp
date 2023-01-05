
// import { check_file } from '..cw4/zadanie3.js';
import * as http from 'http';
import { resolve } from 'path';
import * as fs from 'node:fs';
import { wykonaj, sell, rent, retur, availability, showBought, showRented } from './dealer_script_lab5.js'

// configure our application
// const Express = require('express');
// import * as Express from 'express'
// const app = new Express();
// app.use(Express.static(__dirname + '/obrazy'));

const re = new RegExp('/obrazy/*')


// sell Fiat_Tipo Henryk Kaczka
// rent Fiat_Tipo Henryk Kaczka 23-10-2002 25-10-2002
// retur Fiat_Tipo Henryk Kaczka 23-10-2002 25-10-2002


/**
 * Handles incoming requests.
 *
 * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g. encoded contents of HTML form fields.
 * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
 * The answer sent by this stream must consist of two parts: the header and the body.
 * <ul>
 *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
 *  <li>The body contains the correct data, e.g. a form definition.
 * </ul>
*/

function requestListener(request, response) {

    console.log("--------------------------------------");
    console.log("The relative URL of the current request: " + request.url + "\n");
    var url = new URL(request.url, `http://${request.headers.host}`); // Create the URL object
    console.log('url.pathname: ' + url.pathname)
    if (url.pathname == '/submit') { // Processing the form content, if the relative URL is '/submit'
        /* ************************************************** */
        console.log("Creating a response header");
        // Creating an answer header — we inform the browser that the body of the answer will be plain text
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        
        /* ************************************************** */
        console.log("Creating a response body");
        if (request.method == 'GET'){ // If the GET method was used to send data to the server
            // Place given data (here: 'Hello <name>') in the body of the answer
            // response.write(`Hello ${url.searchParams.get('name')}`); // "url.searchParams.get('name')" contains the contents of the field (form) named 'name'
            // check_file(`${url.searchParams.get('name')}`, response); // "url.searchParams.get('name')" contains the contents of the field (form) named 'name'
            // check_file(`${url.searchParams.get('name')}`, response)
            response.write(`${url.searchParams.get('command')}`)
            response.write("\n")
            // wykonaj(url.searchParams.get('command'), response)

            response.write(`<!DOCTYPE html>
            <html lang="pl">
              <!-- Zmień wartość "lang" z 'en' na 'pl' -->
            
              <head>

                <meta http-equiv="Content-Security-Policy" 
                    content="default-src 'self'; style-src https://www.w3schools.com/w3css/4/w3.css https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css 'unsafe-inline";
                    img-src http://localhost:8000/;" />




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
              <body>
    
            
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
            
    
    
    
    
    
                <form method="GET" action="/submit" class="w3-margin">
                    <textarea id="commandarea" name="command" rows="4" cols="50" placeholder="Enter the command"></textarea>
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
            
            
                <!-- <div class="w3-container w3-content w3-mobile"> -->
                <div class="row w3-row-padding w3-section w3-margin w3-mobile">
            
                    <div class="row w3-card-4 w3-border w3-border-grey w3-margin w3-left w3-mobile rotation" style="width:30%">
            
                      <img src="./obrazy/fiat_tipo.jpg" alt="Fiat Tipo" style="width:100%">
                      <div class="w3-container">
                        <h4 class="w3-border-bottom"><b>Fiat Tipo</b></h4>
                      </div>
                      <ul>
                        <li>
                          <a>Przebieg: 2km (do sklepu i z powrotem)</a>
                        </li>
                        <li>
                          <a>Rok produkcji: 2015</a>
                        </li>
                      </ul>
                    </div>
              
              
                    <div class="column w3-card-4 w3-border w3-border-grey w3-margin w3-right w3-mobile rotation" style="width:35%">
              
                      <img src="./obrazy/fiat_500.jpg" alt="Fiat 500" style="width:100%">
                      <div class="w3-container">
                        <h4 class="w3-border-bottom"><b>Fiat 500</b></h4>
                      </div>
                      <ul>
                        <li>bottom
                          <a>Przebieg: 13km</a>
                        </li>
                        <li>
                          <a>Rok produkcji: 1975</a>
                        </li>
                      </ul>
                    </div>
            
                </div>
                
            
                <!-- <div class="w3-container w3-content w3-mobile"> -->
                <div class="row w3-row-padding w3-section w3-margin w3-mobile" style="width:70%">
            
                  <!-- <div class="w3-row"> -->
            
                    <div class="w3-card-4 w3-border w3-border-grey w3-margin w3-left w3-mobile rotation" style="width:35%">
            
                      <img src="./obrazy/przyczepa_jedn.jpg" alt="Przyczepa jednoosiowa" style="width:100%">
                      <div class="w3-container">
                        <h4 class="w3-border-bottom"><b>Przyczepa jednoosiowa</b></h4>
                      </div>
                      <ul>
                        <li>
                          <a>Ładowność: 700</a>
                        </li>
                        <li>
                          <a>Wymiary produktu: 201 x 106 x 30 cm </a>
                        </li>
                      </ul>
                      
                    </div>
              
                    <div class="w3-card-4 w3-border w3-border-grey w3-margin w3-right w3-mobile rotation" style="width:40%;">
              
                      <img src="./obrazy/przyczepa.jpg" alt="Przyczepa samochodowa" style="width:100%">
                      <div class="w3-container">
                        <h4 class="w3-border-bottom"><b>Przyczepa samochodowa</b></h4>
                      </div>
                      <ul>
                        <li>
                          <a>Ładowność: 750 kg</a>
                        </li>
                        <li>
                          <a>Wymiary produktu: 264 x 126 x 30 cm</a>
                        </li>
                      </ul>
                    </div>
            
                  <!-- </div> -->
            
                </div>
            
            
            
              
                <footer class="w3-bottom w3-border w3-border-light-green w3-light-green">
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
                  </script>
            
              </body>
            </html>`);

            response.end()
            
            }

        else // If other method was used to send data to the server
            response.write(`This application does not support the ${request.method} method`);
        /* ************************************************** */
        console.log("Sending the response");
        // response.end(); // The end of the response — send it to the browser
    }
    else if (re.test(url.pathname)) {
      let n = url.pathname
      let dirs = n.split('/')
      console.log('dirs: ' + dirs)
      console.log('dirs[1]: ' + dirs[1])

      let fileToLoad = fs.readFileSync('/home/przemek/VSCodeProjects/HTMLProjects/ps_html/lab5/' + dirs[1] + '/' + dirs[2]);
      console.log('DZIAŁA ELSE IF PRZYCZEPA')
      response.writeHead(200, {'Content-Type':  'image/jpg' });
      response.end(fileToLoad, 'binary');
      // response.end()

    }
    else { // Generating the form
        /* ************************************************** */
        console.log("Creating a response header")
        // Creating a response header — we inform the browser that the body of the response will be HTML text
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        /* ************************************************** */
        console.log("Creating a response body");
        // and now we put an HTML form in the body of the answer
        response.write(`<!DOCTYPE html>
        <html lang="pl">
          <!-- Zmień wartość "lang" z 'en' na 'pl' -->
        
          <head>
          
          
            <meta http-equiv="Content-Security-Policy" 
                    content="default-src 'self'; style-src https://www.w3schools.com/w3css/4/w3.css https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css 'unsafe-inline';
                             img-src http://localhost:8000/;" /> 
                            


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
          <body>

        
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
        





            <form method="GET" action="/submit">
                <textarea id="commandarea" name="command" rows="4" cols="50" placeholder="Enter the command"></textarea>
                <br>
                <input type="submit">
            </form>
            





            <p name="kupione">
                <a>Kupione: </a>
                <br>
            </p>

            <p name="wypozyczone">
            <a>Wypożyczone: </a>
            <br>
            </p>
        
        
            <!-- <div class="w3-container w3-content w3-mobile"> -->
            <div class="row w3-row-padding w3-section w3-margin w3-mobile" >
        
                <div class="w3-card-4 w3-border w3-border-grey w3-margin w3-left w3-mobile rotation" style="width:30%">
        
                  <img src="./obrazy/fiat_tipo.jpg" alt="Fiat Tipo" style="width:100%">
                  <div class="w3-container">
                    <h4 class="w3-border-bottom"><b>Fiat Tipo</b></h4>
                  </div>
                  <ul>
                    <li>
                      <a>Przebieg: 2km (do sklepu i z powrotem)</a>
                    </li>
                    <li>
                      <a>Rok produkcji: 2015</a>
                    </li>
                  </ul>
                </div>
          
          
                <div class="column w3-card-4 w3-border w3-border-grey w3-margin w3-right w3-mobile rotation" style="width:35%">
          
                  <img src="./obrazy/fiat_500.jpg" alt="Fiat 500" style="width:100%">
                  <div class="w3-container">
                    <h4 class="w3-border-bottom"><b>Fiat 500</b></h4>
                  </div>
                  <ul>
                    <li>bottom
                      <a>Przebieg: 13km</a>
                    </li>
                    <li>
                      <a>Rok produkcji: 1975</a>
                    </li>
                  </ul>
                </div>
        
            </div>
            
        
            <!-- <div class="w3-container w3-content w3-mobile"> -->
            <div class="row w3-row-padding w3-section w3-margin w3-mobile">
        
              <!-- <div class="w3-row"> -->
        
                <div class="w3-card-4 w3-border w3-border-grey w3-margin w3-left w3-mobile rotation" style="width:35%">
        
                  <img src="./obrazy/przyczepa_jedn.jpg" alt="Przyczepa jednoosiowa" style="width:100%">
                  <div class="w3-container">
                    <h4 class="w3-border-bottom"><b>Przyczepa jednoosiowa</b></h4>
                  </div>
                  <ul>
                    <li>
                      <a>Ładowność: 700</a>
                    </li>
                    <li>
                      <a>Wymiary produktu: 201 x 106 x 30 cm </a>
                    </li>
                  </ul>
                  
                </div>
          
                <div class="w3-card-4 w3-border w3-border-grey w3-margin w3-right w3-mobile rotation" style="width:40%;">
          
                  <img src="./obrazy/przyczepa.jpg" alt="Przyczepa samochodowa" style="width:100%">
                  <div class="w3-container">
                    <h4 class="w3-border-bottom"><b>Przyczepa samochodowa</b></h4>
                  </div>
                  <ul>
                    <li>
                      <a>Ładowność: 750 kg</a>
                    </li>
                    <li>
                      <a>Wymiary produktu: 264 x 126 x 30 cm</a>
                    </li>
                  </ul>
                </div>
        
              <!-- </div> -->
        
            </div>
        
        
        
          
            <footer class="w3-bottom w3-border w3-border-light-green w3-light-green">
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
              </script>
        
          </body>
        </html>`);
        /* ************************************************** */
        console.log("Sending the response");
        response.end();  // The end of the response — send it to the browser
    }
}

/* ************************************************** */
/* Main block
/* ************************************************** */
// var http = require("http");

var server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8000);
console.log("The server was started on port 8000");
console.log("To stop the server, press 'CTRL + C'");



// check_file('/home/przemek')
