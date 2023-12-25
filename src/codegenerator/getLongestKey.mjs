export default function(list) {
	let longest_key = ""

	for (const entry of list) {
		const type = Object.prototype.toString.call(entry).toLowerCase()

		if (type === "[object string]") continue

		const {key} = entry

		if (key.length > longest_key.length) {
			longest_key = key
		}
	}

	return longest_key
}
