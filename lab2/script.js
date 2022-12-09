
var button = document.getElementById('button');
var paragraph = document.getElementById('paragraph');



button.onclick = function(){
    paragraph.innerHTML += document.forms[0].elements[0].value + ' ' +  document.forms[0].elements[0].value.typeof + '<br />';
    paragraph.innerHTML += document.forms[0].elements[1].value + ' ' + document.forms[0].elements[1].type + '<br />';
};

button.onclick;


// var expect = chai.expect;

// function sum(x,y) {
// 	return x+y;
// }

// describe('The sum() function', function() {
//  it('Returns 4 for 2+2', function() {
//    expect(sum(2,2)).to.equal(4);
//  });
//  it('Returns 0 for -2+2', function() {
//    expect(sum(-2,2)).to.equal(0);
//  });
// });

