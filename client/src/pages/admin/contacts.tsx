import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Mail, Phone, Calendar, Trash2, ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { contactService } from '@/services/contactService';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export function AdminContacts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const messagesPerPage = 10;
  const queryClient = useQueryClient();

  // Fetch contact messages
  const { data: messages = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ['admin-contact-messages'],
    queryFn: async () => {
      // In a real app, you would fetch this from your API
      // const response = await contactService.getMessages();
      // return response.data;
      
      // Mock data for now
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockMessages: ContactMessage[] = Array.from({ length: 25 }, (_, i) => ({
            id: `msg-${i + 1}`,
            name: `Müşteri ${i + 1}`,
            email: `musteri${i + 1}@example.com`,
            phone: Math.random() > 0.3 ? `05${Math.floor(10000000 + Math.random() * 90000000)}` : undefined,
            subject: `Soru ${i + 1} hakkında`,
            message: `Merhaba, ${i + 1} numaralı ürün hakkında bilgi almak istiyorum.`,
            status: (['new', 'read', 'replied', 'archived'] as const)[Math.floor(Math.random() * 4)],
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
          }));
          resolve(mockMessages);
        }, 500);
      });
    },
  });

  // Update message status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      // In a real app, you would call your API
      // await contactService.updateMessageStatus(id, status);
      return { id, status };
    },
    onSuccess: ({ id, status }) => {
      // Update the cache
      queryClient.setQueryData<ContactMessage[]>(['admin-contact-messages'], (old) =>
        old?.map(msg => msg.id === id ? { ...msg, status } : msg) || []
      );
    },
  });

  // Delete message mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // In a real app, you would call your API
      // await contactService.deleteMessage(id);
      return id;
    },
    onSuccess: (id) => {
      // Update the cache
      queryClient.setQueryData<ContactMessage[]>(['admin-contact-messages'], (old) =>
        old?.filter(msg => msg.id !== id) || []
      );
    },
  });

  // Filter messages based on search term and status
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (message.phone && message.phone.includes(searchTerm));
    
    const matchesStatus = selectedStatus ? message.status === selectedStatus : true;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy HH:mm', { locale: tr });
  };

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-gray-100 text-gray-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status display text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return 'Yeni';
      case 'read':
        return 'Okundu';
      case 'replied':
        return 'Yanıtlandı';
      case 'archived':
        return 'Arşivlendi';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">İletişim Mesajları</h2>
          <p className="text-sm text-muted-foreground">
            Müşterilerinizden gelen mesajları görüntüleyin ve yönetin
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Mesaj ara..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on new search
                }}
              />
            </div>
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    {selectedStatus ? getStatusText(selectedStatus) : 'Tüm Durumlar'}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedStatus(null)}>
                    Tümü
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus('new')}>
                    Yeni
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus('read')}>
                    Okundu
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus('replied')}>
                    Yanıtlandı
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus('archived')}>
                    Arşivlendi
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gönderen</TableHead>
                  <TableHead>Konu</TableHead>
                  <TableHead>İletişim</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentMessages.length > 0 ? (
                  currentMessages.map((message) => (
                    <TableRow key={message.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{message.name}</span>
                          <span className="text-sm text-muted-foreground">{message.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="line-clamp-2">{message.subject}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <a 
                            href={`mailto:${message.email}`} 
                            className="text-primary hover:underline flex items-center"
                            title="E-posta gönder"
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            <span className="sr-only">E-posta gönder</span>
                          </a>
                          {message.phone && (
                            <a 
                              href={`tel:${message.phone}`} 
                              className="text-primary hover:underline flex items-center"
                              title="Ara"
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              <span className="sr-only">Ara</span>
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusVariant(message.status)}>
                          {getStatusText(message.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-1 h-4 w-4 opacity-70" />
                          {formatDate(message.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Daha fazla</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => updateStatusMutation.mutate({ id: message.id, status: 'read' })}
                              disabled={message.status === 'read'}
                            >
                              Okundu olarak işaretle
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateStatusMutation.mutate({ id: message.id, status: 'replied' })}
                              disabled={message.status === 'replied'}
                            >
                              Yanıtlandı olarak işaretle
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateStatusMutation.mutate({ id: message.id, status: 'archived' })}
                              disabled={message.status === 'archived'}
                            >
                              Arşive taşı
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => deleteMutation.mutate(message.id)}
                              disabled={deleteMutation.isPending}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      {searchTerm || selectedStatus ? 'Aranan kriterlere uygun mesaj bulunamadı.' : 'Henüz mesaj bulunmuyor.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {filteredMessages.length > 0 && (
          <CardFooter className="flex items-center justify-between border-t px-6 py-4">
            <div className="text-sm text-muted-foreground">
              Toplam <span className="font-medium">{filteredMessages.length}</span> mesajdan{' '}
              <span className="font-medium">
                {Math.min(indexOfFirstMessage + 1, filteredMessages.length)}-
                {Math.min(indexOfLastMessage, filteredMessages.length)}
              </span>{' '}
              arası gösteriliyor
            </div>
            <Pagination className="m-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink 
                        href="#"
                        isActive={currentPage === pageNumber}
                        onClick={(e) => {
                          e.preventDefault();
                          paginate(pageNumber);
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages || totalPages === 0 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
