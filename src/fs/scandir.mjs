// original implementation of nodejs-utils
import fs from "node:fs"
import path from "node:path"

function _scandir(context, relative_entry_dir, callback) {
	const entries = fs.readdirSync(
		path.resolve(context.root, relative_entry_dir)
	)

	for (const entry of entries) {
		const absolute_path = path.join(
			context.root, relative_entry_dir, entry
		)

		const relative_path = path.join(
			relative_entry_dir, entry
		)

		const stats = fs.lstatSync(absolute_path)

		let type = "file"

		if (stats.isSymbolicLink()) {
			type = "link"
		} else if (stats.isDirectory()) {
			type = "dir"
		}

		const handle_entry = () => {
			if (typeof callback === "function") {
				callback(type, {relative_path, absolute_path})
			}

			context.entries.push({type, relative_path, absolute_path})
		}

		if (type === "dir") {
			if (context.order) {
				_scandir(context, relative_path, callback)
			}

			handle_entry()

			if (!context.order) {
				_scandir(context, relative_path, callback)
			}
		} else {
			handle_entry()
		}
	}
}

function scandir(dir_path, callback, order) {
	let entries = []

	_scandir({
		order,
		entries,
		root: fs.realpathSync(dir_path)
	}, ".", callback)

	return entries
}

function scandir_export(dir_path, callback) {
	return scandir(dir_path, callback, false)
}

scandir_export.reverse = function(dir_path, callback) {
	return scandir(dir_path, callback, true)
}

export default scandir_export
