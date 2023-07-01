import { PrismaClient } from "@prisma/client"
import { type NextRequest, NextResponse } from "next/server"

/**
 * 
 * @param request 
 * @returns 
 */
export async function GET(request: NextRequest) {
  // params
  const page = request.url.search('page')

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
    const thoughts = await prisma.thought.findMany()
    return NextResponse.json({ data: thoughts, status: 'success' })
  } catch (error) {
    console.log(error);
    return NextResponse.error()
  }
}

/**
 * 
 * @param request 
 * @returns 
 */
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
    const thought = await prisma.thought.create({
      data: body,
    })
    
    return NextResponse.json({ data: thought, status: 'success' })
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}