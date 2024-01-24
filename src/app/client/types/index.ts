export type BaseEntity = {
  id: string;
  createdAt: string;
}

export type ApiResponse = {
  ok: boolean,
  message: string
}

export type ApiReponseWithReturn<T = any> = ApiResponse & {
  data: T,
  meta?: {
    all?: boolean
    rowsObtained: number,
    totalRows: number,
    page: number,
    rowsPerPage: number
  }
}

