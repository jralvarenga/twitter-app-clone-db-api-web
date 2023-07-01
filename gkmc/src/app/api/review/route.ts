import { PrismaClient } from "@prisma/client"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // params
  const page = request.url.search('page')

  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.error()
  }

  // query
  try {
    const reviews = await prisma.review.findMany()
    return NextResponse.json({ data: reviews, status: 'success' })
  } catch (error) {
    return NextResponse.error()
  }
}

export async function POST(request: NextRequest) {
  // body
  const body = await request.json()
  
  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.error()
  }

  // query
  try {
    const review = await prisma.review.create({
      data: body,
    })
    
    return NextResponse.json({ data: review, status: 'success' })
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}