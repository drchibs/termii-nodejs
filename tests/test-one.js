const Termii = require("termii-nodejs").Termii;
//const Termii = require("../src/termii");
const info = require("./info");

const api_key = info.api_key;
const sender_id = info.sender_id;
const tel = "2348090897046";
//send voice call
const voice_code = 144;
//verify token - (change token)
const pin = 8438;
const pin_id ='9ba42323-a074-4688-a8cc-2cd81bf6f051';


const termii = new Termii({
	api_key: api_key,
	sender_id: sender_id,
});

console.log('InApp Token Test');
const task = termii.inAppToken(tel).then((res) => console.log(res));

console.log('Search Test');
const task2 = termii.search(tel).then((res) => console.log(res));

console.log('Send Voice Token');
const task3 = termii.sendVoiceToken(tel).then((res) => console.log(res));

console.log('Send Voice Call');
const task4 = termii.sendVoiceCall(tel, voice_code).then((res) => console.log(res));

console.log('Verify Token');
const task5 = termii.verifyToken(pin_id, pin).then((res) => console.log(res));

console.log('Get Balance');
const task6 = termii.getBalance().then((res) => console.log(res));

console.log('Get Status');
const task7 = termii.getStatus(tel, 'NG').then((res) => console.log(res));

console.log('Get History');
const task8 = termii.getHistory().then((res) => console.log(res));

console.log('Get Sender ID');
const task9 = termii.getSenderId().then((res) => console.log(res));

