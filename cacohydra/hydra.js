let killcount = 0

var updateText = () => {
    console.log(killcount)
    let text = document.querySelector('#text')
         if (killcount < 05) text.innerHTML = 'CEASE YOUR FIRE.'
    else if (killcount < 10) text.innerHTML = 'DO NOT RESIST.'
    else if (killcount < 15) text.innerHTML = 'THERE IS NO POINT.'
    else if (killcount < 20) text.innerHTML = 'WHY DO YOU BOTHER?'
    else if (killcount < 25) text.innerHTML = 'WE ONLY GET STRONGER.'
    else if (killcount < 30) text.innerHTML = 'EVERY KILL IS NEW LIFE.'
    else if (killcount < 35) text.innerHTML = 'YOUR VIOLENCE FEEDS US.'
    else if (killcount >= 35) {
        if (killcount % 2 === 0) text.innerHTML = 'EVERY KILL IS NEW LIFE.'
        else text.innerHTML = 'YOUR VIOLENCE FEEDS US.'
    }
}, hydra = (oldcaco) => {
    return () => {
    if (oldcaco.classList.contains('caco--live')) {
        let ocx = oldcaco.getBoundingClientRect().left, ocy = oldcaco.getBoundingClientRect().top
        oldcaco.classList.remove('caco--live')
        oldcaco.classList.add('caco--dead')
        oldcaco.onclick = undefined
        oldcaco.style.left = ocx + 'px'
        oldcaco.style.top = ocy + 'px'
        killcount++
        updateText()
        for (let counter = 0; counter < 2; counter++) {
            let newcaco = document.createElement('div')
            newcaco.classList.add('caco')
            newcaco.classList.add('caco--live')
            newcaco.setAttribute('bx', (Math.random() * 100) + '%')
            newcaco.setAttribute('by', (Math.random() * 100) + '%')
            newcaco.id = 'caco-' + (cacoindex + 1)
            cacoindex++
            let aname = 'cacohover' + cacoindex, bx = newcaco.getAttribute('bx'), by = newcaco.getAttribute('by')
            let styleinner =    '\t@keyframes ' + aname + ' {\n' +
                                    '\t\t0% {\n' +
                                        '\t\t\tleft: calc(' + bx + ' - (0.5 * var(--cacowidth)));\n' +
                                        '\t\t\ttop: calc(' + by + ');\n' +
                                    '\t\t}\n' +
                                    '\t\t12.5% {\n' +
                                        '\t\t\tleft: calc(' + bx + ');\n' +
                                        '\t\t\ttop: calc(' + by + ' - (0.5 * var(--cacoheight)));\n' +
                                    '\t\t}\n' +
                                    '\t\t25% {\n' +
                                        '\t\t\tleft: calc(' + bx + ' + (0.5 * var(--cacowidth)));\n' +
                                        '\t\t\ttop: calc(' + by + ' - var(--cacoheight));\n' +
                                    '\t\t}\n' +
                                    '\t\t37.5% {\n' +
                                        '\t\t\tleft: calc(' + bx + ');\n' +
                                        '\t\t\ttop: calc(' + by + ' - (0.5 * var(--cacoheight)));\n' +
                                    '\t\t}\n' +
                                    '\t\t50% {\n' +
                                        '\t\t\tleft: calc(' + bx + ' - (0.5 * var(--cacowidth)));\n' +
                                        '\t\t\ttop: calc(' + by + ');\n' +
                                    '\t\t}\n' +
                                    '\t\t62.5% {\n' +
                                        '\t\t\tleft: calc(' + bx + ' - var(--cacowidth));\n' +
                                        '\t\t\ttop: calc(' + by + ' - (0.5 * var(--cacoheight)));\n' +
                                    '\t\t}\n' +
                                    '\t\t75% {\n' +
                                        '\t\t\tleft: calc(' + bx + ' - (1.5 * var(--cacowidth)));\n' +
                                        '\t\t\ttop: calc(' + by + ' - var(--cacoheight));\n' +
                                    '\t\t}\n' +
                                    '\t\t87.5% {\n' +
                                        '\t\t\tleft: calc(' + bx + ' - var(--cacowidth));\n' +
                                        '\t\t\ttop: calc(' + by + ' - (0.5 * var(--cacoheight)));\n' +
                                    '\t\t}\n' +
                                    '\t\t100% {\n' +
                                        '\t\t\tleft: calc(' + bx + ' - (0.5 * var(--cacowidth)));\n' +
                                        '\t\t\ttop: calc(' + by + ');\n' +
                                    '\t\t}\n' +
                                '\t}\n\n' +
                                '\tdiv#caco-' + cacoindex + ' {\n' +
                                    '\t\tanimation: ' + aname + ' 2.5s ' + Math.random() + 's linear infinite none running, cacosprites 1s steps(7) infinite;\n' +
                                    '\t\tleft: ' + newcaco.getAttribute('bx') + ';\n' +
                                    '\t\ttop: ' + newcaco.getAttribute('by') + ';\n' +
                                '\t}\n' +
                                '\tdiv#caco-' + cacoindex + '.caco--dead {\n' +
                                    '\t\tanimation: cacodead 0.375s steps(5), fadeaway 0.75s 3s ease forwards;\n' +
                                    '\t\tanimation-fill-mode: forwards;\n' +
                                '\t}\n'

            let hasstyle = false
            for (let s of document.querySelectorAll('style')) if (s.innerHTML === styleinner) hasstyle = true
            if (!hasstyle) {
                let style = document.createElement('style')
                style.innerHTML = styleinner
                document.head.appendChild(style)
            }
            document.body.appendChild(newcaco)
        }

    }}
}

let cacoindex = 0
document.onclick = () => {
    for (let caco of document.querySelectorAll('.caco')) {
        if (caco.classList.contains('caco--live')) caco.onclick = hydra(caco)
        else {
            let id = Number.parseInt(caco.id.replace('caco-', ''))
            for (let s of document.querySelectorAll('style')) {
                if (s.innerHTML.includes('cacohover' + id)) setTimeout(() => {
                    document.head.removeChild(s)
                    document.body.removeChild(caco)
                }, 4000)
            }
        }
    }
}
document.onkeypress = (e) => {
    console.log(e)
         if (e.key == 1) killcount = 0
    else if (e.key == 2) killcount = 5
    else if (e.key == 3) killcount = 10
    else if (e.key == 4) killcount = 15
    else if (e.key == 5) killcount = 20
    else if (e.key == 6) killcount = 25
    else if (e.key == 7) killcount = 30
    else if (e.key == 8) killcount = 35
    updateText()
}
document.body.click()
updateText()
