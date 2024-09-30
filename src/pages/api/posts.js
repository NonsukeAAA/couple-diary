import { PrismaClient } from '@prisma/client'
import { verifyToken } from '../../utils/auth'
import { saveFile } from '../../utils/upload'

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  const user = await verifyToken(req)
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      include: { user: true },
      orderBy: { displayDate: 'desc' },
    })
    res.json(posts)
  } else if (req.method === 'POST') {
    const { fields, files } = await saveFile(req)
    const { title, content, displayDate } = fields
    const file = files.file?.[0]

    const post = await prisma.post.create({
      data: {
        title,
        content,
        displayDate: new Date(displayDate),
        userId: user.id,
        fileUrl: file ? `/uploads/${file.newFilename}` : null,
        fileType: file ? file.mimetype : null,
      },
    })

    res.json(post)
  } else if (req.method === 'PUT') {
    const { id, title, content, displayDate } = req.body
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } })

    if (!post || (post.userId !== user.id && !user.isAdmin)) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content, displayDate: new Date(displayDate) },
    })

    res.json(updatedPost)
  } else if (req.method === 'DELETE') {
    const { id } = req.query
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } })

    if (!post || (post.userId !== user.id && !user.isAdmin)) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    await prisma.post.delete({ where: { id: parseInt(id) } })
    res.status(204).end()
  } else {
    res.status(405).end()
  }
}