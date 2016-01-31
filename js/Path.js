var Path = function() {
    return {
        points: [],
        init: function() {
            
        },

        addPoint: function (coords) {
            this.points.push(coords);

            coords.i = App.path.points.length;

            return coords;
        },

        getPoint: function (id) {
            for (var i in this.points) {
                if (this.points[i].i == id) {
                    return this.points[i];
                }
            }
        },

        updatePoint: function(point) {
            for (var i in this.points) {
                if (this.points[i].i == point.i) {
                    return this.points[i] = point;
                }
            }
        }
    };
}
