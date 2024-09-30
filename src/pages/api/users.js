import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { verifyToken } from '../../utils/auth'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const user = await verifyToken(req)
  if (!user || !user.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, name: true, isAdmin: true },
    })
    res.json(users)
  } else if (req.method === 'POST') {
    const { username, password, name, isAdmin } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword, name, isAdmin },
    })
    res.json({ id: newUser.id, username: newUser.username, name: newUser.name, isAdmin: newUser.isAdmin })
  } else if (req.method === 'PUT') {
    const { id, username, password, name, isAdmin } = req.body
    const updateData = { username, name, isAdmin }
    if (password) {
      updateData.password = bcrypt.hashSync(password, 10)
    }
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    })
    res.json({ id: updatedUser.id, username: updatedUser.username, name: updatedUser.name, isAdmin: updatedUser.isAdmin })
  } else if (req.method === 'DELETE') {
    const { id } = req.query
    await prisma.user.delete({ where: { id: parseInt(id) } })
    res.status(204).end()
  } else {
    res.status(405).end()
  }
}