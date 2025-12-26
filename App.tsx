
import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Heart, Camera, Settings, Info, Archive } from 'lucide-react';
import { Memory, Category, CATEGORIES } from './types';
import MemoryCard from './components/MemoryCard';
import AddMemoryModal from './components/AddMemoryModal';

// Initial dummy data
const INITIAL_MEMORIES: Memory[] = [
  {
    id: '1',
    title: 'Matahari Terbenam di Uluwatu',
    description: 'Menikmati langit berwarna ungu dan oranye yang memukau sambil mendengarkan deburan ombak di tebing Uluwatu. Momen ketenangan yang sempurna bersama orang-orang tersayang.',
    imageUrl: 'https://picsum.photos/seed/uluwatu/800/600',
    date: '2024-05-15T18:00:00Z',
    category: 'Travel'
  },
  {
    id: '2',
    title: 'Sarapan Keluarga Hari Minggu',
    description: 'Aroma kopi dan pancake yang memenuhi rumah. Gelak tawa anak-anak saat menceritakan mimpi mereka semalam. Sederhana, tapi tak ternilai harganya.',
    imageUrl: 'https://picsum.photos/seed/breakfast/800/600',
    date: '2024-06-02T08:30:00Z',
    category: 'Family'
  }
];

const App: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('memora_vault');
    if (saved) {
      try {
        setMemories(JSON.parse(saved));
      } catch {
        setMemories(INITIAL_MEMORIES);
      }
    } else {
      setMemories(INITIAL_MEMORIES);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('memora_vault', JSON.stringify(memories));
    }
  }, [memories, isLoading]);

  const filteredMemories = useMemo(() => {
    return memories.filter(m => {
      const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [memories, searchQuery, selectedCategory]);

  const handleAddMemory = (newMemory: Memory) => {
    setMemories(prev => [newMemory, ...prev]);
  };

  const handleDeleteMemory = (id: string) => {
    if (window.confirm('Hapus kenangan ini selamanya?')) {
      setMemories(prev => prev.filter(m => m.id !== id));
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-[#fcfaf7]">
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-stone-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 p-2 rounded-xl shadow-lg shadow-amber-200">
              <Camera className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-serif font-bold text-stone-800 tracking-tight">Memora</h1>
          </div>
          
          <div className="flex items-center w-full md:w-auto gap-4">
            <div className="relative flex-grow md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari kenangan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-100 border-none rounded-full focus:ring-2 focus:ring-amber-200 outline-none text-sm transition-all"
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-stone-800 hover:bg-black text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Plus size={18} />
              Tambah Momen
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        <section className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
            Brankas Kenangan Digital Anda
          </h2>
          <p className="text-stone-500 leading-relaxed italic">
            "Setiap foto bercerita, setiap momen berharga. Simpan kepingan kisah hidup Anda dengan aman di sini."
          </p>
        </section>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 overflow-x-auto pb-4">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'All' ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'}`}
          >
            Semua
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-stone-800 text-white shadow-lg' : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredMemories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMemories.map(memory => (
              <MemoryCard 
                key={memory.id} 
                memory={memory} 
                onDelete={handleDeleteMemory}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-stone-200 p-20 text-center max-w-lg mx-auto mt-20">
            <div className="bg-stone-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Archive className="text-stone-300" size={40} />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">Belum ada memori</h3>
            <p className="text-stone-500 mb-8">Mulailah mengabadikan momen berhargamu hari ini.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl shadow-amber-100"
            >
              Buat Kenangan Pertama
            </button>
          </div>
        )}
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden">
         <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-stone-800 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
         >
           <Plus size={24} />
         </button>
      </div>

      <AddMemoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddMemory}
      />

      <footer className="mt-24 border-t border-stone-100 pt-12 text-center text-stone-400 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <Heart size={16} className="text-red-300" />
          <Settings size={16} className="hover:text-stone-600 cursor-pointer" />
          <Info size={16} className="hover:text-stone-600 cursor-pointer" />
        </div>
        <p className="font-serif italic mb-10">Memora - Digital Sanctuary for Your Soul</p>
      </footer>
    </div>
  );
};

export default App;
