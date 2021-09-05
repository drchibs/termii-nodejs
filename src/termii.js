const axios = require('axios').default;
const status = require('./http_codes');
/**
 * Termii SDK for NodeJS
 * @author Dennis R. Chibs
 * @param string sender_id
 * @param string api_key
 */
module.exports = class Termii {
	constructor(sender_id, api_key) {
		this.sender_id = sender_id;
		this.api_key = api_key;
        this.channel = "generic";
        this.message_type  = "plain";
        this.base_url = 'https://termii.com/api/'
	}

    /**
     * This API allows businesses send text messages to their customers across different messaging channels. 
     * The API accepts JSON request payload and returns JSON encoded responses, and uses standard HTTP response codes.
     * @param string recipient (Ex: 23490126727)
     * @param string message 
     * @return array
     */
    async sendMessage(recipient, message) {
        try {
            const request = await axios.post('sms/send', {
                api_key: this.api_key,
                to: recipient,
                from: this.sender_id,
                sms: message,
                type: this.message_type,
                channel: this.channel
            });
            //console.log(request);
            return JSON.stringify(request);

        } catch (error) {
            //console.error(error);
            const res = {
                status: status(error.status)
            }
            return JSON.stringify(res);
        }
    }
    
   
}
