const sleep = (time) => new Promise(r => setTimeout(r, time))

// ctx.transform(horizontalScale, horizontalSkew, verticalSkew, verticalSkew, xPos, yPos)

window.addEventListener("DOMContentLoaded", async () => {
    
    const canvas = document.getElementById('canvas')
    loadingAnimation()
    loadBill()
    canvas.addEventListener('mousemove', (e) => console.log(e.offsetX, e.offsetY))
})

const loadingAnimation = async() => {
    const bill = document.getElementById('loadingBill').classList
    bill.add('puff-in-center')
    await sleep(1000)
    const screen = document.getElementById('loadingScreen').classList
    screen.add('hidden')
}

const loadBill = async () => {
    const ctx = document.getElementById('canvas').getContext('2d'),
    img = await loadImage("./images/BillGatesMemeTemplate.png")
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}

const selected = (selection) => {
    console.log(selection)
}

const uploadImage = () => {
    if(!document.getElementById("upload-image-main").value && !document.getElementById("upload-image-second").value && !document.getElementById("upload-image-binder").value){
        alert("No file selected")
    } else {
        clearCanvas()
        draw()
    }   
}

const draw = async () => {
    const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d')

    ctx.fillStyle = "#0A0A09" // Black Background fill
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "white" // WhiteBackground fill
    ctx.fillRect(76, 340, 178, 64)

    if(document.getElementById("upload-image-main").value) { loadUploadImage(canvas, ctx, "upload-image-main") }
    // if(document.getElementById("upload-image-second").value) { await loadUploadImage(canvas, "upload-image-second") }
    // if(document.getElementById("upload-image-binder").value) { await loadUploadImage(canvas, "upload-image-binder") }

    // const f = document.getElementById("upload-image").files[0]
    // const url = window.URL || window.webkitURL
    // const src = url.createObjectURL(f)
    // const img = await loadImage(src)
    // const binderCorners = {
    //     topLeft: [195, 880],
    //     topRight: [473, 856],
    //     bottomLeft: [358, 1016],
    //     bottomRight: [636, 974]
    // }
    // const secondScreenCorners = {
    //     topLeft: [332, 179],
    //     topRight: [521, 147],
    //     bottomLeft: [358, 314],
    //     bottomRight: [528, 282]
    // }
    // const mainScreenCorners = {
    //     topLeft: [785, 723],
    //     topRight: [1133, 743],
    //     bottomLeft: [786, 974],
    //     bottomRight: [1126, 990]
    // }
    // const skewedImg = skewImage(canvas, img, binderCorners)
    // ctx.drawImage(skewedImg, 0, 0)
    // url.revokeObjectURL(src)

    await sleep(50)
    loadBill()
    buttonsVis('h')
}

const getCorners = (pos) => {
    if(pos === "upload-image-main") {
        return {
            topLeft: [785, 723],
            topRight: [1133, 743],
            bottomLeft: [786, 974],
            bottomRight: [1126, 990]
        }
    } else if (pos === "upload-image-second") {
        return {
            topLeft: [332, 179],
            topRight: [521, 147],
            bottomLeft: [358, 314],
            bottomRight: [528, 282]
        }
    } else {
        return {
            topLeft: [195, 880],
            topRight: [473, 856],
            bottomLeft: [358, 1016],
            bottomRight: [636, 974]
        }
    }
}

const loadUploadImage = async (canvas, ctx, elementID) => {
    const f = document.getElementById(elementID).files[0]
    const url = window.URL || window.webkitURL
    const src = url.createObjectURL(f)
    const img = await loadImage(src)
    const corners = getCorners(elementID)
    const skewedImg = skewImage(canvas, img, corners)
    ctx.drawImage(skewedImg, 0, 0)
    url.revokeObjectURL(src)
}


const  downloadCanvas = () => {
    const canvas = document.getElementById('canvas'),
    image = canvas.toDataURL('image/jpeg', 1.0),
    link = document.createElement('a')
    link.download = "ImageTest!.jpg"
    link.href = image
    link.click()
}

const clearCanvas = async() => {
    const ctx = document.getElementById('canvas').getContext('2d'),
    img = await loadImage("./images/BillGatesMemeTemplateBackground.jpg")
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    loadBill()
    buttonsVis('visible')
}

const downloadTemplateImage = () => {
    const image = './images/BillGatesMemeTemplate.png',
    link = document.createElement('a')
    link.download = "BillGatesMemeTemplate.png"
    link.href = image
    link.click()
}

const buttonsVis = (vis) => {

    // Could use some refactoring

    const mainButton = document.getElementById('main').classList,
    secondaryButton = document.getElementById('secondary').classList,
    binderButton = document.getElementById('binder').classList

    if (vis == 'visible') {
        mainButton.remove('hidden')
        mainButton.add('visible')
        secondaryButton.remove('hidden')
        secondaryButton.add('visible')
        binderButton.remove('hidden')
        binderButton.add('visible')
    } else {
        mainButton.remove('visible')
        mainButton.add('hidden')
        secondaryButton.remove('visible')
        secondaryButton.add('hidden')
        binderButton.remove('visible')
        binderButton.add('hidden') 
    }
}

