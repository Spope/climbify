var Tools = {
    addClass: function(el, classToAdd) {
        var classname = el.getAttribute('class');
        if (classname.indexOf(classToAdd) === -1) {
            el.setAttribute('class', classname + ' ' + classToAdd);
        }
    },

    removeClass: function(el, classToRemove) {
        var classname = el.getAttribute('class');
        var re = new RegExp(' ' + classToRemove, "g");
        classname = classname.replace(re, '');
        el.setAttribute('class', classname);
    },

    domify: function(str) {

        var div = document.createElement('div');
        div.innerHTML = str;

        return div.childNodes[0];
    }
}
