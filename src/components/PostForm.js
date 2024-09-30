import { useState } from 'react'

export default function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [displayDate, setDisplayDate] = useState('')
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('displayDate', displayDate)
    if (file) {
      formData.append('file', file)
    }
    await onSubmit(formData)
    setTitle('')
    setContent('')
    setDisplayDate('')
    setFile(null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full px-3 py-2 border rounded-md"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full px-3 py-2 border rounded-md"
        required
      />
      <input
        type="date"
        value={displayDate}
        onChange={(e) => setDisplayDate(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
        required
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full px-3 py-2 border rounded-md"
      />
      <button type="submit" className="w-full px-3 py-2 text-white bg-blue-500 rounded-md">
        Post
      </button>
    </form>
  )
}