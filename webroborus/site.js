let _d = document.querySelector(`div#body`),
	_i = document.querySelector(`img#uro`)

let _r = 0
let _m = { _x: 0, _y: 0 }
let _h, _j, _k

document.onmousemove = (_e) => {
	_m = { _x: _e.pageX, _y: _e.pageY }
}
setInterval(() => {
	_h = Math.hypot(_i.offsetHeight, _i.offsetWidth)
	_j = (_d.clientHeight / 2) - (_h / 2)
	_k = (_d.clientWidth / 2) - (_h / 2)

	if (_m._y > _j && _m._y < (_j + _h) && _m._x > _k && _m._x < (_k + _h)) {
		_d.style.animation = `0.625s infinite alternate redpulse`
		_i.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`
		_i.src = `i/r0${Math.floor(Math.random() * 3)}.png`
	} else {
		_d.style.animation = `1s infinite alternate greenpulse`
		_r += (_r == 358) ? -358 : 2
		_i.style.transform = `rotate(${_r}deg)`
		_i.src = `i/g0${Math.floor(Math.random() * 5)}.png`
	}
}, (1000 / 12))
