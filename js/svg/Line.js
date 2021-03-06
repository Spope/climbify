App.line = function (p1, p2) {
    this.p1 = null;
    this.p2 = null;
    this.el = null;

    return this.create(p1, p2);
};

App.line.prototype.create = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;

    this.el = document.createElementNS('http://www.w3.org/2000/svg','line');
    this.el.setAttribute('id','line-' + this.p1.i);
    this.el.setAttribute('class','line');
    this.el.setAttribute('x1', this.p2.x);
    this.el.setAttribute('y1', this.p2.y);
    this.el.setAttribute('x2', this.p1.x);
    this.el.setAttribute('y2', this.p1.y);
    this.el.setAttribute('stroke', 'rgb(' + App.Drawer.params.color + ')');
    this.el.setAttribute('stroke-width', App.Drawer.params.radius / 4);

    return this;
};

App.line.prototype.reset = function() {
    this.undone();
    this.undoing();
}

App.line.prototype.done = function() {
    Tools.addClass(this.el, 'done');
}
App.line.prototype.undone = function() {
    Tools.removeClass(this.el, 'done');
}

App.line.prototype.doing = function() {
    var deltaX = this.p1.x - this.p2.x;
    var deltaY = this.p1.y - this.p2.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            Tools.addClass(this.el, 'doing-x');
        } else {
            Tools.addClass(this.el, 'doing-x-invert');
        }
    } else {
        if (deltaY > 0) {
            Tools.addClass(this.el, 'doing-y');
        } else {
            Tools.addClass(this.el, 'doing-y-invert');
        }
    }

    
}
App.line.prototype.undoing = function() {
    Tools.removeClass(this.el, 'doing-x-invert');
    Tools.removeClass(this.el, 'doing-y-invert');
    Tools.removeClass(this.el, 'doing-x');
    Tools.removeClass(this.el, 'doing-y');
    
}

