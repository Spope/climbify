App.LeaderBoard = {
    leaderBoard: [],
    highestTimer: null,
    el: null,
    elContent: null,
    init: function() {
        this.highestTimer = document.getElementById('highest-value');
        this.highestTimer.innerHTML = "00.00";
        this.bind();
        this.el = document.getElementById("leaderboard");
        this.elContent = document.getElementById("leaderboard-content");
    },

    bind: function() {
        this.highestTimer.addEventListener('click', this.showLeaderBoard);
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
        this.highestTimer.innerHTML = App.Play.timer.format(this.leaderBoard[0].time);
    },

    hideLeaderBoard: function() {
        App.LeaderBoard.el.style.display = 'none';
        App.LeaderBoard.elContent.innerHTML = "";
    },

    showLeaderBoard: function() {
        var content = "";
        for (var i in App.LeaderBoard.leaderBoard) {
            var score = App.LeaderBoard.leaderBoard[i];
            var sec = App.Play.timer.format(score.time);

            content += "<div class='result-line'>";
                content += "<div class='name'>";
                    content += score.name
                content += "</div>";
                content += "<div class='time'>";
                    content += sec;
                content += "</div>";
                content += "<div class='clr'></div>";
            content += "</div>";
        }
        App.LeaderBoard.elContent.innerHTML = content;
        App.LeaderBoard.el.style.display = 'block';
    }
}
