
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useInventoryAnalytics } from "@/hooks/useInventoryAnalytics";
import { Package, TrendingUp, AlertTriangle, DollarSign, BarChart3, Activity } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const InventoryDashboard = () => {
  const { data: analytics, isLoading } = useInventoryAnalytics();

  if (isLoading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  const stockHealthPercentage = analytics?.totalProducts 
    ? ((analytics.totalProducts - analytics.lowStockCount - analytics.outOfStockCount) / analytics.totalProducts) * 100
    : 100;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics?.totalProducts}</div>
          <p className="text-xs text-muted-foreground">Active products in inventory</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(analytics?.totalValue || 0)}</div>
          <p className="text-xs text-muted-foreground">
            Retail: {formatCurrency(analytics?.totalRetailValue || 0)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Stock Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {(analytics?.lowStockCount || 0) + (analytics?.outOfStockCount || 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            {analytics?.lowStockCount} low, {analytics?.outOfStockCount} out
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Stock Health</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stockHealthPercentage.toFixed(1)}%</div>
          <Progress value={stockHealthPercentage} className="mt-2" />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Stock Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics?.outOfStockProducts?.slice(0, 3).map((product: any) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                </div>
                <Badge variant="destructive">Out of Stock</Badge>
              </div>
            ))}
            {analytics?.lowStockProducts?.slice(0, 3).map((product: any) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.inventory[0]?.quantity_available} left (Reorder: {product.inventory[0]?.reorder_level})
                  </p>
                </div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">Low Stock</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics?.recentMovements?.map((movement: any) => (
              <div key={movement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{movement.products?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {movement.movement_type} - {movement.quantity} units
                  </p>
                </div>
                <Badge variant={movement.quantity > 0 ? "default" : "secondary"}>
                  {movement.quantity > 0 ? "+" : ""}{movement.quantity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
