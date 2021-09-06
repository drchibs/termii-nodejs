//const Termii = require("termii-nodejs").Termii;
const Termii = require("../src/termii");

const sender_id = "octopii";
const api_key =
	"TLPMOToGfquQFrPyIddzOS8p5eIWdIK9w8B98ru7yAW3pHoOY80cdWUIG7NpJG";

const tel = "2348090897047";
const sms = "Hello, World!";

const termii = new Termii(sender_id, api_key);
const task = termii.inAppToken(tel).then(res => console.log(res));
// const res = termii.inAppToken(tel);
// console.log(res)