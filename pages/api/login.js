import { magic } from 'lib/magicAdmin';
import { setLoginSession, getLoginSession } from 'lib/auth'
import { getTokenCookie } from 'lib/auth-cookies'
/**
 * Use Magic to validate the DID token sent in the Autorization header
 * Create JWT containing info about the user
 * Set it inside a cookie, which will be automatically sent on subsequent requests to our server
 * Return the user data to frontend
 */
export default async function login(req, res) {
  try {
    const didToken = req.headers.authorization.substr(7);

    await magic.token.validate(didToken);

    const metadata = await magic.users.getMetadataByToken(didToken);

    //get user and access code from db and set access code as session

    await setLoginSession(res, { ...metadata }, 'auth_cookie_name');

    res.status(200).send({ user: metadata });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
