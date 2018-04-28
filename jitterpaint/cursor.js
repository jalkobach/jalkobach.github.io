let cursor = document.querySelectorAll('div.cursor')[0], buttonpriority = false,
cursorloop = () => {
    // HANDLE MOUSE MOVEMENT
    document.querySelector('grid#program__wrapper').onmousemove = (event) => {
        cursor.style.left = event.clientX + 'px'
        cursor.style.top = event.clientY + 'px'
    }

    scan()
    let pad = controllers[0]
    if (pad) {

        // SET PRIORITY OF BUTTONS SO THAT AXES CANNOT DRIFT WHILE BUTTONS ARE PRESSED
        if (pad.buttons[dpadup].pressed || pad.buttons[dpaddown].pressed ||
            pad.buttons[dpadleft].pressed || pad.buttons[dpadright].pressed)
            buttonpriority = true
        else buttonpriority = false

        // HANDLE DIRECTION PAD BUTTON PRESSES
        if (pad.buttons[dpadup].pressed)
            cursor.style.top = ((cursor.offsetTop - ch) > 0) ? (cursor.offsetTop - 8) + 'px':'0px'
        if (pad.buttons[dpaddown].pressed)
            cursor.style.top = (cursor.offsetTop + (2 * ch) <= wih) ? (cursor.offsetTop + 8) + 'px':(wih - ch) + 'px'
        if (pad.buttons[dpadleft].pressed)
            cursor.style.left = ((cursor.offsetLeft - ch) > 0) ? (cursor.offsetLeft - 8) + 'px':'0px'
        if (pad.buttons[dpadright].pressed)
            cursor.style.left = (cursor.offsetLeft + (2 * cw) <= wiw) ? (cursor.offsetLeft + 8) + 'px':(wiw - cw) + 'px'

        // HANDLE JOYSTICK 1 AXES SHIFTS
        if (!buttonpriority) {
            if (pad.axes[xaxis] > 0.1 || pad.axes[xaxis] < -0.1)
                cursor.style.left = (cursor.offsetLeft + (10 * pad.axes[xaxis].toFixed(2)) < 0) ?
                '0px':((cursor.offsetLeft + (10 * pad.axes[xaxis].toFixed(2)) > wiw) ? (wiw - cw) + 'px': (cursor.offsetLeft + (10 * pad.axes[xaxis].toFixed(2))) + 'px')
            if (pad.axes[yaxis] > 0.1 || pad.axes[yaxis] < -0.1)
                cursor.style.top = (cursor.offsetTop + (10 * pad.axes[yaxis].toFixed(2)) < 0) ?
                '0px':((cursor.offsetTop + (10 * pad.axes[yaxis].toFixed(2)) > wih) ? (wih - ch) + 'px': (cursor.offsetTop + (10 * pad.axes[yaxis].toFixed(2))) + 'px')
        }
    }

    // MAKE CURSOR WHITE OVER DARK AREAS
    let ts = document.querySelector('grid#program__toolkit__tools')
    if (cursor.offsetLeft > document.querySelector('div#program__toolkit__color__red-dark').offsetLeft &&
        cursor.offsetLeft < document.querySelector('div#program__toolkit__color__violet').offsetLeft &&
        cursor.offsetTop > document.querySelector('div#program__toolkit__color__red').offsetTop &&
        cursor.offsetTop < (document.querySelector('div#program__toolkit__color__grey').clientHeight + document.querySelector('div#program__toolkit__color__black').offsetTop) ||
    (cursor.offsetLeft > ts.offsetLeft && cursor.offsetLeft < (ts.offsetLeft + ts.clientWidth) &&
        cursor.offsetTop > ts.offsetTop && cursor.offsetTop < (ts.offsetTop + ts.clientHeight))) cursor.classList.add('cursor--invert')
    else cursor.classList.remove('cursor--invert')

    // CHANGE CURSOR DEPENDING ON TOOL / LOCATION
    if (cursor.offsetLeft > ts.offsetLeft && cursor.offsetLeft < (ts.offsetLeft + ts.clientWidth) &&
        cursor.offsetTop > ts.offsetTop && cursor.offsetTop < (ts.offsetTop + ts.clientHeight)) {
        cursor.id = 'cursor--pointer'
    } else { cursor.id = 'cursor--' + drawtool }
}

setInterval(cursorloop, (1000 / uifps))
