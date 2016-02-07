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
    this.el.setAttribute('stroke-width', App.Drawer.params.radius / 3);

    return this;
};

App.line.prototype.done = function() {
    Tools.addClass(this.el, 'done');
}
App.line.prototype.undone = function() {
    Tools.removeClass(this.el, 'done');
}

App.line.prototype.doing = function() {
    if (this.p1.x > this.p2.x) {
        Tools.addClass(this.el, 'doing');
    } else {
        Tools.addClass(this.el, 'doing-invert');
    }
}
App.line.prototype.undoing = function() {
    Tools.removeClass(this.el, 'doing');
}

