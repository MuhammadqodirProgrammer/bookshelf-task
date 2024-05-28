export interface Book {
  id: number
  isbn: string
  title: string
  cover: string
  author: string
  published: number
  pages: number
}

export interface DataItem {
  book: Book
  status: number
}
export interface GetListResponse<T> {
  readonly data: DataItem[]
  readonly isOk: boolean
  readonly message: string
}

interface User {
  readonly id: number
  readonly email: string
  readonly name: string
  readonly key: string
  readonly secret: string
}

export interface UserDetailResponse<T> {
  readonly data: User
  readonly isOk: boolean
  readonly message: string
}
