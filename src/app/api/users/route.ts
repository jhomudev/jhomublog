import db from "@client/lib/prisma"
import { ApiReponseWithReturn } from "@client/types"
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
  // const order = sp.order as 'desc' | 'asc' ?? DEFAULT.order
  const q = sp.q

  try {
    const [users, rowsObtained, totalRows] = await db.$transaction([
      db.user.findMany({
        where: {
          ...(q && {name: { contains: q, mode: 'insensitive' }}),
        },
        take: all ? undefined : rowsPerPage,
        skip: all ? undefined : rowsPerPage * (page - 1),
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          _count: {
            select: {
              followers: true,
              following: true
            }
          }
        }
      }),
      db.user.count({
        where: {
          ...(q && {name: { contains: q, mode: 'insensitive' }}),
        }
      }),
      db.user.count()
    ])

    if (users) {
      return NextResponse.json<ApiReponseWithReturn>({
        ok: true,
        message: 'Users fetched successfully',
        data: users,
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