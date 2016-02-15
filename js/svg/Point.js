App.point = function (point) {
    this.x = point.x;
    this.y = point.y;
    this.i = point.i;
    this.g = null;

    this.bg = this.createBg();
    this.qu = this.createQu();
    this.text = this.createText();
    this.g = this.createGroup();

    this.g.appendChild(this.qu);
    this.g.appendChild(this.bg);
    this.g.appendChild(this.text);

    this.bindMode();
    this.changeMode();

    return this;
}

App.point.prototype.reset = function() {
    this.undone();
    this.unselect();
}

App.point.prototype.done = function() {
    Tools.addClass(this.g, 'done');
    Tools.addClass(this.qu, 'done');
}
App.point.prototype.undone = function() {
    Tools.removeClass(this.g, 'done');
    Tools.removeClass(this.qu, 'done');
}
App.point.prototype.select = function() {
    Tools.addClass(this.g, 'selected');
    Tools.addClass(this.qu, 'selected');
}
App.point.prototype.unselect = function() {
    Tools.removeClass(this.g, 'selected');
    Tools.removeClass(this.qu, 'selected');
}

App.point.prototype.bindMode = function() {
    App.Event.addEventListener(App.Event.events.CHANGEMODE, this.changeMode.bind(this));
}

App.point.prototype.changeMode = function() {
    switch (App.currentMode) {
        case App.modes.EDITION:
            this.g.addEventListener('mousedown', App.Edition.selectPoint);
        break;
        case App.modes.PLAY:
            this.g.removeEventListener('mousedown', App.Edition.selectPoint);
        break;
    }
}

App.point.prototype.hideQu = function() {
    this.qu.setAttribute('style', 'display:none;');
};
App.point.prototype.showQu = function() {
    this.qu.setAttribute('style', '');
};

App.point.prototype.move = function(point) {
    this.x = point.x;
    this.y = point.y;
    this.i = point.i;
    //
    this.bg.setAttribute('cx', this.x);
    this.bg.setAttribute('cy', this.y);
    //
    //var circleRadius = App.Drawer.params.radius * 1.15
    //var mx = this.x;
    //var my = this.y;
    //var contour = 'M' + (mx + circleRadius) + ' ' + this.y + ' A' + circleRadius + ' ' + circleRadius + ' ' + '0 0 0 ' + this.x + ' ' + (this.y - circleRadius);
    //contour += ' M' + mx + ' ' + (my + circleRadius) + ' ';
    //contour += ' A' + circleRadius + ' ' + circleRadius + ' 0 0 1 ' + (mx - circleRadius) + ' ' +my;
    //this.qu.setAttribute('d', contour);
    this.qu.setAttribute('cx', this.x);
    this.qu.setAttribute('cy', this.y);
    //
    var textY = this.y + (App.Drawer.params.radius / 3);
    this.text.setAttribute('x', this.x);
    this.text.setAttribute('y', textY);
};

App.point.prototype.createBg = function () {
    var BGcircle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    BGcircle.setAttribute('id','circle-' + this.i);
    BGcircle.setAttribute('cx', this.x);
    BGcircle.setAttribute('cy', this.y);
    BGcircle.setAttribute('r', App.Drawer.params.radius);
    BGcircle.setAttribute('y2', this.y);
    BGcircle.setAttribute('fill', App.Drawer.params.colorH);
    BGcircle.setAttribute('stroke', 'none');
    //BGcircle.setAttribute('stroke', 'black');
    //BGcircle.setAttribute('stroke-width', Math.round((App.Drawer.params.radius * 0.23) * 100) / 100);
    BGcircle.setAttribute('class', 'bg-circle');

    return BGcircle;
}

App.point.prototype.createQu = function () {
    //var QUcircle = document.createElementNS('http://www.w3.org/2000/svg','path');
    //QUcircle.setAttribute('id', 'contour' + this.i);
    //var circleRadius = App.Drawer.params.radius * 1.15
    //var mx = this.x;
    //var my = this.y;
    //var contour = 'M' + (mx + circleRadius) + ' ' + this.y + ' A' + circleRadius + ' ' + circleRadius + ' ' + '0 0 0 ' + this.x + ' ' + (this.y - circleRadius);
    //contour += ' M' + mx + ' ' + (my + circleRadius) + ' ';
    //contour += ' A' + circleRadius + ' ' + circleRadius + ' 0 0 1 ' + (mx - circleRadius) + ' ' +my;
    //QUcircle.setAttribute('d', contour);
    //QUcircle.setAttribute('stroke', App.Drawer.params.colorH);
    //QUcircle.setAttribute('stroke-width', App.Drawer.params.radius * 0.25);
    //QUcircle.setAttribute('class', 'contour');

    var STcircle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    STcircle.setAttribute('id','contour' + this.i);
    STcircle.setAttribute('cx', this.x);
    STcircle.setAttribute('cy', this.y);
    STcircle.setAttribute('r', Math.round(App.Drawer.params.radius * 1.3));
    STcircle.setAttribute('y2', this.y);
    STcircle.setAttribute('stroke', App.Drawer.params.colorH);
    STcircle.setAttribute('stroke-width', Math.round(App.Drawer.params.radius * 0.20));
    STcircle.setAttribute('stroke-dasharray', 40.8);
    STcircle.setAttribute('fill', 'black');
    STcircle.setAttribute('class', 'contour');
    //STcircle.setAttribute('fill', App.Drawer.params.colorH);

    return STcircle;
    return QUcircle;
}

App.point.prototype.createText = function() {
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    var textY = this.y + (App.Drawer.params.radius / 3);
    text.setAttribute('x', this.x);
    text.setAttribute('y', textY);
    text.setAttribute('fill', 'white');
    text.setAttribute('font-size', App.Drawer.params.radius);
    text.setAttribute('text-anchor', 'middle');
    text.textContent = this.i;

    return text;
}

App.point.prototype.createGroup = function() {
    var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('transform', 'matrix(1 0 0 1 0 0)');
    group.setAttribute('class', 'circle');
    group.setAttribute('data-id', this.i);
    group.setAttribute('transform-origin', '50% 50%');
    group.setAttribute('id', 'group-' + this.i);

    return group;
}
//var STcircle = document.createElementNS('http://www.w3.org/2000/svg','circle');
//STcircle.setAttribute('id','circle' + point.i);
//STcircle.setAttribute('cx', point.x);
//STcircle.setAttribute('cy', point.y);
//STcircle.setAttribute('r', this.params.radius * 0.8);
//STcircle.setAttribute('y2', point.y);
//STcircle.setAttribute('stroke', 'black');
//STcircle.setAttribute('stroke-width', this.params.radius * 0.15);
//STcircle.setAttribute('fill', this.params.colorH);
