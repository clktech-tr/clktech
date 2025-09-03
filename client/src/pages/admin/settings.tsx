import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Settings, Mail, Phone, MapPin, Globe, CreditCard, Truck, Bell, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

// Form schemas
const storeInfoSchema = z.object({
  storeName: z.string().min(3, 'Mağaza adı en az 3 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  address: z.string().min(10, 'Adres en az 10 karakter olmalıdır'),
  city: z.string().min(2, 'Şehir en az 2 karakter olmalıdır'),
  country: z.string().min(2, 'Ülke en az 2 karakter olmalıdır'),
  postalCode: z.string().min(3, 'Posta kodu en az 3 karakter olmalıdır'),
});

const shippingSchema = z.object({
  shippingEnabled: z.boolean().default(true),
  freeShippingThreshold: z.number().min(0).optional(),
});

const paymentSchema = z.object({
  creditCard: z.boolean().default(true),
  bankTransfer: z.boolean().default(true),
  cashOnDelivery: z.boolean().default(true),
});

type StoreInfoFormValues = z.infer<typeof storeInfoSchema>;
type ShippingFormValues = z.infer<typeof shippingSchema>;
type PaymentFormValues = z.infer<typeof paymentSchema>;

export function AdminSettings() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('store');

  // Store Info Form
  const storeInfoForm = useForm<StoreInfoFormValues>({
    resolver: zodResolver(storeInfoSchema),
    defaultValues: {
      storeName: 'CLK Tech',
      email: 'info@clktech.com',
      phone: '05551234567',
      address: 'Örnek Mah. Örnek Sokak No:1',
      city: 'İstanbul',
      country: 'Türkiye',
      postalCode: '34000',
    },
  });

  // Shipping Form
  const shippingForm = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      shippingEnabled: true,
      freeShippingThreshold: 1000,
    },
  });

  // Payment Form
  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      creditCard: true,
      bankTransfer: true,
      cashOnDelivery: true,
    },
  });

  // Handle form submissions
  const onStoreInfoSubmit = async (data: StoreInfoFormValues) => {
    try {
      setIsSaving(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: 'Başarılı', description: 'Mağaza bilgileri güncellendi.' });
    } catch (error) {
      console.error('Error:', error);
      toast({ variant: 'destructive', title: 'Hata', description: 'Bir hata oluştu.' });
    } finally {
      setIsSaving(false);
    }
  };

  const onShippingSubmit = async (data: ShippingFormValues) => {
    try {
      setIsSaving(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: 'Başarılı', description: 'Kargo ayarları güncellendi.' });
    } catch (error) {
      console.error('Error:', error);
      toast({ variant: 'destructive', title: 'Hata', description: 'Bir hata oluştu.' });
    } finally {
      setIsSaving(false);
    }
  };

  const onPaymentSubmit = async (data: PaymentFormValues) => {
    try {
      setIsSaving(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: 'Başarılı', description: 'Ödeme ayarları güncellendi.' });
    } catch (error) {
      console.error('Error:', error);
      toast({ variant: 'destructive', title: 'Hata', description: 'Bir hata oluştu.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Ayarlar</h2>
        <p className="text-sm text-muted-foreground">Mağaza ayarlarınızı yönetin</p>
      </div>

      <Tabs defaultValue="store" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="store"><Settings className="h-4 w-4 mr-2" /> Mağaza</TabsTrigger>
          <TabsTrigger value="shipping"><Truck className="h-4 w-4 mr-2" /> Kargo</TabsTrigger>
          <TabsTrigger value="payment"><CreditCard className="h-4 w-4 mr-2" /> Ödeme</TabsTrigger>
        </TabsList>

        {/* Store Settings */}
        <TabsContent value="store">
          <Form {...storeInfoForm}>
            <form onSubmit={storeInfoForm.handleSubmit(onStoreInfoSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Mağaza Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={storeInfoForm.control}
                      name="storeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mağaza Adı</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={storeInfoForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-posta</FormLabel>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <FormControl>
                              <Input className="pl-10" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={storeInfoForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon</FormLabel>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <FormControl>
                              <Input className="pl-10" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={storeInfoForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adres</FormLabel>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                              <Textarea className="pl-10 min-h-[80px]" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={storeInfoForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Şehir</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={storeInfoForm.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ülke</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={storeInfoForm.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Posta Kodu</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardContent className="flex justify-end border-t pt-4">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving && activeTab === 'store' ? (
                      <span className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Kaydet
                  </Button>
                </CardContent>
              </Card>
            </form>
          </Form>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping">
          <Form {...shippingForm}>
            <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Kargo Ayarları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Kargoyu Etkinleştir</h4>
                      <p className="text-sm text-muted-foreground">Müşterileriniz ürünleri kargoyla teslim alabilecek</p>
                    </div>
                    <FormField
                      control={shippingForm.control}
                      name="shippingEnabled"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {shippingForm.watch('shippingEnabled') && (
                    <div className="space-y-4 pt-4">
                      <FormField
                        control={shippingForm.control}
                        name="freeShippingThreshold"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ücretsiz Kargo Eşiği (₺)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0"
                                step="0.01"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </CardContent>
                <CardContent className="flex justify-end border-t pt-4">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving && activeTab === 'shipping' ? (
                      <span className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Kaydet
                  </Button>
                </CardContent>
              </Card>
            </form>
          </Form>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <Form {...paymentForm}>
            <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Ödeme Ayarları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Ödeme Yöntemleri</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h5 className="font-medium">Kredi Kartı</h5>
                          <p className="text-sm text-muted-foreground">
                            Müşterileriniz kredi kartlarıyla ödeme yapabilir
                          </p>
                        </div>
                        <FormField
                          control={paymentForm.control}
                          name="creditCard"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h5 className="font-medium">Havale/EFT</h5>
                          <p className="text-sm text-muted-foreground">
                            Müşterileriniz banka havalesi ile ödeme yapabilir
                          </p>
                        </div>
                        <FormField
                          control={paymentForm.control}
                          name="bankTransfer"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h5 className="font-medium">Kapıda Ödeme</h5>
                          <p className="text-sm text-muted-foreground">
                            Müşterileriniz kapıda nakit veya kredi kartı ile ödeme yapabilir
                          </p>
                        </div>
                        <FormField
                          control={paymentForm.control}
                          name="cashOnDelivery"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardContent className="flex justify-end border-t pt-4">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving && activeTab === 'payment' ? (
                      <span className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Kaydet
                  </Button>
                </CardContent>
              </Card>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
