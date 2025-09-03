import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function AdminLayout() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // Handle scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      name: 'Genel Bakış',
      icon: LayoutDashboard,
      path: '/admin',
    },
    {
      name: 'Ürünler',
      icon: Package,
      path: '/admin/urunler',
    },
    {
      name: 'Siparişler',
      icon: ShoppingCart,
      path: '/admin/siparisler',
    },
    {
      name: 'İletişim Mesajları',
      icon: MessageSquare,
      path: '/admin/iletisim',
    },
    {
      name: 'Ayarlar',
      icon: Settings,
      path: '/admin/ayarlar',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 p-2 rounded-md text-gray-500 lg:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex h-16 items-center justify-center border-b border-gray-200 px-4">
          <Link to="/admin" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">CLK Tech Admin</span>
          </Link>
        </div>
        
        <nav className="mt-6 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'group flex items-center px-4 py-3 text-sm font-medium rounded-md',
                'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                'transition-colors duration-150',
                location.pathname === item.path ? 'bg-gray-100 text-gray-900' : ''
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  'text-gray-400 group-hover:text-gray-500',
                  location.pathname === item.path ? 'text-gray-500' : ''
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name || 'Admin'}</p>
              <p className="text-xs font-medium text-gray-500">{user?.email || 'admin@clktech.com'}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 w-full justify-start text-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Çıkış Yap
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <header
          className={cn(
            'sticky top-0 z-30 flex h-16 flex-shrink-0 bg-white shadow-sm transition-shadow duration-200',
            isScrolled ? 'shadow' : 'shadow-none'
          )}
        >
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1 items-center justify-end">
              <div className="ml-4 flex items-center lg:ml-6">
                <span className="text-sm text-gray-500">
                  Hoş geldiniz, <span className="font-medium text-gray-900">{user?.name || 'Yönetici'}</span>
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
