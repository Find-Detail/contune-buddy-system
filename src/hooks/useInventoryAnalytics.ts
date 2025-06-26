
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useInventoryAnalytics = () => {
  return useQuery({
    queryKey: ['inventory-analytics'],
    queryFn: async () => {
      // Get total products
      const { count: totalProducts } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      // Get low stock products
      const { data: lowStockData } = await supabase
        .from('products')
        .select(`
          *,
          inventory!inner(
            quantity_on_hand,
            quantity_available,
            reorder_level
          )
        `)
        .lte('inventory.quantity_available', 'inventory.reorder_level')
        .eq('is_active', true);

      // Get out of stock products
      const { data: outOfStockData } = await supabase
        .from('products')
        .select(`
          *,
          inventory!inner(quantity_available)
        `)
        .eq('inventory.quantity_available', 0)
        .eq('is_active', true);

      // Get total inventory value
      const { data: inventoryValue } = await supabase
        .from('products')
        .select(`
          unit_price,
          cost_price,
          inventory(quantity_on_hand)
        `)
        .eq('is_active', true);

      const totalValue = inventoryValue?.reduce((sum, product) => {
        const quantity = product.inventory?.[0]?.quantity_on_hand || 0;
        const price = product.cost_price || product.unit_price;
        return sum + (quantity * price);
      }, 0) || 0;

      const totalRetailValue = inventoryValue?.reduce((sum, product) => {
        const quantity = product.inventory?.[0]?.quantity_on_hand || 0;
        return sum + (quantity * product.unit_price);
      }, 0) || 0;

      // Get recent movements
      const { data: recentMovements } = await supabase
        .from('inventory_movements')
        .select(`
          *,
          products(name, sku)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      return {
        totalProducts: totalProducts || 0,
        lowStockCount: lowStockData?.length || 0,
        outOfStockCount: outOfStockData?.length || 0,
        totalValue,
        totalRetailValue,
        recentMovements: recentMovements || [],
        lowStockProducts: lowStockData || [],
        outOfStockProducts: outOfStockData || [],
      };
    }
  });
};
