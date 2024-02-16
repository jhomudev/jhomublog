import { ApiReponseWithReturn } from "@/app/client/types"
import db from "@/app/client/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

const DEFAULT = {
  rowsPerPage: 10,
  page: 1,
  order: 'desc'
}

export const dynamic = "force-dynamic"

export const GET = async (req: NextRequest, {params}:{params: {username: string}}) => {
  const { searchParams } = req.nextUrl
  const sp = Object.fromEntries(searchParams)
  const all = sp.all === 'true' 
  const page = sp.page ? Number(sp.page) : DEFAULT.page
  const rowsPerPage = sp.rowsPerPage ? Number(sp.rowsPerPage) : DEFAULT.rowsPerPage
  const order = sp.order as 'desc' | 'asc' ?? DEFAULT.order
  const q = sp.q
  const views = sp.views as 'desc' | 'asc'
  const {username} = params

  try {
    if(!username) return NextResponse.json({
      ok: false,
      message: 'Invalid request'
    }, { status: 400 })

    const existUser = await db.user.findFirst({
      where: { username }
    })

    if(!existUser) return NextResponse.json({
      ok: false,
      message: 'User not found'
    }, { status: 404 })
    
    const [stories, rowsObtained, totalRows] = await db.$transaction([
      db.post.findMany({
        where: {
          ...(q && {title: {
            contains: q,
            mode: 'insensitive'
          }}),
          user: {username}
        },
        take: all ? undefined : rowsPerPage,
        skip: all ? undefined : rowsPerPage * (page - 1),
        orderBy: [
          (views ? { views } : { createdAt: order }),
        ],
        select: {
          _count: {
            select: {
              likes: true,
              comments: true,
              bookmarks: true
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
          cat: true
        }

      }),
      db.post.count({
        where: {
          ...(q && {title: {
            contains: q,
            mode: 'insensitive'
          }}),
          user: {username}
        }
      }),
      db.post.count({
        where: {
          user: {username}
        }
      }),
    ])

    return NextResponse.json<ApiReponseWithReturn>({
      ok: true,
      message: 'Stories loaded successfully',
      data: stories,
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
