import { apiCodes } from "@/constants/api"
import { adminAuth } from "@/firebase/admin"
import { DecodedIdToken } from "firebase-admin/auth"

/**
 * Pre-checks info on user request
 * - auth
 */
const routePreCheck = async (headers: Headers): Promise<DecodedIdToken> => await new Promise(async (res, rej) => {
  const authorization = headers.get('authorization')
  const token = authorization?.split(' ')[1]

  try {
    const user = await adminAuth.verifyIdToken(token!)
    res(user)
  } catch (error) {
    rej(apiCodes.INVALID_TOKEN)
  }
})

export default routePreCheck