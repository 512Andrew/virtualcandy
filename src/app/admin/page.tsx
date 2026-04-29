import { createClient } from '@/lib/supabase/server'
import { Users, Package, ShoppingCart } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch counts
  const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true })
  const { count: subscribersCount } = await supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Products</p>
            <p className="text-3xl font-bold text-gray-900">{productsCount || 0}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Orders</p>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Newsletter Subs</p>
            <p className="text-3xl font-bold text-gray-900">{subscribersCount || 0}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
