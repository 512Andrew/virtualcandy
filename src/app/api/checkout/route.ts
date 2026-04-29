import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with a mock key if none is provided yet, to prevent crashes
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock123', {
  apiVersion: '2024-06-20' as any, // use latest compatible
})

export async function POST(req: Request) {
  try {
    const { items } = await req.json()

    // For MVP, if there is no real Stripe key, we can return a mock URL
    // but we'll attempt to create a real session if the key looks valid.
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_mock123') {
      return NextResponse.json({ url: '/account?mock_checkout=true' })
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image_url ? [item.image_url] : undefined, // requires valid URL in prod
        },
        unit_amount: Math.round(item.price * 100), // convert to cents
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/account?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Stripe error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
