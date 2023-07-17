import { apiCodes, apiMessages } from "@/constants/api";
import verifyIdToken from "@/helpers/routePreCheck";
import { PrismaClient } from "@prisma/client";
import { DecodedIdToken } from "firebase-admin/auth";
import { NextResponse, type NextRequest } from "next/server";

/**
 *
 */
export async function POST(request: NextRequest, { params }: { params: { thoughtId: string } }) {
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
    return NextResponse.json({ data: apiMessages.BAD_REQUEST_BODY_FORMAT, code: apiCodes.ERROR }, { status: 400 })
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
    const alreadyHasLike = await prisma.reaction.count({
      where: {
        userId: user.uid,
        AND: {
          thoughtId: +params.thoughtId
        }
      }
    })

    if (alreadyHasLike > 0) {
      return NextResponse.json({ data: 'User already liked this thought', code: apiCodes.WARNING }, { status: 500 })
    }

    const reaction = await prisma.reaction.create({
      data: {
        Thought: {
          connect: {
            id: +params.thoughtId
          }
        },
        userId: user.uid,
        ...body
      }
    })
    
    return NextResponse.json({ data: reaction, status: apiCodes.SUCCESS })
  } catch (error) {
    return NextResponse.json({ data: apiMessages.ERROR_ON_EXECUTING_QUERY, code: error }, { status: 500 })
  }
}

/**
 * 
 */
export async function GET(request: NextRequest, { params }: { params: { thoughtId: string } }) {
  try {
    await verifyIdToken(request.headers)
  } catch (error) {
    return NextResponse.json({ data: apiMessages.BEARER_TOKEN_NOT_VALID, code : error }, { status: 400 })
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
    const reactions = await prisma.reaction.findMany({ where: { thoughtId: +params.thoughtId }})
    
    return NextResponse.json({ data: reactions, status: apiCodes.SUCCESS })
  } catch (error) {
    return NextResponse.json({ data: apiMessages.ERROR_ON_EXECUTING_QUERY, code: error }, { status: 500 })
  }
}