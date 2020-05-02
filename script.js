const loaded = () => {
    var ctx = document.getElementById('canvas').getContext('2d');
    var img = document.getElementById('templateImage');
    ctx.scale(0.4, 0.4)
    ctx.drawImage(img, 0, 0); 
};

const loadBill = () => {
    var ctx = document.getElementById('canvas').getContext('2d');
    var img = document.getElementById('templateImage');
    ctx.drawImage(img, 0, 0); 
};

const selected = (selection) => {
    console.log(selection);
};

const draw = () => {
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
};

const  downloadCanvas = () => {
    var canvas = document.getElementById('canvas');
    var image = canvas.toDataURL('image/jpeg', 1.0);
    var link = document.createElement('a');
    link.download = "ImageTest!.jpg";
    link.href = image;
    link.click();
};

const clearCanvas = () => {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, 10000, 10000);
    loadBill();
};

const downloadTemplateImage = () => {
    var image = './images/BillGatesMemeTemplate.png';
    var link = document.createElement('a');
    link.download = "BillGatesMemeTemplate.jpg";
    link.href = image;
    link.click();
};

