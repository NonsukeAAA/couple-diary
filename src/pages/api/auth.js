import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body
    const user = await prisma.user.findUnique({ where: { username } })
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
      res.json({ user: { id: user.id, username: user.username, name: user.name, isAdmin: user.isAdmin }, token })
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  } else {
    res.status(405).end()
  }
}