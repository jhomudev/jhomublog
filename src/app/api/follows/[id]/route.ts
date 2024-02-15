import db from "@client/lib/prisma"
import { ApiReponseWithReturn } from "@client/types"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (_req: NextRequest, {params}: {params: {id: string}}) => {
  const { id } = params

  try {
    const follow = await db.follows.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        createdAt: true,
        follower: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true,
            image: true,
            createdAt: true
          }
        },
        following: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true,
            image: true,
            createdAt: true
          }
        }
      }
    })

    if(!follow) {
      return NextResponse.json({
        ok: false,
        message: 'Bookmark not found'
      }, {status: 404})
    }

    return NextResponse.json<ApiReponseWithReturn>({
      ok: true,
      message: 'Bookmark loaded successfully',
      data: follow
    })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok:false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}

export const DELETE = async (req: NextRequest) => {
  const { followId } = await req.json()

  try {
    const follow = await db.follows.findFirst({
      where: { id: followId }
    })
    
    if (!follow) {
      return NextResponse.json({
        ok: false,
        message: 'Follow does not exist'
      }, {status: 400})
    }

    const followDelete = await db.follows.delete({
      where: { id: followId }
    })

    if (followDelete) {
      return NextResponse.json({
        ok: true,
        message: 'Follow has been created successfully',
        data: followDelete
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