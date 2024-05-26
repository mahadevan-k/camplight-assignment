export interface UserData {
  name?: string,
  email?: string,
  phone?: string
}

export interface User {
  id?: number,
  name: string,
  email: string,
  phone: string
}

export interface UserListResponse {
  users?: User[],
  pages?: number,
  errors?: {[id: string]: string[]},
}

export interface UserAddResponse {
  user?: User,
  errors?: {[id: string]: string[]},
}

export interface UserDeleteResponse {
  id?: number,
  errors?: {[id: string]: string[]},
}
