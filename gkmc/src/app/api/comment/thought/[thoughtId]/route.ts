import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

/**
 * 
 * @param request 
 * @param param1 
 * @returns 
 */
export async function POST(request: NextRequest, { params }: { params: { thoughtId: string } }) {
  // body
  const body = await request.json()

  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }

  // query
  try {
    const comment = await prisma.comment.create({
      data: {
        Thought: {
          create: body
        },
        replyOf: +params.thoughtId
      },
    })
    
    return NextResponse.json({ data: comment, status: 'success' })
  } catch (error) {
    console.log(error)
    return NextResponse.error()
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
    console.log(error)
    return NextResponse.error()
  }

  // query
  try {
    const comments = await prisma.comment.findMany({ where: { replyOf: +params.thoughtId }})
    
    return NextResponse.json({ data: comments, status: 'success' })
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}