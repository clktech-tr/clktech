import { api } from '@/lib/api';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const contactService = {
  /**
   * Submit a contact form
   */
  async submitContactForm(data: ContactFormData) {
    try {
      const response = await api.post<{ success: boolean; message?: string }>(
        '/api/contact',
        data
      );
      return {
        success: true,
        message: response.message || 'Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.',
      };
    } catch (error) {
      console.error('Contact form submission failed:', error);
      
      let errorMessage = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
      
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
        
        // Handle specific error status codes
        if ('status' in error) {
          switch (error.status) {
            case 400:
              errorMessage = 'Geçersiz form verisi. Lütfen tüm alanları doğru şekilde doldurduğunuzdan emin olun.';
              break;
            case 429:
              errorMessage = 'Çok fazla istek gönderdiniz. Lütfen bir süre bekleyip tekrar deneyin.';
              break;
          }
        }
      }
      
      return {
        success: false,
        message: errorMessage,
      };
    }
  },

  /**
   * Get all contact messages (admin only)
   */
  async getContactMessages() {
    try {
      return await api.get<Array<ContactFormData & { id: number; createdAt: string }>>(
        '/api/admin/contacts'
      );
    } catch (error) {
      console.error('Failed to fetch contact messages:', error);
      throw error;
    }
  },

  /**
   * Delete a contact message (admin only)
   */
  async deleteContactMessage(id: number) {
    try {
      return await api.delete(`/api/admin/contacts/${id}`);
    } catch (error) {
      console.error('Failed to delete contact message:', error);
      throw error;
    }
  },
};
