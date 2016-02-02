App.UI = {
    els: {
        menuEdition: null,
        menuPlay: null
    },
    modes: {
        ADDPOINTS: 'addPoints',
    },
    init: function() {
        this.els.menuEdition = document.getElementById('menu-edition');
        this.els.menuPlay = document.getElementById('menu-play');

        App.Event.addEventListener(App.Event.events.CHANGEMODE, this.checkMode);
        App.Event.addEventListener(App.Event.events.STARTRECORD, this.startRecord);
        App.Event.addEventListener(App.Event.events.STOPRECORD, this.stopRecord);
    },

    startRecord: function() {
        document.getElementById('menu-startrecord').className += " active";
        document.getElementById('menu-stoprecord').className = document.getElementById('menu-stoprecord').className.replace(/ active/g, '');
    },

    stopRecord: function() {
        document.getElementById('menu-stoprecord').className += " active";
        document.getElementById('menu-startrecord').className = document.getElementById('menu-stoprecord').className.replace(/ active/g, '');
    },

    checkMode: function() {
        switch (App.currentMode) {
            case App.modes.EDITION:
                App.UI.els.menuEdition.style.display = 'inline-block';
                App.UI.els.menuPlay.style.display    = 'none';
                document.getElementById('button-mode-edition').className += " active";
                document.getElementById('button-mode-play').className = document.getElementById('button-mode-play').className.replace(/ active/g, '');
                break;
            case App.modes.PLAY:
                App.UI.els.menuEdition.style.display = 'none';
                App.UI.els.menuPlay.style.display    = 'inline-block';
                document.getElementById('button-mode-edition').className = document.getElementById('button-mode-edition').className.replace(/ active/g, '');
                document.getElementById('button-mode-play').className += " active";
                break;
        }
    }
}
