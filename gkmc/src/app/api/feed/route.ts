import { apiCodes, apiMessages } from "@/constants/api"
import { adminAuth } from "@/firebase/admin"
import verifyIdToken from "@/helpers/routePreCheck"
import { PrismaClient } from "@prisma/client"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
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
    const thoughts = await prisma.thought.findMany({
      select: {
        content: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            comments: true,
            Quote: true,
            reactions: {
              where: { like: true }
            }
          }
        },
        Review: {
          select: {
            rate: true
          }
        }
      },
      where: {
        userId: {
          not: ''
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    const response = await Promise.all(
      thoughts.map(async (thought) => {
        const user = await adminAuth.getUser(thought.userId)
        return {
          content: thought.content,
          user: {
            name: user.displayName,
            email: user.email,
            user: ''
          },
          rate: thought.Review.length > 0 ? thought.Review[0].rate : null,
          reactions: {
            likes: thought._count.reactions,
            dislikes: 0,
          },
          comments: thought._count.comments,
          quotes: thought._count.Quote,
          createdAt: thought.createdAt,
          updatedAt: thought.updatedAt
        }
      })
    )
    
    await prisma.$disconnect()
    return NextResponse.json({ data: response, code: apiCodes.SUCCESS })
  } catch (error) {
    await prisma.$disconnect()
    return NextResponse.json({ data: apiMessages.ERROR_ON_EXECUTING_QUERY, code: error }, { status: 500 })
  }
}