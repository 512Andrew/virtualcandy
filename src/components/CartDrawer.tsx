'use client'

import { useState } from 'react'
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '@/store/cart'

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const cart = useCart()

  const handleCheckout = async () => {
    // We will implement Stripe checkout here later
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart.items }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout failed', error);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Open Cart"
      >
        <ShoppingCart className="w-6 h-6 text-purple-600" />
        {cart.totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {cart.totalItems}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 flex justify-between items-center border-b border-pink-200">
          <h2 className="text-xl font-bold text-purple-900 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-pink-500" />
            Your Candy Stash
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/50 rounded-full transition-colors text-purple-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-amber-50">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-amber-800 opacity-70">
              <span className="text-4xl mb-4">🍬</span>
              <p>Your stash is empty!</p>
              <p className="text-sm mt-2">Time to explore the Candyverse.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border border-amber-100 flex gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-50 rounded-lg flex items-center justify-center text-3xl">
                    {item.image_url || '🍬'}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                      <p className="text-pink-600 font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2 bg-amber-50 rounded-full px-2 py-1">
                        <button
                          onClick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600 hover:text-pink-500 hover:bg-pink-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600 hover:text-green-500 hover:bg-green-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => cart.removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="p-4 bg-white border-t border-amber-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-4 text-lg font-bold text-gray-800">
              <span>Total:</span>
              <span className="text-purple-700">${cart.totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Checkout <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        )}
      </div>
    </>
  )
}
