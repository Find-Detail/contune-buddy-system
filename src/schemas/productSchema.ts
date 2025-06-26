
import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(255, "Name too long"),
  description: z.string().optional(),
  sku: z.string().min(1, "SKU is required").regex(/^[A-Z0-9-]+$/, "SKU must contain only uppercase letters, numbers, and hyphens"),
  category_id: z.string().optional(),
  unit_price: z.number().min(0, "Price must be positive").max(999999, "Price too high"),
  cost_price: z.number().min(0, "Cost must be positive").max(999999, "Cost too high").optional(),
  weight: z.number().min(0, "Weight must be positive").max(9999, "Weight too high").optional(),
  reorder_level: z.number().min(0, "Reorder level must be positive").max(99999, "Reorder level too high").optional(),
  initial_stock: z.number().min(0, "Initial stock must be positive").max(999999, "Initial stock too high").optional(),
  barcode: z.string().optional(),
  supplier: z.string().optional(),
  brand: z.string().optional(),
  warranty_period: z.number().min(0, "Warranty period must be positive").optional(),
  tags: z.array(z.string()).optional(),
}).refine((data) => {
  if (data.cost_price && data.unit_price) {
    return data.unit_price >= data.cost_price;
  }
  return true;
}, {
  message: "Unit price must be greater than or equal to cost price",
  path: ["unit_price"],
});

export type ProductFormData = z.infer<typeof productSchema>;
