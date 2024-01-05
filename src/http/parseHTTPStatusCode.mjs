export default function(head) {
	if (!head.startsWith("HTTP/")) return false

	let [_, code] = head.split(" ")

	code = parseInt(code, 10)

	if (isNaN(code)) {
		return false
	}

	return code
}
