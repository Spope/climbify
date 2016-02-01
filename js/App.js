var App =  {
    path: null,
    init: function() {
        this.Drawer.init();
        this.Action.init();
        this.path = new Path();
    },


    startRecordPath: function() {
        this.Action.startRecord();
    },
    stopRecord: function() {
        this.Action.stopRecord();
    },
    saveRecord: function(e) {
        //document.getElementById('download').setAttribute('download', 'problem');
        document.getElementById('download').href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.path.points));

        return true;
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
