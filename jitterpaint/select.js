let colors = document.querySelectorAll('div.program__toolkit__color'),
    tools = document.querySelectorAll('flex.program__toolkit__tool')

let selecthandle = () => {
    let cx = cursor.offsetLeft, cy = cursor.offsetTop + cursor.clientHeight, color = null, tool = null
    for (let c of colors) {
        if (cx > c.offsetLeft && cx < (c.offsetLeft + c.clientWidth) &&
            cy > c.offsetTop && cy < (c.offsetTop + c.clientHeight)) {
            color = c
            break
        }
    }
    if (color) {
        document.querySelector('div.selected.program__toolkit__color').classList.remove('selected')
        color.classList.add('selected')
        drawcolor = window.getComputedStyle(color).backgroundColor
        color = null
    }

    for (let t of tools) {
        if (cx > t.offsetLeft && cx < (t.offsetLeft + t.clientWidth) &&
            cy > t.offsetTop && cy < (t.offsetTop + t.clientHeight)) {
            tool = t
            break
        }
    }
    if (tool) {
        let toolname = tool.id.replace('program__toolkit__tool__', '')
        if (toolname === 'pencil' || toolname === 'brush') {
            document.querySelector('flex.selected.program__toolkit__tool').classList.remove('selected')
            tool.classList.add('selected')
            drawtool = tool.id.replace('program__toolkit__tool__', '')
        }
        else if (toolname === 'save') {
            let encoder = new GIFEncoder()
            encoder.start()
            encoder.setRepeat(0)
            encoder.setFrameRate(grfps)
            encoder.setSize(context.canvas.width, context.canvas.height)
            let capture = setInterval(() => {
                encoder.addFrame(context)
            }, (2000 / (grfps)))
            setTimeout(() => {
                clearInterval(capture)
                encoder.finish()
                encoder.download('jitterpaint.gif')
            }, 2000)
        }
        else if (toolname === 'name') {}
        else if (toolname === 'github') {
            window.open('https://github.com/jalkobach/jitterpaint', '_blank')
        }
        else if (toolname === 'clear') {
            paths = {}
            context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        }
        tool = null
    }
}

document.body.onclick = selecthandle
setInterval(() => {
    let pad = controllers[0]
    if (pad) {
        if (pad.buttons[keyselect].pressed) selecthandle()
    }
}, (1000 / uifps))
