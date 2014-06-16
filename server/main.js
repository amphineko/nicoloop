var app = require('express')();
var fs = require('fs');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var counter = 0;

app.get('/', function (res, resp) {
	resp.sendfile('console.html');
});

function onFinish() {
	counter++;
	io.emit('heartbeat', { counter: io.engine.clientsCount, total: counter });
}

io.on('connection', function (socket) {
	io.emit('heartbeat', { counter: io.engine.clientsCount, total: counter });
	socket.on('disconnect', function () {
		io.emit('heartbeat', { counter: io.engine.clientsCount, total: counter });
	});
	socket.on('finish', onFinish);
});

io.on('finish', function (socket) {
	counter++;
	io.emit('heartbeat', { counter: io.engine.clientsCount, total: counter });
});

if (fs.existsSync('./data.json')) {
	counter = JSON.parse(fs.readFileSync('./data.json')).counter;
}

setInterval(function () {
	fs.writeFileSync('./data.json', JSON.stringify({
		counter: counter
	}));
});

http.listen(1394);
