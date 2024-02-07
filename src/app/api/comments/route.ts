import db from "@/app/client/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const { postId } = Object.fromEntries(searchParams)
  
  try {
    const comments = await db.comment.findMany({
      where: {
        ...(postId && { postId })
      },
      select: {
        id: true,
        desc: true,
        postId: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (comments) {
      return NextResponse.json({
        ok: true,
        message: 'Comments fetched successfully',
        data: comments
      })
    }

    return NextResponse.json({
      ok: false,
      message: 'Post not found',
    })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}

export const POST = async (req: NextRequest) => {
  const {desc, userId, postId} = await req.json()
  try {
    const [user, post, alreadyExist] = await db.$transaction([
      db.user.findUnique({
        where: {id: userId}
      }),
      db.post.findUnique({
        where: {id: postId}
      }),
      db.comment.findFirst({
        where: {postId, userId}
      })
    ])
    if (!user) {
      return NextResponse.json({
        ok: false,
        message: 'User not found'
      }, {status: 400})
    }
    if (!post) {
      return NextResponse.json({
        ok: false,
        message: 'Post not found'
      }, {status: 400})
    }
    if (alreadyExist) {
      return NextResponse.json({
        ok: false,
        message: 'Already commented'
      }, {status: 400})
    }

    const comment = await db.comment.create({
      data: {
        desc,
        userId: user.id,
        postId
      }
    })

    if (comment) {
      return NextResponse.json({
        ok: true,
        message: 'Comment has been created successfully',
        data: comment
      })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}