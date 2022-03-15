# Termii NodeJS SDK

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)


![Termii](/images/termii.png "Termii")

[![npm version](https://badge.fury.io/js/termii-nodejs.svg)](https://badge.fury.io/js/termii-nodejs)
[![GitHub version](https://badge.fury.io/gh/drchibs%2Ftermii-nodejs.svg)](https://badge.fury.io/gh/drchibs%2Ftermii-nodejs)

# Installation

You can install the package via npm:

```bash
npm i termii-nodejs
```

# Usage:

## Loading and configuring the module

```javascript
const Termii = require("termii-nodejs").Termii;
```

## Creating an Instance of the SDK:

```javascript
const sender_id = "YOUR_SENDER_ID";
const api_key = "YOUR_API_KEY";

const termii = new Termii({
	api_key: api_key,
	sender_id: sender_id,
});
```

## Basic Usage
```javascript
const request = termii.getBalance().then((res) => console.log(res));
```
There you go! 🍭

# Documentation

👉🏿 [Refer to the official Termii Docs](https://www.developers.termii.com/)

# APIs

This is a list of methods available in this SDK according to the official APIs

## Insights API

- `getBalance()`
- `search(phone_number)`
- `getStatus(phone_number, country_code)`
- `getHistory()`

## Messaging API

- `sendMessage(recipient, message)`

## Number API

- `sendMessageWithAutomatedNumber(recipient, message)`

## Token API

- `inAppToken(phone_number)`
- `sendToken(phone_number, pin_placeholder, message_text)`
- `sendVoiceToken(phone_number)`
- `sendVoiceCall(phone_number, code)`
- `verifyToken(pin_id, pin)`

## Sender ID API

- `getSenderId()`
- `requestSenderId(sender_id, usecase, company)`

## Templates API

- `sendTemplate(phone_number, device_id, template_id, data)`

## Campaign API


Not Yet Available.



# Advanced Usage
## Options
You can have full control when you create a new instance of the `Termii` class.
> Not all options are needed for every request, [refer to the Docs](https://www.developers.termii.com/) and see what is required for the resources you need.

```javascript
new Termii({
	api_key: api_key,
	sender_id: sender_id,
	channel: "generic",
	pin_attempts: 2,
	pin_time: 1,
	pin_length: 6,
	pin_type: "NUMERIC"
});
```
- `channel` : Route through which the message is sent. It is either `dnd`, `WhatsApp`, or `generic`.
- `pin_time` : Validity of pin before expiration in minutes and default is `1`.
- `pin_length` : Length of the PIN code. Default is `4`.
- `pin_attempts` : Nnumber of times the PIN can be attempted.
- `pin_type` : `NUMERIC` or `ALPHANUMERIC`


# License

[MIT](https://github.com/drchibs/termii-nodejs/blob/main/LICENSE)
