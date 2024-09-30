import Head from 'next/head'
import Link from 'next/link'
import { useUser } from '../contexts/UserContext'

export default function Layout({ children }) {
  const { user, logout } = useUser()

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Couple Diary</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>

      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <a className="font-semibold text-xl text-gray-800">Couple Diary</a>
            </Link>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-600">{user.name}</span>
                  {user.isAdmin && (
                    <Link href="/admin">
                      <a className="text-blue-500 hover:text-blue-700">Admin</a>
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login">
                  <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-4">{children}</main>
    </div>
  )
}