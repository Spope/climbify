App.LeaderBoard = {
    leaderBoard: [],
    init: function() {
        
    },

    addScore: function(name, time) {
        this.leaderBoard.push({
            name: name,
            time: time
        });

        this.rank();
        this.showFirst();
    },

    rank: function() {
        this.leaderBoard.sort(function(a, b) {
            if (a.time < b.time) {
                return -1;
            }
            if (a.time > b.time) {
                return 1;
            }

            return 0;
        });
    },

    showFirst: function() {
        App.Play.highestTimer.innerHTML = App.Play.timer.format(this.leaderBoard[0].time);
    }
}
