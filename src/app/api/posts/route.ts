import { ApiReponseWithReturn } from "@client/types"
import db from "@/app/client/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

const DEFAULT = {
  rowsPerPage: 5,
  page: 1,
  order: 'desc'
}

export const dynamic = "force-dynamic"

export const GET = async (req: NextRequest,) => {
  const { searchParams } = req.nextUrl
  const sp = Object.fromEntries(searchParams)
  const all = sp.all === 'true' 
  const page = sp.page ? Number(sp.page) : DEFAULT.page
  const rowsPerPage = sp.rowsPerPage ? Number(sp.rowsPerPage) : DEFAULT.rowsPerPage
  const order = sp.order as 'desc' | 'asc' ?? DEFAULT.order
  const q = sp.q
  const views = sp.views as 'desc' | 'asc'
  const cat = sp.cat
  const tag = sp.tag
  const user = sp.user

  try {
    const [posts, rowsObtained, totalRows] = await db.$transaction([
      db.post.findMany({
        where: {
          ...(q && {title: {
            contains: q,
            mode: 'insensitive'
          }}),
          ...(cat && {catSlug: cat}),
          ...((!cat && tag) && {
            tags: {
            has: tag
          }}),
          ...(user && {
            user: {
            id: user
          }})
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
          cat: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }

      }),
      db.post.count({
        where: {
          ...(q && {title: {
            contains: q,
            mode: 'insensitive'
          }}),
          ...(cat && { catSlug: cat }),
          ...((!cat && tag) && {
            tags: {
            has: tag
          }}),
          ...(user && {
            user: {
            id: user
          }})
        }
      }),
      db.post.count()
    ])

    return NextResponse.json<ApiReponseWithReturn>({
      ok: true,
      message: 'Posts loaded successfully',
      data: posts,
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
  const {tags, ...body} = await req.json()
  const tagsNoRepeat = new Set<string>(tags)
  try {
    const post = await db.post.create({
      data: {
        tags: [...tagsNoRepeat],
        ...body
      }
    })

    if (post) {
      return NextResponse.json({
        ok: true,
        message: 'Post has been created successfully',
        data: post
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