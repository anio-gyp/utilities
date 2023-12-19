export default function(msg, icon = true) {
	let icon_str = icon ? "ℹ️  " : ""

	process.stderr.write(`${icon_str}${msg}\n`)
}
