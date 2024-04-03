import db from "@/app/client/lib/prisma"
import { ApiReponseWithReturn } from "@/app/client/types"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async () => {
  try {
    const posts= await db.post.findMany({
      take: 5,
      orderBy: {
        views: 'desc'
      },
      select: {
        _count: {
          select: {
            likes: true
          }
        },
        id: true,
        slug: true,
        title: true,
        overview: true,
        img: true,
        views: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
        cat: true,
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    })

    return NextResponse.json<ApiReponseWithReturn>({
      ok: true,
      message: 'Posts loaded successfully',
      data: posts,
    })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}
