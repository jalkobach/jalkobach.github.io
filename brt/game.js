let DDRPG

const PUZZLE = new Worker(`puzzle.js`)
//PUZZLE.postMessage({ command: `start`, details: `` })

const CANVAS = document.querySelector(`canvas`)
let context = CANVAS.getContext(`2d`)

const FPS = 12
const SCALE = 2

let game_screen,
	battle,
	cursors,
	cursor_state

/**
 *	This is the initializing function. All game values are created in this function and category.
 */
function __init () {
	set_canvas_size()
	init_cursors()

	game_screen = 0
	battle = {}

	make_battle([
		{
			name: `Shaman`,
			team: 0,
			slot: 1,
			profile: `shaman`
		},
		{
			name: `Red Knight`,
			team: 1,
			slot: 1,
			profile: `redknight`
		}
	], `gr`, `svs`)
}

/**
 *	Initialize the cursors used during the battle.
 */
function init_cursors () {
	cursors = {}
	cursors.action_select = 0
	cursors.skills_select = 0
	cursors.target_select = 0

	cursor_state = `action_select`
}

/**
 *	Initialize the battle scenario.
 *	@param {array} characters		- an array of character objects, as specified in {@link make_character#character}
 *	@param {string}	background		- the background to be displayed for the battle
 *	@param {string} music			- the music track to be played for the battle
 *	@param {object} [special=null]	- any special scripts that may be used for the battle
 */
function make_battle (characters, background, music, special=null) {
	battle.characters = []
	characters.forEach(make_character)

	battle.background = background
	battle.music = music
	battle.music_playing = false
	battle.rounds = []
	battle.special = special
}

/**
 *	Make a character and put it into the characters list. Used by {@link make_battle}.
 *	@param {object} character
 *	@param {string} character.name		- the name of the character
 *	@param {number} character.team		- the team of the character (0 for ally, 1 for enemy)
 *	@param {number} character.slot		- the character's slot on the team (0, 1, 2)
 *	@param {string}	character.profile	- the name of the JSON object the character pulls stats and skills from
 */
function make_character (character) {
	let c = {
		frame: 0,
		idle: true,
		skills: [],
		name: character.name,
		slot: character.slot,
		team: character.team,
		color: PROFILES[character.profile].color,
		hp: PROFILES[character.profile].max_hp,
		max_hp: PROFILES[character.profile].max_hp,
		max_mp: PROFILES[character.profile].max_mp,
		mp: PROFILES[character.profile].max_mp,
		prefix: PROFILES[character.profile].prefix
	}
	// NOTE: Anything derived from the profile parameter will have to be tweaked when working with save files.
	battle.characters.push(c)
}

/**
 * 	Set the size of the canvas to the full size of the browser window.
 */
function set_canvas_size () {
	CANVAS.width = window.innerWidth
	CANVAS.height = window.innerHeight
	context.imageSmoothingEnabled = false
	context.font = `15px Grand`
}

/**
 *	This is the update function. Any changes to game values caused by time or player input are processed here.
 */
function __update () {
	handle_cursor()
}

/**
 *	Calculate an attack.
 *	@param {object} attacker			- the attacking party
 *	@param {object} defender			- the defending party
 *	@param {object|null} [skill=false]	- the skill being used; if a standard attack was chosen instead, defaults to false
 */
function attack (attacker, defender, skill=false) {
//	let modifier
//	while (true) {
//		modifier = start_puzzle((skill && skill.power > 10) ? 8 : 4)
//		if (typeof modifier === `number`) break
//	}

	if (skill) {

	} else {

	}
}

/**
 *	Handle the user's key presses to move the cursor.
 */
function handle_cursor () {
	document.onkeypress = (event) => {
		switch (cursor_state) {
			case `action_select`:
				let direction = 0
				if (event.key === `a` || event.key === `w`) direction--
				else if (event.key === `d` || event.key === `s`) direction++
				else if (event.key === `e`) {
					if (cursors[`action_select`] === 0) {
						attack(battle.characters[0], battle.characters[1])
						// TODO: fight
					} //cursor_state = `target_select`
					else if (cursors[`action_select`] === 1) cursor_state = `skills_select`
					break
				}

				move_cursor(cursor_state, direction)
			break
			case `skills_select`:
				if (event.key === `q`) {
					cursor_state = `action_select`
					break
				}
			break
		}
	}
}

/**
 *	Move the specified cursor. Used in {@link handle_cursor}.
 *	@param {string} cursor		- the name of the cursor
 *	@param {number}	direction	- the direction in which to move the cursor
 */
