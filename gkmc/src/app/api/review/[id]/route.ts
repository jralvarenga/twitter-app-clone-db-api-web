import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

/**
 *
 */
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.json({ data: 'Error connecting to server', code: error }, { status: 500 })
  }

  // query
  try {
    const review = await prisma.review.findUnique({ where: { id: +params.id } })
    return NextResponse.json({ data: review, code: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}

/**
 * 
 */
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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
    const review = await prisma.review.update({ where: { id: +params.id }, data: { updatedAt: new Date(), ...body } })
    return NextResponse.json({ data: review, code: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}

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
    const review = await prisma.review.delete({ where: { id: +params.id } })
    return NextResponse.json({ data: review, code: 'success' })
  } catch (error) {
    return NextResponse.json({ data: 'Error while executing action', code: error }, { status: 500 })
  }
}