import { apiCodes, apiMessages } from "@/constants/api"
import verifyIdToken from "@/helpers/routePreCheck"
import { PrismaClient } from "@prisma/client"
import { type NextRequest, NextResponse } from "next/server"

/**
 *
 */
export async function GET(request: NextRequest) {
  try {
    await verifyIdToken(request.headers)
  } catch (error) {
    return NextResponse.json({ data: apiMessages.BEARER_TOKEN_NOT_VALID, code : error }, { status: 400 })
  }

  // params
  const type = request.nextUrl.searchParams.get('type')

  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: apiMessages.BAD_REQUEST_BODY_FORMAT, code : error }, { status: 400 })
  }

  // query
  try {
    if (type) {
      const music = await prisma.music.findMany({ where: { type: type } })
      return NextResponse.json({ data: music, status: apiCodes.SUCCESS })
    }

    const music = await prisma.music.findMany()
    return NextResponse.json({ data: music, status: apiCodes.SUCCESS })
  } catch (error) {
    return NextResponse.json({ data: apiMessages.ERROR_ON_EXECUTING_QUERY, code: error }, { status: 500 })
  }
}