function move_cursor (cursor, direction) {
	cursors[cursor] += direction
	let cursor_max = (cursor === `action_select`) ? 3 : (cursor === `skill_select`) ? 2 : 1
	if (cursors[cursor] < 0) cursors[cursor] = cursor_max
	else if (cursors[cursor] > cursor_max) cursors[cursor] = 0
}

/**
 *	This is the draw function. Any and all visible values and changes are displayed to the player from here.
 */
function __draw () {
	clear_screen()
	draw_battle()
}

/**
 *	Draw the background for a battle scenario. Used by {@link draw_battle}.
 *	@param {string} background		- the filename of the background image
 */
function draw_background (background) {
	let url = `assets/backgrounds/${background}.png`,
		image = new Image(),
		screen_x = (window.innerWidth - 800) / 2,
		screen_y = (window.innerHeight - 600) / 2
	image.src = url
	context.drawImage(image, screen_x, screen_y)
}

/**
	Draw the battle scenario.
*/
function draw_battle () {
	draw_background(battle.background)
	battle.characters.forEach(draw_character)
	battle.characters.forEach(draw_controls)
}

/**
 *	Draw a character into the CanvasRenderingContext2D. Used by {@link draw_battle}.
 *	@param {object} character
 *	@param {string} character.name		- the name of the character
 *	@param {number} character.team		- the team of the character (0 for ally, 1 for enemy)
 *	@param {number} character.slot		- the character's slot on the team (0, 1, 2)
 *	@param {string}	character.prefix	- the short identifier for which sprites to display
 */
function draw_character (character) {
	// Load spritesheet for character and current action.
	let image = new Image()
	image.src = (character.idle)
		? `assets/sprites/${character.prefix}/Bidle` : `assets/sprites/${character.prefix}/Baction`
	image.src += (character.team === 0) ? `R.png` : `.png`

	// Set frame of animation to display.
	character.frame++
	if (character.frame === (4 * image.width) / image.height) character.frame = 0

	// Set position of sprite.
	let sx = (Math.floor(character.frame / 4) * image.height),
		sy = 0,
		dx = (character.team === 0) ?  50 : 750 - (image.height * SCALE),
		dy = 200 + (character.slot * 100),
		enemy = (character.team === 1) ? -1 : 1

	// Draw sprite.
	context.drawImage(
		image,
		sx,
		sy,
		image.height,
		image.height,
		dx + ((window.innerWidth - 800) / 2),
		dy + ((window.innerHeight - 600) / 2) - image.height,
		image.height * SCALE,
		image.height * SCALE
	)

	// Draw enemy health bar.
	if (character.team === 1) {
		let bar_width = character.max_hp / 5
		context.fillStyle = `#000`
		context.fillRect(
			750 - (bar_width / 2) + ((window.innerWidth - 800) / 2),
			200 + (character.slot * 100) - 25,
			bar_width + 4, 14
		)
		context.lineWidth = 2
		context.strokeStyle = `#FFF`
		context.strokeRect(
			750 - (bar_width / 2) + ((window.innerWidth - 800) / 2),
			200 + (character.slot * 100) - 25,
			bar_width + 4, 14
		)
		let hp_percentage = character.hp / character.max_hp,
			bar_color = (hp_percentage > 0.6) ? `#3F3` :
						(hp_percentage > 0.3) ? `#FF6` :
						(hp_percentage > 0.15) ? `#FA0` : `#F33`
		context.fillStyle = bar_color
		context.fillRect(
			752 - (bar_width / 2) + ((window.innerWidth - 800) / 2),
			202 + (character.slot * 100) - 25,
			hp_percentage * bar_width, 10
		)
	}
}

/**
 *	Draw the battle controls for each ally. Used by {@link draw_battle}.
 *	@param {object} character
 *	@param {string} character.color		- the hex value of the character's unique color
 *	@param {number} character.hp		- the character's current HP value
 *	@param {number} character.mp		- the character's current MP value
 *	@param {string} character.slot		- the character's slot on the team (0, 1, 2)
 *	@param {string} character.team		- the team of the character (0 for ally, 1 for team)
 */
