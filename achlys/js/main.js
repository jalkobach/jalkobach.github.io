const screens = document.querySelectorAll('div.screen'), mainScreen = screens[0]
let _w = window.innerWidth, _h = window.innerHeight, _stage, _j = {}
window.onresize = () => {
	_w = window.innerWidth
	_h = window.innerHeight
}
_stage = mainScreen.offsetLeft / (-1 * _w)

let backwardMains = document.querySelectorAll('div.backward__main'),
	forwardAbout = document.querySelector('div#screen--main_0r__right__forward-about'),
	forwardContact = document.querySelector('div#screen--main_0r__right__forward-contact'),
	forwardGallery = document.querySelector('div#screen--main_0r__right__forward-gallery'),
	forwardVideos = document.querySelector('div#screen--main_0r__right__forward-projects'),
	forwardMains = document.querySelectorAll('div.forward__main')
			
const moveScreens = function (_n, _b) {
	for (let _c of screens) {
		if (_c !== _n && _b) { _c.style.zIndex = 100 } else if (_c == _n) { _c.style.zIndex = 900 }
				
		let _o = _c.id.split('_')[1].substring(0, 1)
		_c.style.left = `${-100 * (_stage - _o)}vw`
	}
}

for (let _f of forwardMains) _f.onclick = () => {
	_stage = 1
	let _s
	if (_f === forwardAbout) _s = 'about'
	else if (_f === forwardContact) _s = 'contact'
	else if (_f === forwardGallery) _s = 'gallery'
	else if (_f === forwardVideos) _s = 'projects'
	moveScreens(document.querySelector(`div#screen--${_s}_1r`), true)
}
		
for (let _b of backwardMains) _b.onclick = () => {
	_stage = 0
	moveScreens(document.querySelector(`div#screen--main_0r`), false)
}

(function (_p) {
	let _x = new XMLHttpRequest()
	_x.overrideMimeType('application/json')
	_x.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) { 
			_j = JSON.parse(this.responseText)
			console.log(_j)
		}
	}
	_x.open('GET', _p, true)
	_x.send()
	setTimeout(this, 900000)
})('directory.json')