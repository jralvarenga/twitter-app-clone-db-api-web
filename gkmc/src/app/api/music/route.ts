import { PrismaClient } from "@prisma/client"
import { type NextRequest, NextResponse } from "next/server"

/**
 *
 */
export async function GET(request: NextRequest) {
  // params
  const type = request.nextUrl.searchParams.get('type')

  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: 'The server could not interpret the request, check for malformed values', code : error }, { status: 400 })
  }

  // query
  try {
    if (type) {
      const music = await prisma.music.findMany({ where: { type: type } })
      return NextResponse.json({ data: music, status: 'success' })
    }

    const music = await prisma.music.findMany()
    return NextResponse.json({ data: music, status: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}