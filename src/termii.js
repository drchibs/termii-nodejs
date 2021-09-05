export default class Termii {
	constructor(sender_id, api_key) {
		this.sender_id = sender_id;
		this.api_key = api_key;
        this.base_url = 'https://termii.com/api/'
	}
}
