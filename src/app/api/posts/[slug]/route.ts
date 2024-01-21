import db from "@/app/server/libs/prisma"
import { ApiReponseWithReturn } from "@/app/client/types"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (_req: NextRequest, { params }: { params: { slug: string }}) => {
  const { slug } = params
  try {
    const post = await db.post.update({
      where: { slug },
      data:{ views: { increment: 1 } },
      select: {
        _count: {
          select: {
            likes: true,
            comments: true
          }
        },
        id: true,
        slug: true,
        title: true,
        overview: true,
        content: true,
        views: true,
        tags: true,
        cat: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    })

    if (post) {
      return NextResponse.json<ApiReponseWithReturn>({
        ok: true,
        message: 'Post fetched successfully',
        data: post
      })
    }

    return NextResponse.json({
      ok: false,
      message: 'Post not found',
    }, { status: 404 })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}