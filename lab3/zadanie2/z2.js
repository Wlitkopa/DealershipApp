


var counter = document.getElementById('counter')
var span_para = document.getElementById('span_para')
var all_span = Array.from(document.querySelectorAll("#span"))
var temp_cnt = 0;
var iter = 0;
var worker = new Worker("computations.js");


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


    console.log("all_span.length: ")
    console.log(all_span.length)

    let difference = parseInt(counter_user) - all_span.length + 1
    console.log("difference: ")
    console.log(difference)


    //  Jeżeli użytkownik podał zbyt dużą liczbę, dodaję nowe elementy span
    let fragment = document.createDocumentFragment();
    if (difference > 0){
        for (let i=0; i<difference; i++){
            let span = document.createElement('span')
            let linebreak = document.createElement("br");
            span.textContent = '0'
            span.setAttribute("id", "span")
            fragment.appendChild(span)
            fragment.append(linebreak)
        }
        span_para.appendChild(fragment)
    }

    all_span = Array.from(document.querySelectorAll("#span"))   
    for (let i=0; i<all_span.length; i++){
        all_span[i].innerHTML = 0;
    }

}

counter.addEventListener("keydown", function(e) {
    if (e.code === "Enter") {
        adjust();
        temp_cnt = parseInt(counter.value) + 1
        iter = -1
        console.log("temp_cnt: ")
        console.log(temp_cnt)
    }
});

setInterval(decrement_using_worker, 1000)    


function decrement_using_worker(){

    // function handleWorkerCompletion(message) {
    //     if (message.data.command == "done") {
    //         console.log("Worker wykonał swoją pracę");

    //         console.log(message.data.new_value)
    //         console.log(message.data.new_iter)

    //         temp_cnt = message.data.new_value
    //         iter = message.data.new_iter
    //         all_span[iter].innerHTML = temp_cnt
    //         worker.removeEventListener("message", handleWorkerCompletion);
    //     }
    //     }
    
    if (temp_cnt > 0){
        // worker.addEventListener("message", handleWorkerCompletion, false);

        // worker.postMessage({
        //     "current_counter": temp_cnt,
        //     "iteration": iter,
        //     });


        worker.postMessage([(temp_cnt), iter])
        worker.onmessage = function(message){
            console.log(message.data[0])
            console.log(message.data[1])
            temp_cnt = message.data[0]
            iter = message.data[1]
            all_span[iter].innerHTML = temp_cnt
            console.log('Message received from worker');

        if (temp_cnt == 0){
            counter.value = 0;
        }
        }
    }

}



