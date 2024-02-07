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

  try {
    if (username) {
      const existUser = await db.user.findUnique({
        where: {username}
      })

      if (!existUser) {
        return NextResponse.json({
          ok: false,
          message: 'User not found'
        }, { status: 400 })
      }
    }

    const [bookmarks, rowsObtained, totalRows] = await db.$transaction([
      db.bookmark.findMany({
        where: {
          user: { username }
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
      db.bookmark.count({
        where: {
          user: {username}
        }
      }),
      db.bookmark.count()
    ])

    return NextResponse.json<ApiReponseWithReturn>({
      ok: true,
      message: 'Bookmarks loaded successfully',
      data: bookmarks,
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
  const {postId, username} = await req.json()
  try {
    if(postId === undefined || username === undefined) {
      return NextResponse.json({
        ok: false,
        message: 'Invalid request'
      }, {status: 400})
    }
    const [user, post, bookmarkExist] = await db.$transaction([
      db.user.findUnique({ where: { username } }),
      db.post.findUnique({ where: {id: postId} }),
      db.bookmark.findFirst({
        where: { postId, user: {username} }
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
    if (bookmarkExist) {
      return NextResponse.json({
        ok: false,
        message: 'Bookmark already exists'
      })
    }
    const bookmark = await db.bookmark.create({
      data: {
        postId,
        userId: user.id
      },
    })

    if (bookmark) {
      return NextResponse.json({
        ok: true,
        message: 'Boookmark has been added successfully',
        data: bookmark
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
      }, {status: 400})
    }

    const bookmark = await db.bookmark.findFirst({
      where: { postId, user: {username} }
    })
    if(!bookmark) {
      return NextResponse.json({
        ok: false,
        message: 'Bookmark not found'
      }, {status: 404})
    }

    const bookmarkDeleted = await db.bookmark.delete({
      where: {
        id: bookmark.id
      },
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
            createdAt: true
          }
        }
      }
    })

    return NextResponse.json<ApiReponseWithReturn>({
      ok: true,
      message: 'Bookmark deleted successfully',
      data: bookmarkDeleted
    })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok:false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}