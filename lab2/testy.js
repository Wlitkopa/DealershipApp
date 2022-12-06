


function cyfry(napis){


    let amount = 0;

    for (let index in napis){

        if (napis[index].charCodeAt(0) <= 57 && napis[index].charCodeAt(0) >= 48){

            console.log(napis[index]);

            amount += 1;

        };

    };

    return amount;
}

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



var expect = chai.expect;

describe('The suma() function', function() {
 it('Returns 123 for 123', function() {
    var usinp = "123";
   expect(suma(usinp)).to.equal(123);
 });
 it('Returns 0 for asfasfa', function() {
    var usinp = "asfasfa";
    expect(suma(usinp)).to.equal(0);
  });
  it('Returns 11 for 11b254kj', function() {
    var usinp = "11b254kj";
    expect(suma(usinp)).to.equal(11);
  });
});

describe('The cyfry() function', function() {
    it('Returns 3 for 123', function() {
      expect(cyfry("123")).to.equal(3);
    });
    it('Returns 0 for asfasfa', function() {
        var usinp = "asfasfa";
        expect(cyfry(usinp)).to.equal(0);
      });
    it('Returns 5 for 11b254kj', function() {
    var usinp = "11b254kj";
    expect(cyfry(usinp)).to.equal(5);
    });
    it('Returns 8 for ab11b254kj234', function() {
        var usinp = "ab11b254kj234";
        expect(cyfry(usinp)).to.equal(8);
        });
});

describe('The litery() function', function() {
    it('Returns 0 for 123', function() {
      expect(litery(123)).to.equal(0);
    });
    it('Returns 7 for asfasfa', function() {
        var usinp = "asfasfa";
        expect(litery(usinp)).to.equal(7);
      });
      it('Returns 3 for 11b254kj', function() {
        var usinp = "11b254kj";
        expect(litery(usinp)).to.equal(3);
      });
      it('Returns 10 for ahjasG11b254kji', function() {
        var usinp = "ahjasG11b254kji";
        expect(litery(usinp)).to.equal(10);
        });
});