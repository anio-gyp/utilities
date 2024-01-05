import parseHTTPStatusCode from "./parseHTTPStatusCode.mjs"
import parseHTTPHeaders from "./parseHTTPHeaders.mjs"

export default function(response) {
	let response_headers_str = response
	let response_body_str = ""
	let response_body = response_body_str

	let response_body_start = response.indexOf("\r\n\r\n")

	if (response_body_start >= 0) {
		response_headers_str = response.slice(0, response_body_start)
		response_body_str = response.slice(response_body_start + 4)
	}

	let response_headers = response_headers_str.split("\r\n")

	if (!response_headers.length) {
		return false
	}

	const response_code = parseHTTPStatusCode(response_headers[0])

	if (response_code === false) {
		return false
	}

	const headers = parseHTTPHeaders(response_headers.slice(1))

	if ("content-type" in headers) {
		if (headers["content-type"] === "application/json") {
			try {
				response_body = JSON.parse(response_body_str)
			} catch (error) {
				return false
			}
		}
	}

	return {
		code: response_code,
		headers,
		body: response_body
	}
}
