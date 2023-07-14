import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

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

  // query
  try {
    const comment = await prisma.comment.delete({ where: { id: +params.id } })
    return NextResponse.json({ data: comment, code: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}