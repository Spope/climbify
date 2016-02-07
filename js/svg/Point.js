App.point = function (point) {
    this.x = point.x;
    this.y = point.y;
    this.i = point.i;
    this.el = null;

    this.bg = this.createBg();
    this.qu = this.createQu();
    this.text = this.createText();
    this.el = this.createGroup();

    this.el.appendChild(this.qu);
    this.el.appendChild(this.bg);
    this.el.appendChild(this.text);

    return this;
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
    var circleRadius = App.Drawer.params.radius * 1.15
    var mx = this.x;
    var my = this.y;
    var contour = 'M' + (mx + circleRadius) + ' ' + this.y + ' A' + circleRadius + ' ' + circleRadius + ' ' + '0 0 0 ' + this.x + ' ' + (this.y - circleRadius);
    contour += ' M' + mx + ' ' + (my + circleRadius) + ' ';
    contour += ' A' + circleRadius + ' ' + circleRadius + ' 0 0 1 ' + (mx - circleRadius) + ' ' +my;
    this.qu.setAttribute('d', contour);
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
    BGcircle.setAttribute('stroke', 'black');
    BGcircle.setAttribute('stroke-width', App.Drawer.params.radius * 0.15);
    BGcircle.setAttribute('class', 'bg-circle');

    return BGcircle;
}

App.point.prototype.createQu = function () {
    var QUcircle = document.createElementNS('http://www.w3.org/2000/svg','path');
    QUcircle.setAttribute('id', 'contour' + this.i);
    var circleRadius = App.Drawer.params.radius * 1.15
    var mx = this.x;
    var my = this.y;
    var contour = 'M' + (mx + circleRadius) + ' ' + this.y + ' A' + circleRadius + ' ' + circleRadius + ' ' + '0 0 0 ' + this.x + ' ' + (this.y - circleRadius);
    contour += ' M' + mx + ' ' + (my + circleRadius) + ' ';
    contour += ' A' + circleRadius + ' ' + circleRadius + ' 0 0 1 ' + (mx - circleRadius) + ' ' +my;
    QUcircle.setAttribute('d', contour);
    QUcircle.setAttribute('stroke', App.Drawer.params.colorH);
    QUcircle.setAttribute('stroke-width', App.Drawer.params.radius * 0.25);
    QUcircle.setAttribute('class', 'contour');

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
