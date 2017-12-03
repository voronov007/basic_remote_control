import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import nipplejs from 'nipplejs';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

function create_joystick(){
	var options = {
		zone: document.getElementById('zone_joystick'),
		mode: 'static',
		position: {
		  left: '50%',
		  top: '50%'
		},
		color: 'red'
	}
	return nipplejs.create(options);
}

// handle joystick events => get coords and send data to server
var joystick_data = null;
function bindNipple() {
  joystick.on('start end', function(evt, data) {
    dump(evt.type);
    debug(data);
  }).on('move', function(evt, data) {
    debug(data);
  }).on('dir:up plain:up dir:left plain:left dir:down ' +
        'plain:down dir:right plain:right',
        function(evt, data) {
		    dump(evt.type);
  }).on('pressure', function(evt, data) {
    debug({
      pressure: data
    });
  }).on('start end move dir:up plain:up dir:left plain:left dir:down plain:down dir:right plain:right', function(evt,data){
  	if (data.hasOwnProperty("direction")){
	   	console.log("Data is:");
	  	console.log(data);
	  	console.log("Event is");
	  	console.log(evt);
  		joystick_data = data;
  	}
  });
}

var joystick = create_joystick();
bindNipple();

var get_by_id = function(sel) {
  return document.getElementById(sel);
};

// Get debug elements and map them
var elDebug = get_by_id('debug');
var elDump = elDebug.querySelector('.dump');
var els = {
  position: {
    x: elDebug.querySelector('.position .x .data'),
    y: elDebug.querySelector('.position .y .data')
  },
  force: elDebug.querySelector('.force .data'),
  pressure: elDebug.querySelector('.pressure .data'),
  distance: elDebug.querySelector('.distance .data'),
  angle: {
    radian: elDebug.querySelector('.angle .radian .data'),
    degree: elDebug.querySelector('.angle .degree .data')
  },
  direction: {
    x: elDebug.querySelector('.direction .x .data'),
    y: elDebug.querySelector('.direction .y .data'),
    angle: elDebug.querySelector('.direction .angle .data')
  }
};

// send data to server
var i = 0;
setInterval(function(){
	if (joystick_data != null){
		console.log("#" + i + " Send coords");
		i += 1;
		delete joystick_data.instance;
		fetch('http://127.0.0.1:8000/control/', {
		  method: 'post',
		  mode: 'cors',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(joystick_data)
		}).then(function(response){
			console.log("Success");
			console.log(response);
			console.log(response.headers);
		}).catch(err => {
   			console.log(err);
   			console.log(err.headers);
		});

	}
}, 100);


// Print data into elements
function debug(obj) {
  function parseObj(sub, el) {
    for (var i in sub) {
      if (typeof sub[i] === 'object' && el) {
        parseObj(sub[i], el[i]);
      } else if (el && el[i]) {
        el[i].innerHTML = sub[i];
      }
    }
  }
  setTimeout(function() {
    parseObj(obj, els);
  }, 0);
}

// Dump data
var nbEvents = 0;
function dump(evt) {
  setTimeout(function() {
    if (elDump.children.length > 4) {
      elDump.removeChild(elDump.firstChild);
    }
    var newEvent = document.createElement('div');
    newEvent.innerHTML = '#' + nbEvents + ' : <span class="data">' +
      evt + '</span>';
    elDump.appendChild(newEvent);
    nbEvents += 1;
  }, 0);
}
