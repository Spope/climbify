var Action = {

    selectedElement: null,
    currentMatrix: null,
    currentX: null,
    currentY: null,
    lines: {},
    selectedId: null,

    init: function() {
    },

    startRecord: function() {
        Drawer.svg.addEventListener('mousedown', this.clickEvent);
    },

    clickEvent: function(e) {
        if (Action.selectedElement == null) {
            var point = App.path.addPoint({x: e.offsetX, y: e.offsetY});

            Drawer.addPoint(point);
        }
    },

    stopRecord: function() {
        Drawer.svg.removeEventListener('mousedown', this.clickEvent);
    },

    selectPoint: function(event) {
        event.stopPropagation();

        Action.selectedElement = event.target.parentElement;
        var id = Action.selectedElement.querySelector('text').innerHTML;

        var line1 = svg.getElementById('line' + id);
        var line2 = svg.getElementById('line' + (parseInt(id) + 1));

        Action.lines[0] = line1;
        Action.lines[1] = line2;
        Action.selectedId = id;

        Action.currentX = event.clientX;
        Action.currentY = event.clientY;
        Action.currentMatrix = Action.selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');

        for(var i=0; i<Action.currentMatrix.length; i++) {
            Action.currentMatrix[i] = parseFloat(Action.currentMatrix[i]);
        }

        document.addEventListener('mousemove', Action.moveElement);
        document.addEventListener('mouseup', Action.dropElement);

        return false;
    },

    moveElement: function(event) {
        event.stopPropagation();

        dx = event.clientX - Action.currentX;
        dy = event.clientY - Action.currentY;
        Action.currentMatrix[4] += dx;
        Action.currentMatrix[5] += dy;
        newMatrix = "matrix(" + Action.currentMatrix.join(' ') + ")";

        Action.selectedElement.setAttribute("transform", newMatrix);
        Action.currentX = event.clientX;
        Action.currentY = event.clientY;

        //App.path.getPoint(parseInt(Action.selectedId) - 1).x = event.x;
        //App.path.getPoint(parseInt(Action.selectedId) - 1).y = event.y;
        var point = {
            x: event.x,
            y: event.y,
            i: Action.selectedId
        };
        App.path.updatePoint(point);

        if (Action.lines[0]) {
            Action.lines[0].setAttribute('x2', event.x);
            Action.lines[0].setAttribute('y2', event.y);
        }
        if (Action.lines[1]) {
            Action.lines[1].setAttribute('x1', event.x);
            Action.lines[1].setAttribute('y1', event.y);
        }

        return false;
    },

    dropElement: function(event) {
        event.stopPropagation();

        document.removeEventListener('mousemove', Action.moveElement);
        document.removeEventListener('mouseup', Action.dropElement);
        Action.selectedElement = null;

        return false;
    }
};
