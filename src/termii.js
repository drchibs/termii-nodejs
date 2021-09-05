const axios = require('axios');
/**
 * Termii SDK for NodeJS
 * @author Dennis R. Chibs
 */
export default class Termii {
	constructor(sender_id, api_key) {
		this.sender_id = sender_id;
		this.api_key = api_key;
        this.base_url = 'https://termii.com/api/'
	}

    /**
     * This API allows businesses send text messages to their customers across different messaging channels. 
     * The API accepts JSON request payload and returns JSON encoded responses, and uses standard HTTP response codes.
     */
}
