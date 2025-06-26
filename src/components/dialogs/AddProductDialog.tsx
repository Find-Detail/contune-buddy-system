
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/forms/ProductForm";
import { useAddProduct } from "@/hooks/useAddProduct";
import { productSchema, ProductFormData } from "@/schemas/productSchema";

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
    },
  });

  const onSubmit = (data: ProductFormData) => {
    addProductMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Add a new product to your inventory system.
          </DialogDescription>
        </DialogHeader>

        <ProductForm 
          form={form} 
          onSubmit={onSubmit} 
          isLoading={addProductMutation.isPending} 
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={addProductMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {addProductMutation.isPending ? "Adding..." : "Add Product"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
