export type LoginPayload = { email: string; password: string }
export type LoginResponse = { token: string; user: { id: string; name: string; email: string } }
