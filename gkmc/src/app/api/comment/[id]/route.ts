import { apiCodes, apiMessages } from "@/constants/api";
import verifyIdToken from "@/helpers/routePreCheck";
import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

/**
 *
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await verifyIdToken(request.headers)
  } catch (error) {
    return NextResponse.json({ data: apiMessages.BEARER_TOKEN_NOT_VALID, code : error }, { status: 400 })
  }

  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: apiMessages.ERROR_CONNECTING_TO_DB, code: error }, { status: 500 })
  }

  // query
  try {
    const comment = await prisma.comment.delete({ where: { id: +params.id } })
    return NextResponse.json({ data: comment, code: apiCodes.SUCCESS })
  } catch (error) {
    return NextResponse.json({ data: apiMessages.ERROR_ON_EXECUTING_QUERY, code: error }, { status: 500 })
  }
}