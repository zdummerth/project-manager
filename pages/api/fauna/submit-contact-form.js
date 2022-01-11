import isEmail from 'validator/lib/isEmail'
import { createFormSubmission } from 'lib/fauna'
import { sendEmail } from 'lib/sendgrid'

const isString = i => typeof i === 'string'


export default async function handler(req, res) {
  console.log('in submit email function', req.body)

  const { email, name, message } = req.body
  try {
    if (!email) throw new Error('Email is required')
    if (!isString(email)) throw new Error('Email must be a string')
    if (!isEmail(email.trim())) throw new Error('Email must be a valid email')

    const faunares = await createFormSubmission({
      email: email.trim(),
      name,
      message,
      secret: process.env.FAUNA_FORMS_SUBMIT,
    })

    console.log('create subscriber fauna response', faunares)

    const msg = {
      from: {
        email: process.env.OUTGOING_EMAIL_ADDRESS,
        name: 'Dark Ace Apparel'
      },
      replyTo: {
        email: email.trim()
      },
      personalizations: [{
        to: [
          {
            email: process.env.SITE_ADMIN_CONTACT_EMAIL,
          },
        ],
        bcc: [
          {
            email: process.env.INCOMING_EMAIL_ADDRESS,
          }
        ],
        "dynamic_template_data": {
          message,
          formId: faunares.createFormSubmission._id,
          name
        }
      }],
      "template_id": "d-91bec6822c794fe38656b4781621f3f0"
    }

    const response = await sendEmail(msg)
    console.log('response', response)

    res.status(200).send('success')

  } catch (error) {
    console.log('ERROR MOTHERFUCKER: ', error.response.body);
    res.status(400).json({ error })
  }
}