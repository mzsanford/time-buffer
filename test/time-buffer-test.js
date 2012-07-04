var vows = require('vows'),
    assert = require('assert'),
    TimeBuffer = require('../time-buffer.js');

// Create a Test Suite
vows.describe('Time Buffer').addBatch({
    'with a zero lenth empty buffer': {
        topic: function() { return new TimeBuffer(0) },

        'we get a mean of 0': function (topic) {
            assert.equal(topic.mean(), 0);
        },

        'we get a size of 0': function (topic) {
            assert.equal(topic.size, 0);
        }
    },

    'with a small empty buffer': {
        topic: function() { return new TimeBuffer(1) },

        'we get a mean of 0 by default': function (topic) {
            assert.equal(topic.mean(), 0);
        },

        'we get a size of 1': function (topic) {
            assert.equal(topic.size, 1);
        }
    },

    'with a filled buffer': {
        topic: function() {
	        var buffer = new TimeBuffer(5);
	        // Load with fake data.
	        buffer.data = [1,2,3,4,5];
	        buffer._index = function() { return 4; }
	        return buffer;
	      },

        'we calculate the correct mean': function (topic) {
            assert.equal(topic.mean(), 3.0);
        }
    },

    'with a sparse buffer': {
        topic: function() {
	        var buffer = new TimeBuffer(5);
	        // Load with fake data.
	        buffer.data = [undefined, undefined, undefined, undefined, 5];
	        buffer._index = function() { return 4; }
	        return buffer;
	      },

        'we treat undefined values as 0': function (topic) {
            assert.equal(topic.mean(), 1.0);
        }
    },
}).export(module);