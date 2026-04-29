-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Planets (Categories)
CREATE TABLE public.planets (
  id text PRIMARY KEY,
  name text NOT NULL,
  color text NOT NULL,
  x_position text NOT NULL,
  y_position text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Constellations (Subcategories)
CREATE TABLE public.constellations (
  id text PRIMARY KEY,
  planet_id text NOT NULL REFERENCES public.planets(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Products
CREATE TABLE public.products (
  id text PRIMARY KEY,
  constellation_id text NOT NULL REFERENCES public.constellations(id) ON DELETE CASCADE,
  name text NOT NULL,
  vendor text NOT NULL,
  price numeric NOT NULL,
  image_url text,
  description text,
  inventory integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Newsletter Subscribers
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Initial Data for Planets (Mock data based on previous candyverse.ts)
INSERT INTO public.planets (id, name, color, x_position, y_position) VALUES
('chocolate', 'Chocolate', '#7c3aed', '15%', '35%'),
('gummies', 'Gummies', '#22c55e', '65%', '25%'),
('retro', 'Retro', '#f59e0b', '40%', '70%'),
('sour', 'Sour', '#ef4444', '78%', '62%');

-- Initial Data for Constellations
INSERT INTO public.constellations (id, planet_id, name) VALUES
('dark', 'chocolate', 'Dark Side'),
('filled', 'chocolate', 'Filled & Truffles'),
('freeze-dried', 'gummies', 'Freeze-Dried'),
('sour-gummies', 'gummies', 'Sour Gummies'),
('90s', 'retro', 'The 90s'),
('face-warp', 'sour', 'Face-Warp Scale');

-- Initial Data for Products
INSERT INTO public.products (id, constellation_id, name, vendor, price, image_url, description, inventory) VALUES
('champagne-bears', 'dark', 'Champagne Bears® (Dark Companion Pair)', 'Sugarfina', 20.00, '🍾', 'A wonderful companion to dark chocolate', 100),
('cocoa-85', 'dark', '85% Cocoa Bars Pack', 'VirtualCandy', 15.00, '🍫', 'Rich 85% cocoa dark chocolate bars', 50),
('choco-almonds', 'filled', 'Chocolate Almonds', 'VirtualCandy', 12.00, '🥜', 'Premium almonds covered in milk chocolate', 200),
('freeze-rainbow', 'freeze-dried', 'Freeze-Dried Rainbow Bites', 'VirtualCandy', 12.00, '🌈', 'Crunchy, airy, freeze-dried candy', 150),
('astronaut-taffy', 'freeze-dried', 'Astronaut Taffy', 'VirtualCandy', 8.00, '🧑‍🚀', 'Space-themed freeze-dried taffy', 75),
('warheads-gummies', 'sour-gummies', 'Extreme Sour Gummies', 'VirtualCandy', 9.00, '😖', 'Sour coated fruit gummies', 300),
('2000s-box', '90s', '2000s Throwback Box', 'VirtualCandy', 39.00, '🕹️', 'A nostalgic trip to the early 2000s', 20),
('nerds-rope', '90s', 'Handmade Nerds Rope', 'VirtualCandy', 5.00, '🧵', 'Classic candy rope covered in crunchy bits', 500),
('warheads-classic', 'face-warp', 'Sour Variety Pack', 'VirtualCandy', 14.00, '⚡', 'A mix of extreme sour hard candies', 100);

-- Enable RLS
ALTER TABLE public.planets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.constellations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Allow public read access on planets" ON public.planets FOR SELECT USING (true);
CREATE POLICY "Allow public read access on constellations" ON public.constellations FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT USING (true);

-- Allow anyone to subscribe to the newsletter
CREATE POLICY "Allow public insert to newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
-- Only admin can read newsletter subscribers (we'll assume a basic setup for now where anon can't read)
CREATE POLICY "Deny public read on newsletter" ON public.newsletter_subscribers FOR SELECT USING (auth.role() = 'authenticated');

-- Profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  email text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Orders
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_session_id text,
  total_amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'fulfilled', 'cancelled')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Order Items
CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id text NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity integer NOT NULL CHECK (quantity > 0),
  price_at_time numeric NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for new tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Profile Policies
CREATE POLICY "Public profiles are viewable by users who created them" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Order Policies
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update all orders" ON public.orders FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Order Item Policies
CREATE POLICY "Users can view their own order items" ON public.order_items FOR SELECT USING (EXISTS (SELECT 1 FROM public.orders WHERE id = order_items.order_id AND user_id = auth.uid()));
CREATE POLICY "Users can insert their own order items" ON public.order_items FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.orders WHERE id = order_items.order_id AND user_id = auth.uid()));
CREATE POLICY "Admins can view all order items" ON public.order_items FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'customer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
