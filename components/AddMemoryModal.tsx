
import React, { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';
import { CATEGORIES, Category, Memory } from '../types';

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (memory: Memory) => void;
}

const AddMemoryModal: React.FC<AddMemoryModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('General');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image) return;

    onAdd({
      id: Date.now().toString(),
      title,
      description,
      imageUrl: image,
      date: new Date().toISOString(),
      category
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setImage(null);
    setCategory('General');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-800">Abadikan Momen Baru</h2>
            <p className="text-stone-500 text-sm">Simpan kepingan berhargamu selamanya.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X size={24} className="text-stone-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 ${image ? 'border-amber-200' : 'border-stone-200 hover:border-amber-300 bg-stone-50'}`}
              >
                {image ? (
                  <>
                    <img src={image} className="w-full h-full object-cover" alt="Preview" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                      <p className="text-white text-sm font-medium">Ganti Foto</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <div className="bg-amber-100 p-3 rounded-full inline-block mb-3 text-amber-600">
                      <Upload size={24} />
                    </div>
                    <p className="text-stone-600 font-medium">Klik untuk Unggah</p>
                    <p className="text-stone-400 text-xs mt-1">Format: JPG, PNG, WEBP</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                />
              </div>

              <div>
                <label className="block text-stone-700 text-sm font-semibold mb-2">Kategori</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${category === cat ? 'bg-stone-800 text-white border-stone-800 shadow-md' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-stone-700 text-sm font-semibold mb-2">Judul Kenangan</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-200 focus:border-amber-400 outline-none transition-all"
                  placeholder="Contoh: Liburan Musim Panas"
                />
              </div>

              <div>
                <label className="block text-stone-700 text-sm font-semibold mb-2">Cerita Dibaliknya</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-200 focus:border-amber-400 outline-none transition-all h-32 resize-none"
                  placeholder="Tuliskan momen indahmu di sini..."
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-stone-200 text-stone-600 font-semibold rounded-xl hover:bg-stone-50 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!title || !image}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-amber-200 disabled:opacity-50 transition-all"
            >
              Simpan Memori
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemoryModal;
