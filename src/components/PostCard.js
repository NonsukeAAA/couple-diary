import { useState } from 'react'

export default function PostCard({ post, isEditing, canEdit, onEdit, onUpdate, onDelete }) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [displayDate, setDisplayDate] = useState(post.displayDate.split('T')[0])

  const handleUpdate = () => {
    onUpdate({ id: post.id, title, content, displayDate })
  }

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-2"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-2"
        />
        <input
          type="date"
          value={displayDate}
          onChange={(e) => setDisplayDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-2"
        />
        <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
          Update
        </button>
        <button onClick={() => onEdit(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
          Cancel
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-2">{post.content}</p>
      <p className="text-sm text-gray-500 mb-2">Date: {new Date(post.displayDate).toLocaleDateString()}</p>
      {post.fileUrl && (
        <div className="mb-2">
          {post.fileType.startsWith('image/') ? (
            <img src={post.fileUrl} alt={post.title} className="max-w-full h-auto rounded-md" />
          ) : (
            <a href={post.fileUrl} download className="text-blue-500 hover:underline">
              Download attachment
            </a>
          )}
        </div>
      )}
      {canEdit && (
        <div className="flex justify-end space-x-2">
          <button onClick={() => onEdit(post)} className="text-blue-500 hover:underline">
            Edit
          </button>
          <button onClick={() => onDelete(post.id)} className="text-red-500 hover:underline">
            Delete
          </button>
        </div>
      )}
    </div>
  )
}