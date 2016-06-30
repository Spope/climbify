App.stopWatch = function() {
    // Private vars
    var	startAt	= 0;	// Time of last start / resume. (0 if not running)
    var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds

    var	now	= function() {
        return (new Date()).getTime(); 
    }; 

    // Public methods
    // Start or resume
    this.start = function() {
        startAt	= startAt ? startAt : now();
    };

    // Stop or pause
    this.stop = function() {
        // If running, update elapsed time otherwise keep it
        lapTime	= startAt ? lapTime + now() - startAt : lapTime;
        startAt	= 0; // Paused
    };

    // Reset
    this.reset = function() {
        lapTime = startAt = 0;
    };

    // Duration
    this.time = function() {
        return lapTime + (startAt ? now() - startAt : 0); 
    };

    this.display = function() {
        return this.format(this.time());
    },

    this.format = function(time) {
        //h = Math.floor( time / (60 * 60 * 1000) );

        time  = time % (60 * 60 * 1000);
        var m = Math.floor(time / (60 * 1000));

        time  = time % (60 * 1000);
        var s = Math.floor(time / 1000);
        s    += (m * 60);

        time  = time % (10 * 1000);
        var c = Math.floor(time / 10);

        return this.pad(s, 2) + ':' + this.pad(c, 2);
    };

    this.pad = function (num, size) {
        var s = "0000" + num;
        return s.substr(s.length - size);
    }
};
