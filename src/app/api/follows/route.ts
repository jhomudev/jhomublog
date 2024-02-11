import db from "@/app/client/lib/prisma"
import { ApiReponseWithReturn } from "@/app/client/types"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const sp = Object.fromEntries(searchParams)
  const following = sp.following // as followingId
  const follower = sp.follower // as followerId

  try {
    const follows = await db.follows.findMany({
      where: {
        ...(follower && {followerId: follower}),
        ...(following && {followingId: following}),
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

    return NextResponse.json<ApiReponseWithReturn>({
      ok: true,
      data: follows,
      message: 'Follows fetched successfully'
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
  const { followerId, followingId } = await req.json()

  try {
    const [following, follower, alreadyExist] = await db.$transaction([
      db.user.findUnique({
        where: {id: followingId}
      }),
      db.user.findUnique({
        where: {id: followerId}
      }),
      db.follows.findFirst({
        where: { followingId, followerId}
      })
    ])
    if (!following) {
      return NextResponse.json({
        ok: false,
        message: 'User to follow does not exist'
      }, {status: 400})
    }
    if (!follower) {
      return NextResponse.json({
        ok: false,
        message: 'Follower user does not exist'
      }, {status: 400})
    }
    if (alreadyExist) {
      return NextResponse.json({
        ok: false,
        message: 'Already follow'
      }, {status: 400})
    }

    const follow = await db.follows.create({
      data: {
        followingId,
        followerId
      }
    })

    if (follow) {
      return NextResponse.json({
        ok: true,
        message: 'Follow has been created successfully',
        data: follow
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
    const { followerId, followingId } = await req.json()
    
    if (!followerId || !followingId) {
      return NextResponse.json({
        ok: false,
        message: 'Invalid request'
      }, {status: 400})
    }

    const follow = await db.follows.findFirst({
      where: { followerId, followingId }
    })
    if(!follow) {
      return NextResponse.json({
        ok: false,
        message: 'Follow not found'
      }, {status: 404})
    }

    const followDeleted = await db.follows.delete({
      where: {
        id: follow.id
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

    return NextResponse.json<ApiReponseWithReturn>({
      ok: true,
      message: 'Follow deleted successfully',
      data: followDeleted
    })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok:false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}