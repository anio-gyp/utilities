import fs from "node:fs"

export default function(path) {
	try {
		const stat = fs.lstatSync(path)

		return stat.isDirectory() && !stat.isSymbolicLink()
	} catch {
		return false
	}
}
