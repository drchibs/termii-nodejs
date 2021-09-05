const Termii = require("termii-nodejs").Termii;

const sender_id = "octopii";
const api_key =
	"TLPMOToGfquQFrPyIddzOS8p5eIWdIK9w8B98ru7yAW3pHoOY80cdWUIG7NpJG";

const tel = "2348090897046";
const sms = "Hello, World!";

const termii = new Termii(sender_id, api_key).sendMessage(tel, sms);
console.log(termii);
