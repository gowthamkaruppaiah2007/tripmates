import React, { useState } from 'react';
import { X, Calendar, MapPin, Users, DollarSign, FileText, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { saveTravelPlan } from '../services/dataService';

interface PlanTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanTripModal: React.FC<PlanTripModalProps> = ({ isOpen, onClose }) => {
  const { user, openAuthModal } = useAuth();

  const [destinationName, setDestinationName] = useState('Madurai, Tamil Nadu');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [groupSize, setGroupSize] = useState(2);
  const [budget, setBudget] = useState('Moderate (₹10,000 - ₹25,000)');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onClose();
      openAuthModal('login');
      return;
    }

    if (!startDate || !endDate) {
      setErrorMsg('Please select travel dates');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    const res = await saveTravelPlan({
      userId: user.id,
      destinationName,
      startDate,
      endDate,
      groupSize,
      budget,
      notes
    });

    setSubmitting(false);

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } else {
      setErrorMsg(res.error || 'Failed to save travel plan to Supabase');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-gray-900 via-gray-900 to-sky-950 border border-sky-500/20 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white bg-white/5 p-2 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-white">Trip Saved to Supabase!</h3>
            <p className="text-sm text-gray-300">
              Your itinerary for <span className="text-amber-400 font-semibold">{destinationName}</span> has been stored.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Trip Planner • Supabase Database</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Plan Your Journey</h3>
              <p className="text-sm text-gray-400 mt-1">
                Customize your travel plan and save it to your TripMates profile.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-amber-400" />
                  <select
                    value={destinationName}
                    onChange={(e) => setDestinationName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-950/70 border border-gray-700/60 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500 transition"
                  >
                    <option value="Madurai, Tamil Nadu">Madurai, Tamil Nadu</option>
                    <option value="Ooty, Tamil Nadu">Ooty, Tamil Nadu</option>
                    <option value="Mahabalipuram, Tamil Nadu">Mahabalipuram, Tamil Nadu</option>
                    <option value="Thanjavur, Tamil Nadu">Thanjavur, Tamil Nadu</option>
                    <option value="Kanyakumari, Tamil Nadu">Kanyakumari, Tamil Nadu</option>
                    <option value="Rameswaram, Tamil Nadu">Rameswaram, Tamil Nadu</option>
                    <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
                    <option value="Coimbatore & Valparai">Coimbatore & Valparai</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-sky-400" />
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-950/70 border border-gray-700/60 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-sky-400" />
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-950/70 border border-gray-700/60 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Group Size
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-3.5 h-4 w-4 text-emerald-400" />
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={groupSize}
                      onChange={(e) => setGroupSize(Number(e.target.value))}
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-950/70 border border-gray-700/60 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Budget Tier
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-3.5 h-4 w-4 text-emerald-400" />
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full pl-10 pr-2 py-2.5 bg-gray-950/70 border border-gray-700/60 rounded-xl text-white text-xs focus:outline-none focus:border-sky-500 transition"
                    >
                      <option value="Budget (Under ₹10,000)">Budget (Under ₹10,000)</option>
                      <option value="Moderate (₹10k - ₹25k)">Moderate (₹10k - ₹25k)</option>
                      <option value="Luxury (₹25k+) ">Luxury (₹25k+)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Trip Notes & Preferences
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g., Looking for travel mates who enjoy photography, South Indian street food, and early morning temple visits!"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-950/70 border border-gray-700/60 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-sky-500 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 via-emerald-500 to-amber-500 hover:from-sky-600 hover:to-amber-600 shadow-lg transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {submitting ? 'Saving to Supabase...' : 'Save Travel Plan'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
