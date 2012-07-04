time-buffer [![Build Status](https://secure.travis-ci.org/mzsanford/time-buffer.png?branch=master)](http://travis-ci.org/mzsanford/time-buffer)
===========

Storing per-second granularity data in a standard circular buffer leaves old values in place if there is nothing collected. This can lead to the illusion of newly arrived data when in fact there has simply been nothing to overwrite the buffer. The possible solutions are a 'reaper' thread/interval that clears out old buffers or a queue of values from which old values are removed. This library takes the latter approach through it may eventually support both. Here is an example:


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
