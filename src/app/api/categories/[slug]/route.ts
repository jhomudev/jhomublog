import { CategoryResponse } from "@client/features/categories/types"
import db from "@client/lib/prisma"
import { ApiReponseWithReturn } from "@client/types"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (_req: NextRequest, { params }: { params: { slug: string }}) => {
  const { slug } = params
  try {
    const category = await db.category.findUnique({ where: { slug } })

    if (category) {
      return NextResponse.json<ApiReponseWithReturn<CategoryResponse>>({
        ok: true,
        message: 'Category fetched successfully',
        data: category
      })
    }

    return NextResponse.json({
      ok: false,
      message: 'Category not found',
    }, { status: 404 })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}