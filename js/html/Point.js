App.point = function (point) {
    this.x = point.x;
    this.y = point.y;
    this.i = point.i;
    this.r = App.Drawer.params.radius;

    this.el = this.template();

    this.bindMode();
    this.changeMode();

    return this;
}

App.point.prototype.redraw = function() {
    var template = this.template();
    App.Drawer.points.removeChild(this.el);
    this.el = App.Drawer.points.appendChild(this.template());
}

App.point.prototype.template = function() {
    var diameter = this.r * 2;
    var x = this.x - this.r;
    var y = this.y - this.r;

    return Tools.domify(
    '<div id="point-' + this.i + '" class="point" data-id="' + this.i + '" style="left:' + x + 'px;top:' + y + 'px;width:' + diameter + 'px;height:' + diameter + 'px;">' +
        '<div class="label" style="line-height:' + diameter + 'px;font-size:' +  this.r + 'px">' +
            this.i +
        '</div>' +
        '<div class="border">' +
            '<div></div>' +
        '</div>' +
    '</div>'
    );
}

App.point.prototype.bindMode = function() {
    App.Event.addEventListener(App.Event.events.CHANGEMODE, this.changeMode.bind(this));
}

App.point.prototype.changeMode = function() {
    switch (App.currentMode) {
        case App.modes.EDITION:
            this.el.addEventListener('mousedown', App.Edition.selectPoint);
        break;
        case App.modes.PLAY:
            this.el.removeEventListener('mousedown', App.Edition.selectPoint);
        break;
    }
}

App.point.prototype.reset = function() {
    this.undone();
    this.unselect();
}
App.point.prototype.done = function() {
    Tools.addClass(this.el, 'done');
}
App.point.prototype.undone = function() {
    Tools.removeClass(this.el, 'done');
}
App.point.prototype.select = function() {
    //Tools.addClass(this.el, 'selected');
    this.r = App.Drawer.params.radius * 1.5;

    this.redraw();
}
App.point.prototype.unselect = function() {
    //Tools.removeClass(this.el, 'selected');
    this.r = App.Drawer.params.radius;

    this.redraw();
}

App.point.prototype.move = function(point) {

    this.x = point.x;
    this.y = point.y;

    var x = point.x - this.r;
    var y = point.y - this.r;

    this.el.style.left = x + 'px';
    this.el.style.top  = y + 'px';
}
