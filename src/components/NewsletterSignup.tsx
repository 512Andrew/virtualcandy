'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }])

      if (error) {
        if (error.code === '23505') {
          // Unique violation
          setStatus('success') // They are already subscribed, let's just say success
        } else {
          throw error
        }
      } else {
        setStatus('success')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 sm:p-12 text-center shadow-xl max-w-2xl mx-auto my-12">
      {/* Decorative background elements */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-yellow-300 rounded-full shadow-[0_0_15px_rgba(253,224,71,0.8)] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-pink-300 rounded-full shadow-[0_0_15px_rgba(249,168,212,0.8)] animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(103,232,249,0.8)] animate-pulse" style={{ animationDelay: '0.5s' }}></div>

      <div className="relative z-10">
        <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 drop-shadow-md">
          Join the Candyverse
        </h3>
        <p className="text-white/90 text-lg mb-8 max-w-md mx-auto font-medium">
          Get whimsical candy facts, sweet stories, and exclusive offers delivered straight to your inbox.
        </p>

        {status === 'success' ? (
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30 text-white animate-in fade-in zoom-in duration-300">
            <div className="text-4xl mb-2">🎉</div>
            <h4 className="text-xl font-bold mb-1">You're on the list!</h4>
            <p>Get ready for some sweet surprises.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-4 rounded-full bg-white/90 border-2 border-transparent focus:border-pink-300 focus:bg-white outline-none transition-all text-purple-900 placeholder:text-purple-300 shadow-inner"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold rounded-full shadow-[0_4px_14px_0_rgba(250,204,21,0.39)] hover:shadow-[0_6px_20px_rgba(250,204,21,0.23)] hover:-translate-y-1 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {status === 'loading' ? 'Sending...' : 'Subscribe'}
            </button>
          </form>
        )}
        
        {status === 'error' && (
          <p className="text-red-200 mt-3 text-sm">Oops! Something went wrong. Try again.</p>
        )}
      </div>
    </div>
  )
}
