const uifps = 32
const grfps = 6
var wiw,
    wih,
    cw = 20,
    ch = 20,
    drawcolor = '#000000',
    drawtool = 'pencil',
    canvas = document.querySelector('canvas#program__canvas'),
    context = canvas.getContext('2d'),
    paths = {},
    currpath = 0,
    mousedown = false,
    mouseover = false

context.lineWidth = '8px'

getsize = () => {
    wiw = Math.max(document.documentElement.clientWidth, window.innerWidth)
    wih = Math.max(document.documentElement.clientHeight, window.innerHeight)
    context.canvas.width = document.querySelector('div#program__wrapper__canvas').clientWidth
    context.canvas.height = document.querySelector('div#program__wrapper__canvas').clientHeight
}
window.onload = getsize
window.onresize = getsize

let firefox = (navigator.userAgent.includes('Firefox')) ? true:false,
    dpadup, dpaddown, dpadleft, dpadright, keyselect, keyselect2, xaxis = 0, yaxis = 1

if (firefox) {
    dpadup = 0
    dpaddown = 1
    dpadleft = 2
    dpadright = 3
    keyselect = 11
} else {
    dpadup = 12
    dpaddown = 13
    dpadleft = 14
    dpadright = 15
    keyselect = 0
}
