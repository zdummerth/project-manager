import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendEmail = (msg) => new Promise((resolve, reject) => {
    sgMail
        .send(msg)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            reject(error)
        })
});