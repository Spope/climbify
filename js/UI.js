App.UI = {
    els: {
        menuEdition: null,
        menuPlay: null,
        helpPopup: null
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

        document.getElementById('help-button').addEventListener('click', this.toggleHelp);
        this.helpPopup = document.getElementById('help-popup');
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
                document.getElementById('play-ui').style.display = "none";
                break;
            case App.modes.PLAY:
                App.UI.els.menuEdition.style.display = 'none';
                App.UI.els.menuPlay.style.display    = 'inline-block';
                document.getElementById('button-mode-edition').className = document.getElementById('button-mode-edition').className.replace(/ active/g, '');
                document.getElementById('button-mode-play').className += " active";
                document.getElementById('play-ui').style.display = "block";
                break;
        }
    },

    toggleHelp: function() {
        var display = App.UI.helpPopup.style.display;
        display = display == 'block' ? 'none' : 'block';
        App.UI.helpPopup.style.display = display;
    }
}
