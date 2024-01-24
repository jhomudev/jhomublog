import db from "@/app/client/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async () => { 
  try {
    const categories = await db.category.findMany()

    return NextResponse.json({
      ok: true,
      message: 'Categories fetched successfully',
      data: categories
    })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      message: 'Something is wrong'
    }, {status: 500})
  }
}