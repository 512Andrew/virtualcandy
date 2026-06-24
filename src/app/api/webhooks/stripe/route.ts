import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock123', {
  apiVersion: '2024-06-20' as any,
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

// Create a Supabase admin client to bypass RLS for webhook operations (lazily loaded to prevent build crashes)
let supabaseAdmin: ReturnType<typeof createClient> | null = null;
function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY;
    if (!url || !key) {
      throw new Error('Supabase URL and Secret Key must be set');
    }
    supabaseAdmin = createClient(url, key);
  }
  return supabaseAdmin;
}

export async function POST(req: Request) {
  const payload = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event

  try {
    if (!sig || !endpointSecret) {
      throw new Error('Missing stripe signature or endpoint secret')
    }
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // In a real app, you would retrieve the order from Supabase or create it
    // using metadata passed during checkout creation.
    console.log('Payment successful for session:', session.id)
    
    // Example: Update order status to paid
    // const admin = getSupabaseAdmin()
    // await admin
    //   .from('orders')
    //   .update({ status: 'paid' })
    //   .eq('stripe_session_id', session.id)
  }

  return NextResponse.json({ received: true })
}
