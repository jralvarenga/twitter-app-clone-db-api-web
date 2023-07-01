import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

/**
 * 
 * @param param1 
 * @returns 
 */
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
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
    const thought = await prisma.thought.findUnique({ where: { id: +params.id } })
    return NextResponse.json({ data: thought, status: 'success' })
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}

/**
 * 
 * @param request 
 * @param param1 
 * @returns 
 */
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()

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
    const thought = await prisma.thought.update({ where: { id: +params.id }, data: { updatedAt: new Date(), ...body } })
    return NextResponse.json({ data: thought, status: 'success' })
  } catch (error) {
    console.log(error);
    return NextResponse.error()
  }
}

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
    const thought = await prisma.thought.delete({ where: { id: +params.id } })
    return NextResponse.json({ data: thought, status: 'success' })
  } catch (error) {
    console.log(error);
    return NextResponse.error()
  }
}