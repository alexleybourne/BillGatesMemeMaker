const sleep = (time) => new Promise(r => setTimeout(r, time))

const loaded = () => {
    const ctx = document.getElementById('canvas').getContext('2d'),
    img = document.getElementById('templateImage');
    ctx.scale(0.4, 0.4)
    ctx.drawImage(img, 0, 0); 
};

const loadBill = () => {
    const ctx = document.getElementById('canvas').getContext('2d'),
    img = document.getElementById('templateImage');
    ctx.drawImage(img, 0, 0); 
};

const selected = (selection) => {
    console.log(selection);
};

const loadImage = () => {
    if(!document.getElementById("upload-image").value){
        alert("No file selected");
    } else {
        clearCanvas();
        draw();
    }   
};

const draw = async() => {
    const ctx = document.getElementById('canvas').getContext('2d'),
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
    await sleep(50);
    loadBill();
    buttonsVis('h');
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
    const canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
    context.clearRect(0, 0, 10000, 10000);
    loadBill();
    buttonsVis('visible')
};

const downloadTemplateImage = () => {
    var image = './images/BillGatesMemeTemplate.png';
    var link = document.createElement('a');
    link.download = "BillGatesMemeTemplate.jpg";
    link.href = image;
    link.click();
};

const buttonsVis = (vis) => {

    // Could use some refactoring

    const mainButton = document.getElementById('main').classList,
    secondaryButton = document.getElementById('secondary').classList,
    binderButton = document.getElementById('binder').classList;

    if (vis == 'visible') {
        mainButton.remove('hidden');
        mainButton.add('visible');
        secondaryButton.remove('hidden');
        secondaryButton.add('visible');
        binderButton.remove('hidden');
        binderButton.add('visible');
    } else {
        mainButton.remove('visible');
        mainButton.add('hidden');
        secondaryButton.remove('visible');
        secondaryButton.add('hidden');
        binderButton.remove('visible');
        binderButton.add('hidden'); 
    }
};

