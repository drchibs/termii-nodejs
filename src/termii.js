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
		this.pin_attempts = (options && options.pin_attempts) || 3;
		this.pin_time = (options && options.pin_time) || 1;
		this.pin_length = (options && options.pin_length) || 4;
		this.pin_type = (options && options.pin_type) || "NUMERIC";
		this.base_url = "https://api.ng.termii.com/api/";
	}

	async #sendRequest(body, endpoint, method = "GET") {
		let url = this.base_url + endpoint;
		let options = {
			method,
		};
		try {
			if (method === "GET") {
				//string the body object into a GET url string
				let geturl = new URLSearchParams(body);
				url += "?" + geturl.toString();
			} else {
				options.body = JSON.stringify(body);
				options.headers = { "Content-Type": "application/json" };
				//console.log(options);
			}
			const request = await fetch(url, options);
			const response = await request.json();
			return response;
		} catch (err) {
			console.log(err);
			return err.message;
		}
	}

	/**
	 * This API allows businesses send text messages to their customers across different messaging channels.
	 * The API accepts JSON request payload and returns JSON encoded responses, and uses standard HTTP response codes.
	 * @param string recipient (Ex: 23490126727)
	 * @param string message
	 * @return array
	 */
	async sendMessage(recipient, message) {
		const endpoint = "sms/send";
		let body = {
			api_key: this.api_key,
			to: recipient,
			from: this.sender_id,
			sms: message,
			type: 'plain',
			channel: this.channel,
		};

		return this.#sendRequest(body, endpoint, "POST");
	}

	/**
	 * This API allows businesses send messages to customers using Termii's auto-generated messaging numbers that adapt to customers location.
	 * @param {string} to
	 * @param {string} sms
	 * @returns
	 */

	async sendMessageWithAutomatedNumber(recipient, message) {
		const endpoint = "sms/number/send";
		let body = {
			api_key: this.api_key,
			to: recipient,
			sms: message,
		};

		return this.#sendRequest(body, endpoint, "POST");
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

	async inAppToken(phone_number) {
		const endpoint = "sms/otp/generate";
		let body = {
			api_key: this.api_key,
			pin_type: this.pin_type,
			phone_number: phone_number,
			pin_attempts: this.pin_attempts,
			pin_time_to_live: this.pin_time,
			pin_length: this.pin_length,
		};
		return this.#sendRequest(body, endpoint, "POST");
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
	async sendToken(phone_number, pin_placeholder, message_text) {
		const endpoint = "sms/otp/send";
		let body = {
			api_key: this.api_key,
			message_type: this.pin_type,
			to: phone_number,
			from: this.sender_id,
			channel: this.channel,
			pin_attempts: this.pin_attempts,
			pin_time_to_live: this.pin_time,
			pin_length: this.pin_length,
			pin_placeholder: pin_placeholder,
			message_text: message_text,
		};

		return this.#sendRequest(body, endpoint, "POST");
	}

	async sendVoiceToken(phone_number) {
		const endpoint = "sms/otp/send/voice";
		let body = {
			api_key: this.api_key,
			phone_number: phone_number,
			pin_attempts: this.pin_attempts,
			pin_time_to_live: this.pin_time,
			pin_length: this.pin_length,
		};
		return this.#sendRequest(body, endpoint, "POST");
	}

	/**
	 * The voice call API enables you to send messages from your application through our voice channel to a phone number. Only one-time-passwords (OTP) are allowed for now and these OTPs can not be verified using our Verify Token API.
	 * @param {string} number Example: 23490126727
	 * @param {number} code Example: 3344
	 * @returns
	 */

	async sendVoiceCall(phone_number, code) {
		const endpoint = "sms/otp/call";
		let body = {
			api_key: this.api_key,
			phone_number: phone_number,
			code: code,
		};
		return this.#sendRequest(body, endpoint, "POST");
	}

	/**
	 * Verify token API, checks tokens sent to customers and returns a response confirming the status of the token. A token can either be confirmed as verified or expired based on the timer set for the token.
	 * @param {string} pin_id (Example: "c8dcd048-5e7f-4347-8c89-4470c3af0b")
	 * @param {string} pin (Example: "195558")
	 * @returns
	 */

	async verifyToken(pin_id, pin) {
		const endpoint = "sms/otp/verify";
		let body = {
			api_key: this.api_key,
			pin_id: pin_id,
			pin: pin,
		};
		return this.#sendRequest(body, endpoint, "POST");
	}

	//Insights API

	/**
	 *
	 * The Balance API returns your total balance and balance information from your wallet, such as currency.
	 *
	 * @returns
	 */

	async getBalance() {
		const endpoint = "get-balance";
		let body = {
			api_key: this.api_key,
		};
		return this.#sendRequest(body, endpoint);
	}

	/**
	 * The search API allows businesses verify phone numbers and automatically detect their status as well as current network. It also tells if the number has activated the do-not-disturb settings.
	 * @param {string} phone_number
	 * @returns
	 */
	async search(phone_number) {
		const endpoint = "check/dnd";
		let body = {
			api_key: this.api_key,
			phone_number: phone_number,
		};
		return this.#sendRequest(body, endpoint);
	}

	/**
	 * The status API allows businesses to detect if a number is fake or has ported to a new network.
	 * @param {string} phone_number
	 * @param {string} country_code Example: NG
	 * @returns
	 */

	async getStatus(phone_number, country_code) {
		const endpoint = "insight/number/query";
		let body = {
			api_key: this.api_key,
			phone_number: phone_number,
			country_code: country_code,
		};
		return this.#sendRequest(body, endpoint);
	}

	/**
	 * This Inbox API returns reports for messages sent across the sms, voice & whatsapp channels. Reports can either display all messages on termii or a single message.
	 * @returns
	 */
	async getHistory() {
		const endpoint = "sms/inbox";
		let body = {
			api_key: this.api_key,
		};
		return this.#sendRequest(body, endpoint);
	}

	//Sender API

	/**
	 * A Sender ID is the name or number that identifies the sender of an SMS message. This API allows businesses retrieve the status of all registered sender ID through GET request type.
	 * @returns
	 */
	async getSenderId() {
		const endpoint = "sender-id";
		let body = {
			api_key: this.api_key,
		};
		return this.#sendRequest(body, endpoint);
	}

	/**
	 * This API allows businesses request registration of sender ID through POST request type.
	 * @param {string} sender_id Represents the ID of the sender which can be alphanumeric or numeric. (Example:Nickelodeon)
	 * @param {string} usecase A sample of the type of message sent. (Example: Your OTP code is zxsds)
	 * @param {string} company Represents the name of the company with the sender ID.
	 * @returns
	 */
	async requestSenderId(sender_id, usecase, company) {
		const endpoint = "sender-id/request";
		let body = {
			api_key: this.api_key,
			sender_id: sender_id,
			usecase: usecase,
			company: company,
		};
		return this.#sendRequest(body, endpoint, "POST");
	}

	//Templates API

	/**
	 * Templates API helps businesses set a template for the one-time-passwords (pins) sent to their customers via whatsapp or sms.
	 * @param {string} phone_number
	 * @param {string} device_id
	 * @param {string} template_id
	 * @param {object} data
	 * @returns
	 */

	async sendTemplate(phone_number, device_id, template_id, data) {
		const endpoint = "send/template";
		let body = {
			phone_number: phone_number,
			device_id: device_id,
			template_id: template_id,
			api_key: this.api_key,
			data: data,
		};
		return this.#sendRequest(body, endpoint, "POST");
	}
};
