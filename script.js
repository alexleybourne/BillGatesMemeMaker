const loaded = () => {
    console.log('WTF')
    var ctx = document.getElementById('canvas').getContext('2d');
    var img = document.getElementById('templateImage');
    ctx.scale(0.4, 0.4)
    ctx.drawImage(img, 0, 0); 
};

const loadSteve = () => {
    console.log('WTF')
    var ctx = document.getElementById('canvas').getContext('2d'),
    img = new Image();
    img.src = './images/BillGatesMemeTemplate.png';
    ctx.drawImage(img, 100, 100);    
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
    context.clearRect(0, 0, canvas.width, canvas.height);
};

const downloadTemplateImage = () => {
    var image = './images/BillGatesMemeTemplate.png';
    var link = document.createElement('a');
    link.download = "BillGatesMemeTemplate.jpg";
    link.href = image;
    link.click();
};

