var player = $('#nicoplayer')[0];

var autoreplay = $.cookie('replay') || false;
var playcount = $.cookie('playcount') || 0;

if (playcount) {
	alert('(っω -`｡) 欢迎回来w 你已经Nico了' + playcount + '次');
} else {
	alert('(っω -`｡) 欢迎品尝饼干(雾)~ 第一次打开需要缓冲可能会卡顿哦w');
}

function clog(content) {
	if (console) {
		console.log(content);
	}
}

function replay() {
	$('#replay').addClass('disabled');
	player.currentTime = 0;
	player.play();
}

function updateRepeatState() {
	if (autoreplay) {
		$('#repeat').removeClass('unchecked').addClass('checked');
	} else {
		$('#repeat').removeClass('checked').addClass('unchecked');
	}
}

function setRepeat() {
	autoreplay = !autoreplay;
	updateRepeatState();
	$.cookie('replay', true, { expire: 15552000 });
	clog('Updated >> autoreplay=' + autoreplay);
}

$('#replay')[0].onclick = replay;
$('#repeat')[0].onclick = setRepeat;

$('#playcount').text("× " + playcount);

player.addEventListener('ended', function () {
	playcount++;
	$('#playcount').text("× " + playcount);
	$.cookie('playcount', playcount, { expire: 15552000 });
	clog('Updated >> playcount=' + playcount);
	if (autoreplay) {
		replay();
	} else {
		$('#replay').removeClass('disabled');
	}
});

updateRepeatState();

clog('Initialized >> autoreplay=' + autoreplay + ', playcount=' + playcount);
