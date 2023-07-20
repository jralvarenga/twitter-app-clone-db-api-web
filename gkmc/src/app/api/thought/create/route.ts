import { apiCodes, apiMessages } from "@/constants/api"
import verifyIdToken from "@/helpers/routePreCheck"
import { PrismaClient } from "@prisma/client"
import { DecodedIdToken } from "firebase-admin/auth"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  // check auth token
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
    return NextResponse.json({ data: apiMessages.BAD_REQUEST_BODY_FORMAT }, { status: 400 })
  }

  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: apiMessages.ERROR_CONNECTING_TO_DB, code: error }, { status: 500 })
  }

  // query
  try {
    const thought = await prisma.thought.create({
      data: {
        userId: user.uid,
        content: body.content,
        ...(body.review && {
          Review: {
            create: {
              userId: user.uid,
              rate: body.review.ranking,
              reviewOf: {
                ...body.reviewOf
              }
            }
          }
        })
      }
    })
    await prisma.$disconnect()
    return NextResponse.json({ data: thought, code: apiCodes.SUCCESS })
  } catch (error) {
    await prisma.$disconnect()
    return NextResponse.json({ data: apiMessages.ERROR_ON_EXECUTING_QUERY, code: error }, { status: 500 })
  }
}