import { apiCodes, apiMessages } from "@/constants/api";
import { adminAuth } from "@/firebase/admin";
import verifyIdToken from "@/helpers/routePreCheck";
import { PrismaClient } from "@prisma/client";
import { DecodedIdToken } from "firebase-admin/auth";
import { headers } from 'next/headers'
import { NextResponse, type NextRequest } from "next/server";

/**
 * 
 */
export async function POST(request: NextRequest) {
  let user: DecodedIdToken
  try {
    user = await verifyIdToken(request.headers)
  } catch (error) {
    return NextResponse.json({ data: apiMessages.BEARER_TOKEN_NOT_VALID, code : error }, { status: 400 })
  }

  // body
  let body
  try {
    body = await request.json()
  } catch (error) {
    return NextResponse.json({ data: apiMessages.BAD_REQUEST_BODY_FORMAT, code: apiCodes.WARNING }, { status: 400 })
  }
  
  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: apiMessages.ERROR_CONNECTING_TO_DB, code: error }, { status: 500 })
  }

  // // query
  try {
    const isAlreadyFollowing = await prisma.follower.findMany({
      where: {
        userId: user.uid,
        AND: {
          follows: body.follows
        }
      }
    })
    if (isAlreadyFollowing.length > 0) {
      return NextResponse.json({ data: 'User is already following provider user id', code: apiCodes.WARNING }, { status: 500 })
    }
    
    const follower = await prisma.follower.create({
      data: { userId: user.uid, ...body },
      
    })
    return NextResponse.json({ data: follower, status: apiCodes.SUCCESS })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ data: apiMessages.ERROR_ON_EXECUTING_QUERY, code: error }, { status: 500 })
  }
}

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
    return NextResponse.json({ data: apiMessages.ERROR_CONNECTING_TO_DB, code: error }, { status: 500 })
  }

  // // query
  try {
    const followers = await prisma.follower.findMany({
      where: {
        follows: uid!
      }
    })
    const following = await prisma.follower.findMany({
      where: {
        userId: uid!
      }
    })
    return NextResponse.json({ data: { followers, following }, status: apiCodes.SUCCESS })
  } catch (error) {
    return NextResponse.json({ data: apiMessages.ERROR_ON_EXECUTING_QUERY, code: error }, { status: 500 })
  }
}