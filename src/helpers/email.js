import mailgun from 'mailgun-js';

class MailHelper {
	static connect_mail() {
		return mailgun({
			apiKey: process.env.MAILGUN_API_KEY,
			domain: process.env.MAILGUN_DOMAIN || ''
		});
	}
	static sendMail(to, from, subject, message, callback) {
		const data = {
			to,
			from,
			subject: 'Your Order Status at Turing.',
			text: message,
			html: `<strong>${message}</strong>`,
		};
		return this.connect_mail().messages().send(data, callback);
	}
}

export default MailHelper;
