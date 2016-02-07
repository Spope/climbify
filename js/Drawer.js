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

        circle.el.addEventListener('mousedown', App.Action.selectPoint);
        //circle.addEventListener('touchstart', App.Action.selectPoint);

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
        var group = document.getElementById('group-' + i);
        Tools.addClass(group, 'done')

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
        var group = document.getElementById('group-' + i);
        Tools.removeClass(group, 'done');

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
        //var point = App.path.getPoint(i);
        var group = document.getElementById('group-' + i);
        var classname = group.getAttribute('class');
        group.setAttribute('class', classname + ' selected');

        //var transform = group.getAttribute('transform');
        //var matrix = transform.slice(7, -1).split(' ');
        //var scale = 1.5;
        //matrix[4] = Math.round(-point.x * (scale - 1));
        //matrix[5] = Math.round(-point.y * (scale - 1));
        //group.setAttribute('transform', 'scale(' + scale + ') matrix(' + matrix.join(' ') + ')');
    },

    unSelectPoint: function(i) {
        //var point = App.path.getPoint(i);
        var group = document.getElementById('group-' + i);
        var classname = group.getAttribute('class');
        classname = classname.replace(/ selected/g, '');
        group.setAttribute('class', classname);
        //var transform = group.getAttribute('transform');
        //var matrix = transform.slice(18, -1).split(' ');
        //matrix[4] = 0;
        //matrix[5] = 0;
        //group.setAttribute('transform', 'matrix(' + matrix.join(' ') + ')');
    }
}
