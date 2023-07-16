import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

/**
 * 
 */
export async function GET(request: NextRequest) {
  // params
  const uid = request.nextUrl.searchParams.get('uid')
  
  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: 'Error connecting to server', code: error }, { status: 500 })
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
    return NextResponse.json({ data: { followers, following }, status: 'success' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}