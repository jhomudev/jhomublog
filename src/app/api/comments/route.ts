import db from "@/app/server/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const slug = searchParams.get('postSlug')
  try {
    const comments = await db.comment.findMany({
      where: {
        ...(slug && { postSlug: slug })
      },
      select: {
        id: true,
        desc: true,
        postSlug: true,
        createdAt: true,
        user: {
          select: {
            id: true,
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
  const {desc, userEmail, postSlug} = await req.json()
  try {
    const [user, post] = await db.$transaction([
      db.user.findUnique({
        where: {email: userEmail}
      }),
      db.post.findUnique({
        where: {slug: postSlug}
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

    const comment = await db.comment.create({
      data: {
        desc,
        userEmail,
        postSlug
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