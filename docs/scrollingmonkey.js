window.onload = function () {
    var imageIndex = 0;
    var imagesDiv = document.getElementById("scrolling-image");
    var images = imagesDiv.children;

    images[imageIndex].style.visibility = "visible";

    window.addEventListener('wheel', function (e) {
        var next;
        if (e.deltaY > 0) {
            next = (imageIndex + 1) % images.length;
        }
        else {
            next = (imageIndex - 1 + images.length) % images.length;
        }

        images[imageIndex].style.visibility = "hidden";
        images[next].style.visibility = "visible";
        imageIndex = next;

    })
}