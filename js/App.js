var App =  {
    path: null,
    currentMode: null,
    modes: {
        EDITION: 'EDITION',
        PLAY:    'PLAY'
    },
    init: function() {
        this.Drawer.init();
        this.Action.init();
        this.UI.init();

        this.path = new Path();
        this.currentMode = this.modes.EDITION;
    },


    startRecordPath: function() {
        this.Action.startRecord();
        this.Event.trigger(App.Event.events.STARTRECORD);
    },
    stopRecord: function() {
        this.Action.stopRecord();
        this.Event.trigger(App.Event.events.STOPRECORD);
    },

    saveRecord: function(e) {
        //document.getElementById('download').setAttribute('download', 'problem');
        document.getElementById('download').href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.path.points));

        return true;
    },

    setMode: function(mode) {
        if (this.modes[mode]) {
            this.currentMode = this.modes[mode];
            App.Event.trigger(App.Event.events.CHANGEMODE, this.currentMode);
            if (mode == this.modes.PLAY) {
                this.stopRecord();
            }
        } else {
            throw new Error('Invalid mode : ' + mode);
        }
    },

    readFile: function readTextFile(el) {
        var that = this;
        var file = el.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            that.loadFile(e.target.result);
        };
        reader.readAsText(file);
    },
    loadFile: function(content) {
        var path = JSON.parse(content);
        for (var i in path) {
            var point = path[i];
            App.path.addPoint({x: point.x, y: point.y});
            App.Drawer.addPoint(point);
        }
    }
}
