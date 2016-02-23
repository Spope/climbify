App.Slider = {

    el: null,
    picker: null,
    sliderBack: null,
    startPosition: {
        picker: null,
        event: null
    },
    params: {
        min: 11,
        max: 35,
        pickerW: 40,
        width: 150
    },

    init: function() {
        this.el = document.getElementById("slider");
        this.sliderBack = document.getElementById("slider-back");
        this.picker = document.getElementById("picker");
        this.setValue(App.Drawer.params.radius, false);

        this.bind();
    },

    bind: function() {
        this.picker.addEventListener('mousedown', this.startDrag.bind(this));
        this.sliderBack.addEventListener('click', this.clickSlider.bind(this));
    },

    getPickerLeft: function() {
        var left = this.picker.style.left.replace('px', '');
        left = left ? left : 0

        return left;
    },

    startDrag: function(e) {
        this.startPosition['event'] = {x: e.clientX, y: e.clientY};
        this.startPosition['picker'] = {x: parseInt(this.getPickerLeft())};

        document.addEventListener('mousemove', this.drag);
        document.addEventListener('mouseup', this.drop);
    },

    drag: function(e) {
        var delta = e.clientX - App.Slider.startPosition.event.x;

        if ((App.Slider.startPosition.picker.x + delta + App.Slider.params.pickerW) >= App.Slider.params.width) {

            App.Slider.picker.style.left = (App.Slider.params.width - App.Slider.params.pickerW) + 'px';
            return false;
        }
        if ((App.Slider.startPosition.picker.x + delta) <= 0) {

            App.Slider.picker.style.left = '0px';
            return false;
        }

        App.Slider.picker.style.left = (App.Slider.startPosition.picker.x + delta) + 'px';
    },

    convertToValue: function(size) {
        var range = App.Slider.params.width - App.Slider.params.pickerW;
        var delta = App.Slider.params.max - App.Slider.params.min;
        var step = delta / range;
        var value = parseInt(App.Slider.params.min + (step * size));

        return value;
    },

    drop: function(e) {
        e.stopPropagation();
        document.removeEventListener('mousemove', App.Slider.drag);
        document.removeEventListener('mouseup', App.Slider.drop);

        var range = App.Slider.params.width - App.Slider.params.pickerW;
        var delta = App.Slider.params.max - App.Slider.params.min;
        var position = App.Slider.getPickerLeft();
        var step = delta / range;
        var value = App.Slider.convertToValue(position);

        App.Event.trigger(App.Event.events.CHANGESIZE, value);
    },

    setValue: function(value, trigger) {
        if (
            (value > App.Slider.params.max)
            || (value < App.Slider.params.min)
        ) {
            return false;
        }

        var range = App.Slider.params.width - App.Slider.params.pickerW;
        var delta = App.Slider.params.max - App.Slider.params.min;
        var step  = range / delta;

        var position = parseInt(step * (value - App.Slider.params.min));
        this.picker.style.left = position + 'px';

        if (trigger !== false) {
            App.Event.trigger(App.Event.events.CHANGESIZE, value);
        }
    },

    clickSlider: function(e) {
        e.stopPropagation();
        var x = e.offsetX - (App.Slider.params.pickerW / 2);
        if (x < 0) {
            x = 0;
        }
        if (x > (App.Slider.params.width - App.Slider.params.pickerW)) {
            x = App.Slider.params.width - App.Slider.params.pickerW;
        }
        this.setValue(this.convertToValue(x));
    }
};
