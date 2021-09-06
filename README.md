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

```bash
const Termii = require("termii-nodejs").Termii;
```

# Creating an Instance of the SDK:

```javascript
const sender_id = "YOUR_SENDER_ID";
const api_key = "YOUR_API_KEY";
const termii = new Termii({
	api_key: api_key,
	sender_id: sender_id,
});
```

# License

[MIT](https://github.com/drchibs/termii-nodejs/blob/main/LICENSE)
