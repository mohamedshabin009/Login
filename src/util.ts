import * as bcrypt from 'bcrypt'

export const verifyPassword = async (password: string, hashedPassword: string) => {
  await bcrypt.compare(password, hashedPassword)
}