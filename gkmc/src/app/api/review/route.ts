import { apiCodes, apiMessages } from "@/constants/api"
import verifyIdToken from "@/helpers/routePreCheck"
import { PrismaClient } from "@prisma/client"
import { DecodedIdToken } from "firebase-admin/auth"
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
  const page = request.nextUrl.searchParams.get('page')

  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: apiMessages.ERROR_CONNECTING_TO_DB, code : error }, { status: 400 })
  }

  // query
  try {
    const reviews = await prisma.review.findMany()
    return NextResponse.json({ data: reviews, status: apiCodes.SUCCESS })
  } catch (error) {
    return NextResponse.json({ data: apiMessages.ERROR_ON_EXECUTING_QUERY, code: error }, { status: 500 })
  }
}

/**
 *
 */
export async function POST(request: NextRequest) {
  let user: DecodedIdToken
  try {
    user = await verifyIdToken(request.headers)
  } catch (error) {
    return NextResponse.json({ data: 'Provided bearer token is not valid', code : error }, { status: 400 })
  }

  // body
  let body
  try {
    body = await request.json()
  } catch (error) {
    return NextResponse.json({ data: 'The server could not interpret the request, check for malformed values', code : error }, { status: 400 })
  }
  
  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: 'Error connecting to server', code: error }, { status: 500 })
  }

  // query
  try {
    const review = await prisma.review.create({
      data: {
        Thought: {
          create: { userId: user.uid, ...body.thought }
        },
        ...(body.ranking && {
          Ranking: {
            create: { userId: user.uid, ...body.ranking }
          }
        }),
        userId: user.uid,
        ...body.review
      }
    })
    
    return NextResponse.json({ data: review, code: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}