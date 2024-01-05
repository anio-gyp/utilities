export default function(headers) {
	let ret = {}

	for (const header of headers) {
		let tmp = header.split(":")

		if (tmp.length >= 2) {
			ret[tmp[0].toLowerCase()] = tmp.slice(1).join(":")
		}
	}

	return ret
}
