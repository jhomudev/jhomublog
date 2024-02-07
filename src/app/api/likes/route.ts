import { ApiReponseWithReturn } from "@client/types"
import db from "@/app/client/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

const DEFAULT = {
  rowsPerPage: 10,
  page: 1,
  order: 'desc'
}

export const dynamic = "force-dynamic"

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const sp = Object.fromEntries(searchParams)
  const all = sp.all === 'true' 
  const page = sp.page ? Number(sp.page) : DEFAULT.page
  const rowsPerPage = sp.rowsPerPage ? Number(sp.rowsPerPage) : DEFAULT.rowsPerPage
  const order = sp.order as 'desc' | 'asc' ?? DEFAULT.order
  const username = sp.user
  const postId = sp.postId

  try {
    const [likes, rowsObtained, totalRows] = await db.$transaction([
      db.like.findMany({
        where: {
          postId,
          user: {username}
        },
        take: all ? undefined : rowsPerPage,
        skip: all ? undefined : rowsPerPage * (page - 1),
        orderBy: {createdAt: order},
        select: {
          id: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              email: true,
              image: true
            }
          },
          post: {
            select: {
              id: true,
              slug: true,
              title: true,
              overview: true,
              img: true,
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
            }
          }
        }
      }),
      db.like.count({
        where: {
          postId,
          user: {username}
        }
      }),
      db.like.count()
    ])

    return NextResponse.json<ApiReponseWithReturn>({
      ok: true,
      message: 'Likes loaded successfully',
      data: likes,
      meta: {
        all,
        page: all ? 1 : page,
        rowsPerPage,
        rowsObtained,
        totalRows
      }
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
  const { postId, username } = await req.json()
  try {
    if(postId === undefined || username === undefined) {
      return NextResponse.json({
        ok: false,
        message: 'Invalid request'
      }, {status: 400})
    }
    const [user, post, likeExists] = await db.$transaction([
      db.user.findUnique({
        where: { username }
      }),
      db.post.findUnique({
        where: { id: postId }
      }),
      db.like.findFirst({
        where: { postId, user: { username } }
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
    if (likeExists) {
      return NextResponse.json({
        ok: false,
        message: 'Like already exists'
      })
    }
    const like = await db.like.create({
      data: {
        postId: postId,
        userId: user.id
      },
    })
    if (like) {
      return NextResponse.json({
        ok: true,
        message: 'Like has been added successfully',
        data: like
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

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl
    const { postId, username } = Object.fromEntries(searchParams)
    
    if (!postId || !username) {
      return NextResponse.json({
        ok: false,
        message: 'Invalid request'
      }, { status: 400 })
    }
    
    const like = await db.like.findFirst({
      where: { postId, user: {username} }
    })
    if(!like) {
      return NextResponse.json({
        ok: false,
        message: 'Like not found'
      }, {status: 404})
    }

    const likeDeleted = await db.like.delete({
      where: {
        id: like.id
      },
      select: {
        id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        post: {
          select: {
            id: true,
            slug: true,
            title: true,
            overview: true,
            img: true,
            createdAt: true
          }
        }
      }
    })

    return NextResponse.json<ApiReponseWithReturn>({
      ok: true,
      message: 'Like deleted successfully',
      data: likeDeleted
    })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok:false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}