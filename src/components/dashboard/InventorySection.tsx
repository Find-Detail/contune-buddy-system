
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Package, ShoppingCart, FileText, TrendingUp, AlertTriangle, Search, Filter, Download, Eye, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AddProductDialog } from "@/components/dialogs/AddProductDialog";
import { CreateSalesOrderDialog } from "@/components/dialogs/CreateSalesOrderDialog";
import { CreateQuotationDialog } from "@/components/dialogs/CreateQuotationDialog";
import { InventoryDashboard } from "@/components/inventory/InventoryDashboard";
import { useInventoryMovements } from "@/hooks/useInventoryMovements";
import { formatCurrency, formatDate } from "@/lib/utils";

export const InventorySection = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [showCreateQuotation, setShowCreateQuotation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products', searchTerm, categoryFilter, stockFilter],
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
      
      // Apply stock filter
      if (stockFilter === 'low') {
        return data?.filter(product => 
          (product.inventory[0]?.quantity_available || 0) <= (product.inventory[0]?.reorder_level || 0)
        );
      } else if (stockFilter === 'out') {
        return data?.filter(product => 
          (product.inventory[0]?.quantity_available || 0) === 0
        );
      }
      
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

  const { data: salesOrders, isLoading: ordersLoading } = useQuery({
    queryKey: ['sales-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales_orders')
        .select(`
          *,
          clients(company_name),
          leads(first_name, last_name),
          profiles(first_name, last_name)
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    }
  });

  const { data: quotations } = useQuery({
    queryKey: ['quotations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quotations')
        .select(`
          *,
          clients(company_name),
          leads(first_name, last_name),
          profiles(first_name, last_name)
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    }
  });

  const { data: inventoryMovements } = useInventoryMovements();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'partial': return 'bg-orange-100 text-orange-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'refunded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (product: any) => {
    const available = product.inventory[0]?.quantity_available || 0;
    const reorderLevel = product.inventory[0]?.reorder_level || 0;
    
    if (available === 0) return { status: 'Out of Stock', color: 'destructive' };
    if (available <= reorderLevel) return { status: 'Low Stock', color: 'secondary' };
    return { status: 'In Stock', color: 'default' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
          <p className="text-muted-foreground">Comprehensive inventory tracking and management system</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowAddProduct(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
          <Button onClick={() => setShowCreateOrder(true)} variant="outline">
            <ShoppingCart className="h-4 w-4 mr-2" />
            New Order
          </Button>
          <Button onClick={() => setShowCreateQuotation(true)} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            New Quote
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Sales Orders</TabsTrigger>
          <TabsTrigger value="quotations">Quotations</TabsTrigger>
          <TabsTrigger value="movements">Movements</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <InventoryDashboard />
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Products ({products?.length || 0})
                  </CardTitle>
                  <CardDescription>Manage your product inventory</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
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
                  <Select value={stockFilter} onValueChange={setStockFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Stock" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stock</SelectItem>
                      <SelectItem value="low">Low Stock</SelectItem>
                      <SelectItem value="out">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <div className="text-center py-8">Loading products...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products?.map((product: any) => {
                      const stockStatus = getStockStatus(product);
                      return (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-muted-foreground">{product.description}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{product.sku}</TableCell>
                          <TableCell>{product.product_categories?.name || 'Uncategorized'}</TableCell>
                          <TableCell>{formatCurrency(product.unit_price)}</TableCell>
                          <TableCell>{product.cost_price ? formatCurrency(product.cost_price) : '-'}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{product.inventory[0]?.quantity_available || 0}</span>
                              {stockStatus.status !== 'In Stock' && (
                                <AlertTriangle className="h-4 w-4 text-orange-500" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={stockStatus.color as any}>
                              {stockStatus.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Sales Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="text-center py-8">Loading orders...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Sales Rep</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesOrders?.map((order: any) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono">{order.order_number}</TableCell>
                        <TableCell>
                          {order.clients?.company_name || 
                           (order.leads ? `${order.leads.first_name} ${order.leads.last_name}` : 'N/A')}
                        </TableCell>
                        <TableCell>
                          {order.profiles ? `${order.profiles.first_name} ${order.profiles.last_name}` : 'N/A'}
                        </TableCell>
                        <TableCell>{formatCurrency(order.total_amount)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPaymentStatusColor(order.payment_status)}>
                            {order.payment_status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(order.created_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Quotations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quote #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Sales Rep</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotations?.map((quote: any) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-mono">{quote.quote_number}</TableCell>
                      <TableCell>
                        {quote.clients?.company_name || 
                         (quote.leads ? `${quote.leads.first_name} ${quote.leads.last_name}` : 'N/A')}
                      </TableCell>
                      <TableCell>
                        {quote.profiles ? `${quote.profiles.first_name} ${quote.profiles.last_name}` : 'N/A'}
                      </TableCell>
                      <TableCell>{formatCurrency(quote.total_amount)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(quote.status)}>
                          {quote.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{quote.valid_until ? formatDate(quote.valid_until) : 'N/A'}</TableCell>
                      <TableCell>{formatDate(quote.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Inventory Movements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryMovements?.map((movement: any) => (
                    <TableRow key={movement.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{movement.products?.name}</div>
                          <div className="text-sm text-muted-foreground">{movement.products?.sku}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={movement.quantity > 0 ? "default" : "secondary"}>
                          {movement.movement_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={movement.quantity > 0 ? "text-green-600" : "text-red-600"}>
                          {movement.quantity > 0 ? "+" : ""}{movement.quantity}
                        </span>
                      </TableCell>
                      <TableCell>{movement.notes || '-'}</TableCell>
                      <TableCell>{formatDate(movement.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Inventory Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Advanced reporting features coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddProductDialog open={showAddProduct} onOpenChange={setShowAddProduct} />
      <CreateSalesOrderDialog open={showCreateOrder} onOpenChange={setShowCreateOrder} />
      <CreateQuotationDialog open={showCreateQuotation} onOpenChange={setShowCreateQuotation} />
    </div>
  );
};
