import db from "@/app/client/lib/prisma"
import { ApiReponseWithReturn } from "@client/types"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

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
        img: true,
        overview: true,
        content: true,
        views: true,
        tags: true,
        cat: true,
        createdAt: true,
        updatedAt: true,
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

export const PUT = async (req: NextRequest, { params }: { params: { slug: string }}) => {
  const { slug } = params
  const data = await req.json()

  try {
    const postExists = await db.post.findUnique({
      where: { slug },
    })

    if (!postExists) {
      return NextResponse.json({
        ok: false,
        message: 'Post not found',
      }, { status: 404 })
    }
    const post = await db.post.update({
      where: { slug },
      data: { 
        title: data.title,
        slug: data.slug,
        overview: data.overview,
        content: data.content,
        catId: data.catId,
        tags: data.tags,
        img: data.img
      },
    })

    if (post) {
      return NextResponse.json<ApiReponseWithReturn>({
        ok: true,
        message: 'Post updated successfully',
        data: post
      })
    }


    return NextResponse.json({
      ok: false,
      message: 'Internal server error',
    }, { status: 500 })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}

export const DELETE = async (_req: NextRequest, { params }: { params: { slug: string }}) => {
  const { slug } = params
  try {
    const postExists = await db.post.findUnique({
      where: { slug },
    })

    if (!postExists) {
      return NextResponse.json({
        ok: false,
        message: 'Post not found',
      }, { status: 404 })
    }
    const post = await db.post.delete({
      where: { slug },
    })

    if (post) {
      return NextResponse.json<ApiReponseWithReturn>({
        ok: true,
        message: 'Post deleted successfully',
        data: post
      })
    }


    return NextResponse.json({
      ok: false,
      message: 'Internal server error',
    }, { status: 500 })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}