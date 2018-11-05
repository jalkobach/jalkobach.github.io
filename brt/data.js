const PROFILES = {
	"shaman": {
		color: `#18A890`,
		max_hp: 100,
		max_mp: 30,
		prefix:	`mch`,
		skills: [
			`water2`,
			`earth1`,
			`air1`
		],
		stat_attack: 20,
		stat_defense: 35,
		stat_speed: 40,
		stat_spirit: 20,
		stat_vitality: 35
	},
	"redknight": {
		max_hp: 300,
		max_mp: 20,
		prefix: `rkn`,
		skills: [
			`phys1`,
			`phys2`,
			`fire1`
		],
		stat_attack: 40,
		stat_defense: 20,
		stat_speed: 10,
		stat_spirit: 20,
		stat_vitality: 5
	}
}

const SKILLS = {
	"fire1": {
		accuracy: 90,
		element: 0,
		mp_cost: 4,
		name: `Fire`,
		power: 8
	},
	"fire2": {
		accuracy: 85,
		element: 0,
		mp_cost: 10,
		name: `Tofire`,
		power: 20
	},
	"water1": {
		accuracy: 90,
		element: 1,
		mp_cost: 4,
		name: `Water`,
		power: 8
	},
	"water2": {
		accuracy: 85,
		element: 1,
		mp_cost: 10,
		name: `Towater`,
		power: 20
	},
	"earth1": {
		accuracy: 90,
		element: 2,
		mp_cost: 4,
		name: `Earth`,
		power: 8
	},
	"earth2": {
		accuracy: 85,
		element: 2,
		mp_cost: 10,
		name: `Toearth`,
		power: 20
	},
	"air1": {
		accuracy: 90,
		element: 3,
		mp_cost: 4,
		name: `Air`,
		power: 8
	},
	"air2": {
		accuracy: 90,
		element: 3,
		mp_cost: 10,
		name: `Toair`,
		power: 20
	},
	"phys1": {
		accuracy: 95,
		element: 4,
		mp_cost: 3,
		name: `Slice`,
		power: 6
	},
	"phys2": {
		accuracy: 90,
		element: 4,
		mp_cost: 8,
		name: `Dice`,
		power: 16
	}
}
