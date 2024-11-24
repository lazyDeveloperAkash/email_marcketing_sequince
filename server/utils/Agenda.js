const Agenda = require('agenda');
const { sendEmail } = require('./gmailSevice');

const agenda = new Agenda({ db: { address: process.env.MONGO_URI, collection: 'jobs' } });

// Define the job for sending email
agenda.define('send-email', async (job) => {
  const { email, subject, body } = job.attrs.data;
  try {
    await sendEmail(emai, subject, body);
    return true;
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
    return false;
  }
});

// Start Agenda
(async function () {
  await agenda.start();
  console.log('Agenda started');
})();

module.exports = agenda;
