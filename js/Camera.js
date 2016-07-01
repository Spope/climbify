App.Camera = {

    areaSize: 60,
    canvas: null,
    ctx: null,
    imagesData: [],
    trigger: null,
    resolution: 2,
    video: null,
    points: [],
    stream: null,
    loopReference: null,

    init: function() {

        this.areaSize = App.Drawer.params.radius * 2;
        var areaCount = Math.pow((this.areaSize / this.resolution), 2);
        this.trigger = areaCount * 0.5;

        this.video  = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        //
        this.imagesData.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
        this.imagesData.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
        this.imagesData.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));

        video.addEventListener('play', this.loop, false);
        video.addEventListener('loadedmetadata', this.adjustRatio, false);

        App.Event.addEventListener(App.Event.events.CHANGESIZE, this.setAreaSize.bind(this))
        App.Event.addEventListener(App.Event.events.CHANGEMODE, function() {
            switch (App.currentMode) {
                case App.modes.PLAY:
                    App.Camera.startDetection();
                break;
                case App.modes.EDITION:
                    App.Camera.stopDetection();
                break;
            }
        })
    },

    setAreaSize: function(value) {
        this.areaSize = value * 2;
        var areaCount = Math.pow((this.areaSize / this.resolution), 2);
        this.trigger = areaCount * 0.5;
    },

    startDetection: function() {
        this.points = App.path.points;
        document.getElementById("videoDiv").style.display = 'block';

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        navigator.getUserMedia({video:true}, function (stream) {
            this.stream = stream;
            this.video.src = window.URL.createObjectURL(stream);
        }.bind(this), function (e) {

            console.log('Camera did not work.', e);
        });
    },

    stopDetection: function() {
        if (this.stream) {
            this.stream.getVideoTracks()[0].stop();
        }
        document.getElementById("videoDiv").style.display = 'none';
        clearInterval(this.loopReference);
    },

    adjustRatio: function(event) {
        var actualRatio     = App.Camera.video.videoWidth / App.Camera.video.videoHeight;
        var targetRatio     = App.Camera.canvas.offsetWidth / App.Camera.canvas.offsetHeight;
        var adjustmentRatio = targetRatio / actualRatio;
        App.Camera.canvas.setAttribute('width', App.Camera.canvas.offsetWidth);
        App.Camera.canvas.setAttribute('height', App.Camera.canvas.offsetHeight);

        App.Camera.video.style.transform = "scaleX(" + adjustmentRatio + ")";
    },

    loop: function() {

        App.Camera.loopReference = setInterval(function() {
            App.Camera.ctx.drawImage(App.Camera.video, 0, 0, App.Camera.canvas.width, App.Camera.canvas.height);
            App.Camera.motionDetect();
        }, 100);
    },

    motionDetect: function() {
        //
        var imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.imagesData.unshift(imageData);
        //

        var startPoint = (Math.PI/180)*0;
        var endPoint = (Math.PI/180)*360;
        //
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //
        var x, y;

        var index = App.play.selected - 1;
        var x1 = this.points[index].x - (this.areaSize / 2);
        var x2 = x1 + this.areaSize;
        var y1 = this.points[index].y - (this.areaSize / 2);
        var y2 = y1 + this.areaSize;

        var movedPoints = 0;
        for(x = x1; x < x2; x += this.resolution) {
            for(y = y1; y < y2; y += this.resolution) {
                //
                var pixel = this.getPixel(x, y);

                if (pixel.moved) {
                    this.ctx.fillStyle = "rgba(255, 0, 0, 255)";
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, 1, startPoint, endPoint, true);
                    this.ctx.fill();
                    this.ctx.closePath();

                    movedPoints ++;
                }
            }
        }

        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(x1, y1, this.areaSize, this.areaSize);

        if (movedPoints > this.trigger) {
            console.log('TRIGGER');
            this.next();
        }

        this.imagesData.pop();
    },

    next: function() {
        App.Play.selectNext(true);
    },

    getPixel: function(x, y) {
        //
        var cr, cg, cb, pr, pg, pb, offset = x * 4 + y * 4 * this.imagesData[0].width;
        cr = this.imagesData[0].data[offset];
        cg = this.imagesData[0].data[offset + 1];
        cb = this.imagesData[0].data[offset + 2];
        //
        pr = this.imagesData[1].data[offset];
        pg = this.imagesData[1].data[offset + 1];
        pb = this.imagesData[1].data[offset + 2];
        //
        tr = this.imagesData[2].data[offset];
        tg = this.imagesData[2].data[offset + 1];
        tb = this.imagesData[2].data[offset + 2];
        //
        var diff  = Math.abs(pr-cr) + Math.abs(pg-cg) + Math.abs(pb-cb);
        var diff2 = Math.abs(tr-pr) + Math.abs(tg-pg) + Math.abs(tb-pb);
        //var diff3 = Math.abs(cr-tr) + Math.abs(cg-tg) + Math.abs(cb-tb);

        var ret = {};
        if(diff > (this.areaSize / 2) && diff2 > (this.areaSize / 2)) {
            ret.moved = true;
        } else {
            ret.moved = false;
        }
        ret.d = diff;
        //
        return ret;
    }
};
