import { apiCodes, apiMessages } from "@/constants/api";
import verifyIdToken from "@/helpers/routePreCheck";
import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

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
  const uid = request.nextUrl.searchParams.get('uid')
  
  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: apiMessages.ERROR_CONNECTING_TO_DB, code: error }, { status: 500 })
  }

  // // query
  try {
    const followers = await prisma.follower.count({
      where: {
        follows: uid!
      }
    })
    const following = await prisma.follower.count({
      where: {
        userId: uid!
      }
    })
    return NextResponse.json({ data: { followers, following }, status: apiCodes.SUCCESS })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ data: apiMessages.ERROR_CONNECTING_TO_DB, code: error }, { status: 500 })
  }
}