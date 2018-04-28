let penciling = false, brushing = false, drawing = false
setInterval(() => {
    if (cursor.offsetLeft > (wih / 100) && cursor.offsetLeft < context.canvas.width + (wih / 100) &&
        cursor.offsetTop > (wih / 100) && cursor.offsetTop < ((wih * 99) / 100)) mouseover = true
    else mouseover = false
}, 50)

let startAction = () => {
    if (mouseover && document.querySelector('flex#copy__modal').style.display !== 'flex') {
        drawing = true
        if (drawtool === 'pencil' || drawtool === 'brush') {
            if (drawtool === 'pencil') penciling = true
            else brushing = true
            let sx = parseInt((cursor.style.left).replace('px', '')) - (wih / 100),
                sy = parseInt((cursor.style.top).replace('px', '')) - (wih / 100) + cursor.clientHeight
            context.beginPath()
            context.moveTo(sx, sy)
            paths[currpath] =
                {
                    color: drawcolor,
                    offset: Math.floor(Math.random() * 12),
                    type: drawtool,
                    vertices: [{ x: sx, y: sy }]
                }
        }
    }
},
    continueAction = () => {
    if (mouseover && document.querySelector('flex#copy__modal').style.display !== 'flex') {
        if (drawing) {
            if ((drawtool === 'pencil' || drawtool === 'brush')&& paths[currpath] && paths[currpath].vertices) {setInterval(() => {
                let sx = parseInt((cursor.style.left).replace('px', '')) - (wih / 100),
                    sy = parseInt((cursor.style.top).replace('px', '')) - (wih / 100) + cursor.clientHeight
                if (paths[currpath]) if (paths[currpath].vertices) {
                    if (sx !== paths[currpath].vertices[paths[currpath].vertices.length - 1].x &&
                        sy !== paths[currpath].vertices[paths[currpath].vertices.length - 1].y ) {
                            context.lineTo(sx, sy)
                            paths[currpath].vertices.push({ x: sx, y: sy })
                    }
                }
            }, 100)}
        }
    }
},
    endAction = () => {
    penciling = false
    brushing = false
    drawing = false
    context.strokeStyle = drawcolor
    if (mouseover && document.querySelector('flex#copy__modal').style.display !== 'flex') {
        if (drawtool === 'pencil' || drawtool === 'brush') {
            if (drawtool === 'pencil') {
                context.lineWidth = 5
                context.lineCap = 'square'
                context.lineJoin = 'bevel'
            } else {
                context.lineWidth = 15
                context.lineCap = 'round'
                context.lineJoin = 'round'
            }
            context.stroke()
            currpath++
        }
    }
}
document.body.onmousedown = startAction
document.body.onmousemove = continueAction
document.body.onmouseup = endAction

setInterval(() => {
    let pad = controllers[0]
    if (pad) {
        if (pad.buttons[keyselect].pressed) {
            if (!drawing) startAction()
            else continueAction()
        } else {
            if (drawing) endAction()
        }
    }
}, (1000 / grfps))
