
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProductFormData } from "@/schemas/productSchema";

export const useAddProduct = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductFormData) => {
      const { initial_stock, reorder_level, tags, ...formData } = data;
      
      // Check if SKU already exists
      const { data: existingProduct } = await supabase
        .from('products')
        .select('id')
        .eq('sku', formData.sku)
        .single();

      if (existingProduct) {
        throw new Error('A product with this SKU already exists');
      }

      // Prepare product data with required fields
      const productData = {
        name: formData.name,
        sku: formData.sku,
        unit_price: formData.unit_price,
        description: formData.description || null,
        category_id: formData.category_id || null,
        cost_price: formData.cost_price || null,
        weight: formData.weight || null,
        specifications: {
          barcode: formData.barcode || null,
          supplier: formData.supplier || null,
          brand: formData.brand || null,
          warranty_period: formData.warranty_period || null,
          tags: tags || [],
        },
      };
      
      // Insert product
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();

      if (productError) throw productError;

      // Insert initial inventory
      const { error: inventoryError } = await supabase
        .from('inventory')
        .insert({
          product_id: product.id,
          quantity_on_hand: initial_stock || 0,
          quantity_available: initial_stock || 0,
          reorder_level: reorder_level || 10,
        });

      if (inventoryError) throw inventoryError;

      // Log initial stock movement if there's initial stock
      if (initial_stock && initial_stock > 0) {
        const { data: { user } } = await supabase.auth.getUser();
        
        await supabase
          .from('inventory_movements')
          .insert({
            product_id: product.id,
            movement_type: 'adjustment',
            quantity: initial_stock,
            notes: 'Initial stock entry',
            created_by: user?.id || null,
          });
      }

      return product;
    },
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['low-stock-products'] });
      toast({
        title: "Product added successfully",
        description: `${product.name} has been added to your inventory.`,
      });
    },
    onError: (error) => {
      console.error('Error adding product:', error);
      toast({
        title: "Error adding product",
        description: error.message || "Failed to add product. Please try again.",
        variant: "destructive",
      });
    },
  });
};
