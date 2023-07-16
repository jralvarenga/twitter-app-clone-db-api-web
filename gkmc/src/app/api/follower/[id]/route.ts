import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

/**
 * 
 */
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  
  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: 'Error connecting to server', code: error }, { status: 500 })
  }

  // // query
  try {
    const follower = await prisma.follower.delete({
      where: {
        id: +params.id
      }
    })
    return NextResponse.json({ data: follower, status: 'success' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}