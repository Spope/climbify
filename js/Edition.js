App.Edition = {

    selectedElement: null,
    currentMatrix: null,
    currentX: null,
    currentY: null,
    lines: {},
    selected: null,

    init: function() {
        this.bindMode();
        this.startRecord();
    },

    bindMode: function() {
        App.Event.addEventListener(App.Event.events.CHANGEMODE, function() {
            switch (App.currentMode) {
                case App.modes.EDITION:
                    App.Edition.startRecord();
                break;
                case App.modes.PLAY:
                    App.Edition.stopRecord();
                break;
            }
        });
    },

    startRecord: function() {
        App.Event.trigger(App.Event.events.STARTRECORD);
        App.Drawer.svg.addEventListener('mousedown', this.clickEvent);
    },

    clickEvent: function(e) {
        if (App.Edition.selectedElement == null) {
            var point = App.path.addPoint({x: e.offsetX, y: e.offsetY});

            App.Drawer.addPoint(point);
        }
    },

    stopRecord: function() {
        App.Event.trigger(App.Event.events.STOPRECORD);
        App.Drawer.svg.removeEventListener('mousedown', this.clickEvent);
    },

    selectPoint: function(event) {
        event.stopPropagation();

        App.Edition.selectedElement = event.target.parentElement;
        var id = App.Edition.selectedElement.querySelector('text').innerHTML;

        var line1 = svg.getElementById('line-' + id);
        var line2 = svg.getElementById('line-' + (parseInt(id) + 1));

        App.Edition.lines[0] = App.Drawer.getLine(id);
        App.Edition.lines[1] = App.Drawer.getLine(parseInt(id) + 1);
        App.Edition.selected = App.Drawer.getCircle(id);
        App.Edition.selected.hideQu();

        document.addEventListener('mousemove', App.Edition.moveElement);
        document.addEventListener('touchmove', App.Edition.moveElement);
        document.addEventListener('mouseup', App.Edition.dropElement);
        document.addEventListener('touchend', App.Edition.dropElement);

        return false;
    },

    moveElement: function(event) {
        event.stopPropagation();

        dx = event.clientX;
        dy = event.clientY
        App.Edition.currentY = event.clientY;

        var point = {
            x: event.x,
            y: event.y,
            i: parseInt(App.Edition.selectedId)
        };
        App.path.updatePoint(point);

        App.Edition.selected.move(point);

        if (App.Edition.lines[0]) {
            App.Edition.lines[0].el.setAttribute('x2', event.x);
            App.Edition.lines[0].el.setAttribute('y2', event.y);
            App.Edition.lines[0].p1 = point;
        }
        if (App.Edition.lines[1]) {
            App.Edition.lines[1].el.setAttribute('x1', event.x);
            App.Edition.lines[1].el.setAttribute('y1', event.y);
            App.Edition.lines[1].p2 = point;
        }

        return false;
    },

    dropElement: function(event) {
        event.stopPropagation();

        document.removeEventListener('mousemove', App.Edition.moveElement);
        document.removeEventListener('touchmove', App.Edition.moveElement);
        document.removeEventListener('mouseup', App.Edition.dropElement);
        document.removeEventListener('touchend', App.Edition.dropElement);
        App.Edition.selected.showQu();
        App.Edition.selected = null;

        return false;
    }
};
