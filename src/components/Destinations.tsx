import React, { useState, useEffect } from 'react';
import { Star, Users, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchDestinations, fetchSavedDestinations, toggleSaveDestination, DestinationItem } from '../services/dataService';

interface DestinationsProps {
  onSelectDestination?: (name: string) => void;
}

const Destinations: React.FC<DestinationsProps> = ({ onSelectDestination }) => {
  const { user, openAuthModal } = useAuth();
  const [items, setItems] = useState<DestinationItem[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    const dests = await fetchDestinations();
    setItems(dests);

    if (user) {
      const saved = await fetchSavedDestinations(user.id);
      setSavedIds(saved);
    } else {
      setSavedIds([]);
    }
    setLoading(false);
  };

  const handleHeartClick = async (destId: number) => {
    if (!user) {
      openAuthModal('login');
      return;
    }

    const isCurrentlySaved = savedIds.includes(destId);
    // Optimistic UI update
    if (isCurrentlySaved) {
      setSavedIds(savedIds.filter(id => id !== destId));
    } else {
      setSavedIds([...savedIds, destId]);
    }

    await toggleSaveDestination(user.id, destId, isCurrentlySaved);
  };

  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-600">Destinations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover breathtaking locations across Tamil Nadu and around the world, and find travel companions who share your passion for adventure
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500 font-medium">
            Loading destinations from Supabase...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((destination) => {
              const isSaved = savedIds.includes(destination.id);
              return (
                <div
                  key={destination.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-gray-100"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => handleHeartClick(destination.id)}
                        className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-md ${
                          isSaved
                            ? 'bg-red-500 text-white scale-110'
                            : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
                        }`}
                        title={isSaved ? 'Remove from Saved' : 'Save Destination'}
                      >
                        <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                      <span className="text-xs font-semibold">{destination.duration}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                      <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-lg">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-gray-800">{destination.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">{destination.description}</p>

                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center space-x-1.5 text-xs font-medium text-gray-500">
                        <Users className="h-4 w-4 text-sky-600" />
                        <span>{destination.travelers.toLocaleString()} travelers</span>
                      </div>
                      <div className="text-2xl font-bold text-sky-600">{destination.price}</div>
                    </div>

                    <button
                      onClick={() => onSelectDestination && onSelectDestination(destination.name)}
                      className="w-full bg-gradient-to-r from-sky-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-sky-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md"
                    >
                      Plan Trip to Destination
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Destinations;