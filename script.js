const sleep = (time) => new Promise(r => setTimeout(r, time))

// ctx.transform(horizontalScale, horizontalSkew, verticalSkew, verticalSkew, xPos, yPos)

window.addEventListener("DOMContentLoaded", async () => {
    
    const canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    loadingAnimation()
    loadBill(ctx)
    // canvas.addEventListener('mousemove', (e) => console.log(e.offsetX, e.offsetY))
})

const loadingAnimation = async() => {
    const bill = document.getElementById('loadingBill').classList
    bill.add('puff-in-center')
    await sleep(1000)
    const screen = document.getElementById('loadingScreen').classList
    screen.add('hidden')
}

const loadBill = async (ctx) => {
    const img = await loadImage("./images/BillGatesMemeTemplate.png")
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

    const bill = await loadImage("./images/BillGatesMemeTemplateBackground.jpg")
    ctx.drawImage(bill, 0, 0, canvas.width, canvas.height)

    // Put the element ID of each file uploader here
    let ids = ["upload-image-main", "upload-image-second", "upload-image-binder"]

    const awaitingImgs = Promise.all(ids.map(id => loadUploadImage(canvas, id)))
    awaitingImgs.then(imgs => imgs.forEach(img => img ? ctx.drawImage(img, 0, 0) : null))

    loadBill(ctx)
    buttonsVis('h')
}

// Put the element ID's of each file uploader along with the corresponding corners here
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
            topRight: [481, 170],
            bottomLeft: [358, 314],
            bottomRight: [496, 277]
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

const loadUploadImage = async (canvas, elementID) => {
    const element = document.getElementById(elementID)
    if(!element.value) return
    const f = element.files[0]
    const url = window.URL || window.webkitURL
    const src = url.createObjectURL(f)
    const img = await loadImage(src)
    const corners = getCorners(elementID)
    // url.revokeObjectURL(src)
    return skewImage(canvas, img, corners)
}


const  downloadCanvas = () => {
    const canvas = document.getElementById('canvas'),
    image = canvas.toDataURL('image/jpeg', 1.0),
    link = document.createElement('a')
    link.download = "ImageTest!.jpg"
    link.href = image
    link.click()
}

const clearCanvas = async () => {
    buttonsVis('h')
}

const downloadTemplateImage = () => {
    const image = './images/BillGatesMemeTemplate.png',
    link = document.createElement('a')
    link.download = "BillGatesMemeTemplate.png"
    link.href = image
    link.click()
}

const buttonsVis = (vis) => {
    const mainButton = document.getElementById('select-buttons').classList
    if (vis == 'visible') {
        mainButton.remove('hidden')
        mainButton.add('visible')
    } else {
        mainButton.remove('visible')
        mainButton.add('hidden')
    }
}

