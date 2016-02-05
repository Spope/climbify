App.Action = {

    selectedElement: null,
    currentMatrix: null,
    currentX: null,
    currentY: null,
    lines: {},
    selectedId: null,

    init: function() {
    },

    startRecord: function() {
        App.Drawer.svg.addEventListener('mousedown', this.clickEvent);
    },

    clickEvent: function(e) {
        if (App.Action.selectedElement == null) {
            var point = App.path.addPoint({x: e.offsetX, y: e.offsetY});

            App.Drawer.addPoint(point);
        }
    },

    stopRecord: function() {
        App.Drawer.svg.removeEventListener('mousedown', this.clickEvent);
    },

    selectPoint: function(event) {
        event.stopPropagation();

        App.Action.selectedElement = event.target.parentElement;
        var id = App.Action.selectedElement.querySelector('text').innerHTML;

        var line1 = svg.getElementById('line' + id);
        var line2 = svg.getElementById('line' + (parseInt(id) + 1));

        App.Action.lines[0] = line1;
        App.Action.lines[1] = line2;
        App.Action.selectedId = id;

        App.Action.currentX = event.clientX;
        App.Action.currentY = event.clientY;
        App.Action.currentMatrix = App.Action.selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');

        for(var i = 0; i < App.Action.currentMatrix.length; i++) {
            App.Action.currentMatrix[i] = parseFloat(App.Action.currentMatrix[i]);
        }

        document.addEventListener('mousemove', App.Action.moveElement);
        document.addEventListener('touchmove', App.Action.moveElement);
        document.addEventListener('mouseup', App.Action.dropElement);
        document.addEventListener('touchend', App.Action.dropElement);

        return false;
    },

    moveElement: function(event) {
        event.stopPropagation();

        dx = event.clientX - App.Action.currentX;
        dy = event.clientY - App.Action.currentY;
        App.Action.currentMatrix[4] += dx;
        App.Action.currentMatrix[5] += dy;
        newMatrix = "matrix(" + App.Action.currentMatrix.join(' ') + ")";

        App.Action.selectedElement.setAttribute("transform", newMatrix);
        App.Action.currentX = event.clientX;
        App.Action.currentY = event.clientY;

        //App.path.getPoint(parseInt(App.Action.selectedId) - 1).x = event.x;
        //App.path.getPoint(parseInt(App.Action.selectedId) - 1).y = event.y;
        var point = {
            x: event.x,
            y: event.y,
            i: parseInt(App.Action.selectedId)
        };
        App.path.updatePoint(point);

        if (App.Action.lines[0]) {
            App.Action.lines[0].setAttribute('x2', event.x);
            App.Action.lines[0].setAttribute('y2', event.y);
        }
        if (App.Action.lines[1]) {
            App.Action.lines[1].setAttribute('x1', event.x);
            App.Action.lines[1].setAttribute('y1', event.y);
        }

        return false;
    },

    dropElement: function(event) {
        event.stopPropagation();

        document.removeEventListener('mousemove', App.Action.moveElement);
        document.removeEventListener('touchmove', App.Action.moveElement);
        document.removeEventListener('mouseup', App.Action.dropElement);
        document.removeEventListener('touchend', App.Action.dropElement);
        App.Action.selectedElement = null;

        return false;
    }
};
