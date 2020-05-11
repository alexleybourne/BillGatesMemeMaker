const sleep = (time) => new Promise(r => setTimeout(r, time))

var memeURL, memeName, background, meme, ids, canvas, ctx
var helpVal = false

async function setup() {
    memeURL = "./images/BillGatesMemeTemplate.png"
    memeName = "BillGatesTemplate"
    backgroundURL = "./images/BillGatesMemeTemplateBackground.jpg"
    ids = ["main", "secondary", "binder"]
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d')

    ids.forEach(id => {
        document.getElementById(`upload-${id}`).addEventListener('change', uploadImage)
    })
}

// Put the element ID's of each file uploader along with the corresponding corners here
const getCorners = (pos) => {
    if(pos === "main") {
        return {
            topLeft: [785, 723],
            topRight: [1133, 743],
            bottomLeft: [786, 974],
            bottomRight: [1126, 990]
        }
    } else if (pos === "secondary") {
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

window.addEventListener("DOMContentLoaded", async () => {

    await setup()
    scaleCheck()
    loadingAnimation()
    let meme = await loadImage(memeURL)
    ctx.drawImage(meme, 0, 0, canvas.width, canvas.height)
    // canvas.addEventListener('mousemove', (e) => console.log(e.offsetX, e.offsetY))
})

const scaleCheck = () => {
     // Resizes the canvas for mobile
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

    if (vw < 700) { 
        document.getElementById('canvas-items').style.transform = 'scale(0.6)'
        document.getElementById('title').style.transform = 'translate(0, -160px)'
        document.getElementById('controls').style.transform = 'translate(0, 160px)'
        document.getElementById('credits').style.transform = 'translate(0, 170px)'
    }
    if (vh < 700) {
        document.getElementById('title').style.marginTop = '200px'
        document.getElementById('credits').style.marginBottom = '50px'
    }
}

const loadingAnimation = async() => {
    const bill = document.getElementById('loadingBill').classList
    bill.add('puff-in-center')
    await sleep(1000)
    const screen = document.getElementById('loadingScreen').classList
    screen.add('hidden')
}

const selected = (selection) => {
    let input = document.getElementById(`upload-${selection}`)
    input.click()
}

const uploadImage = () => {
    if(!document.getElementById("upload-main").value && !document.getElementById("upload-second").value && !document.getElementById("upload-binder").value){
        alert("No file selected")
    } else {
        draw()
    }
}

const draw = async () => {
    const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d')

    // Load all images first
    let background = await loadImage(backgroundURL)
    let meme = await loadImage(memeURL)
    const awaitingImgs = Promise.all(ids.map(id => loadUploadImage(canvas, id)))

    // Then draw all at once
    updateButtonVis()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    await awaitingImgs.then(imgs => imgs.forEach(img => img ? ctx.drawImage(img, 0, 0) : null))
    ctx.drawImage(meme, 0, 0, canvas.width, canvas.height)
}

const loadUploadImage = async (canvas, elementID) => {
    const element = document.getElementById(`upload-${elementID}`)
    if(!element.value) return
    const f = element.files[0]
    const url = window.URL || window.webkitURL
    const src = url.createObjectURL(f)
    const img = await loadImage(src)
    const corners = getCorners(elementID)
    url.revokeObjectURL(src)
    return skewImage(canvas, img, corners)
}


const  downloadCanvas = async () => {
    const canvas = document.getElementById('canvas'),
    image = canvas.toDataURL('image/jpeg', 1.0),
    link = document.createElement('a')
    link.download = "ImageTest!.jpg"
    link.href = image
    link.click()
    document.getElementById('wink').classList.add('visible')
    document.getElementById('wink-text').classList.add('visible')
    await sleep(200)
    document.getElementById('wink').classList.remove('visible')
    await sleep(100)
    document.getElementById('wink-text').classList.remove('visible')
}

const clearCanvas = async () => {
    ids.forEach(id => {
        document.getElementById(`upload-${id}`).value = null
    })
    await draw()
    updateButtonVis()
}

const downloadTemplateImage = () => {
    const link = document.createElement('a')
    link.download = memeName
    link.href = memeURL
    link.click()
}

const updateButtonVis = () => {
    ids.forEach(id => {
        let button = document.getElementById(id)
        let upload = document.getElementById(`upload-${id}`)
        if(upload.value){
            button.classList.remove('visible')
            button.classList.add('hidden')
        } else {
            button.classList.remove('hidden')
            button.classList.add('visible')
        }
    })
}

const help = async() => {
    helpButton = document.getElementById('helpButton')
    helpVal = !helpVal
    helpVal? helpButton.classList.add('button-selected') : helpButton.classList.remove('button-selected')
    if (helpVal) {
        document.getElementById('bubble1').classList.add('bubble-visible')
        await sleep(200)
        document.getElementById('bubble2').classList.add('bubble-visible')
        await sleep(200)
        document.getElementById('bubble3').classList.add('bubble-visible')
    } else {
        document.getElementById('bubble1').classList.remove('bubble-visible')
        document.getElementById('bubble2').classList.remove('bubble-visible')
        document.getElementById('bubble3').classList.remove('bubble-visible')
    }
}

