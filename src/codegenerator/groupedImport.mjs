import objectLiteral from "./objectLiteral.mjs"

export default function(src, obj, opts = {}) {
	src = JSON.stringify(src)

	return `import ${objectLiteral(obj, {
		...opts,
		use_as: true
	})} from ${src};`
}
