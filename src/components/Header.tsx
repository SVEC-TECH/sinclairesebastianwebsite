import React from 'react';
import { Menu, Bell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative w-full py-6 px-8 bg-black/20 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <button className="p-2 hover:bg-stone-200 rounded-full transition-colors duration-200">
          <Bell className="w-6 h-6 text-stone-300" />
        </button>
        
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-100 tracking-wide drop-shadow-lg">
            <span className="italic font-light">Sseruwagi Sinclaire Sebastian</span>
          </h1>
        </div>

        <button className="p-2 hover:bg-stone-200 rounded-full transition-colors duration-200">
          <Menu className="w-6 h-6 text-stone-300" />
        </button>
      </div>
    </header>
  );
};

export default Header;