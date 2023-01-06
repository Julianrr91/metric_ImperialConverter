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
            done();
        });
    });

    test('Test GET /api/convert with an invalid input such as 32g', function(done) {
        chai.request(server)
        .get('/api/convert?input=32g')
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            done();
        });
    });

    test('Test GET /api/convert with an invalid number such as 3/7.2/4kg', function(done) {
        chai.request(server)
        .get('/api/convert?input=3/7.2/4kg')
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            done();
        });
    });

    test('Test GET /api/convert with an invalid unit such as 3/7.2/4kilomegagram', function(done) {
        chai.request(server)
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            done();
        });
    });

    test('Test GET /api/convert with no number such as kg', function(done) {
        chai.request(server)
        .get('/api/convert?input=kg')
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            done();
        });
    });

});
