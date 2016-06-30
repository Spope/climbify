App.Camera = {

    areaSize: 70,
    canvas: null,
    ctx: null,
    imagesData: [],
    trigger: null
    resolution: 5,
    video: null,

    init: function() {

        var areaCount = Math.pow((this.areaSize / this.resolution), 2);
        this.trigger = areaCount * 0.4;

        this.video  = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        //
        this.imagesData.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
        this.imagesData.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
        this.imagesData.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));

        video.addEventListener('play', this.loop, false);

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia({video:true}, function (stream) {
            this.video.src = window.URL.createObjectURL(stream);
            //this.localMediaStream = stream;
        }.bind(this), function (e) {
            console.log('Camera did not work.', e);
        });
    },

    loop: function() {
        setInterval(function() {
            App.Camera.context.drawImage(App.Camera.video, 0, 0);
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

        var x1 = 200;
        var x2 = x1 + this.areaSize;
        var y1 = 100;
        var y2 = y1 + this.areaSize;

        var movedPoints = 0;
        for(x = x1; x < x2; x += this.resolution) {
            for(y = y1; y < y2; y += this.resolution) {
                //
                var pixel = this.getPixel(x, y);

                if (pixel.moved) {
                    this.ctx.fillStyle = "rgba(255, 0, 0, 255)";
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, 2, startPoint, endPoint,true);
                    this.ctx.fill();
                    this.ctx.closePath();

                    movedPoints ++;
                }
            }
        }

        if (movedPoints > this.trigger) {
            console.log('TRIGGER ' + movedPoints + ' / ' + this.trigger);
        }

        this.imagesData.pop();
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
        //tr = this.imagesData[2].data[offset];
        //tg = this.imagesData[2].data[offset + 1];
        //tb = this.imagesData[2].data[offset + 2];
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
