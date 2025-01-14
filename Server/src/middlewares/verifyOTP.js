const accountSid = 'ACbc1a46bebb45cfcdeaa0b516f6c84da4';
const authToken = 'cb65416562df3f9fd7b85916b5dfe557';
const client = require('twilio')(accountSid, authToken);

client.verify.v2.services("VA1573c7a349d3bbeed1c2bcc8e70a3091")
      .verifications
      .create({to: '+2330202011311', channel: 'sms'})
      .then(verification => console.log(verification.sid));