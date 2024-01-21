import db from "@/app/server/libs/prisma"
import { NextResponse } from "next/server"

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