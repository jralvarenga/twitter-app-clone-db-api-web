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
    const comment = await prisma.comment.create({
      data: {
        Thought: {
          create: body
        },
        CommentOfThought: {
          create: {
            Thought: {
              connect: { id: +params.thoughtId }
            }
          }
        }
      },
    })
    
    return NextResponse.json({ data: comment, status: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}

/**
 * 
 */
export async function GET(_: NextRequest, { params }: { params: { thoughtId: string } }) {
  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: 'Error connecting to server', code: error }, { status: 500 })
  }

  // query
  try {
    const comments = await prisma.comment.findMany({ where: { commentOfThoughtId: +params.thoughtId }})
    
    return NextResponse.json({ data: comments, status: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}