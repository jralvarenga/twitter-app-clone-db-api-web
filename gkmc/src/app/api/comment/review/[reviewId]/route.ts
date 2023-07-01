import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

/**
 * 
 * @param request 
 * @param param1 
 * @returns 
 */
export async function POST(request: NextRequest, { params }: { params: { reviewId: string } }) {
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
        Review: {
          connect: { id: +params.reviewId }
        }
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
export async function GET(_: NextRequest, { params }: { params: { reviewId: string } }) {
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
    const comments = await prisma.comment.findMany({ where: { reviewId: +params.reviewId }})
    
    return NextResponse.json({ data: comments, status: 'success' })
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}