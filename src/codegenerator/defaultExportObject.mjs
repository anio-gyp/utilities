import objectLiteral from "./objectLiteral.mjs"

export default function(list, opts = {}) {
	return `export default ${objectLiteral(list, opts)};`
}
