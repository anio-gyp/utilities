import fs from "node:fs/promises"
import {fileURLToPath} from "node:url"
import path from "node:path"

const __dirname = path.dirname(
	fileURLToPath(import.meta.url)
)

const files = await fs.readdir(
	path.resolve(__dirname, "src")
)

let index = "/* this file was automatically generated */\n"

for (const file of files) {
	if (file === "_export.mjs") continue

	const fn = file.slice(0, file.length - 4)
	const stat = await fs.lstat(
		path.resolve(__dirname, "src", file)
	)

	if (stat.isDirectory()) continue

	index += `\nexport {\n    default as ${fn}\n} from "./${fn}.mjs"\n`
}

await fs.writeFile(
	path.join(__dirname, "src", "_export.mjs"), index
)
