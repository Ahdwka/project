import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, Filter, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

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
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    gpu: string;
  };
  images: string[];
  brand: Brand;
}

const Catalog = () => {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  useEffect(() => {
    fetchBrands();
    fetchLaptops();
  }, []);

  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*');
      
      if (error) throw error;
      setBrands(data || []);
    } catch (error: any) {
      toast.error('حدث خطأ أثناء تحميل العلامات التجارية');
    }
  };

  const fetchLaptops = async () => {
    try {
      const { data, error } = await supabase
        .from('laptops')
        .select('*, brand:brands(*)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setLaptops(data || []);
    } catch (error: any) {
      toast.error('حدث خطأ أثناء تحميل الأجهزة');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppInquiry = (laptop: Laptop) => {
    const message = `مرحباً، أود الاستفسار عن جهاز ${laptop.brand.name} ${laptop.model}
المواصفات: 
- المعالج: ${laptop.specs.processor}
- الذاكرة: ${laptop.specs.ram}
- التخزين: ${laptop.specs.storage}
- الشاشة: ${laptop.specs.display}
- كرت الشاشة: ${laptop.specs.gpu}`;

    const whatsappNumber = '+963937005789'; // Replace with actual number
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const filteredLaptops = laptops.filter(laptop => {
    const matchesSearch = laptop.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.brand.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = !selectedBrand || laptop.brand_id === selectedBrand;
    const matchesPrice = laptop.price >= priceRange[0] && laptop.price <= priceRange[1];
    
    return matchesSearch && matchesBrand && matchesPrice;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-dark-400 p-6 rounded-xl mb-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2">البحث</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
                placeholder="ابحث عن جهاز..."
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-200" />
            </div>
          </div>

          <div>
            <label className="block mb-2">العلامة التجارية</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="input"
            >
              <option value="">الكل</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">السعر</label>
            <div className="flex gap-4">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                className="input w-1/2"
                placeholder="من"
              />
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                className="input w-1/2"
                placeholder="إلى"
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">جاري التحميل...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredLaptops.map(laptop => (
            <div key={laptop.id} className="bg-dark-400 rounded-xl overflow-hidden">
              <img
                src={laptop.images[0]}
                alt={`${laptop.brand.name} ${laptop.model}`}
                className="w-full h-32 sm:h-48 object-cover"
              />
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-2 line-clamp-2">
                  {laptop.brand?.name} {laptop.model}
                </h3>
                <div className="space-y-1 md:space-y-2 mb-4 text-dark-200 text-sm md:text-base">
                  <p>المعالج: {laptop.specs?.processor}</p>
                  <p>الذاكرة: {laptop.specs?.ram}</p>
                  <p>التخزين: {laptop.specs?.storage}</p>
                  <p>كرت الشاشة: {laptop.specs?.gpu}</p>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <span className="text-lg md:text-xl font-bold text-primary">
                    ${laptop.price}
                  </span>
                  <button
                    onClick={() => handleWhatsAppInquiry(laptop)}
                    className="btn btn-primary w-full md:w-auto flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    استفسار
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;