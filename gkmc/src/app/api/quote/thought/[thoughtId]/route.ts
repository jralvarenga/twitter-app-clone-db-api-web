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
    return NextResponse.json({ data: apiMessages.BAD_REQUEST_BODY_FORMAT, code: apiCodes.WARNING }, { status: 400 })
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
    const comment = await prisma.quote.create({
      data: {
        Thought: {
          create: {
            userId: user.uid,
            ...body
          }
        },
        QuoteOfThought: {
          create: {
            Thought: {
              connect: { id: +params.thoughtId }
            }
          }
        }
      },
    })
    
    return NextResponse.json({ data: comment, status: apiCodes.SUCCESS })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
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
    const comments = await prisma.quote.findMany({ where: { quoteOfThoughtId: +params.thoughtId }})
    
    return NextResponse.json({ data: comments, status: apiCodes.SUCCESS })
  } catch (error) {
    return NextResponse.json({ data: apiMessages.ERROR_ON_EXECUTING_QUERY, code: error }, { status: 500 })
  }
}