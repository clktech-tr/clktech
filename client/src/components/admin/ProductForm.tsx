import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, X, Image as ImageIcon, Upload, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const productFormSchema = z.object({
  name: z.string().min(3, 'Ürün adı en az 3 karakter olmalıdır'),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalıdır'),
  price: z.coerce.number().min(0, 'Fiyat 0 veya daha büyük olmalıdır'),
  quantity: z.coerce.number().min(0, 'Miktar 0 veya daha büyük olmalıdır'),
  category: z.string().min(1, 'Kategori seçmelisiniz'),
  status: z.enum(['active', 'draft', 'archived']),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const CATEGORIES = ['Elektronik', 'Giyim', 'Ev & Yaşam', 'Kişisel Bakım', 'Spor', 'Diğer'];

export function ProductForm({ isEditMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      category: '',
      status: 'draft',
    },
  });

  useEffect(() => {
    if (!isEditMode || !id) return;
    
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        form.reset({
          name: 'Örnek Ürün',
          description: 'Bu örnek bir ürün açıklamasıdır.',
          price: 199.99,
          quantity: 100,
          category: 'Elektronik',
          status: 'active',
        });
        
        setImages(['https://picsum.photos/800/800?random=1']);
      } catch (error) {
        console.error('Error:', error);
        toast({
          variant: 'destructive',
          title: 'Hata',
          description: 'Bir hata oluştu.',
        });
        navigate('/admin/products');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, isEditMode, form, navigate, toast]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Başarılı',
        description: isEditMode ? 'Ürün güncellendi.' : 'Ürün oluşturuldu.',
      });
      
      navigate('/admin/products');
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Bir hata oluştu.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditMode) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ürün Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ürün Adı</FormLabel>
                      <FormControl>
                        <Input placeholder="Ürün adı" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Açıklama</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Açıklama" className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Kategori seçiniz" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CATEGORIES.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Durum</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Durum seçiniz" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Taslak</SelectItem>
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="archived">Arşivlendi</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fiyat (₺)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stok Adedi</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ürün Görseli</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {images.length > 0 ? (
                    <div className="relative group">
                      <img
                        src={images[0]}
                        alt="Ürün"
                        className="rounded-md w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImages([])}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80">
                          <span>Resim Yükle</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={() => setImages(['https://picsum.photos/800/800?random=1'])}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/products')}
                disabled={isLoading}
              >
                İptal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? 'Güncelle' : 'Oluştur'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
