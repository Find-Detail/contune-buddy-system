
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useInventoryMovements = (productId?: string) => {
  return useQuery({
    queryKey: ['inventory-movements', productId],
    queryFn: async () => {
      let query = supabase
        .from('inventory_movements')
        .select(`
          *,
          products(name, sku),
          profiles(first_name, last_name)
        `)
        .order('created_at', { ascending: false });
      
      if (productId) {
        query = query.eq('product_id', productId);
      }
      
      const { data, error } = await query.limit(100);
      
      if (error) throw error;
      return data;
    },
    enabled: true
  });
};
