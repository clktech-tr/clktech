import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Activity, Package, ShoppingCart, Users, DollarSign, TrendingUp } from 'lucide-react';

// Mock data for the dashboard
const mockDashboardData = {
  stats: [
    { name: 'Toplam Ürün', value: '156', change: '+12%', icon: Package },
    { name: 'Toplam Sipariş', value: '1,234', change: '+8%', icon: ShoppingCart },
    { name: 'Yeni Müşteriler', value: '89', change: '+5%', icon: Users },
    { name: 'Toplam Gelir', value: '₺45,678', change: '+15%', icon: DollarSign },
  ],
  recentOrders: [
    { id: 1, customer: 'Ahmet Yılmaz', amount: '₺1,234', status: 'Tamamlandı', date: '2023-04-15' },
    { id: 2, customer: 'Mehmet Demir', amount: '₺987', status: 'İşlemde', date: '2023-04-14' },
    { id: 3, customer: 'Ayşe Kaya', amount: '₺1,543', status: 'Kargoda', date: '2023-04-14' },
    { id: 4, customer: 'Zeynep Şahin', amount: '₺2,100', status: 'Tamamlandı', date: '2023-04-13' },
    { id: 5, customer: 'Mustafa Yıldız', amount: '₺756', status: 'İptal Edildi', date: '2023-04-12' },
  ],
  salesData: [
    { name: 'Oca', value: 4000 },
    { name: 'Şub', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Nis', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Haz', value: 2390 },
  ],
};

// Format date to Turkish locale
const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'dd MMMM yyyy', { locale: tr });
};

export default function AdminDashboard() {
  // Fetch real data from the API
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      // In a real app, you would fetch this from your API
      // const response = await api.get('/api/admin/dashboard');
      // return response.data;
      
      // For now, return mock data
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockDashboardData), 500);
      });
    },
  });

  if (isLoading || !dashboardData) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[110px] w-full rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="col-span-4 h-[400px] w-full rounded-xl" />
          <Skeleton className="col-span-3 h-[400px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardData.stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                {stat.change} geçen aya göre
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Satış Grafiği</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardData.salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    fontSize={12} 
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₺${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`₺${value}`, 'Satış']}
                    labelFormatter={(label) => `${label} Ayı`}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#8884d8" 
                    radius={[4, 4, 0, 0]}
                    animationBegin={200}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Son Siparişler</CardTitle>
            <p className="text-sm text-muted-foreground">Son 5 siparişiniz</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-medium">{order.amount}</p>
                    <span 
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === 'Tamamlandı' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'İptal Edildi'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Son Etkinlikler</CardTitle>
          <p className="text-sm text-muted-foreground">Sistemdeki son işlemler</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium">Yeni sipariş alındı</p>
                  <p className="text-sm text-muted-foreground">
                    #ORD-{1000 + i} numaralı sipariş oluşturuldu.
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                  {i} saat önce
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
