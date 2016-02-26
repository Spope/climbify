var App =  {
    path: null,
    currentMode: null,
    modes: {
        EDITION: 'EDITION',
        PLAY:    'PLAY'
    },
    init: function() {
        this.Drawer.init();
        this.Edition.init();
        this.UI.init();
        this.Play.init();

        this.path = new Path();
        this.currentMode = this.modes.EDITION;
    },

    saveRecord: function(e) {
        //document.getElementById('download').setAttribute('download', 'problem');
        document.getElementById('download').href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.path.points));

        return true;
    },

    setMode: function(mode) {
        if (this.modes[mode]) {
            this.currentMode = this.modes[mode];
            this.Event.trigger(App.Event.events.CHANGEMODE);
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
        el.files[0] = null;
    },
    loadFile: function(content) {
        var path = JSON.parse(content);
        this.path.reset();
        this.Drawer.reset();
        this.Drawer.draw(path);
        App.Edition.stopRecord();
    }
}
