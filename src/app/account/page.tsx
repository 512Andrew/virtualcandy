import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AccountPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Account</h1>
          <Link href="/" className="text-pink-600 hover:text-pink-700 font-medium">
            Back to Shop
          </Link>
        </div>

        <div className="bg-white shadow rounded-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order History</h3>
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
              <span className="text-4xl mb-2 block">📦</span>
              <p className="text-gray-600 font-medium">No orders yet.</p>
              <p className="text-sm text-gray-500 mt-1">Time to grab some sweets!</p>
              <Link href="/" className="inline-block mt-4 px-6 py-2 bg-pink-100 text-pink-700 font-semibold rounded-full hover:bg-pink-200 transition-colors">
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
