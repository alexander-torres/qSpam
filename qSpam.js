//Test this code in other browsers, then make necessary adjustments for compatibility

// Use for constantly checking quantum processor value and spamming it when it's above zero

var qSpamDiv = document.createElement('div');
document.body.appendChild(qSpamDiv);
qSpamDiv.outerHTML = "<div draggable='true' ondragstart='GrabDiv(event)' ondrag='DropDiv(event)' id='qSpam' style='background: #fff; border: 1px solid grey; padding: 5px; position: absolute; right: 30px; top: 150px; width: 275px;'>\
	<p style='display: inline-block; line-height: 150%; margin: 0;'><b>qSpam</b></p>\
	<span style='border: 1px solid grey; border-radius: 1em; display: inline-block; float: right; text-align: center; width: 1.1em;'>?</span>\
	<br>\
	<button class='button2' onclick='qSpamToggle()' style='width: 40px;'>Run</button>\
	<span id='qMessage' style='line-height: 100%;'></span>\
	<br>\
	Status: \
	<span id='qSpamStatus'>OFF</span>\
</div>";
qSpamDiv = document.getElementById('qSpam');

var qMessage = document.getElementById('qMessage');
var docHeight = 0;
var moveParams = {x: 0, y: 0};
document.addEventListener('dragover', (event) => {event.preventDefault();}, false);

function HideDragImg(target) {target.dataTransfer.setDragImage(document.createElement('div'), 0, 0);};

function GrabDiv(e) {
	HideDragImg(e)
	docHeight = document.documentElement.offsetHeight;
	moveParams.x = parseInt(qSpamDiv.style.right.slice(0, -2)) + e.clientX;
	moveParams.y = parseInt(qSpamDiv.style.top.slice(0, -2)) - e.clientY;
};

function DropDiv(e) {
	if (e.clientX > 0 && e.clientX < document.body.offsetWidth) {
		var x = moveParams.x - e.clientX;
		qSpamDiv.style.right = Math.min(Math.max(x, 0), document.documentElement.offsetWidth - qSpamDiv.offsetWidth) + 'px';
	};
	if (e.clientY > 0 && e.clientY < docHeight) {
		var y = moveParams.y + e.clientY;
		qSpamDiv.style.top = Math.min(Math.max(y, 0), docHeight - qSpamDiv.offsetHeight) + 'px';
	};
};

var qSum = () => {
	var q = 0
	qChips.forEach(chip => q += chip.value);
        return q;
};

var qSpam = 0;
var messageTimers = [];

function qSpamToggle() {
	if (qChips[0].active == 0) {
		clearTimeout(messageTimers[0]);
		clearTimeout(messageTimers[1]);
		qMessage.style.transition = '';
		qMessage.style.opacity = 1;
		qMessage.innerText = ' No Active Photonic Chips';
		messageTimers[0] = setTimeout(() => {qMessage.style.transition = 'opacity 2s'; qMessage.style.opacity = 0;}, 1000);
		messageTimers[1] = setTimeout(() => {qMessage.innerText = '';}, 3000);
	} else if (qSpam == 0) {
		qMessage.innerText = '';
		qSpam = setInterval(() => {if (qSum() > 0) {qComp();};}, 1);
	} else {
		clearInterval(qSpam);
		qSpam = 0;
	};
};