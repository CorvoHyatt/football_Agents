const canvas = document.querySelector('canvas')
canvas.width = 1800
canvas.height = 700
const pixel = canvas.getContext('2d')

//probando canvas
pixel.fillRect(0,0, canvas.width,canvas.height)