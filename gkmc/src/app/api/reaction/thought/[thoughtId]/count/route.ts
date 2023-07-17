import { apiCodes, apiMessages } from "@/constants/api";
import verifyIdToken from "@/helpers/routePreCheck";
import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

/**
 * 
 */
export async function GET(request: NextRequest, { params }: { params: { thoughtId: string } }) {
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
    const likes = await prisma.reaction.count({ where: { like: true, AND: { thoughtId: +params.thoughtId } } })
    const dislikes = await prisma.reaction.count({ where: { like: false, AND: { thoughtId: +params.thoughtId } } })
    
    return NextResponse.json({ data: { likes, dislikes }, status: apiCodes.SUCCESS })
  } catch (error) {
    return NextResponse.json({ data: apiMessages.ERROR_ON_EXECUTING_QUERY, code: error }, { status: 500 })
  }
}