import { ApiReponseWithReturn } from "@client/types"
import db from "@/app/client/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

const DEFAULT = {
  rowsPerPage: 5,
  page: 1,
  order: 'desc'
}

export const dynamic = "force-dynamic"

export const GET = async (req: NextRequest, {params}:{params: {user: string}}) => {
  const { searchParams } = req.nextUrl
  const sp = Object.fromEntries(searchParams)
  const all = sp.all === 'true' 
  const page = sp.page ? Number(sp.page) : DEFAULT.page
  const rowsPerPage = sp.rowsPerPage ? Number(sp.rowsPerPage) : DEFAULT.rowsPerPage
  const order = sp.order as 'desc' | 'asc' ?? DEFAULT.order
  const q = sp.q
  const views = sp.views as 'desc' | 'asc'
  const {user} = params

  try {
    if(!user) return NextResponse.json({
      ok: false,
      message: 'Invalid request'
    }, { status: 400 })

    const existUser = await db.user.findUnique({
      where: {
        email: user
      }
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
          ...(user && {userEmail: user})
        },
        take: all ? undefined : rowsPerPage,
        skip: all ? undefined : rowsPerPage * (page - 1),
        orderBy: [
          (views ? { views } : { createdAt: order }),
        ],
        select: {
          _count: {
            select: {
              likes: true
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
          ...(user && {userEmail: user})
        }
      }),
      db.post.count({
        where: {
          ...(user && {userEmail: user})
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
