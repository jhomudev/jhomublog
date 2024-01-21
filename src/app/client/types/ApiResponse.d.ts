export type ApiReponseWithReturn<T = any> = {
  ok: boolean,
  message: string,
  data: T,
  meta?: {
    all?: boolean
    rowsObtained: number,
    totalRows: number,
    page: number,
    rowsPerPage: number
  }
}

export type ApiResponse = {
  ok: boolean,
  message: string
}