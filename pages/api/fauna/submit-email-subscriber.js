import isEmail from 'validator/lib/isEmail'
import { createContact } from 'lib/fauna'

const isString = i => typeof i === 'string'

export default async function handler(req, res) {
  console.log('in submit email function', req.body)

  const { email } = req.body
  try {
    if (!email) throw { message: "Email is required" }
    if (!isString(email)) throw { message: 'Email must be a string' }
    if (!isEmail(email.trim())) throw { message: 'Email must be a valid email' }

    const faunares = await createContact({
      email: email.trim(),
      secret: process.env.FAUNA_FORMS_SUBMIT,
    })

    console.log('create subscriber fauna resonse', faunares)

    res.status(200).send('success')

  } catch (error) {
    console.log('ERROR MOTHERFUCKER: ', error);
    res.status(400).json({ error })
  }
}