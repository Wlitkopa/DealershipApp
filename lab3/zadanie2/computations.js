


// self.addEventListener("message", run);


// function run(message){
//     var cnt = message.data.current_counter
//     var it = message.data.iter
//     new_value = decrement(cnt)

//     self.postMessage({
//         "command": "done",
//         "new_value": new_value[0],
//         "new_iter": new_value[1]
//       });
// }


// function decrement(temp_cnt, iter){

//     temp_cnt -= 1
//     iter += 1

//     return [temp_cnt, iter]

// }




onmessage = function(e) {
    console.log('Worker: Message received from main script');

    let temp_cnt = e.data[0] - 1
    let iter = e.data[1] += 1
    const workerResult = [temp_cnt, iter];
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);
    
  }

