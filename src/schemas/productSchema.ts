
import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  sku: z.string().min(1, "SKU is required"),
  category_id: z.string().optional(),
  unit_price: z.number().min(0, "Price must be positive"),
  cost_price: z.number().min(0, "Cost must be positive").optional(),
  weight: z.number().min(0, "Weight must be positive").optional(),
  reorder_level: z.number().min(0, "Reorder level must be positive").optional(),
  initial_stock: z.number().min(0, "Initial stock must be positive").optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
