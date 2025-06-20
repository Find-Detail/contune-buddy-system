
-- Create table for product categories
CREATE TABLE public.product_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  parent_category_id UUID REFERENCES public.product_categories(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for products
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  sku TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES public.product_categories(id),
  unit_price NUMERIC(10,2) NOT NULL,
  cost_price NUMERIC(10,2),
  weight NUMERIC(8,2),
  dimensions JSONB, -- {length, width, height, unit}
  images JSONB DEFAULT '[]', -- array of image URLs
  specifications JSONB DEFAULT '{}', -- custom specifications
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for inventory tracking
CREATE TABLE public.inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  warehouse_location TEXT,
  quantity_on_hand INTEGER NOT NULL DEFAULT 0,
  quantity_reserved INTEGER NOT NULL DEFAULT 0,
  quantity_available INTEGER GENERATED ALWAYS AS (quantity_on_hand - quantity_reserved) STORED,
  reorder_level INTEGER DEFAULT 10,
  max_stock_level INTEGER,
  last_restocked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for sales orders
CREATE TABLE public.sales_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  client_id UUID REFERENCES public.clients(id),
  lead_id UUID REFERENCES public.leads(id),
  sales_rep_id UUID REFERENCES public.profiles(id),
  status TEXT NOT NULL DEFAULT 'draft', -- draft, confirmed, processing, shipped, delivered, cancelled
  order_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  delivery_date TIMESTAMP WITH TIME ZONE,
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  shipping_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  payment_status TEXT NOT NULL DEFAULT 'pending', -- pending, partial, paid, refunded
  payment_terms TEXT,
  shipping_address JSONB,
  billing_address JSONB,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for sales order items
CREATE TABLE public.sales_order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.sales_orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  discount_percentage NUMERIC(5,2) DEFAULT 0,
  line_total NUMERIC(12,2) GENERATED ALWAYS AS (quantity * unit_price * (1 - discount_percentage/100)) STORED,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for inventory movements (for tracking stock changes)
CREATE TABLE public.inventory_movements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  movement_type TEXT NOT NULL, -- purchase, sale, adjustment, transfer, return
  quantity INTEGER NOT NULL, -- positive for inbound, negative for outbound
  reference_id UUID, -- can reference sales_orders, purchase_orders, etc.
  reference_type TEXT, -- 'sales_order', 'purchase_order', 'adjustment', etc.
  cost_per_unit NUMERIC(10,2),
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for quotations
CREATE TABLE public.quotations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_number TEXT UNIQUE NOT NULL,
  client_id UUID REFERENCES public.clients(id),
  lead_id UUID REFERENCES public.leads(id),
  sales_rep_id UUID REFERENCES public.profiles(id),
  status TEXT NOT NULL DEFAULT 'draft', -- draft, sent, accepted, rejected, expired
  quote_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  valid_until TIMESTAMP WITH TIME ZONE,
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  notes TEXT,
  terms_conditions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for quotation items
CREATE TABLE public.quotation_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quotation_id UUID REFERENCES public.quotations(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  discount_percentage NUMERIC(5,2) DEFAULT 0,
  line_total NUMERIC(12,2) GENERATED ALWAYS AS (quantity * unit_price * (1 - discount_percentage/100)) STORED,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for products and categories (viewable by all authenticated users)
CREATE POLICY "Users can view product categories" ON public.product_categories FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Managers can manage product categories" ON public.product_categories FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'manager'))
);

CREATE POLICY "Users can view products" ON public.products FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Managers can manage products" ON public.products FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'manager'))
);

CREATE POLICY "Users can view inventory" ON public.inventory FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Managers can manage inventory" ON public.inventory FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'manager'))
);

-- Sales orders policies
CREATE POLICY "Users can view sales orders" ON public.sales_orders FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Sales reps can manage their sales orders" ON public.sales_orders FOR ALL USING (
  sales_rep_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'manager'))
);

CREATE POLICY "Users can view sales order items" ON public.sales_order_items FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can manage sales order items" ON public.sales_order_items FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.sales_orders 
    WHERE id = order_id AND (
      sales_rep_id = auth.uid() OR 
      EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'manager'))
    )
  )
);

-- Inventory movements policies
CREATE POLICY "Users can view inventory movements" ON public.inventory_movements FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can create inventory movements" ON public.inventory_movements FOR INSERT WITH CHECK (created_by = auth.uid());
CREATE POLICY "Managers can manage inventory movements" ON public.inventory_movements FOR ALL USING (
  created_by = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'manager'))
);

-- Quotations policies
CREATE POLICY "Users can view quotations" ON public.quotations FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Sales reps can manage their quotations" ON public.quotations FOR ALL USING (
  sales_rep_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'manager'))
);

CREATE POLICY "Users can view quotation items" ON public.quotation_items FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can manage quotation items" ON public.quotation_items FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.quotations 
    WHERE id = quotation_id AND (
      sales_rep_id = auth.uid() OR 
      EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'manager'))
    )
  )
);

-- Create indexes for better performance
CREATE INDEX idx_products_sku ON public.products(sku);
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_inventory_product ON public.inventory(product_id);
CREATE INDEX idx_sales_orders_client ON public.sales_orders(client_id);
CREATE INDEX idx_sales_orders_lead ON public.sales_orders(lead_id);
CREATE INDEX idx_sales_orders_status ON public.sales_orders(status);
CREATE INDEX idx_inventory_movements_product ON public.inventory_movements(product_id);
CREATE INDEX idx_quotations_client ON public.quotations(client_id);
CREATE INDEX idx_quotations_lead ON public.quotations(lead_id);

-- Create function to update inventory after sales
CREATE OR REPLACE FUNCTION update_inventory_on_sale()
RETURNS TRIGGER AS $$
BEGIN
  -- Update inventory when a sales order is confirmed
  IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' THEN
    -- Reserve inventory for all items in the order
    UPDATE public.inventory 
    SET quantity_reserved = quantity_reserved + soi.quantity
    FROM public.sales_order_items soi
    WHERE soi.order_id = NEW.id AND inventory.product_id = soi.product_id;
    
    -- Log inventory movements
    INSERT INTO public.inventory_movements (product_id, movement_type, quantity, reference_id, reference_type, created_by)
    SELECT soi.product_id, 'sale', -soi.quantity, NEW.id, 'sales_order', NEW.sales_rep_id
    FROM public.sales_order_items soi
    WHERE soi.order_id = NEW.id;
  END IF;
  
  -- Update inventory when order is shipped
  IF NEW.status = 'shipped' AND OLD.status != 'shipped' THEN
    -- Move from reserved to actual reduction
    UPDATE public.inventory 
    SET quantity_on_hand = quantity_on_hand - soi.quantity,
        quantity_reserved = quantity_reserved - soi.quantity
    FROM public.sales_order_items soi
    WHERE soi.order_id = NEW.id AND inventory.product_id = soi.product_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for inventory updates
CREATE TRIGGER trigger_update_inventory_on_sale
  AFTER UPDATE ON public.sales_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_inventory_on_sale();
