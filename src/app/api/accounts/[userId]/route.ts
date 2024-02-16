import db from "@/app/client/lib/prisma"
import { ApiReponseWithReturn } from "@/app/client/types"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const GET = async (_req: NextRequest, { params }: { params: { userId: string } }) => {
  const { userId } = params
  try {
    const account = await db.account.findUnique({
      where: { userId },
      select: {
        id: true,
        access_token: true,
        expires_at: true,
        user: true,
      }
    })

    if (account) {
      return NextResponse.json<ApiReponseWithReturn>({
        ok: true,
        message: 'Account fetched successfully',
        data: account
      })
    }

    return NextResponse.json({
      ok: false,
      message: 'Account not found',
    }, { status: 404 })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}