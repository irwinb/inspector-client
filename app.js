
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  feed = require('./routes/feed')
  http = require('http'),
  path = require('path'),
  socketServer = require('./socketServer'),
  socketClient = require('./socketClient');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var WebSocket = require('ws');

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/feed/:id', feed.feed);

// JSON API
app.get('/api/projects/:id', api.getProject);
app.put('/api/projects/:id', api.updateProject);
app.post('/api/projects', api.createProject);

// redirect all others to the index (HTML5 history)
app.get('*', routes.notFound);

// Socket.io Communication
io.set('log level', 1);
io.sockets.on('connection', socketServer.handler);
socketClient.Start(WebSocket);

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
