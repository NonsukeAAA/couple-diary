import { useState } from 'react'
import { useUser } from '../contexts/UserContext'
import PostCard from './PostCard'

export default function Timeline({ posts, onUpdate }) {
  const { user } = useUser()
  const [editingPost, setEditingPost] = useState(null)

  const handleEdit = (post) => {
    setEditingPost(post)
  }

  const handleUpdate = async (updatedPost) => {
    const res = await fetch('/api/posts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    })
    if (res.ok) {
      onUpdate()
      setEditingPost(null)
    }
  }

  const handleDelete = async (postId) => {
    const res = await fetch(`/api/posts?id=${postId}`, { method: 'DELETE' })
    if (res.ok) {
      onUpdate()
    }
  }

  return (<div className="space-y-4">
    {posts.map((post) => (
      <PostCard
        key={post.id}
        post={post}
        isEditing={editingPost?.id === post.id}
        canEdit={user.isAdmin || user.id === post.userId}
        onEdit={() => handleEdit(post)}
        onUpdate={handleUpdate}
        onDelete={() => handleDelete(post.id)}
      />
    ))}
  </div>
)
}