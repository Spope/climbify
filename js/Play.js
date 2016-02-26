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
    },

    selectNext: function() {
        if (this.selected < App.path.points.length) {
            App.Drawer.unSelectPoint(this.selected);
            App.Drawer.donePoint(this.selected);
            this.selected++;
            App.Drawer.selectPoint(this.selected);
        }

        if (this.selected == 2) {
                this.startTimer();
            }

        if (this.selected == App.path.points.length) {
            App.Play.finish();
            App.Drawer.donePoint(this.selected);
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
