import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

/**
 * 
 * @param _ 
 * @param param1 
 * @returns 
 */
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    console.log(error);
    return NextResponse.error()
  }

  // query
  try {
    const comment = await prisma.comment.delete({ where: { id: +params.id } })
    return NextResponse.json({ data: comment, status: 'success' })
  } catch (error) {
    console.log(error);
    return NextResponse.error()
  }
}