App.Action = {

    selectedElement: null,
    currentMatrix: null,
    currentX: null,
    currentY: null,
    lines: {},
    selected: null,

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

        var line1 = svg.getElementById('line-' + id);
        var line2 = svg.getElementById('line-' + (parseInt(id) + 1));

        App.Action.lines[0] = line1;
        App.Action.lines[1] = line2;
        App.Action.selected = App.Drawer.circles[id];
        App.Action.selected.hideQu();

        document.addEventListener('mousemove', App.Action.moveElement);
        document.addEventListener('touchmove', App.Action.moveElement);
        document.addEventListener('mouseup', App.Action.dropElement);
        document.addEventListener('touchend', App.Action.dropElement);

        return false;
    },

    moveElement: function(event) {
        event.stopPropagation();

        dx = event.clientX;
        dy = event.clientY
        App.Action.currentY = event.clientY;

        var point = {
            x: event.x,
            y: event.y,
            i: parseInt(App.Action.selectedId)
        };
        App.path.updatePoint(point);

        App.Action.selected.move(point);

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
        App.Action.selected.showQu();
        App.Action.selected = null;

        return false;
    }
};
