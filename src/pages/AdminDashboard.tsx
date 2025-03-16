import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Brand {
  id: string;
  name: string;
  logo_url: string;
}

interface Laptop {
  id: string;
  brand_id: string;
  model: string;
  price: number;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  gpu: string;
  battery: string;
  weight: string;
  ports: string[];
  os: string;
  color: string;
  images: string[];
}

const AdminDashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLaptop, setEditingLaptop] = useState<Laptop | null>(null);
  const [newLaptop, setNewLaptop] = useState<Partial<Laptop>>({
    brand_id: '',
    model: '',
    price: 0,
    processor: '',
    ram: '',
    storage: '',
    display: '',
    gpu: '',
    battery: '',
    weight: '',
    ports: [],
    os: '',
    color: '',
    images: []
  });

  useEffect(() => {
    if (!user || !profile.is_admin) {
      toast.error('غير مصرح لك بالوصول إلى لوحة التحكم');
      navigate('/');
      return;
    }

    fetchBrands();
    fetchLaptops();
  }, [user, profile, navigate]);

  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*');
      
      if (error) throw error;
      setBrands(data || []);
    } catch (error: any) {
      toast.error('حدث خطأ أثناء تحميل العلامات التجارية');
      console.error('Error fetching brands:', error);
    }
  };

  const fetchLaptops = async () => {
    try {
      const { data, error } = await supabase
        .from('laptops')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setLaptops(data || []);
    } catch (error: any) {
      toast.error('حدث خطأ أثناء تحميل الأجهزة');
      console.error('Error fetching laptops:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLaptop = async () => {
    if (!newLaptop.brand_id || !newLaptop.model || !newLaptop.price) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      const { error } = await supabase
        .from('laptops')
        .insert([newLaptop]);

      if (error) throw error;

      toast.success('تمت إضافة الجهاز بنجاح');
      fetchLaptops();
      setNewLaptop({
        brand_id: '',
        model: '',
        price: 0,
        processor: '',
        ram: '',
        storage: '',
        display: '',
        gpu: '',
        battery: '',
        weight: '',
        ports: [],
        os: '',
        color: '',
        images: []
      });
    } catch (error: any) {
      toast.error('حدث خطأ أثناء إضافة الجهاز');
      console.error('Error adding laptop:', error);
    }
  };

  const handleUpdateLaptop = async (laptop: Laptop) => {
    try {
      const { error } = await supabase
        .from('laptops')
        .update(laptop)
        .eq('id', laptop.id);

      if (error) throw error;

      toast.success('تم تحديث الجهاز بنجاح');
      fetchLaptops();
      setEditingLaptop(null);
    } catch (error: any) {
      toast.error('حدث خطأ أثناء تحديث الجهاز');
      console.error('Error updating laptop:', error);
    }
  };

  const handleDeleteLaptop = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الجهاز؟')) return;

    try {
      const { error } = await supabase
        .from('laptops')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('تم حذف الجهاز بنجاح');
      fetchLaptops();
    } catch (error: any) {
      toast.error('حدث خطأ أثناء حذف الجهاز');
      console.error('Error deleting laptop:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">جاري التحميل...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>

      <div className="bg-dark-400 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-bold mb-4">إضافة جهاز جديد</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">العلامة التجارية</label>
            <select
              value={newLaptop.brand_id}
              onChange={(e) => setNewLaptop({ ...newLaptop, brand_id: e.target.value })}
              className="input"
            >
              <option value="">اختر العلامة التجارية</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">الموديل</label>
            <input
              type="text"
              value={newLaptop.model}
              onChange={(e) => setNewLaptop({ ...newLaptop, model: e.target.value })}
              className="input"
              placeholder="اسم الموديل"
            />
          </div>

          <div>
            <label className="block mb-2">السعر</label>
            <input
              type="number"
              value={newLaptop.price}
              onChange={(e) => setNewLaptop({ ...newLaptop, price: +e.target.value })}
              className="input"
              placeholder="السعر"
            />
          </div>

          <div>
            <label className="block mb-2">المعالج</label>
            <input
              type="text"
              value={newLaptop.processor}
              onChange={(e) => setNewLaptop({ ...newLaptop, processor: e.target.value })}
              className="input"
              placeholder="Intel Core i7-12700H"
            />
          </div>

          <div>
            <label className="block mb-2">الذاكرة</label>
            <input
              type="text"
              value={newLaptop.ram}
              onChange={(e) => setNewLaptop({ ...newLaptop, ram: e.target.value })}
              className="input"
              placeholder="16GB DDR5"
            />
          </div>

          <div>
            <label className="block mb-2">التخزين</label>
            <input
              type="text"
              value={newLaptop.storage}
              onChange={(e) => setNewLaptop({ ...newLaptop, storage: e.target.value })}
              className="input"
              placeholder="1TB NVMe SSD"
            />
          </div>

          <div>
            <label className="block mb-2">الشاشة</label>
            <input
              type="text"
              value={newLaptop.display}
              onChange={(e) => setNewLaptop({ ...newLaptop, display: e.target.value })}
              className="input"
              placeholder='15.6" FHD 144Hz'
            />
          </div>

          <div>
            <label className="block mb-2">كرت الشاشة</label>
            <input
              type="text"
              value={newLaptop.gpu}
              onChange={(e) => setNewLaptop({ ...newLaptop, gpu: e.target.value })}
              className="input"
              placeholder="NVIDIA RTX 4060"
            />
          </div>

          <div>
            <label className="block mb-2">البطارية</label>
            <input
              type="text"
              value={newLaptop.battery}
              onChange={(e) => setNewLaptop({ ...newLaptop, battery: e.target.value })}
              className="input"
              placeholder="90Wh"
            />
          </div>

          <div>
            <label className="block mb-2">الوزن</label>
            <input
              type="text"
              value={newLaptop.weight}
              onChange={(e) => setNewLaptop({ ...newLaptop, weight: e.target.value })}
              className="input"
              placeholder="2.1 kg"
            />
          </div>

          <div>
            <label className="block mb-2">نظام التشغيل</label>
            <input
              type="text"
              value={newLaptop.os}
              onChange={(e) => setNewLaptop({ ...newLaptop, os: e.target.value })}
              className="input"
              placeholder="Windows 11"
            />
          </div>

          <div>
            <label className="block mb-2">اللون</label>
            <input
              type="text"
              value={newLaptop.color}
              onChange={(e) => setNewLaptop({ ...newLaptop, color: e.target.value })}
              className="input"
              placeholder="أسود"
            />
          </div>

          <div>
            <label className="block mb-2">المنافذ (مفصولة بفواصل)</label>
            <input
              type="text"
              value={newLaptop.ports?.join(', ')}
              onChange={(e) => setNewLaptop({ ...newLaptop, ports: e.target.value.split(',').map(port => port.trim()) })}
              className="input"
              placeholder="USB-C, HDMI, USB 3.0"
            />
          </div>

          <div>
            <label className="block mb-2">روابط الصور (مفصولة بفواصل)</label>
            <input
              type="text"
              value={newLaptop.images?.join(', ')}
              onChange={(e) => setNewLaptop({ ...newLaptop, images: e.target.value.split(',').map(url => url.trim()) })}
              className="input"
              placeholder="رابط1, رابط2, ..."
            />
          </div>
        </div>

        <button
          onClick={handleAddLaptop}
          className="btn btn-primary mt-6 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          إضافة جهاز
        </button>
      </div>

      <div className="bg-dark-400 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">الأجهزة المتوفرة</h2>
        <div className="space-y-4">
          {laptops.map(laptop => (
            <div key={laptop.id} className="bg-dark-300 p-4 rounded-lg">
              {editingLaptop?.id === laptop.id ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <select
                      value={editingLaptop.brand_id}
                      onChange={(e) => setEditingLaptop({ ...editingLaptop, brand_id: e.target.value })}
                      className="input"
                    >
                      {brands.map(brand => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={editingLaptop.model}
                      onChange={(e) => setEditingLaptop({ ...editingLaptop, model: e.target.value })}
                      className="input"
                      placeholder="الموديل"
                    />
                    <input
                      type="number"
                      value={editingLaptop.price}
                      onChange={(e) => setEditingLaptop({ ...editingLaptop, price: +e.target.value })}
                      className="input"
                      placeholder="السعر"
                    />
                    <input
                      type="text"
                      value={editingLaptop.processor}
                      onChange={(e) => setEditingLaptop({ ...editingLaptop, processor: e.target.value })}
                      className="input"
                      placeholder="المعالج"
                    />
                    <input
                      type="text"
                      value={editingLaptop.ram}
                      onChange={(e) => setEditingLaptop({ ...editingLaptop, ram: e.target.value })}
                      className="input"
                      placeholder="الذاكرة"
                    />
                    <input
                      type="text"
                      value={editingLaptop.storage}
                      onChange={(e) => setEditingLaptop({ ...editingLaptop, storage: e.target.value })}
                      className="input"
                      placeholder="التخزين"
                    />
                    <input
                      type="text"
                      value={editingLaptop.display}
                      onChange={(e) => setEditingLaptop({ ...editingLaptop, display: e.target.value })}
                      className="input"
                      placeholder="الشاشة"
                    />
                    <input
                      type="text"
                      value={editingLaptop.gpu}
                      onChange={(e) => setEditingLaptop({ ...editingLaptop, gpu: e.target.value })}
                      className="input"
                      placeholder="كرت الشاشة"
                    />
                    <input
                      type="text"
                      value={editingLaptop.battery}
                      onChange={(e) => setEditingLaptop({ ...editingLaptop, battery: e.target.value })}
                      className="input"
                      placeholder="البطارية"
                    />
                    <input
                      type="text"
                      value={editingLaptop.weight}
                      onChange={(e) => setEditingLaptop({ ...editingLaptop, weight: e.target.value })}
                      className="input"
                      placeholder="الوزن"
                    />
                    <input
                      type="text"
                      value={editingLaptop.os}
                      onChange={(e) => setEditingLaptop({ ...editingLaptop, os: e.target.value })}
                      className="input"
                      placeholder="نظام التشغيل"
                    />
                    <input
                      type="text"
                      value={editingLaptop.color}
                      onChange={(e) => setEditingLaptop({ ...editingLaptop, color: e.target.value })}
                      className="input"
                      placeholder="اللون"
                    />
                    <input
                      type="text"
                      value={editingLaptop.ports.join(', ')}
                      onChange={(e) => setEditingLaptop({
                        ...editingLaptop,
                        ports: e.target.value.split(',').map(port => port.trim())
                      })}
                      className="input"
                      placeholder="المنافذ"
                    />
                    <input
                      type="text"
                      value={editingLaptop.images.join(', ')}
                      onChange={(e) => setEditingLaptop({
                        ...editingLaptop,
                        images: e.target.value.split(',').map(url => url.trim())
                      })}
                      className="input"
                      placeholder="روابط الصور"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateLaptop(editingLaptop)}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <Save className="h-5 w-5" />
                      حفظ
                    </button>
                    <button
                      onClick={() => setEditingLaptop(null)}
                      className="btn btn-secondary flex items-center gap-2"
                    >
                      <X className="h-5 w-5" />
                      إلغاء
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{laptop.model}</h3>
                    <p className="text-dark-200">${laptop.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingLaptop(laptop)}
                      className="btn btn-secondary flex items-center gap-2"
                    >
                      <Edit className="h-5 w-5" />
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDeleteLaptop(laptop.id)}
                      className="btn btn-secondary flex items-center gap-2"
                    >
                      <Trash2 className="h-5 w-5" />
                      حذف
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;