App.Drawer = {
    svg: null,
    lines: {},
    circles: {},

    params: {
        color: '123, 201, 255',
        colorH: '#7BC9FF',
        radius: 20
    },

    init: function() {
        this.svg = document.getElementById('svg');

        this.svg.width = window.innerWidth;
        this.svg.height = window.innerHeight;

        this.reset();
    },

    startDraw: function() {
        this.context.beginPath();
    },

    addPoint: function(point) {

        if (App.path.points.length > 1) {
            var lastPoint = App.path.points[App.path.points.length - 2];

            var line = new App.line(point, lastPoint);
            this.lines[point.i] = line;
            document.getElementById('group-line').appendChild(line.el);
        }

        var circle = new App.point(point);
        this.circles[point.i] = circle;
        document.getElementById('group-circle').appendChild(circle.el);
    },

    getLine: function (i) {
        return this.lines[i];
    },
    getCircle: function (i) {
        return this.circles[i];
    },

    reset: function() {
        var groups = this.svg.getElementsByTagName('g');
        if (groups.length) {
            for (var i in groups) {
                groups[i].parentNode.removeChild(groups[i]);
            }
        }

        var lineG = document.createElementNS('http://www.w3.org/2000/svg','g');
        var circleG = document.createElementNS('http://www.w3.org/2000/svg','g');

        lineG.setAttribute('id','group-line');
        circleG.setAttribute('id','group-circle');

        this.svg.appendChild(lineG);
        this.svg.appendChild(circleG);
    },

    donePoint: function(i) {
        var circle = this.circles[i];
        circle.done();

        if (i > 1) {
            var line = this.lines[i];
            line.undoing();
            line.done();
        }

        if (i < App.path.points.length) {
            var previousLine = this.lines[i + 1];
            previousLine.doing();
        }
    },

    undonePoint: function(i) {
        var circle = this.circles[i];
        circle.undone();

        if (i < App.path.points.length && i > 0) {
            var line = this.lines[i + 1];
            line.undoing();
        }

        if (i > 1) {
            var doingLine = this.lines[i];
            doingLine.undone();
            doingLine.doing();
        }
    },

    selectPoint: function(i) {
        var circle = this.circles[i];
        circle.select();
    },

    unSelectPoint: function(i) {
        var circle = this.circles[i];
        circle.unselect();
    },

    restart: function() {
        for (var i in this.circles) {
            this.circles[i].reset();
        }
        for (var i in this.lines) {
            this.lines[i].reset();
        }
    }
}
