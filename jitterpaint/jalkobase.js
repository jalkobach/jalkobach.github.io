for (let f of document.getElementsByTagName('flex')) {
    if (f.getAttribute('dir')) f.style.flexDirection = f.getAttribute('dir')
    if (f.getAttribute('wrap')) f.style.flexWrap = f.getAttribute('wrap')
}
for (let g of document.getElementsByTagName('grid')) {
    if (g.getAttribute('col')) g.style.gridTemplateColumns = g.getAttribute('col')
    if (g.getAttribute('row')) g.style.gridTemplateRows = g.getAttribute('row')
}
