const accountSid = 'AC9740b201fca326c7e6a452d205e9915a';
const authToken = '0c8b3e327c067cc4707b4e3f7b8d1a06';
import twilio from 'twilio';
const client = new twilio(accountSid, authToken);
import asyncHandler from 'express-async-handler';

export const sendSms = asyncHandler(async (req, res) => {
	const serviceSid = 'VA13b7b5ab62b07afba42dcf8d1e09d88c'; // Replace with your service SID
	const phoneNumber = '+233591734219';
	const code = 'KKKK';

	client.verify.v2
		.services(serviceSid)
		.verifications.create({ to: phoneNumber, channel: 'sms', code })
		.then((verification) => console.log(verification.status));
});
