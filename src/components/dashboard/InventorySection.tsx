
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Package, ShoppingCart, AlertTriangle, Search, TrendingUp, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AddProductDialog } from "@/components/dialogs/AddProductDialog";
import { CreateSalesOrderDialog } from "@/components/dialogs/CreateSalesOrderDialog";
import { CreateQuotationDialog } from "@/components/dialogs/CreateQuotationDialog";
import { useInventoryAnalytics } from "@/hooks/useInventoryAnalytics";
import { formatCurrency } from "@/lib/utils";

export const InventorySection = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [showCreateQuotation, setShowCreateQuotation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: analytics } = useInventoryAnalytics();

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products', searchTerm, categoryFilter],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          product_categories(name),
          inventory(
            quantity_on_hand,
            quantity_reserved,
            quantity_available,
            reorder_level
          )
        `)
        .eq('is_active', true)
        .order('name');
      
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,sku.ilike.%${searchTerm}%`);
      }
      
      if (categoryFilter !== 'all') {
        query = query.eq('category_id', categoryFilter);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['product-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  const getStockStatus = (product: any) => {
    const available = product.inventory[0]?.quantity_available || 0;
    const reorderLevel = product.inventory[0]?.reorder_level || 0;
    
    if (available === 0) return { status: 'Out of Stock', color: 'destructive' };
    if (available <= reorderLevel) return { status: 'Low Stock', color: 'secondary' };
    return { status: 'In Stock', color: 'default' };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Inventory</h2>
          <p className="text-muted-foreground">Manage your products and stock levels</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowAddProduct(true)} size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
          <Button onClick={() => setShowCreateOrder(true)} variant="outline" size="lg">
            <ShoppingCart className="h-4 w-4 mr-2" />
            New Order
          </Button>
          <Button onClick={() => setShowCreateQuotation(true)} variant="outline" size="lg">
            Create Quote
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalProducts || 0}</div>
            <p className="text-xs text-muted-foreground">Active products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics?.totalValue || 0)}</div>
            <p className="text-xs text-muted-foreground">Inventory worth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {analytics?.lowStockCount || 0}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {analytics?.outOfStockCount || 0}
            </div>
            <p className="text-xs text-muted-foreground">Urgent restocking</p>
          </CardContent>
        </Card>
      </div>

      {/* Products Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>All your products in one place</CardDescription>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {productsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading products...</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products?.map((product: any) => {
                const stockStatus = getStockStatus(product);
                const available = product.inventory[0]?.quantity_available || 0;
                
                return (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                        </div>
                        <Badge variant={stockStatus.color as any} className="ml-2">
                          {stockStatus.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description || 'No description available'}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">Price</p>
                            <p className="text-lg font-bold">{formatCurrency(product.unit_price)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">Stock</p>
                            <p className={`text-lg font-bold ${available === 0 ? 'text-red-600' : available <= (product.inventory[0]?.reorder_level || 0) ? 'text-orange-600' : 'text-green-600'}`}>
                              {available}
                              {available <= (product.inventory[0]?.reorder_level || 0) && available > 0 && (
                                <AlertTriangle className="inline h-4 w-4 ml-1" />
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <span>Category: {product.product_categories?.name || 'Uncategorized'}</span>
                          {product.inventory[0]?.reorder_level && (
                            <span className="ml-4">Reorder at: {product.inventory[0].reorder_level}</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
          
          {!productsLoading && products?.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || categoryFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Get started by adding your first product'
                }
              </p>
              {(!searchTerm && categoryFilter === 'all') && (
                <Button onClick={() => setShowAddProduct(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Product
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stock Alerts */}
      {(analytics?.lowStockProducts?.length > 0 || analytics?.outOfStockProducts?.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Stock Alerts
            </CardTitle>
            <CardDescription>Products that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics?.outOfStockProducts?.slice(0, 5).map((product: any) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                  </div>
                  <Badge variant="destructive">Out of Stock</Badge>
                </div>
              ))}
              {analytics?.lowStockProducts?.slice(0, 5).map((product: any) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.inventory[0]?.quantity_available} left (Reorder at: {product.inventory[0]?.reorder_level})
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">Low Stock</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <AddProductDialog open={showAddProduct} onOpenChange={setShowAddProduct} />
      <CreateSalesOrderDialog open={showCreateOrder} onOpenChange={setShowCreateOrder} />
      <CreateQuotationDialog open={showCreateQuotation} onOpenChange={setShowCreateQuotation} />
    </div>
  );
};
