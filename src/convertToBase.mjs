import reverseString from "./reverseString.mjs"

export default function(value, base, chars) {
	let str = ""

	while (true) {
		let digit = value % base

		str += chars[digit]

		value = Math.floor(value / base)

		if (!value) break
	}

	return reverseString(str)
}
