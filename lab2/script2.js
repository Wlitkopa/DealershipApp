


var i = 0;
var sumaall = 0;

var para = document.getElementById("paragraph");

while (true){
    // document.write('kot');
    let usinp = window.prompt('Podaj napis', 'tutaj');

    if (usinp === null){
        break;
    }

    sumaall += suma(usinp)

    para.innerHTML += usinp + '<br />' + cyfry(usinp) + ' ' + litery(usinp) + ' ' + sumaall + '<br />';

    // document.write('${usinp}\t${cyfry(usinp)}\t${litery(usinp)}\t${suma(usinp)}');

    // document.write(usinp);



    i += 1;
};



function cyfry(napis){


    let amount = 0;

    for (let index in napis){

        if (napis[index].charCodeAt(0) <= 57 && napis[index].charCodeAt(0) >= 48){

            console.log(napis[index]);

            amount += 1;

        };

    };

    return amount;
};


function litery(napis){

    let amount = 0;
    
    for (let index in napis){


        if (napis[index].charCodeAt(0) > 57 || napis[index].charCodeAt(0) < 48){

            amount += 1;

            console.log(napis[index]);


    }

}
    return amount;

}

function suma(napis){
    let cur_sum = 0
    let potega = 10;


    for (let index in napis){

        if (napis[index].charCodeAt(0) <= 57 && napis[index].charCodeAt(0) >= 48){

            let cyfra = napis[index].charCodeAt(0) - 48;
            cur_sum *= potega;
            cur_sum += cyfra;

            console.log(napis[index]);

        }
        else{

            return cur_sum;
        }

    }

    return cur_sum;
}
