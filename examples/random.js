#!/usr/local/env node

var TimeBuffer = require('time-buffer');

// Create 3 buffers of different durations
var bufferFiveSec = new TimeBuffer(5);
var bufferOneMin = new TimeBuffer(60);
var bufferTwoMin = new TimeBuffer(120);

var interval = setInterval(function() {
	var rand = Math.floor(Math.random() * 10);
	bufferFiveSec.add(rand);
	bufferOneMin.add(rand);
	bufferTwoMin.add(rand);
	console.log(bufferFiveSec);
	console.log(bufferOneMin);
	console.log(bufferTwoMin);
}, 2000); // Even at 2 seconds this works. We time-buffer handles the gaps correctly.