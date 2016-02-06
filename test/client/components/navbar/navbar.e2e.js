var expect = require('expect');
var config = require('../../../../site/config');

beforeEach(function() {

});

describe('navbar', function() {
    it('should have Home link', function(done) {
        browser
            .url(config.baseUrl)
            .getText('.navbar-header a')
            .then(function(text) {
                expect(text).toBe('Home');
                done();
            });
    });
});
