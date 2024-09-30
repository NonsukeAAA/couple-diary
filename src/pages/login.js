import { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import Layout from '../components/Layout'
import PostForm from '../components/PostForm'
import Timeline from '../components/Timeline'

export default function Home() {
  const { user } = useUser()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const res = await fetch('/api/posts')
    const data = await res.json()
    setPosts(data)
  }

  const handleSubmit = async (formData) => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    })
    if (res.ok) {
      fetchPosts()
    }
  }

  return (
    <Layout>
      <div className="space-y-8 p-4">
        {user && <PostForm onSubmit={handleSubmit} />}
        <Timeline posts={posts} onUpdate={fetchPosts} />
      </div>
    </Layout>
  )
}