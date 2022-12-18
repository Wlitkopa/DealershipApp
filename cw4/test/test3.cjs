//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8000");

// UNIT test begin
describe('GET /submit?name=%2Fhome%2Fprzemek%2Fkot.txt', function () {
      it('respond with "Zawartość pliku to: kot"', function (done) {
            server
                  .get('/submit?name=%2Fhome%2Fprzemek%2Fkot.txt')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "Zawartość pliku to: kot\n", done);
      });
});

describe('GET /submit?name=%2Fhome%2Fprzemek%2F', function () {
      it('respond with "To jest folder"', function (done) {
            server
                  .get('/submit?name=%2Fhome%2Fprzemek%2F')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "To jest folder", done);
      });
});

describe('GET /submit?name=%2Fhome%2Fprzemek%2Fsgmkoaslsmf', function () {
      it('respond with "Nie ma takiego pliku ani katalogu"', function (done) {
            server
                  .get('/submit?name=%2Fhome%2Fprzemek%2Fsgmkoaslsmf')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "Nie ma takiego pliku ani katalogu", done);
      });
});