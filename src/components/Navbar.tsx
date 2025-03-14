import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Laptop2, User, Heart, LogOut, LogIn, Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { supabase } from '../lib/supabase';

const Navbar = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-dark-400 py-4 px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Laptop2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold Alexandria text-primary">رازيو</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/favorites" className="hidden md:flex items-center gap-2 hover:text-primary transition-colors">
                  <Heart className="h-5 w-5" />
                  <span>المفضلة</span>
                </Link>
                {user.user_metadata?.role === 'admin' && (
                  <Link to="/admin" className="hidden md:flex items-center gap-2 hover:text-primary transition-colors">
                    <User className="h-5 w-5" />
                    <span>لوحة التحكم</span>
                  </Link>
                )}
                <button 
                  onClick={() => supabase.auth.signOut()} 
                  className="hidden md:flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>تسجيل خروج</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="hidden md:flex items-center gap-2 hover:text-primary transition-colors">
                <LogIn className="h-5 w-5" />
                <span>تسجيل دخول</span>
              </Link>
            )}
            <button 
              className="md:hidden p-2 hover:bg-dark-300 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;