export default function(entry) {
	const type = Object.prototype.toString.call(entry).toLowerCase()

	if (type === "[object string]") return entry

	const {key, value} = entry

	if (key.includes(" ") || key.includes("/") || key.includes(".")) {
		return {
			key: JSON.stringify(key),
			value
		}
	}

	return {key, value}
}
