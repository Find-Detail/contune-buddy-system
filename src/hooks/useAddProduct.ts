
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProductFormData } from "@/schemas/productSchema";

export const useAddProduct = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductFormData) => {
      const { initial_stock, reorder_level, ...formData } = data;
      
      // Prepare product data with required fields
      const productData = {
        name: formData.name,
        sku: formData.sku,
        unit_price: formData.unit_price,
        description: formData.description || null,
        category_id: formData.category_id || null,
        cost_price: formData.cost_price || null,
        weight: formData.weight || null,
      };
      
      // Insert product (remove array wrapper)
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
          reorder_level: reorder_level || 10,
        });

      if (inventoryError) throw inventoryError;

      // Log initial stock movement if there's initial stock
      if (initial_stock && initial_stock > 0) {
        await supabase
          .from('inventory_movements')
          .insert({
            product_id: product.id,
            movement_type: 'adjustment',
            quantity: initial_stock,
            notes: 'Initial stock entry',
          });
      }

      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['low-stock-products'] });
      toast({
        title: "Product added",
        description: "The product has been successfully added to your inventory.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
      console.error('Error adding product:', error);
    },
  });
};
