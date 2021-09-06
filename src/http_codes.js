const status = (code) => {
	let message = "";
	switch (code) {
		case 200:
			message = `OK: Request was successful.`;
		case 400:
			message = `Bad Request: Indicates that the server cannot or will not process the request due to something that is perceived to be a client error.`;
		case 401:
			message = `Unauthorized: No valid API key provided`;
		case 403:
			message = `Forbidden: The API key doesn't have permissions to perform the request.`;
		case 404:
			message = `Not Found: The requested resource doesn't exist.`;
		case 405:
			message = `Method Not allowed: The selected http method is not allowed`;
		case 422:
			message = `Unprocessable entity: indicates that the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions`;
		case 429:
			message = `Too Many Requests: Indicates the user has sent too many requests in a given amount of time`;
			break;
		default:
			message = `Server Errors: Something went wrong on Termii's end`;
	}
	return message;
};
module.exports = status;
