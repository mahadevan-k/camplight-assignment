export interface User {
  id: number,
  name: string,
  email: string,
  phone: string
}

export interface UserListResponse {
  users?: User[],
  errors?: {[id: string]: string[]},
}


