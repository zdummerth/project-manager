// import * as jose from 'jose'


// const secret = await generateSecret('HS512')
// console.log(secret)

// const encodeBuffer = buffer => buffer.toString('base64')
// const encodeString = string => encodeBuffer(Buffer.from(string))
// const encodeData = data => encodeString(JSON.stringify(data))

// const encode = (data) => {
//     if (Buffer.isBuffer(data)) return encodeBuffer(data)
//     if (typeof data === 'string') return encodeString(data)
//     return encodeData(data)
// }

// const decode = (payload) => {
//     /*
//         typeof payload: Uint8Array
//     */
//     // console.log('original payload: ', payload)
//     const base64String = Buffer.from(payload).toString()
//     const decoded = Buffer.from(base64String, 'base64').toString()
//     try {
//         return JSON.parse(decoded)
//     } catch (e) {
//         return decoded
//     }
// }

// const formatSymmetricKey = async (key, use) => {
//     return await parseJwk({
//         kty: 'oct',
//         use,
//         alg: 'HS512',
//         k: key
//     })
// }

export const signJWT = async (payload, secret) => {
    // const key = await formatSymmetricKey(secret, 'sig')
    // return await new jose.CompactSign(encode(payload))
    //     .setProtectedHeader({ alg: 'HS512' })
    //     .sign(key)

    return 'signed'
}

// export const verifyJWT = async (jwt, secret) => {
//     const key = await formatSymmetricKey(secret, 'enc')
//     const { payload } = await CompactVerify(jwt, key)
//     return {
//         payload: decode(payload)
//     }


// }

// export const encryptJWT = async (jwt, secret) => {
//     const key = await formatSymmetricKey(secret, 'enc')
//     return await new CompactEncrypt(encode(jwt))
//         .setProtectedHeader({ alg: 'dir', enc: 'A256CBC-HS512' })
//         .encrypt(key)
// }

// export const decryptJWT = async (jwt, secret) => {
//     /*
//         returns {
//             plaintext: Uint8array
//             protectedHeader: object
//         }
//     */
//     const key = await formatSymmetricKey(secret, 'enc')
//     const { plaintext } = await CompactDecrypt(jwt, key)
//     return {
//         plaintext: decode(plaintext)
//     }
// }

// export const signAndEncryptJWT = async (payload, ssecret, esecret) => {
//     const signedJWT = await signJWT(payload, ssecret)
//     return await encryptJWT(signedJWT, esecret)
// }

// export const decryptAndVerifyJWT = async (jwe, ssecret, esecret) => {
//     const { plaintext } = await decryptJWT(jwe, esecret)
//     return await verifyJWT(plaintext, ssecret)
// }



