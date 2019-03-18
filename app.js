var sound = new Audio('/alarms/bell.mp3');
		sound.loop = true;

var h2 = document.getElementById('clock');

document.getElementById('clearButton').style.visibility = "hidden";

// display current time by the second
var currentTime = setInterval(function(){
	var date = new Date();
	
	var hours = (12 - (date.getHours()));
	
	var minutes = date.getMinutes();
	
	var seconds = date.getSeconds();
	
	var ampm = (date.getHours()) < 12 ? 'AM' : 'PM';

	if (hours < 0) {
		hours = hours * -1;
	} else if (hours == 00) {
		hours = 12;
	} else {
		hours = hours;
	}

	
	h2.textContent = formatZero(hours) + ":" + formatZero(minutes) + ":" + formatZero(seconds) + "" + ampm;
	
},1000);


/*functions to get hour, min, secs, 
  am or pm, add zero, set alarm time and sound, clear alarm
*/

function formatZero(time) {

		return (time < 10) ? "0" + time : time;
	
}

function hoursMenu(){

	var select = document.getElementById('aHours');
	var hrs = 12

	for (i=1; i <= hrs; i++) {
		select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i);
		
	}
}
hoursMenu();

function minMenu(){

	var select = document.getElementById('aMins');
	var min = 59;

	for (i=0; i <= min; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
	}
}
minMenu();

function secMenu(){

	var select = document.getElementById('aSecs');
	var sec = 59;

	for (i=0; i <= sec; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
	}
}
secMenu();


function alarmSet() {


	var hr = document.getElementById('aHours');
	
	var min = document.getElementById('aMins');
	
	var sec = document.getElementById('aSecs');
	
	var ap = document.getElementById('meridiem');
    

    var selectedHour = hr.options[hr.selectedIndex].value;
    var selectedMin = min.options[min.selectedIndex].value;
    var selectedSec = sec.options[sec.selectedIndex].value;
    var selectedAP = ap.options[ap.selectedIndex].value;

    var alarmTime = formatZero(selectedHour) + ":" + formatZero(selectedMin) + ":" + formatZero(selectedSec) + selectedAP;
    console.log('alarmTime:' + alarmTime);

    document.getElementById('aHours').disabled = true;
	document.getElementById('aMins').disabled = true;
	document.getElementById('aSecs').disabled = true;
	document.getElementById('meridiem').disabled = true;
  document.getElementById('setButton').style.visibility = "hidden";
  document.getElementById('clearButton').style.visibility = "visible";
//when alarmtime is equal to currenttime then play a sound
	var h2 = document.getElementById('clock');

/*function to calcutate the current time 
then compare it to the alarmtime and play a sound when they are equal
*/

setInterval(function(){

	var date = new Date();
	var hours = (12 - (date.getHours()));	
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	
	var ampm = (date.getHours()) < 12 ? 'AM' : 'PM';


	//convert military time to standard time

	if (hours < 0) {
		hours = hours * -1;
	} else if (hours == 00) {
		hours = 12;
	} else {
		hours = hours;
	}
	
	var currentTime = h2.textContent = formatZero(hours) + ":" + formatZero(minutes) + ":" + formatZero(seconds) + "" + ampm;
	

	if (alarmTime == currentTime) {
		sound.play();
		}

},1000);



}


function alarmClear() {

	document.getElementById('aHours').disabled = false;
	document.getElementById('aMins').disabled = false;
	document.getElementById('aSecs').disabled = false;
	document.getElementById('meridiem').disabled = false;
	sound.pause();
  document.getElementById('clearButton').style.visibility = "hidden";
  document.getElementById('setButton').style.visibility = "visible";
}

window.addEventListener('load', async e => {

    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceWorker.js');
            console.log('SW registered');

        } catch (error) {
            console.log('SW failed');

        }
    }
});