function draw_controls (character) {
	// Sort allies into an array.
	let allies = []
	if (character.team === 0) allies.push(character)

	// Draw controls for each ally.
	if (allies.length === 1) {
		// Draw background box.
		context.fillStyle = `#000`
		context.fillRect(
			300 + ((window.innerWidth - 800) / 2),
			490 + ((window.innerHeight - 600) / 2),
			200, 100
		)

		// Draw outline of background box.
		context.lineWidth = 2
		context.strokeStyle = allies[0].color
		context.strokeRect(
			300 + ((window.innerWidth - 800) / 2),
			490 + ((window.innerHeight - 600) / 2),
			200, 100
		)

		// Draw character name.
		context.fillStyle = `#FFF`
		context.fillText(
			character.name,
			305 + ((window.innerWidth - 800) / 2),
			510 + ((window.innerHeight - 600) / 2),
			190
		)

		// Draw character's HP count.
		context.fillStyle = `#F00`
		let hp = allies[0].hp.toString()
		while (hp.length < 3) hp = `0${hp}`
		context.fillText(
			hp,
			405 + ((window.innerWidth - 800) / 2),
			510 + ((window.innerHeight - 600) / 2)
		)
		context.fillText(
			`HP`,
			470 + ((window.innerWidth - 800) / 2),
			510 + ((window.innerHeight - 600) / 2)
		)

		// Draw character's MP count.
		context.fillStyle = `#66F`
		let mp = allies[0].mp.toString()
		while (mp.length < 3) mp = `0${mp}`
		context.fillText(
			mp,
			405 + ((window.innerWidth - 800) / 2),
			532 + ((window.innerHeight - 600) / 2)
		)
		context.fillText(
			`MP`,
			470 + ((window.innerWidth - 800) / 2),
			532 + ((window.innerHeight - 600) / 2)
		)

		// Draw outlines for buttons.
		if (cursors.action_select !== 0) context.strokeRect(
			300 + ((window.innerWidth - 800) / 2),
			540 + ((window.innerHeight - 600) / 2),
			50, 50
		)
		if (cursors.action_select !== 1) context.strokeRect(
			350 + ((window.innerWidth - 800) / 2),
			540 + ((window.innerHeight - 600) / 2),
			50, 50
		)
		if (cursors.action_select !== 2) context.strokeRect(
			400 + ((window.innerWidth - 800) / 2),
			540 + ((window.innerHeight - 600) / 2),
			50, 50
		)
		if (cursors.action_select !== 3) context.strokeRect(
			450 + ((window.innerWidth - 800) / 2),
			540 + ((window.innerHeight - 600) / 2),
			50, 50
		)
		context.strokeStyle = `#FFF`
		context.strokeRect(
			300 + (50 * cursors.action_select) + ((window.innerWidth - 800) / 2),
			540 + ((window.innerHeight - 600) / 2),
			50, 50
		)

		// Draw icons for buttons.
		let fight_icon = new Image()
		fight_icon.src = `assets/sprites/icons/fight.png`
		context.drawImage(
			fight_icon,
			301 + ((window.innerWidth - 800) / 2),
			541 + ((window.innerHeight - 600) / 2),
			48, 48
		)
		let skills_icon = new Image()
		skills_icon.src = `assets/sprites/icons/skills.png`
		context.drawImage(
			skills_icon,
			351 + ((window.innerWidth - 800) / 2),
			541 + ((window.innerHeight - 600) / 2),
			48, 48
		)
		let items_icon = new Image()
		items_icon.src = `assets/sprites/icons/items.png`
		context.drawImage(
			items_icon,
			401 + ((window.innerWidth - 800) / 2),
			541 + ((window.innerHeight - 600) / 2),
			48, 48
		)
		let run_icon = new Image()
		run_icon.src = `assets/sprites/icons/run.png`
		context.drawImage(
			run_icon,
			451 + ((window.innerWidth - 800) / 2),
			541 + ((window.innerHeight - 600) / 2),
			48, 48
		)

		// Draw current menu selection.
		let action =
			(cursors[`action_select`] === 0) ? `FIGHT` :
			(cursors[`action_select`] === 1) ? `SKILLS` :
			(cursors[`action_select`] === 2) ? `ITEMS [x]` : `RUN [x]`
		context.fillStyle = allies[0].color
		context.fillText(
			action,
			305 + ((window.innerWidth - 800) / 2),
			532 + ((window.innerHeight - 600) / 2)
		)
	} else if (allies.length === 2) {

	} else if (allies.length === 3) {

	}
}

/**
 *	Clear the CanvasRenderingContext2D of all visual elements.
 */
function clear_screen () {
	context.clearRect(0, 0, 5000, 5000)
	context.fillStyle = `#000`
	context.fillRect(0, 0, 5000, 5000)
}

/**
 *	This is the main game loop. When the page has loaded, the game works to initialize everything the game will need. Afterwards, the game runs in a constant loop of updating values and drawing the changes.
 */
;(function () {
	__init()
	function __main () {
		window.requestAnimationFrame(__main)
		__update()
		__draw()
	}
	__main()
})()
window.onresize = set_canvas_size
