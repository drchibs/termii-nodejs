//const Termii = require("termii-nodejs").Termii;
const Termii = require("../src/termii");

const sender_id = "octopii";
const api_key =
	"TLPMOToGfquQFrPyIddzOS8p5eIWdIK9w8B98ru7yAW3pHoOY80cdWUIG7NpJG";


const termii = new Termii({
	api_key: api_key,
	sender_id: sender_id,
});
const task = termii.getBalance().then((res) => console.log(res));
