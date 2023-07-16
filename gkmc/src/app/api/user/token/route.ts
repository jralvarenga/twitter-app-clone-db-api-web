import { adminAuth } from "@/firebase/admin"
import { type NextRequest, NextResponse } from "next/server"

/**
 * Token
 */
export async function GET(request: NextRequest) {
  // params
  const uid = request.nextUrl.searchParams.get('uid')

  if (!uid) {
    return NextResponse.json({ data: 'uid param is required for this route', code: 'error' }, { status: 500 })
  }
  
  try {
    const token = await adminAuth.createCustomToken(uid)
    return NextResponse.json({ data: token, code: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}