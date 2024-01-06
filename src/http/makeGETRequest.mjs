import https from "node:https"

export default function(url) {
	return new Promise((resolve, reject) => {
		const request = https.get(url, (response) => {
			let data = []

			response.on("data", chunk => {
				data.push(chunk)
			})

			response.on("end", () => {
				resolve(Buffer.concat(data).toString())
			})
		})

		request.on("error", reject)
	})
}
