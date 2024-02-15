import db from "@client/lib/prisma"
import { ApiReponseWithReturn } from "@client/types"
import { NextRequest, NextResponse } from "next/server"

const DEFAULT = {
  rowsPerPage: 5,
  page: 1,
  order: 'desc'
}

export const GET = async (req: NextRequest, { params }: { params: { username: string }}) => {
  const { username } = params
  const { searchParams } = req.nextUrl
  const sp = Object.fromEntries(searchParams)
  const all = sp.all === 'true' 
  const page = sp.page ? Number(sp.page) : DEFAULT.page
  const rowsPerPage = sp.rowsPerPage ? Number(sp.rowsPerPage) : DEFAULT.rowsPerPage
  const q = sp.q

  try {

    const user = await db.user.findUnique({
      where: {username}
    })

    if (!user) {
      return NextResponse.json({
        ok: false,
        message: 'User not found'
      })
    }

    const [following, rowsObtained, totalRows] = await db.$transaction([
      db.follows.findMany({
        where: {
          followerId: user.id,
          ...(q && { following: { name: { contains: q, mode: 'insensitive' } } }),
        },
        take: all ? undefined : rowsPerPage,
        skip: all ? undefined : rowsPerPage * (page - 1),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          following: {
            select: {
              id: true,
              username: true,
              email: true,
              name: true,
              image: true,
              createdAt: true
            }
          },
          createdAt: true,
        }
      }),
      db.follows.count({
        where: {
          followerId: user.id,
          ...(q && { following: { name: { contains: q, mode: 'insensitive' } } }),
        },
      }),
      db.user.count()
    ])

    if (following) {
      return NextResponse.json<ApiReponseWithReturn>({
        ok: true,
        message: 'Following fetched successfully',
        data: following,
        meta: {
          all,
          rowsObtained,
          totalRows,
          page: all ? 1 : page,
          rowsPerPage
        }
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