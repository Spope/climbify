var App =  {
    path: null,
    init: function() {
        Drawer.init();
        Action.init();
        this.path = new Path();
    },


    newPath: function() {
        this.path = new Path();
        Drawer.reset();
    },
    startRecordPath: function() {
        Action.startRecord();
    },
    stopRecord: function() {
        Action.stopRecord();
    }
}
