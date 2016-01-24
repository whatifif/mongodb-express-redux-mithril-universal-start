var path = require('path'),
    fs = require('fs'),
    dotenv = require('dotenv'),
    express = require('express'),
    app = express(),
    pubDir = path.join(__dirname, '..', 'client'),
    envFile = path.join(__dirname, '..', '.env'),
    lessMiddleware = require('less-middleware'),
    mongoose = require('mongoose'),
    browserify = require('browserify-middleware'),
    config = require('../site/config');

global.__server__ = config.useServerRender;
global.__client__ = config.useClientRender;
global.__useBlog__ = config.useBlog;

var router = require('./router');


// load up .env file
if (fs.existsSync(envFile)) {
    dotenv.load();
}

var mongo_url = process.env.MONGO_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || process.env.MONGOSOUP_URL;
if (!mongo_url) {
    // var mockgoose = require('mockgoose');
    // mockgoose(mongoose);
    // mockgoose.reset();
    mongo_url = config.mongo.uri;
}

mongoose.connect(mongo_url);

if (config.seedDB) {
    require('../site/seedDB')();
    config.seedDB = false;
}

// use models after potential mockgoose
var auth = require('./auth.js');

// serve up CSS from LESS. this is efficiently cached.
app.use(lessMiddleware(pubDir, {
    parser: {
        paths: [path.join(__dirname, '..')]
    }
}));

// // static server
app.use(express.static(pubDir));

// keep all auth-related routes at /auth/whatevs
app.use('/auth', auth);

// DEMO: Lock API routes down, like this
app.get('/api/profile', auth.requireToken, function(req, res) {
    res.send(req.user);
});



// TODO: implement server-side parsing for initial page-load
// app.get('/*', function(req, res) {
//     res.sendFile(path.join(pubDir, 'index.html'));
// });
if (global.__server__) {
    if (global.__client__) {
        // browserify the entry-point. this is efficiently cached if NODE_ENV=production
        app.get('/app.js', browserify(path.join(pubDir, 'js', 'app.js'), {}));
    }
    //server-side render
    app.use(router);
    app.get('/*', function(req, res) {
        res.redirect('/');
    });

} else {
    // browserify the entry-point. this is efficiently cached if NODE_ENV=production
    app.get('/app.js', browserify(path.join(pubDir, 'js', 'app.js'), {}));
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
}

if (require.main === module) {
    var port = process.env.PORT || 3000;
    app.listen(port);
    console.log('Listening on http://localhost:' + port);
}

module.exports = app;
