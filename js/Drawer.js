App.Drawer = {
    svg: null,
    lines: {},
    circles: {},

    params: {
        color: '123, 201, 255',
        colorH: '#7BC9FF',
        radius: 16
    },

    init: function() {
        this.svg = document.getElementById('svg');

        this.svg.width = window.innerWidth;
        this.svg.height = window.innerHeight;

        this.reset();
    },

    setRadius: function(radius) {
        this.params.radius = radius;

        this.redraw();
    },

    startDraw: function() {
        this.context.beginPath();
    },

    addPoint: function(point, ignoreLast) {

        if (App.path.points.length > 1 && ignoreLast !== true) {
            var lastPoint = App.path.points[App.path.points.length - 2];

            var line = new App.line(point, lastPoint);
            this.lines[point.i] = line;
            document.getElementById('group-line').appendChild(line.el);
        }

        var circle = new App.point(point);
        this.circles[point.i] = circle;
        this.svg.appendChild(circle.qu);
        this.svg.appendChild(circle.g);
    },

    getLine: function (i) {
        return this.lines[i];
    },
    getCircle: function (i) {
        return this.circles[i];
    },

    reset: function() {
        this.resetAllElByTagName('g');
        this.resetAllElByTagName('path');
        this.resetAllElByTagName('circle');

        var lineG = document.createElementNS('http://www.w3.org/2000/svg','g');
        //var circleG = document.createElementNS('http://www.w3.org/2000/svg','g');

        lineG.setAttribute('id','group-line');
        //circleG.setAttribute('id','group-circle');

        this.svg.appendChild(lineG);
        //this.svg.appendChild(circleG);
    },

    resetAllElByTagName: function(tagName) {
        var els = this.svg.getElementsByTagName(tagName);
        if (els.length) {
            for (var i in els) {
                if (els[i] && els[i].parentNode) {
                    els[i].parentNode.removeChild(els[i]);
                }
            }
        }
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
    },

    redraw: function() {
        this.reset();

        var points = App.path.points;
        App.path.reset();
        this.draw(points);
    },

    draw: function(path) {
        for (var i in path) {
            var point = path[i];
            App.path.addPoint({x: point.x, y: point.y});
            App.Drawer.addPoint(point);
        }
    }
}
