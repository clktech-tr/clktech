import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { contactService } from '@/services/contactService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır').max(50, 'İsim en fazla 50 karakter olabilir'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz').max(20, 'Telefon numarası çok uzun'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır').max(1000, 'Mesaj en fazla 1000 karakter olabilir'),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      const response = await contactService.submitContactForm(data);
      
      if (response.success) {
        form.reset();
        toast({
          title: 'Başarılı!',
          description: response.message,
          variant: 'default',
        });
      } else {
        throw new Error(response.message || 'Bir hata oluştu');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      toast({
        title: 'Hata!',
        description: error instanceof Error ? error.message : 'Bir hata oluştu. Lütfen tekrar deneyin.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Bize Ulaşın</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adınız Soyadınız *</FormLabel>
                  <FormControl>
                    <Input placeholder="Adınız Soyadınız" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-posta Adresiniz *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="ornek@email.com" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon Numaranız *</FormLabel>
                <FormControl>
                  <Input placeholder="5__ ___ __ __" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mesajınız *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Mesajınızı buraya yazın..." 
                    className="min-h-[120px]" 
                    {...field} 
                    disabled={isSubmitting} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gönderiliyor...
                </>
              ) : 'Gönder'}
            </Button>
          </div>
        </form>
      </Form>
      
      <p className="mt-4 text-sm text-muted-foreground text-center">
        * İşaretli alanlar zorunludur.
      </p>
    </div>
  );
}
