import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

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
    const likes = await prisma.reaction.count({ where: { like: true, AND: { thoughtId: +params.thoughtId } } })
    const dislikes = await prisma.reaction.count({ where: { like: false, AND: { thoughtId: +params.thoughtId } } })
    
    return NextResponse.json({ data: { likes, dislikes }, status: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}