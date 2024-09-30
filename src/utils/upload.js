import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const saveFile = async (req) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = path.join(process.cwd(), 'public', 'uploads')
  form.keepExtensions = true

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })
}