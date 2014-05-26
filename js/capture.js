$(function () {
    function hasGetUserMedia() {
      return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

    if (hasGetUserMedia()) {
      // Good to go!
      console.log("yup");
    } else {
      console.log('getUserMedia() is not supported in your browser');
    }

    var errorCallback = function(e) {
    console.log('Reeeejected!', e);
    };

    // Not showing vendor prefixes.
    navigator.webkitGetUserMedia({video: true, audio: true}, function(localMediaStream) {
    var video = document.querySelector('video');
    video.src = window.URL.createObjectURL(localMediaStream);

    // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
    // See crbug.com/110938.
    video.onloadedmetadata = function(e) {
      // Ready to go. Do some stuff.
    };
    }, errorCallback);
});