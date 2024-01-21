import { ApiReponseWithReturn } from "@/app/client/types"
import db from "@/app/server/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

const DEFAULT = {
  rowsPerPage: 10,
  page: 1,
  order: 'desc'
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const sp = Object.fromEntries(searchParams)
  const all = sp.all === 'true' 
  const page = sp.page ? Number(sp.page) : DEFAULT.page
  const rowsPerPage = sp.rowsPerPage ? Number(sp.rowsPerPage) : DEFAULT.rowsPerPage
  const order = sp.order as 'desc' | 'asc' ?? DEFAULT.order
  const user = sp.user
  const post = sp.post

  try {
    const [likes, rowsObtained, totalRows] = await db.$transaction([
      db.like.findMany({
        where: {
          ...(user && {userEmail: user}),
          ...(post && {postSlug: post})
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
          ...(user && {userEmail: user}),
          ...(post && {postSlug: post}),
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
  const { postSlug, userEmail } = await req.json()
  try {
    if(postSlug === undefined || userEmail === undefined) {
      return NextResponse.json({
        ok: false,
        message: 'Invalid request'
      }, {status: 400})
    }
    const [user, post, likeExists] = await db.$transaction([
      db.user.findUnique({
        where: {email: userEmail}
      }),
      db.post.findUnique({
        where: {slug: postSlug}
      }),
      db.like.findFirst({
        where: {postSlug, userEmail}
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
        postSlug,
        userEmail
      },
    })
    console.log(like)
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
    const searchParams = req.nextUrl.searchParams
    const [postSlug, userEmail] = [searchParams.get('postSlug'), searchParams.get('userEmail')]
    if (!postSlug || !userEmail) {
      return NextResponse.json({
        ok: false,
        message: 'Invalid request'
      }, {status: 400})
    }

    const like = await db.like.findFirst({
      where: { postSlug, userEmail }
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