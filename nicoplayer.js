var player = $('#nicoplayer')[0];

var autoreplay = $.cookie('replay') || false;
var playcount = $.cookie('playcount') || 0;

if (playcount) {
	$('#first-time').text('(っω -`｡) 欢迎回来w 你已经Nico了' + playcount + '次');
} else {
	$('#first-time').text('(っω -`｡) 欢迎~ 第一次载入可能需要很长时间或卡顿哦 > <');
}

setTimeout(function () {
	$('#first-time').hide('blind', {}, 500, function () {});
}, 5000);

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
	$.cookie('replay', true, { expire: 2002937584785 });
	clog('Updated >> autoreplay=' + autoreplay);
}

$('#replay')[0].onclick = replay;
$('#repeat')[0].onclick = setRepeat;

$('#playcount').text("× " + playcount);

player.addEventListener('ended', function () {
	playcount++;
	$('#playcount').text("× " + playcount);
	$.cookie('playcount', playcount, { expire: 2002937584785 });
	clog('Updated >> playcount=' + playcount);
	if (autoreplay) {
		replay();
	} else {
		$('#replay').removeClass('disabled');
	}
});

updateRepeatState();

clog('Initialized >> autoreplay=' + autoreplay + ', playcount=' + playcount);
