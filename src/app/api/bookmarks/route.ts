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

  try {
    const [bookmarks, rowsObtained, totalRows] = await db.$transaction([
      db.bookmark.findMany({
        where: {
          ...(user && {userEmail: user})
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
      db.bookmark.count({
        where: {
          ...(user && {userEmail: user})
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
  const {postSlug, userEmail} = await req.json()
  try {
    if(postSlug === undefined || userEmail === undefined) {
      return NextResponse.json({
        ok: false,
        message: 'Invalid request'
      }, {status: 400})
    }
    const [user, post, bookmarkExist] = await db.$transaction([
      db.user.findUnique({
        where: {email: userEmail}
      }),
      db.post.findUnique({
        where: {slug: postSlug}
      }),
      db.bookmark.findFirst({
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
    if (bookmarkExist) {
      return NextResponse.json({
        ok: false,
        message: 'Bookmark already exists'
      })
    }
    const bookmark = await db.bookmark.create({
      data: {
        postSlug,
        userEmail
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
    const searchParams = req.nextUrl.searchParams
    const [postSlug, userEmail] = [searchParams.get('postSlug'), searchParams.get('userEmail')]
    if (!postSlug || !userEmail) {
      return NextResponse.json({
        ok: false,
        message: 'Invalid request'
      }, {status: 400})
    }

    const bookmark = await db.bookmark.findFirst({
      where: { postSlug, userEmail }
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