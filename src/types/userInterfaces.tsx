export default interface User {
  id?: any | null,
  profileurl: string,
  login: string,
  published?: boolean
}
export default interface Users {
  users: [User],
  success: string,
  user_length: number
}