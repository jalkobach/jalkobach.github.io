var controllers = [],
    connect = (e) => {
        controllers[e.gamepad.index] = e.gamepad
    },
    disconnect = (e) => { controllers.splice(controllers.findIndex((g) => g.index == e.gamepad.index), 1) },
    scan = () => {
        let gamepads = (navigator.getGamepads) ? navigator.getGamepads() : ((navigator.webkitGetGamepads) ? navigator.webkitGetGamepads() : [])
        for (gamepad of gamepads) if (gamepad) controllers[gamepad.index] = gamepad
    }

if (window.GamepadEvent) {
    window.addEventListener('gamepadconnected', connect)
    window.addEventListener('gamepaddisconnected', disconnect)
} else if (window.WebkitGamepadEvent) {
    window.addEventListener('webkitgamepadconnected', connect)
    window.addEventListener('webkitgamepaddisconnected', disconnect)
} else {
    setInterval(scan, 250)
}
