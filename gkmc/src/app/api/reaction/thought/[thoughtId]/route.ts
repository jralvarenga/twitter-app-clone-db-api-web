import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

/**
 *
 */
export async function POST(request: NextRequest, { params }: { params: { thoughtId: string } }) {
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

  // query
  try {
    const comment = await prisma.reaction.create({
      data: {
        Thought: {
          connect: {
            id: +params.thoughtId
          }
        },
        ...body
      }
    })
    
    return NextResponse.json({ data: comment, status: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}

/**
 * 
 */
export async function GET(request: NextRequest, { params }: { params: { thoughtId: string } }) {
  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: 'Error connecting to server', code: error }, { status: 500 })
  }

  // query
  try {
    const reactions = await prisma.reaction.findMany({ where: { thoughtId: +params.thoughtId }})
    
    return NextResponse.json({ data: reactions, status: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}