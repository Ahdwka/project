import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'user'
          }
        }
      });

      if (error) throw error;

      toast.success('تم إنشاء الحساب بنجاح');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="bg-dark-400 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">إنشاء حساب جديد</h1>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-2">الاسم</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input pl-10"
                required
              />
              <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-200" />
            </div>
          </div>

          <div>
            <label className="block mb-2">البريد الإلكتروني</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10"
                required
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-200" />
            </div>
          </div>

          <div>
            <label className="block mb-2">كلمة المرور</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10"
                required
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-200" />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'جاري التحميل...' : 'إنشاء حساب'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;