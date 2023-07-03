import { PrismaClient } from "@prisma/client"
import { type NextRequest, NextResponse } from "next/server"

/**
 *
 */
export async function GET(request: NextRequest) {
  // params
  const page = request.url.search('page')

  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: 'Error connecting to server', code: error }, { status: 500 })
  }

  // query
  try {
    const thoughts = await prisma.thought.findMany()
    return NextResponse.json({ data: thoughts, code: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}

/**
 *
 */
export async function POST(request: NextRequest) {
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
    const thought = await prisma.thought.create({
      data: body,
    })
    
    return NextResponse.json({ data: thought, code: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}