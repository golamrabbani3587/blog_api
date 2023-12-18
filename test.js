var expect  = require('chai').expect;
var request = require('request');
require('dotenv').config()

it('Main page content', function(done) {
    request('http://localhost:'+process.env.PROD_PORT, function(error, response, body) {    
        expect(body).to.equal('App is running');
        done();
    });
});