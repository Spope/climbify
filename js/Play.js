App.Play = {
    currentTimer: null,
    highestTime: null,
    promptname: null,
    selected: 1,
    timer: null,
    timerTick: null,
    init: function() {
        App.LeaderBoard.init();
        App.Event.addEventListener(App.Event.events.CHANGEMODE, function() {
            switch (App.currentMode) {
                case App.modes.PLAY:
                    App.Play.start();
                break;
                case App.modes.EDITION:
                    App.Play.stop();
                break;
            }
        })
    },
    start: function() {
        document.getElementById('videoDiv').style.display = "block";
        this.currentTimer = document.getElementById('current-timer');
        this.promptname   = document.getElementById('prompt-name');
        this.currentTimer.innerHTML = "00.00";

        App.Drawer.selectPoint(this.selected);
        this.timer = new App.stopWatch();
        
        this.bind();
    },

    stop: function() {
        App.Drawer.unSelectPoint(this.selected);
        this.unbind();
    },

    unbind: function() {
        document.onkeydown = null;
    },
    bind: function() {
        document.onkeydown = App.Play.bindKeyboard;
    },

    bindKeyboard: function(e) {
        if (e.keyCode == 40) {
            //DOWN
            App.Play.selectPrevious();
        }
        if (e.keyCode == 38) {
            //UP
            App.Play.selectNext();
        }
    },

    selectNext: function(camera) {
        if (this.selected < App.path.points.length || camera) {
            App.Drawer.unSelectPoint(this.selected);
            App.Drawer.donePoint(this.selected);
            this.selected++;
            App.Drawer.selectPoint(this.selected);
        }


        if (this.selected == 2) {
            this.startTimer();
        }

        var test = this.selected;
        if (camera === true) {
            test--;
        }
        if (test == App.path.points.length) {
            App.Play.finish();
            App.Drawer.donePoint(test);
        }
    },

    selectPrevious: function() {
        if (this.selected == App.path.points.length) {
            App.Drawer.undonePoint(this.selected);
        }
        
        if (this.selected > 1) {
            App.Drawer.unSelectPoint(this.selected);
            this.selected--;
            App.Drawer.selectPoint(this.selected);
        }

        if (this.selected == 1) {
            App.Play.stopTimer(true);
        }

        App.Drawer.undonePoint(this.selected);
    },

    startTimer: function() {
        this.timer.reset();
        this.timer.start();
        this.timerTick = setInterval("App.Play.updateTimer()", 30);
    },

    finish: function() {
        App.Play.stopTimer(false);

        App.Play.showName();
        App.Camera.stopDetection();
    },

    showName: function() {
        this.promptname.style.display = 'block';
        document.getElementById('user').onkeydown = function(e) {
            if (e.keyCode == 13) {
                App.Play.submit();
            }
        };
        document.getElementById('submit-button').addEventListener('click', this.submit);
        document.getElementById('user').focus();
        setTimeout(function() {
            document.getElementById('user').select();
        }, 1);
    },
    hideName: function() {
        this.promptname.style.display = 'none';
        document.getElementById('user').blur();
    },

    submit: function() {
        var name = document.getElementById('user').value;
        if (name == '') {
            name = 'John Doe';
        }

        App.LeaderBoard.addScore(name, App.Play.timer.time());
        App.Play.hideName();
        App.Play.restart();

        return false;
    },

    restart: function() {
        App.Drawer.restart();
        this.selected = 1;
        App.Drawer.selectPoint(this.selected);
        App.Camera.stopDetection();
        App.Camera.startDetection();
    },

    stopTimer: function(reset) {
        this.timer.stop();

        if (reset) {
            this.timer.reset();
        }
        clearInterval(this.timerTick);
    },

    updateTimer: function() {
        this.currentTimer.innerHTML = App.Play.timer.display();
    }
}
