
import React from 'react';
import { Memory } from '../types';
import { Calendar, Tag, Trash2 } from 'lucide-react';

interface MemoryCardProps {
  memory: Memory;
  onDelete: (id: string) => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onDelete }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={memory.imageUrl} 
          alt={memory.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onDelete(memory.id)}
            className="p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-full hover:bg-red-50 transition-colors shadow-lg"
            title="Hapus Memori"
          >
            <Trash2 size={18} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-md border border-white/30">
            <Tag size={12} className="mr-1" /> {memory.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <div className="flex items-center text-stone-400 text-xs mb-2">
          <Calendar size={12} className="mr-1" />
          {new Date(memory.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <h3 className="text-xl font-serif font-bold text-stone-800 mb-2 leading-tight">
          {memory.title}
        </h3>
        <p className="text-stone-600 text-sm line-clamp-4 leading-relaxed">
          {memory.description}
        </p>
      </div>
    </div>
  );
};

export default MemoryCard;
