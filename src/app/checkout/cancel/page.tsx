import Link from 'next/link'

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden text-center p-8">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          ✕
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Checkout Cancelled</h1>
        <p className="text-gray-600 mb-8">
          Your order has been cancelled. Your cart is still waiting for you!
        </p>
        <Link
          href="/"
          className="inline-block w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl shadow-md transition-all duration-300"
        >
          Return to Shop
        </Link>
      </div>
    </div>
  )
}
