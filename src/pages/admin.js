import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../contexts/UserContext'
import Layout from '../components/Layout'
import UserManagement from '../components/UserManagement'

export default function Admin() {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/')
    }
  }, [user])

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <UserManagement />
      </div>
    </Layout>
  )
}