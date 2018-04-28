var jittermod = []
for (var v = 0; v < grfps; v++) {
    let _x = Math.floor(Math.random() * 10) + 1,
        _y = Math.floor(Math.random() * 8) + 1
    if (Math.floor(Math.random() * 2) > 0) _x *= -1
    if (Math.floor(Math.random() * 2) > 0) _y *= -1
    jittermod.push(
        {
            x: _x,
            y: _y
        }
    )
}

let w = 0
setInterval(() => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = '#fff'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    for (let p in paths) {
        let path = paths[p], startpos = path.offset
        context.beginPath()
        for (let v of path.vertices) {
            let u = w + startpos
            while (u >= grfps) u -= grfps
            context.lineTo(v.x + jittermod[u].x, v.y + jittermod[u].y)
            w++
            context.strokeStyle = path.color
            let n = ( Math.floor(Math.random() * 2) === 1 ) ? -1:1
            switch (path.type) {
                case 'pencil':
                    context.lineWidth = 5 + (Math.floor(Math.random() * 5) * n)
                    context.lineCap = 'square'
                    context.lineJoin = 'bevel'
                    break

                case 'brush':
                    context.lineWidth = 15 + (Math.floor(Math.random() * 7) * n)
                    context.lineCap = 'round'
                    context.lineJoin = 'round'
                    break
            }
            context.stroke()
        }
    }
}, (1000 / grfps))
