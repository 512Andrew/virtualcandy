import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, LayoutDashboard, LogOut, ShoppingCart } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  // For MVP: only allow users with a specific email or just restrict to authenticated.
  // Ideally, use a 'role' column in a custom 'users' or 'profiles' table.
  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-black text-pink-400">CandyAdmin</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors text-gray-300 hover:text-white">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors text-gray-300 hover:text-white">
            <Package className="w-5 h-5" />
            Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors text-gray-300 hover:text-white">
            <ShoppingCart className="w-5 h-5" />
            Orders
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <form action="/auth/signout" method="post">
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors text-gray-400">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-8 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Admin Console</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
