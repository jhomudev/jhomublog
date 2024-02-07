import { ApiReponseWithReturn } from "@client/types"
import db from "@/app/client/lib/prisma"
import { NextRequest, NextResponse } from "next/server"


export const GET = async (_req: NextRequest, {params}: {params: {id: string}}) => {
  const { id } = params

  try {
    const bookmark = await db.bookmark.findUnique({
      where: {
        id
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

    if(!bookmark) {
      return NextResponse.json({
        ok: false,
        message: 'Bookmark not found'
      }, {status: 404})
    }

    return NextResponse.json<ApiReponseWithReturn>({
      ok: true,
      message: 'Bookmark loaded successfully',
      data: bookmark
    })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok:false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}