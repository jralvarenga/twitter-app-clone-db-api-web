import { adminAuth } from "@/firebase/admin"
import { type NextRequest, NextResponse } from "next/server"

/**
 * Create user
 */
export async function POST(request: NextRequest) {
  // body
  let body
  try {
    body = await request.json()
  } catch (error) {
    return NextResponse.json({ data: 'The server could not interpret the request, check for malformed values' }, { status: 400 })
  }
  
  try {
    const userRecord = await adminAuth.createUser(body)
    return NextResponse.json({ data: userRecord, code: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}