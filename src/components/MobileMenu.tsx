import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Laptop, Info, Phone, X, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const links = [
    { to: '/', icon: Home, label: 'الرئيسية' },
    { to: '/catalog', icon: Laptop, label: 'اللابتوبات' },
    { to: '/about', icon: Info, label: 'من نحن' },
    { to: '/contact', icon: Phone, label: 'اتصل بنا' },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
      <div 
        className="fixed bottom-0 left-0 right-0 bg-dark-400 rounded-t-2xl p-6 transform transition-transform duration-300 ease-in-out"
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">القائمة</h2>
          <button onClick={onClose} className="p-2">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="space-y-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-300 transition-colors"
                onClick={onClose}
              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          {user?.user_metadata?.role === 'admin' && (
            <Link
              to="/admin"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-300 transition-colors"
              onClick={onClose}
            >
              <Laptop className="h-5 w-5" />
              <span>لوحة التحكم</span>
            </Link>
          )}
          {user ? (
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-dark-300 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>تسجيل خروج</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-300 transition-colors"
              onClick={onClose}
            >
              <LogIn className="h-5 w-5" />
              <span>تسجيل دخول</span>
            </Link>
          )}
          {user ? (
                null
                  ) : (
                    <Link
                      to="/register"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-dark-300"
                    >
                      <LogIn className="h-5 w-5" />
                      <span>انشاء حساب</span>
                    </Link>
                  )}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;