# Termii NodeJS SDK

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

![Termii](/images/termii.png "Termii")

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

[Refer to the official Termii Docs](https://www.developers.termii.com/)

# Advanced Usage
## Options
You can have full control when you create a new instance of the __Termii__ class
Not all options are needed for every request, refer to the Docs and see what is required for the resources you need.

```javascript
new Termii({
	api_key: api_key,
	sender_id: sender_id,
	channel: "generic",
	message_type: "plain",
	pin_attempts: 2,
	pin_time: 1,
	pin_length: 6,
	pin_type: "NUMERIC"
});
```

# License

[MIT](https://github.com/drchibs/termii-nodejs/blob/main/LICENSE)
