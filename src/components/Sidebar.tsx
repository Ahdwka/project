import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Laptop, Info, Phone, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const links = [
    { to: '/', icon: Home, label: 'الرئيسية' },
    { to: '/catalog', icon: Laptop, label: 'الكتالوج' },
    { to: '/about', icon: Info, label: 'من نحن' },
    { to: '/contact', icon: Phone, label: 'اتصل بنا' },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <aside className="w-64 bg-dark-400 h-[calc(100vh-4rem)] p-4 hidden md:block">
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-dark-300'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}

        {user ? (
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-dark-300"
          >
            <LogOut className="h-5 w-5" />
            <span>تسجيل خروج</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-dark-300"
          >
            <LogIn className="h-5 w-5" />
            <span>تسجيل دخول</span>
          </Link>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;