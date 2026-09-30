import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenPlanModal?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenPlanModal }) => {
  const [searchData, setSearchData] = useState({
    destination: 'Madurai, Tamil Nadu',
    dates: '',
    travelers: '2'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenPlanModal) {
      onOpenPlanModal();
    } else {
      const el = document.getElementById('destinations');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-sky-950/80 to-emerald-950/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs md:text-sm font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
          <Sparkles className="h-4 w-4" />
          <span>Explore Tamil Nadu & Global Wonders</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          Find Your Perfect
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400 block mt-2">
            Trip Companion
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Connect with like-minded travelers, plan customized itineraries stored safely in Supabase, and explore breathtaking Tamil Nadu heritage.
        </p>

        <div className="bg-gray-900/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 max-w-4xl mx-auto border border-white/10 shadow-2xl mb-12">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 h-5 w-5 text-amber-400" />
              <input
                type="text"
                placeholder="Where to?"
                value={searchData.destination}
                onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-950/80 text-white placeholder-gray-400 border border-gray-700/60 focus:border-amber-400 focus:outline-none transition-all duration-300 text-sm"
              />
            </div>
            
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3.5 h-5 w-5 text-sky-400" />
              <input
                type="date"
                value={searchData.dates}
                onChange={(e) => setSearchData({...searchData, dates: e.target.value})}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-950/80 text-white border border-gray-700/60 focus:border-sky-400 focus:outline-none transition-all duration-300 text-sm"
              />
            </div>
            
            <div className="relative">
              <Users className="absolute left-3.5 top-3.5 h-5 w-5 text-emerald-400" />
              <select
                value={searchData.travelers}
                onChange={(e) => setSearchData({...searchData, travelers: e.target.value})}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-950/80 text-white border border-gray-700/60 focus:border-emerald-400 focus:outline-none transition-all duration-300 text-sm appearance-none"
              >
                <option value="1" className="bg-gray-900 text-white">1 Traveler</option>
                <option value="2" className="bg-gray-900 text-white">2 Travelers</option>
                <option value="3" className="bg-gray-900 text-white">3 Travelers</option>
                <option value="4+" className="bg-gray-900 text-white">4+ Travelers</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-500 via-sky-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:from-amber-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-sky-500/20"
            >
              <Search className="h-5 w-5" />
              <span>Plan Trip</span>
            </button>
          </form>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-white/90">
          <div className="text-sm">
            <span className="font-bold text-2xl text-amber-400">50,000+</span> Happy Travelers
          </div>
          <div className="hidden md:block w-px h-8 bg-white/20"></div>
          <div className="text-sm">
            <span className="font-bold text-2xl text-sky-400">200+</span> Tamil Nadu Destinations
          </div>
          <div className="hidden md:block w-px h-8 bg-white/20"></div>
          <div className="text-sm">
            <span className="font-bold text-2xl text-emerald-400">98%</span> Verified Matches
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;