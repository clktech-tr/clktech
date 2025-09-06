import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, MoreHorizontal, Package, Check, X, Truck, Clock, CreditCard, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  orderDate: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  trackingNumber?: string;
}

export function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const ordersPerPage = 10;

  // Fetch orders from API
  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      // In a real app, you would fetch this from your API
      // const response = await api.get('/api/admin/orders');
      // return response.data;
      
      // Mock data for now
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockOrders: Order[] = Array.from({ length: 25 }, (_, i) => {
            const statuses: Array<Order['status']> = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
            const paymentStatuses: Array<Order['paymentStatus']> = ['pending', 'paid', 'refunded', 'failed'];
            
            return {
              id: `ORD-${1000 + i}`,
              customer: {
                name: `Müşteri ${i + 1}`,
                email: `musteri${i + 1}@example.com`,
                phone: `05${Math.floor(10000000 + Math.random() * 90000000)}`,
              },
              items: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
                id: `item-${i}-${j}`,
                name: `Ürün ${j + 1}`,
                quantity: Math.floor(Math.random() * 5) + 1,
                price: Math.floor(Math.random() * 500) + 50,
                image: `https://picsum.photos/200/200?random=${i}${j}`,
              })),
              total: Math.floor(Math.random() * 2000) + 100,
              status: statuses[Math.floor(Math.random() * statuses.length)],
              paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
              orderDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
              shippingAddress: {
                fullName: `Müşteri ${i + 1}`,
                address: `Örnek Mah. ${i + 1}. Sokak No:${i + 1}`,
                city: ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'][Math.floor(Math.random() * 5)],
                country: 'Türkiye',
                postalCode: `${34000 + i}`,
              },
              trackingNumber: Math.random() > 0.3 ? `TRK${Math.floor(10000000 + Math.random() * 90000000)}` : undefined,
            };
          });
          
          // Sort by date (newest first)
          mockOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
          resolve(mockOrders);
        }, 500);
      });
    },
  });

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm) ||
      (order.trackingNumber && order.trackingNumber.includes(searchTerm));
    
    const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy HH:mm', { locale: tr });
  };

  // Get status badge variant and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          variant: 'bg-yellow-100 text-yellow-800', 
          icon: <Clock className="h-4 w-4 mr-1" />,
          text: 'Bekliyor' 
        };
      case 'processing':
        return { 
          variant: 'bg-blue-100 text-blue-800',
          icon: <Package className="h-4 w-4 mr-1" />,
          text: 'Hazırlanıyor' 
        };
      case 'shipped':
        return { 
          variant: 'bg-indigo-100 text-indigo-800',
          icon: <Truck className="h-4 w-4 mr-1" />,
          text: 'Kargoda' 
        };
      case 'delivered':
        return { 
          variant: 'bg-green-100 text-green-800',
          icon: <Check className="h-4 w-4 mr-1" />,
          text: 'Teslim Edildi' 
        };
      case 'cancelled':
        return { 
          variant: 'bg-red-100 text-red-800',
          icon: <X className="h-4 w-4 mr-1" />,
          text: 'İptal Edildi' 
        };
      default:
        return { 
          variant: 'bg-gray-100 text-gray-800',
          icon: <Clock className="h-4 w-4 mr-1" />,
          text: status 
        };
    }
  };

  // Get payment status badge variant
  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get payment status text
  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Ödeme Bekliyor';
      case 'paid':
        return 'Ödendi';
      case 'refunded':
        return 'İade Edildi';
      case 'failed':
        return 'Ödeme Başarısız';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Siparişler</h2>
          <p className="text-sm text-muted-foreground">
            Müşteri siparişlerini görüntüleyin ve yönetin
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
                placeholder="Sipariş ara..."
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
                    <Filter className="mr-2 h-4 w-4" />
                    {selectedStatus ? getStatusInfo(selectedStatus).text : 'Tüm Durumlar'}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedStatus(null)}>
                    Tümü
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus('pending')}>
                    Bekleyenler
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus('processing')}>
                    Hazırlananlar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus('shipped')}>
                    Kargodakiler
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus('delivered')}>
                    Teslim Edilenler
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus('cancelled')}>
                    İptal Edilenler
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
                  <TableHead>Sipariş No</TableHead>
                  <TableHead>Müşteri</TableHead>
                  <TableHead>Ürünler</TableHead>
                  <TableHead>Tutar</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Ödeme</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status);
                    
                    return (
                      <TableRow key={order.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{order.id}</span>
                            {order.trackingNumber && (
                              <span className="text-xs text-muted-foreground">
                                Takip No: {order.trackingNumber}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{order.customer.name}</span>
                            <span className="text-sm text-muted-foreground">{order.customer.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex -space-x-2">
                            {order.items.slice(0, 3).map((item, i) => (
                              <div key={i} className="relative">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-8 w-8 rounded-full border-2 border-background"
                                />
                                {i === 2 && order.items.length > 3 && (
                                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-xs text-white">
                                    +{order.items.length - 3}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {order.total.toFixed(2)} ₺
                        </TableCell>
                        <TableCell>
                          <Badge className={`${statusInfo.variant} flex items-center w-fit`}>
                            {statusInfo.icon}
                            {statusInfo.text}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPaymentStatusVariant(order.paymentStatus)}>
                            {getPaymentStatusText(order.paymentStatus)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatDate(order.orderDate)}
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
                              <DropdownMenuItem>
                                Detayları Görüntüle
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Fatura Oluştur
                              </DropdownMenuItem>
                              <DropdownMenuItem disabled={order.status === 'shipped' || order.status === 'delivered'}>
                                Kargoya Ver
                              </DropdownMenuItem>
                              <DropdownMenuItem disabled={order.status === 'delivered' || order.status === 'cancelled'}>
                                Tamamlandı Olarak İşaretle
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" disabled={order.status === 'cancelled'}>
                                İptal Et
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      {searchTerm || selectedStatus ? 'Aranan kriterlere uygun sipariş bulunamadı.' : 'Henüz sipariş bulunmuyor.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {filteredOrders.length > 0 && (
          <div className="flex items-center justify-between border-t px-6 py-4">
            <div className="text-sm text-muted-foreground">
              Toplam <span className="font-medium">{filteredOrders.length}</span> siparişten{' '}
              <span className="font-medium">
                {Math.min(indexOfFirstOrder + 1, filteredOrders.length)}-
                {Math.min(indexOfLastOrder, filteredOrders.length)}
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
          </div>
        )}
      </Card>
    </div>
  );
}
