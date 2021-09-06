const fetch = require("node-fetch");
const status = require("./http_codes");
/**
 * Termii SDK for NodeJS
 * @author Dennis R. Chibs
 * @param string sender_id
 * @param string api_key
 */
module.exports = class Termii {
	constructor(options = {}) {
		this.sender_id = options.sender_id;
		this.api_key = options.api_key;
		this.channel = (options && options.channel) || "generic";
		this.message_type = (options && options.message_type) || "plain";
		this.pin_attempts = (options && options.pin_attempts) || 3;
		this.pin_time = (options && options.pin_time) || 1;
		this.pin_length = (options && options.pin_length) || 4;
		this.pin_type = (options && options.pin_type) || "NUMERIC";
		this.base_url = "https://termii.com/api/";
	}

	/**
	 * This API allows businesses send text messages to their customers across different messaging channels.
	 * The API accepts JSON request payload and returns JSON encoded responses, and uses standard HTTP response codes.
	 * @param string recipient (Ex: 23490126727)
	 * @param string message
	 * @return array
	 */
	async sendMessage(recipient, message) {
		let url = this.base_url + "sms/send";
		try {
			const request = await fetch(url, {
				method: "POST",
				body: JSON.stringify({
					api_key: this.api_key,
					to: recipient,
					from: this.sender_id,
					sms: message,
					type: this.message_type,
					channel: this.channel,
				}),
				headers: { "Content-Type": "application/json" },
			});
			const response = await request.json();
			return response;
		} catch (err) {
			//console.log(err);
			return err.message;
		}
	}

	/**
	 * This API returns OTP codes in JSON format which can be used within any web or mobile app. Tokens are numeric or alpha-numeric codes generated to authenticate login requests and verify customer transactions.
	 * @param {string} phone_number
	 * @param {enum} pin_type  ALPHANUMERIC or NUMERIC
	 * @param {number} pin_attempts
	 * @param {number} pin_time  (in minutes 1-60)
	 * @param {number} pin_length
	 * @returns object
	 */

	async inAppToken(number) {
		let url = this.base_url + "sms/otp/generate";
		try {
			const request = await fetch(url, {
				method: "POST",
				body: JSON.stringify({
					api_key: this.api_key,
					pin_type: this.pin_type,
					phone_number: number,
					pin_attempts: this.pin_attempts,
					pin_time_to_live: this.pin_time,
					pin_length: this.pin_length,
				}),
				headers: { "Content-Type": "application/json" },
			});
			const response = await request.json();
			return response;
		} catch (err) {
			//console.log(err);
			return err.message;
		}
	}

	/**
	 * The send token API allows businesses trigger one-time-passwords (OTP) across any available messaging channel on Termii. One-time-passwords created are generated randomly and there's an option to set an expiry time.
	 * @param {string} phone_number
	 * @param {enum} message_type ALPHANUMERIC or NUMERIC
	 * @param {string} channel either dnd, WhatsApp, or generic (we chose generic automatically for you)
	 * @param {number} pin_attempts
	 * @param {number} pin_time (in minutes between 1 - 60)
	 * @param {number} pin_length
	 * @param {string} pin_placeholder Ex: "< 1234 >" (Refer to docs)
	 * @param {string} message_text Ex: "Your pin is < 1234 >"
	 * @returns
	 */
	async sendToken(number, pin_placeholder, message_text) {
		let url = this.base_url + "sms/otp/send";
		try {
			const request = await fetch(url, {
				method: "POST",
				body: JSON.stringify({
					api_key: this.api_key,
					message_type: this.pin_type,
					to: number,
					from: this.sender_id,
					channel: this.channel,
					pin_attempts: this.pin_attempts,
					pin_time_to_live: this.pin_time,
					pin_length: this.pin_length,
					pin_placeholder: pin_placeholder,
					message_text: message_text,
				}),
				headers: { "Content-Type": "application/json" },
			});
			const response = await request.json();
			return response;
		} catch (err) {
			//console.log(err);
			return err.message;
		}
	}

	async sendVoiceToken(number) {
		let url = this.base_url + "sms/otp/send/voice";
		try {
			const request = await fetch(url, {
				method: "POST",
				body: JSON.stringify({
					api_key: this.api_key,
					phone_number: number,
					pin_attempts: this.pin_attempts,
					pin_time_to_live: this.pin_time,
					pin_length: this.pin_length,
				}),
				headers: { "Content-Type": "application/json" },
			});
			const response = await request.json();
			return response;
		} catch (err) {
			//console.log(err);
			return err.message;
		}
	}
};
