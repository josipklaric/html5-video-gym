(function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    videoUrl = window.URL || window.webkitURL;

    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    navigator.getMedia({
        video: true,
        audio: false
    }, function(stream){
        video.src = videoUrl.createObjectURL(stream);
        video.play();
    }, function(error){
        // error occurred
        console.log(error);
    });

    video.addEventListener('play', function(){
        draw(this, context, 260, 200);
    });

    function draw(video, context, width, height) {
        
        var image, data, i, r, g, b, brightness;

        context.drawImage(video, 0, 0, width, height);

        image = context.getImageMedia(0, 0, width, height);
        data = image.data;
        //console.log(data);
        for(i = 0; I < data.length; i = i + 4) {
            r = data[i];
            g = data[i + 1];
            b = data[i + 2];
            brightness = (r + g + b) / 3; // get avg value
            data[i] = data[i + 1] = data[i + 2] = brightness;
        }
        image.data = data;
        context.putImageData(image, 0, 0);

        setTimeout(draw, 10, video, context, width, height);
    }
})();