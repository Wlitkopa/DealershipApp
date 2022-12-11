import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HelloMessage from './App';
import reportWebVitals from './reportWebVitals';



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

var counter = document.getElementById('counter')
var all_components = Array.from(document.querySelectorAll("#component_cnt"))
var component_para = document.getElementById('component_para')
var temp_cnt = 0;




const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<HelloMessage name="Początek"/>);



function adjust(){

  let counter_user = counter.value
  console.log("counter_user: ")
  console.log(counter_user)

  counter_user = parseInt(counter_user)

  if (isNaN(counter_user)){
      console.log("Enter the number if you want to change the default value of 10")
  }
  else{
      console.log("Wszystko ok")
  }


  console.log("all_components.length: ")
  console.log(all_components.length)

  let difference = parseInt(counter_user) - all_components.length + 1
  console.log("difference: ")
  console.log(difference)


  //  Jeżeli użytkownik podał zbyt dużą liczbę, dodaję nowe elementy span
  let fragment = document.createDocumentFragment();
  if (difference > 0){

      for (let i=0; i<difference; i++){

          let component = document.createElement('div')
          component.setAttribute("id", "component_cnt")
          fragment.appendChild(component)

      }
      component_para.appendChild(fragment)
  }

  all_components = Array.from(document.querySelectorAll("#component_cnt"))   

  for (let i=0; i<all_components.length; i++){

    if (temp_cnt > 0){
      let container = all_components[i];
      let root = ReactDOM.createRoot(container);
      root.render(<HelloMessage name="kot" cnt={(temp_cnt-1)} comp_len={all_components.length}/>);
      temp_cnt -= 1
    }
  
  }

}


counter.addEventListener("keydown", function(e) {
  if (e.code === "Enter") {
      temp_cnt = parseInt(counter.value) + 1
      adjust();

  }
});