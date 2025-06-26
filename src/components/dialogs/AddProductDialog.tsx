
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/forms/ProductForm";
import { useAddProduct } from "@/hooks/useAddProduct";
import { productSchema, ProductFormData } from "@/schemas/productSchema";
import { generateSKU } from "@/lib/utils";
import { useEffect } from "react";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddProductDialog = ({ open, onOpenChange }: AddProductDialogProps) => {
  const addProductMutation = useAddProduct();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      sku: "",
      unit_price: 0,
      cost_price: 0,
      weight: 0,
      reorder_level: 10,
      initial_stock: 0,
      barcode: "",
      supplier: "",
      brand: "",
      warranty_period: 12,
      tags: [],
    },
  });

  // Auto-generate SKU when product name changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'name' && value.name && !form.getValues('sku')) {
        form.setValue('sku', generateSKU(value.name));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (data: ProductFormData) => {
    addProductMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      }
    });
  };

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Create a new product and set up its inventory details. All required fields are marked with *.
          </DialogDescription>
        </DialogHeader>

        <ProductForm 
          form={form} 
          onSubmit={onSubmit} 
          isLoading={addProductMutation.isPending} 
        />

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={addProductMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {addProductMutation.isPending ? "Adding Product..." : "Add Product"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
