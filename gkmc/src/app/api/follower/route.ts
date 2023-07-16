import { PrismaClient } from "@prisma/client";
import jwtDecode from "jwt-decode";
import { headers } from "next/dist/client/components/headers";
import { NextResponse, type NextRequest } from "next/server";

/**
 * 
 */
export async function POST(request: NextRequest) {
  // headers
  const headersList = headers()
  const auth = headersList.get('Authorization')
  const token = auth?.split(' ')[1]

  let user
  try {
    user = await jwtDecode(token!)
  } catch (error) {
    return NextResponse.json({ data: 'Error connecting to server', code: error }, { status: 500 })
  }

  // body
  let body
  try {
    body = await request.json()
  } catch (error) {
    return NextResponse.json({ data: 'The server could not interpret the request, check for malformed values' }, { status: 400 })
  }
  
  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: 'Error connecting to server', code: error }, { status: 500 })
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
      return NextResponse.json({ data: 'User is already following provider user id', code: 'error' }, { status: 500 })
    }
    
    const follower = await prisma.follower.create({
      data: { userId: user.uid, ...body },
      
    })
    return NextResponse.json({ data: follower, status: 'success' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
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
    return NextResponse.json({ data: 'Error connecting to server', code: error }, { status: 500 })
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
    return NextResponse.json({ data: { followers, following }, status: 'success' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}