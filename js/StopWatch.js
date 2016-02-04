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

    this.format = function() {
        var time = this.time();
        var h = m = s = ms = 0;
        var newTime = '';

        h = Math.floor( time / (60 * 60 * 1000) );

        time = time % (60 * 60 * 1000);
        m = Math.floor( time / (60 * 1000) );

        time = time % (60 * 1000);
        s =  Math.floor( time / 1000);

        time = time % (10 * 1000);
        cs = Math.floor(time / 10);
        //ms = time % 1000;

        //newTime = this.pad(h, 2) + ':' + this.pad(m, 2) + ':' + this.pad(s, 2) + ':' + this.pad(ms, 3);
        newTime = this.pad(s, 2) + ':' + this.pad(cs, 2);
        return newTime;
    };

    this.pad = function (num, size) {
        var s = "0000" + num;
        return s.substr(s.length - size);
    }
};
