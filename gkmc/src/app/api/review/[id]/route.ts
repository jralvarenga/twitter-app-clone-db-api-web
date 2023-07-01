import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.error()
  }

  // query
  try {
    const review = await prisma.review.findUnique({ where: { id: +params.id } })
    return NextResponse.json({ data: review, status: 'success' })
  } catch (error) {
    return NextResponse.error()
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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
    const review = await prisma.review.update({ where: { id: +params.id }, data: { updatedAt: new Date(), ...body } })
    return NextResponse.json({ data: review, status: 'success' })
  } catch (error) {
    return NextResponse.error()
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  // prisma
  const prisma  = new PrismaClient()
  try {
    await prisma.$connect()
  } catch (error) {
    return NextResponse.error()
  }

  // query
  try {
    const review = await prisma.review.delete({ where: { id: +params.id } })
    return NextResponse.json({ data: review, status: 'success' })
  } catch (error) {
    return NextResponse.error()
  }
}