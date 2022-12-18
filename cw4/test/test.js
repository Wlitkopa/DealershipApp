// /*
// eslint-disable-next-line max-len
//   Mocha allows you to use any assertion library you wish. In this example, we are using the built-in module called 'Assert'.
//   If you prefer the 'Chai' library (https://www.chaijs.com/) then you have to install it yourself: 'npm install chai --save-dev',
//   and then you need to uncomment the lines below.
// */

//----------------------------------------
// Mocha tests with CommonJS style imports
//----------------------------------------

// const  expect = require('chai').expect;
// const assert = require('assert');
// const sum_module = require('../sum_module');

// describe('The sum() method', function() {

//   it('Returns 4 for 2+2', function() {
//     var op = new sum_module.Operation(2, 2);
//     assert.strictEqual(op.sum(), 4)
//     // expect(op.sum()).to.equal(4);
//   });

//   it('Returns 0 for -2+2', function () {
//     var op = new sum_module.Operation(-2, 2);
//     assert.strictEqual(op.sum(), 0)
//     // expect(op.sum()).to.equal(0);
//   });

// });

//-----------------------------------
// Mocha tests with ES6 style imports
//-----------------------------------

/*
- You must install the 'esm' module (https://www.npmjs.com/package/esm) — npm install esm --save-dev
- You must run tests as follows: npx mocha --require esm
Source: https://stackoverflow.com/questions/57004631/mocha-tests-with-es6-style-imports

*/

// Jako że w pliku package.json został wpisany type: module, to pliki z rozszerzeniem .js
// są traktowane jako moduły ES. Dlatego tutaj korzystam z testów Mocha z ES6 style imports

import assert from 'assert';
import { Operations } from '../sum_module.js';

describe('The sum() method', function () {
  it('Returns 4 for 2+2', function () {
    var op = new Operations(2, 2);
    assert.strictEqual(op.sum(), 4)
  });
  it('Returns 0 for -2+2', function () {
    var op = new Operations(-2, 2);
    assert.strictEqual(op.sum(), 0)
  });
});
