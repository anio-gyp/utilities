import escapeEntry from "./escapeEntry.mjs"
import getLongestKey from "./getLongestKey.mjs"

export default function(list, {
	pad_to_longest_key = true,
	pre_padding = 4,
	additional_padding = 0,
	use_as = false
} = {}) {
	if (!list.length) {
		return `{}`
	}

	const escaped = list.map(escapeEntry)
	const longest_key = getLongestKey(escaped)

	const prepad = " ".repeat(pre_padding)

	let str = `{\n`

	for (const entry of escaped) {
		const type = Object.prototype.toString.call(entry).toLowerCase()

		if (type !== "[object string]") {
			const {key, value} = entry

			let padding = " ".repeat(additional_padding)

			if (pad_to_longest_key) {
				padding += " ".repeat(longest_key.length - key.length)
			}

			if (use_as) {
				str += `${prepad}${key}${padding} as ${value},\n`
			} else {
				str += `${prepad}${key}${padding} : ${value},\n`
			}
		} else {
			str += `${prepad}/* ${entry} */\n`
		}
	}

	let postpad = pre_padding > 4 ? pre_padding - 4 : 0

	console.log("postpad", postpad)

	str = str.slice(0, str.length - 2)

	str += `\n`
	str += " ".repeat(postpad) + `}`

	return str
}
