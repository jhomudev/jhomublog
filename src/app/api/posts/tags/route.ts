import db from "@/app/client/lib/prisma"
import { ApiReponseWithReturn } from "@/app/client/types"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async (_req: NextRequest,) => {
  try {
    const posts = await db.post.findMany({
      select: {
        tags: true
      }
    })

    if (!posts) return
    
    const tags = new Set(posts.map(post => post.tags).flat())

    return NextResponse.json<ApiReponseWithReturn>({
      ok: true,
      message: 'Tags loaded successfully',
      data: [...tags]
    })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}