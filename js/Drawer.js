App.Drawer = {
    svg: null,

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
            var line = this.createLine(point); 
            document.getElementById('group-line').appendChild(line);
        }

        var circle = this.createCircle(point);
        document.getElementById('group-circle').appendChild(circle);

        circle.addEventListener('mousedown', App.Action.selectPoint);
        //circle.addEventListener('touchstart', App.Action.selectPoint);
    },

    createLine: function(point) {
        var lastPoint = App.path.points[App.path.points.length - 2];

        var line = document.createElementNS('http://www.w3.org/2000/svg','line');
        line.setAttribute('id','line-' + point.i);
        line.setAttribute('class','line');
        line.setAttribute('x1', lastPoint.x);
        line.setAttribute('y1', lastPoint.y);
        line.setAttribute('x2', point.x);
        line.setAttribute('y2', point.y);
        line.setAttribute('stroke', 'rgb(' + this.params.color + ')');
        line.setAttribute('stroke-width', this.params.radius / 3);

        return line;
    },


    createCircle: function(point) {

        var BGcircle = document.createElementNS('http://www.w3.org/2000/svg','circle');
        BGcircle.setAttribute('id','circle' + point.i);
        BGcircle.setAttribute('cx', point.x);
        BGcircle.setAttribute('cy', point.y);
        BGcircle.setAttribute('r', this.params.radius);
        BGcircle.setAttribute('y2', point.y);
        BGcircle.setAttribute('fill', this.params.colorH);
        BGcircle.setAttribute('stroke', 'black');
        BGcircle.setAttribute('stroke-width', this.params.radius * 0.15);
        BGcircle.setAttribute('class', 'bg-circle');

        //var STcircle = document.createElementNS('http://www.w3.org/2000/svg','circle');
        //STcircle.setAttribute('id','circle' + point.i);
        //STcircle.setAttribute('cx', point.x);
        //STcircle.setAttribute('cy', point.y);
        //STcircle.setAttribute('r', this.params.radius * 0.8);
        //STcircle.setAttribute('y2', point.y);
        //STcircle.setAttribute('stroke', 'black');
        //STcircle.setAttribute('stroke-width', this.params.radius * 0.15);
        //STcircle.setAttribute('fill', this.params.colorH);

        var QUcircle = document.createElementNS('http://www.w3.org/2000/svg','path');
        QUcircle.setAttribute('id', 'contour' + point.i);
        var circleRadius = this.params.radius * 1.15
        var mx = point.x;
        var my = point.y;
        var contour = 'M' + (mx + circleRadius) + ' ' + point.y + ' A' + circleRadius + ' ' + circleRadius + ' ' + '0 0 0 ' + point.x + ' ' + (point.y - circleRadius);
        contour += ' M' + mx + ' ' + (my + circleRadius) + ' ';
        contour += ' A' + circleRadius + ' ' + circleRadius + ' 0 0 1 ' + (mx - circleRadius) + ' ' +my;
        QUcircle.setAttribute('d', contour);
        QUcircle.setAttribute('stroke', this.params.colorH);
        QUcircle.setAttribute('stroke-width', this.params.radius * 0.25);
        QUcircle.setAttribute('class', 'contour');

        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        //var textX = point.x - (this.params.radius / 2);
        var textY = point.y + (this.params.radius / 3);
        text.setAttribute('x', point.x);
        text.setAttribute('y', textY);
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', this.params.radius);
        text.setAttribute('text-anchor', 'middle');
        text.textContent = point.i;

        //document.getElementById('group-circle').appendChild(STcircle);
        var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('transform', 'matrix(1 0 0 1 0 0)');
        group.setAttribute('class', 'circle');
        group.setAttribute('data-id', point.i);
        group.setAttribute('transform-origin', '50% 50%');
        group.setAttribute('id', 'group-' + point.i);

        group.appendChild(QUcircle);
        group.appendChild(BGcircle);
        group.appendChild(text);

        return group;
    },

    reset: function() {
        this.svg.innerHTML = "";

        var lineG = document.createElementNS('http://www.w3.org/2000/svg','g');
        var circleG = document.createElementNS('http://www.w3.org/2000/svg','g');

        lineG.setAttribute('id','group-line');
        circleG.setAttribute('id','group-circle');

        this.svg.appendChild(lineG);
        this.svg.appendChild(circleG);
    },

    donePoint: function(i) {
        var group = document.getElementById('group-' + i);
        var classname = group.getAttribute('class');
        if (classname.indexOf('done') === -1) {
            group.setAttribute('class', classname + ' done');
        }

        if (i > 1) {
            var line = document.getElementById('line-' + i);
            var classname = line.getAttribute('class');
            if (classname.indexOf('done') === -1) {
                line.setAttribute('class', classname + ' done');
            }
        }
    },

    undonePoint: function(i) {
        var group = document.getElementById('group-' + i);
        var classname = group.getAttribute('class');
        classname = classname.replace(/ done/g, '');
        group.setAttribute('class', classname);

        if (i < App.path.points.length && i > 0) {
            var line = document.getElementById('line-' + (i + 1));
            var classname = line.getAttribute('class');
            classname = classname.replace(/ done/g, '');
            line.setAttribute('class', classname);
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
