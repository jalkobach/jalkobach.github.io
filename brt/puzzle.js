self.addEventListener(`message`, (order) => {
	let command = order.command, details = order.details
	console.log(command)
}, false)
