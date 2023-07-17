import { adminAuth } from "@/firebase/admin"
import { clientAuth } from "@/firebase/client"
import { signInWithEmailAndPassword } from "firebase/auth"
import { type NextRequest, NextResponse } from "next/server"

/**
 * Token
 */
export async function GET(request: NextRequest) {
  // params
  const email = request.nextUrl.searchParams.get('email')
  const password = request.nextUrl.searchParams.get('password')


  if (!email || !password) {
    return NextResponse.json({ data: 'uid param is required for this route', code: 'error' }, { status: 500 })
  }
  
  try {
    const user = await signInWithEmailAndPassword(clientAuth(), email, password)
    const token = await user.user.getIdToken()
    return NextResponse.json({ data: token, code: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}