import scandir from "@anio-node-foundation/fs-scandir"

function scandirSync(...args) {
	return scandir.sync(...args)
}

export default scandirSync
