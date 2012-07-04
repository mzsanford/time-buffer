(function(global) {

function TimeBuffer(trackSeconds) {
	this.size = trackSeconds;
	this.started = Math.floor(new Date().getTime() / 1000);
	this.windowBuffer = 5; // extra values to store
	this.windowShift = 0;  // Keep track of our shift
  this.data = new Array(trackSeconds + this.windowBuffer);
  // force preallocation of memory to each array slot, for quicker operation on buffer
  for (var i=0; i < this.data.length; i++) {
      this.data[i] = 0;
  }

  return this;
}

TimeBuffer.prototype = {
	_age: function() {
		return Math.floor(new Date().getTime() / 1000) - this.started;
	},
	
	_index: function() {
		var offset = this._age() - 1;
		
		if (offset > (this.size + this.windowBuffer) ) {
			// TODO: Is there a more GC friendly way of doing this?
			this.data.shift(); // discard the oldest entry.
			this.windowShift += 1;
		}
		
		return (offset - this.windowShift);
	},

	add: function(val) {
		var idx = this._index();
		var preVal = this.data[idx];
		if (preVal === undefined) {
			this.data[idx] = val;
		} else {
			this.data[idx] = (preVal + val);
		}
	},

	increment: function() {
		this.add(1);
	},
	
	partialMean: function(seconds) {
		if (seconds < 1) {
			return 0;
		}

		var total = 0,
		    idx = this._index();
				
		var start = (idx - seconds),
		    end = idx+1; // +1 for loop terminator

		if (start < 0) {
			// Not enough data yet. Do the best we can.
			end = (seconds + start + 1);
			start = 0;
		}

		for (var i=start; i < end; i++) {
			// Treat no increments as 0, no data collected.
			total += (this.data[i] || 0);
		}
		
		return (total / seconds);
	},
	
	mean: function() {
		return this.partialMean(this.size);
	},
	
	inspect: function() {
		return '<TimeBuffer size=' + this.size + ' age=' + this._age() + ' mean=' + this.mean() + '>';
	}
}

if (typeof module === 'object' && module.exports) {
  module.exports = TimeBuffer;
} else {
  global.TimeBuffer = TimeBuffer;
}

}(this));