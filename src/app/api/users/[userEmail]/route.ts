import db from "@/app/client/lib/prisma"
import { ApiReponseWithReturn } from "@client/types"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async (_req: NextRequest, { params }: { params: { userEmail: string }}) => {
  const { userEmail } = params
  try {
    const user = await db.user.findUnique({
      where: { email: userEmail },
      select: {
        id: true,
        name: true,
        email: true,
        image: true
      }
    })

    if (user) {
      return NextResponse.json<ApiReponseWithReturn>({
        ok: true,
        message: 'User fetched successfully',
        data: user
      })
    }

    return NextResponse.json({
      ok: false,
      message: 'User not found',
    }, { status: 404 })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}