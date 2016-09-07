// karma.conf.js
module.exports = function(config) {
    config.set({
        browsers: [
            'Chrome'
        ],
        
        files: [
            'js/*.js',
            'test/*.js'
        ],
        
        frameworks: [
            'mocha', // The framework
            'chai',  // The assertions
            'sinon' // Spys & mocks
        ]
    });
};


