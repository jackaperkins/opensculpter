/**
 *  This is mostly copy paste from the sunglasses demo
 *  the only thing we do is copy the coords[] to our own io.coords
 *  so other objects can access it
 */

var smoother = new Smoother(0.85, [0, 0, 0, 0, 0]);

    $(window).load(function() {

        var video = $("#video").get(0);
        try {
            compatibility.getUserMedia({video: true}, function(stream) {
                try {
                    video.src = compatibility.URL.createObjectURL(stream);
                } catch (error) {
                    video.src = stream;
                }
                video.play();
                compatibility.requestAnimationFrame(tick);
            }, function (error) {
                alert("WebRTC not available");
            });
        } catch (error) {
            alert(error);
        }

        function tick() {
            compatibility.requestAnimationFrame(tick);
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                $(video).objectdetect("all", {classifier: objectdetect.frontalface, scaleMin: 4}, function(coords) {
                    if (coords[0]) {
                        coords = smoother.smooth(coords[0]);
                        io.coords = coords;
                    } else {
                       console.log("NO COORDS");
                    }
                });
            }
        }
        
        $("#list img").click(function () {
            $("#glasses").attr("src", $(this).attr("src"));
        });
    });
    