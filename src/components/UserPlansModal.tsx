import React, { useEffect, useState } from 'react';
import { X, Calendar, MapPin, Users, Heart, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchTravelPlans, fetchSavedDestinations, fetchDestinations, TravelPlan, DestinationItem } from '../services/dataService';

interface UserPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPlanTrip: () => void;
}

export const UserPlansModal: React.FC<UserPlansModalProps> = ({ isOpen, onClose, onOpenPlanTrip }) => {
  const { user } = useAuth();
  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const [savedDestinations, setSavedDestinations] = useState<DestinationItem[]>([]);
  const [activeTab, setActiveTab] = useState<'plans' | 'saved'>('plans');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && user) {
      loadUserData();
    }
  }, [isOpen, user]);

  const loadUserData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const userPlans = await fetchTravelPlans(user.id);
      setPlans(userPlans);

      const savedIds = await fetchSavedDestinations(user.id);
      const allDestinations = await fetchDestinations();
      const filtered = allDestinations.filter(d => savedIds.includes(d.id));
      setSavedDestinations(filtered);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-gray-900 via-gray-900 to-sky-950 border border-sky-500/20 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-sky-500 flex items-center justify-center font-bold text-white shadow-md">
              {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{user.fullName || 'My Account'}</h3>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 px-6 bg-gray-950/50">
          <button
            onClick={() => setActiveTab('plans')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 transition ${
              activeTab === 'plans'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            My Travel Plans ({plans.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 transition ${
              activeTab === 'saved'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Saved Destinations ({savedDestinations.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading your travel data...</div>
          ) : activeTab === 'plans' ? (
            plans.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center mx-auto">
                  <Calendar className="h-8 w-8" />
                </div>
                <p className="text-gray-300 font-medium">No travel plans created yet</p>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Start planning your trip to Tamil Nadu or world destinations and save it directly to Supabase.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenPlanTrip();
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 transition inline-flex items-center space-x-2 text-sm shadow-md"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Create New Travel Plan</span>
                </button>
              </div>
            ) : (
              plans.map((plan) => (
                <div key={plan.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-500/30 transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-amber-400" />
                        <span>{plan.destinationName}</span>
                      </h4>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-300 mt-2">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-3.5 w-3.5 text-sky-400" />
                          <span>{plan.startDate} to {plan.endDate}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="h-3.5 w-3.5 text-emerald-400" />
                          <span>{plan.groupSize} Travelers</span>
                        </span>
                        {plan.budget && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {plan.budget}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {plan.notes && (
                    <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-white/5 italic">
                      "{plan.notes}"
                    </p>
                  )}
                </div>
              ))
            )
          ) : savedDestinations.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8" />
              </div>
              <p className="text-gray-300 font-medium">No saved destinations yet</p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Click the heart icon on any destination card to bookmark it to your profile.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedDestinations.map((dest) => (
                <div key={dest.id} className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
                  <img src={dest.image} alt={dest.name} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <h5 className="font-bold text-white text-sm">{dest.name}</h5>
                    <p className="text-xs text-gray-400 line-clamp-1 mt-1">{dest.description}</p>
                    <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-white/5">
                      <span className="text-amber-400 font-semibold">{dest.price}</span>
                      <span className="text-gray-400">{dest.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
