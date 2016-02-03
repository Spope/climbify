App.Play = {
    currentTimer: null,
    highestValue: null,
    init: function() {
        this.currentTimer = document.getElementById('current-timer');
        this.highestValue = document.getElementById('highest-value');

        this.currentTimer.innerHTML = "0.0";
        this.highestValue.innerHTML = "0.0s";
    }
}
