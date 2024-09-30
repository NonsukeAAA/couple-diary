import { useState, useEffect } from 'react'

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState({ username: '', password: '', name: '', isAdmin: false })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await fetch('/api/users')
    const data = await res.json()
    setUsers(data)
  }

  const handleNewUserChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
    if (res.ok) {
      fetchUsers()
      setNewUser({ username: '', password: '', name: '', isAdmin: false })
    }
  }

  const handleUpdateUser = async (id, updates) => {
    const res = await fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    })
    if (res.ok) {
      fetchUsers()
    }
  }

  const handleDeleteUser = async (id) => {
    const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      fetchUsers()
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleAddUser} className="space-y-4 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Add New User</h2>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleNewUserChange}
          placeholder="Username"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleNewUserChange}
          placeholder="Password"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleNewUserChange}
          placeholder="Name"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isAdmin"
            checked={newUser.isAdmin}
            onChange={handleNewUserChange}
            className="mr-2"
          />
          Is Admin
        </label>
        <button type="submit" className="w-full px-3 py-2 text-white bg-green-500 rounded-md">
          Add User
        </button>
      </form>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
        <ul className="space-y-4">
          {users.map(user => (
            <li key={user.id} className="flex justify-between items-center">
              <span>{user.name} ({user.username})</span>
              <div>
                <button
                  onClick={() => handleUpdateUser(user.id, { isAdmin: !user.isAdmin })}
                  className="text-blue-500 hover:underline mr-2"
                >
                  {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}