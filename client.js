var ioint = setInterval(function () {
	if (io) {
		var socket = io('http://epsilon.futa.pw:1394');
		socket.on('heartbeat', function (msg) {
			$('#online-counter').text('当前在线' + msg.counter + '人, 总计Nico了' + msg.total + '次');
			console.log('伺服器廣播心跳: ' + JSON.stringify(msg));
		});
		player.addEventListener('ended', function () {
			socket.emit('finish');
		});
	}
	clearInterval(ioint);
}, 1000);
