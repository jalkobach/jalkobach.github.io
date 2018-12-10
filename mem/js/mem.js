let slider1 = document.querySelector(`input.photo_slider__control#photo_slider1__control`),
	slider2 = document.querySelector(`input.photo_slider__control#photo_slider2__control`),
	textbox = document.querySelector(`p#content__text_field`),
	image1 = document.querySelector(`img.content__photos__main#content__photos__main_1`),
	image2 = document.querySelector(`img.content__photos__main#content__photos__main_2`),
	prev1 = document.querySelector(`img.content__photos__column#content__photos__column_prev1`),
	prev2 = document.querySelector(`img.content__photos__column#content__photos__column_prev2`),
	next1 = document.querySelector(`img.content__photos__column#content__photos__column_next1`),
	next2 = document.querySelector(`img.content__photos__column#content__photos__column_next2`)

window.onload = function () {
	slider1.max = all_images.length
	slider2.max = all_images.length
	let m = slider1.max,
		r = Math.floor(1 + (Math.random() * (m - 1)))
	slider1.value = r
	let v = r
	while (true) {
		if (v < r - (0.2 * m) || v > r + (0.2 * m)) break
		v = Math.floor(1 + (Math.random() * (m - 1)))
	}
	slider2.value = v
	textbox.innerHTML = scramble(all_images[slider1.value - 1].note, all_images[v - 1].note)
	update_images(slider1.value - 1, slider2.value - 1)
}

document.querySelectorAll(`input.photo_slider__control`).forEach((s) => { s.oninput = update_sliders })

function scramble (note1, note2) {
	let output = ``, words = note1.split(`_`), words2 = note2.split(`_`)
	for (let word of words2) words.push(word)
	while (words.length > 0) output += `${words.splice(Math.floor(Math.random() * words.length), 1)} `
	return output
}

function update_images (val1, val2) {
	image1.src = `mem/${all_images[val1].path}`
	image2.src = `mem/${all_images[val2].path}`
	prev1.src = (val1 === 0) ? `mem/64.jpg` : `mem/${all_images[val1 - 1].path}`
	prev2.src = (val2 === 0) ? `mem/64.jpg` : `mem/${all_images[val2 - 1].path}`
	next1.src = (val1 === 63) ? `mem/01.jpg` : `mem/${all_images[val1 + 1].path}`
	next2.src = (val2 === 63) ? `mem/01.jpg` : `mem/${all_images[val2 + 1].path}`
}

function update_sliders () {
	let val1 = slider1.value - 1,
		val2 = slider2.value - 1
	update_images(val1, val2)
	if (slider1.value === slider2.value) textbox.innerHTML = all_images[val1].note.replace(/_/g, ` `)
	else textbox.innerHTML = scramble(all_images[val1].note, all_images[val2].note)
}
