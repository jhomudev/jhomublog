import db from "@/app/client/lib/prisma"
import { ApiReponseWithReturn } from "@client/types"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async (req: NextRequest, { params }: { params: { slug: string }}) => {
  const { slug } = params
  const { searchParams } = req.nextUrl
  const username = searchParams.get('user')

  try {
    const post = await db.post.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        title: true,
        views: true,
        _count: {
          select: {
            likes: true,
            comments: true
          }
        },
      }
    })

    if (!post) {
      return NextResponse.json({
        ok: false,
        message: 'Post not found',
      }, { status: 404 })
    }

    if (username) {
      const [bookmarkByUser, likeByUser] = await db.$transaction([
        db.bookmark.findFirst({
          where: {
            postId: post.id,
            user: {username}
          }
        }),
        db.like.findFirst({
          where: {
            postId: post.id,
            user: {username}
          }
        })
      ])

      return NextResponse.json<ApiReponseWithReturn>({
        ok: true,
        message: 'Post info fetched successfully',
        data: {
          ...post,
          byUser: {
            bookmarked: !!bookmarkByUser,
            liked: !!likeByUser
          }
        }
      })
    }

    
    return NextResponse.json<ApiReponseWithReturn>({
      ok: true,
      message: 'Post info fetched successfully',
      data: post
    })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}