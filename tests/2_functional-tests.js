const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);
    test('Test GET /api/convert with a valid, eg. input=10L', function(done) {
        chai.request(server)
        .get('/api/convert?input=10L')
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.returnNum, 2.64172);
            assert.equal(res.body.returnUnit, 'gal');
            assert.equal(res.body.string, '10 Liters converts to 2.64172 Gallons');
            done();
        });
    });

    test('Test GET /api/convert with an invalid input such as 32g', function(done) {
        chai.request(server)
        .get('/api/convert?input=32g')
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.initUnit, 'invalid unit');
            assert.equal(res.body.returnUnit, 'invalid unit');
            assert.equal(res.body.string, '32 Error en la unidad converts to undefined Error en la unidad');
            done();
        });
    });

    test('Test GET /api/convert with an invalid number such as 3/7.2/4kg', function(done) {
        chai.request(server)
        .get('/api/convert?input=3/7.2/4kg')
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.initNum, 'Invalid Number');
            assert.equal(res.body.returnUnit, 'lbs');
            assert.equal(res.body.string, 'Invalid Number Kilograms converts to NaN Pounds');
            done();
        });
    });

    test('Test GET /api/convert with an invalid unit such as 3/7.2/4kilomegagram', function(done) {
        chai.request(server)
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.initNum, 'Invalid Number');
            assert.equal(res.body.returnUnit, 'invalid unit');
            assert.equal(res.body.string, 'Invalid Number Error en la unidad converts to undefined Error en la unidad');
            done();
        });
    });

    test('Test GET /api/convert with no number such as kg', function(done) {
        chai.request(server)
        .get('/api/convert?input=kg')
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.initNum, '1');
            done();
        });
    });

});
