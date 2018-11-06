self.addEventListener(`message`, (order) => {
	let command = order.command, details = order.details
	self.postMessage(command)
}, false)
