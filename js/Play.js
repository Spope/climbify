App.Play = {
    currentTimer: null,
    highestValue: null,
    selected: 1,
    timer: null,
    timerTick: null,
    init: function() {
        this.currentTimer = document.getElementById('current-timer');
        this.highestValue = document.getElementById('highest-value');

        this.currentTimer.innerHTML = "00.00";
        this.highestValue.innerHTML = "0.0s";

        App.Drawer.selectPoint(this.selected);
        this.timer = new App.stopWatch();
        this.bind();
    },

    bind: function() {
        document.onkeydown = App.Play.bindKeyboard;
    },

    bindKeyboard: function(e) {
        var way;
        if (e.keyCode == 40) {
            //DOWN
            App.Play.selectPrevious();
            way = 0;
        }
        if (e.keyCode == 38) {
            //UP
            App.Play.selectNext();
            way = 1;
        }

        switch (App.Play.selected) {
            case 1:
                App.Play.stopTimer(true);
            break;
            case 2:
                if (way) {
                    App.Play.startTimer();
                }
                break;
            case App.path.points.length:
                App.Play.timer.stop(false);
            break
        }
    },

    selectNext: function() {
        if (this.selected < App.path.points.length) {
            App.Drawer.unSelectPoint(this.selected);
            this.selected++;
            App.Drawer.selectPoint(this.selected);
        }
    },

    selectPrevious: function() {
        if (this.selected > 1) {
            App.Drawer.unSelectPoint(this.selected);
            this.selected--;
            App.Drawer.selectPoint(this.selected);
        }
    },

    startTimer: function() {
        this.timer.reset();
        this.timer.start();
        this.timerTick = setInterval("App.Play.updateTimer()", 1);
    },

    stopTimer: function(reset) {
        this.timer.stop();
        if (reset) {
            this.timer.reset();
        }
        clearInterval(this.timerTick);
    },

    updateTimer: function() {
        this.currentTimer.innerHTML = App.Play.timer.format();
    }
}
