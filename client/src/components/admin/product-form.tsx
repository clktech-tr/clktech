import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";
import { z } from "zod";

const productFormSchema = insertProductSchema.extend({
  imageFile: z.any().optional(),
});

type ProductFormData = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductForm({ product, isOpen, onClose }: ProductFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!product;

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      description: product?.description || "",
      fullDescription: product?.fullDescription || "",
      price: product?.price || "",
      image: product?.image || "",
      category: product?.category || "",
      inStock: product?.inStock ?? true,
      specs: product?.specs || JSON.stringify({
        microcontroller: "",
        flash: "",
        ram: "",
        voltage: "",
        digital_io: "",
        analog_inputs: ""
      }),
      externalLinks: product?.externalLinks || JSON.stringify({
        "Etsy": "",
        "N11": "",
        "Trendyol": ""
      }),
    },
  });

  const productMutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const formData = new FormData();
      
      // Append all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (key === "imageFile" && value?.[0]) {
          formData.append("image", value[0]);
        } else if (key !== "imageFile") {
          formData.append(key, String(value));
        }
      });

      const url = isEditing ? `/api/admin/products/${product.id}` : "/api/admin/products";
      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: isEditing ? "Product Updated" : "Product Created",
        description: `Product has been ${isEditing ? "updated" : "created"} successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      form.reset();
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} product. ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProductFormData) => {
    productMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold clk-text-black">
            {isEditing ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                {...form.register("name")}
                className="mt-1"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="slug">Product Slug (URL-friendly)</Label>
              <Input
                id="slug"
                {...form.register("slug")}
                className="mt-1"
                placeholder="product-name"
              />
              {form.formState.errors.slug && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.slug.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                {...form.register("price")}
                className="mt-1"
              />
              {form.formState.errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              rows={3}
              className="mt-1"
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="fullDescription">Full Description</Label>
            <Textarea
              id="fullDescription"
              {...form.register("fullDescription")}
              rows={4}
              className="mt-1"
            />
            {form.formState.errors.fullDescription && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.fullDescription.message}
              </p>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                {...form.register("category")}
                className="mt-1"
              />
              {form.formState.errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.category.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="imageFile">Product Image</Label>
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                {...form.register("imageFile")}
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="specs">Technical Specifications (JSON)</Label>
            <Textarea
              id="specs"
              {...form.register("specs")}
              rows={6}
              className="mt-1 font-mono text-sm"
              placeholder='{"microcontroller": "ARM Cortex-M4", "flash": "256KB", "ram": "64KB"}'
            />
            {form.formState.errors.specs && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.specs.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="externalLinks">External Store Links (JSON)</Label>
            <Textarea
              id="externalLinks"
              {...form.register("externalLinks")}
              rows={4}
              className="mt-1 font-mono text-sm"
              placeholder='{"Etsy": "https://etsy.com/listing/...", "N11": "https://n11.com/...", "Trendyol": "https://trendyol.com/..."}'
            />
            {form.formState.errors.externalLinks && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.externalLinks.message}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="inStock"
              checked={form.watch("inStock")}
              onCheckedChange={(checked) => form.setValue("inStock", checked)}
            />
            <Label htmlFor="inStock">In Stock</Label>
          </div>
          
          <Button
            type="submit"
            className="btn-primary w-full py-3"
            disabled={productMutation.isPending}
          >
            {productMutation.isPending
              ? (isEditing ? "Updating..." : "Creating...")
              : (isEditing ? "Update Product" : "Create Product")
            }
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
