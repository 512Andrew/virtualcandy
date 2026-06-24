import { createClient } from '@/lib/supabase/server'

export default async function AdminProducts() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('*, constellations(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
              <th className="p-4 font-semibold">Product</th>
              <th className="p-4 font-semibold">Vendor</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">Inventory</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{product.image_url}</span>
                    <span className="font-medium text-gray-900">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{product.vendor}</td>
                <td className="p-4 text-gray-600">
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-medium">
                    {product.constellations?.name || 'Unknown'}
                  </span>
                </td>
                <td className="p-4 font-medium text-gray-900">${product.price.toFixed(2)}</td>
                <td className="p-4 text-gray-600">{product.inventory}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!products || products.length === 0) && (
          <div className="p-8 text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  )
}
