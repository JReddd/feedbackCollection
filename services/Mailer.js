const sendgrid = require('sendgrid');
const { mail } = sendgrid;
const keys = require('../config/keys');

class Mailer extends mail.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new mail.Email('no-replay@emaily.com');
        this.subject = subject;
        this.body = new mail.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        //                       email => email.email
        return recipients.map( ({email}) => {
            return new mail.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new mail.TrackingSettings();
        const clickTracking = new mail.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new mail.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {

        try {
            const request = this.sgApi.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: this.toJSON()
            });

            return await this.sgApi.API(request);
        }catch(err){
            console.log(err.response.body.errors);
        }

    }
}

module.exports = Mailer;