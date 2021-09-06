//const Termii = require("termii-nodejs").Termii;
const Termii = require("../src/termii");

const sender_id = "octopii";
const api_key =
	"TLPMOToGfquQFrPyIddzOS8p5eIWdIK9w8B98ru7yAW3pHoOY80cdWUIG7NpJG";

const tel = "2348090897046";
const sms = "Hello, World!";

const termii = new Termii({
	api_key: api_key,
	sender_id: sender_id,
	pin_attempts: 4,
});
const task = termii.inAppToken(tel).then((res) => console.log(res));
// const res = termii.inAppToken(tel);
// console.log(res)
