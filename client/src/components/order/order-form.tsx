import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOrderSchema } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";
import { z } from "zod";

const orderFormSchema = insertOrderSchema.extend({
  productId: z.number(),
  productName: z.string(),
  price: z.string(),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

interface OrderFormProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderForm({ product, isOpen, onClose }: OrderFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
      productId: product?.id || 0,
      productName: product?.name || "",
      price: product?.price || "0",
      status: "pending",
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: OrderFormData) => {
      const response = await apiRequest("POST", "/api/orders", data);
      return response.json();
    },
    onSuccess: (order) => {
      toast({
        title: "Order Submitted Successfully!",
        description: `Order ${order.orderId} has been created. You will receive bank transfer details via email.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      form.reset();
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: OrderFormData) => {
    createOrderMutation.mutate(data);
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold clk-text-black">
            Order via Bank Transfer
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="customerName">Full Name</Label>
              <Input
                id="customerName"
                {...form.register("customerName")}
                className="mt-1"
              />
              {form.formState.errors.customerName && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.customerName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                className="mt-1"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              {...form.register("phone")}
              className="mt-1"
            />
            {form.formState.errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="address">Shipping Address</Label>
            <Textarea
              id="address"
              {...form.register("address")}
              rows={3}
              className="mt-1"
            />
            {form.formState.errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              {...form.register("notes")}
              rows={3}
              className="mt-1"
              placeholder="Any special instructions or questions..."
            />
          </div>
          
          <div className="order-status p-4 rounded-lg">
            <h3 className="font-semibold clk-text-black mb-2">Bank Transfer Information:</h3>
            <div className="text-sm space-y-1">
              <p><strong>Bank:</strong> CLK Bank</p>
              <p><strong>Account Number:</strong> 1234567890</p>
              <p><strong>IBAN:</strong> TR12 3456 7890 1234 5678 9012</p>
              <p><strong>Reference:</strong> Order #{product.name}</p>
            </div>
          </div>
          
          <Button
            type="submit"
            className="btn-primary w-full py-3"
            disabled={createOrderMutation.isPending}
          >
            {createOrderMutation.isPending ? "Submitting..." : "Submit Order"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
