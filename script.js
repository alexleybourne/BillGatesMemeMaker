

function draw() {
    var ctx = document.getElementById('canvas').getContext('2d'),
        img = new Image(),
        f = document.getElementById("upload-image").files[0],
        url = window.URL || window.webkitURL,
        src = url.createObjectURL(f);

    img.src = src;
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
      url.revokeObjectURL(src);
    }
    document.getElementById("upload-image").value=""
}

function downloadCanvas(){
    var canvas = document.getElementById('canvas');
    var image = canvas.toDataURL('image/jpeg', 1.0);
    var link = document.createElement('a');
    link.download = "ImageTest!.jpg";
    link.href = image;
    link.click();
}

function clearCanvas(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

