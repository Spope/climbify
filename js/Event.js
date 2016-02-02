App.Event = {
    listeners: {},
    events: {
        CHANGEMODE: 'CHANGEMODE',
        STARTRECORD: 'STARTRECORD',
        STOPRECORD: 'STOPRECORD'
    },

    addEventListener: function(eventName, callback) {
        if (typeof this.listeners[eventName] === 'undefined') {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
    },

    trigger: function(eventName, param) {
        for (var i in this.listeners[eventName]) {
            this.listeners[eventName][i].call(App, param);
        }
    }
}
