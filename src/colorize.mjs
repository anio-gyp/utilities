const map = {
	"red"    : "31",
	"green"  : "32",
	"yellow" : "33",
	"blue"   : "34",
	"magenta": "35",
	"cyan"   : "36",
	"white"  : "37",

	"gray"   : "90"
}

export default function(color, str) {
	let colorname = color
	let modifier = ""

	if (color.includes(".")) {
		[colorname, modifier] = color.split(".")
	}

	if (!(colorname in map)) {
		throw new Error(`Unknown color '${colorname}'.`)
	}

	const seq = map[colorname]
	const bold = modifier === "bold" ? "1" : "0"

	return `\u001b[${bold};${seq}m${str}\u001b[0;0m`
}
