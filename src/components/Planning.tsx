import React from 'react';
import { Calendar, Users, Map, Compass, Clock, Shield } from 'lucide-react';

interface PlanningProps {
  onOpenPlanModal?: () => void;
}

const features = [
  {
    icon: Users,
    title: 'Find Travel Buddies',
    description: 'Connect with verified travelers who match your interests, budget, and travel style'
  },
  {
    icon: Calendar,
    title: 'Smart Trip Planning',
    description: 'Our AI-powered planner creates personalized itineraries stored directly in Supabase'
  },
  {
    icon: Map,
    title: 'Local Experiences',
    description: 'Access exclusive local tours across Tamil Nadu and hidden gems recommended by fellow travelers'
  },
  {
    icon: Compass,
    title: 'Route Optimization',
    description: 'Get the most efficient routes and transportation options for your journey'
  },
  {
    icon: Clock,
    title: 'Real-time Updates',
    description: 'Stay informed with live updates on weather, events, and travel conditions'
  },
  {
    icon: Shield,
    title: 'Safe & Secure Data',
    description: 'Travel with confidence using our verified user system and encrypted database storage'
  }
];

const Planning: React.FC<PlanningProps> = ({ onOpenPlanModal }) => {
  return (
    <section id="planning" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">Trip Planning</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From finding the perfect travel companion to creating detailed itineraries, we make trip planning effortless and enjoyable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 bg-gray-50 rounded-2xl hover:bg-gradient-to-br hover:from-sky-50 hover:to-emerald-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-sky-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Planning?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of travelers who have found their perfect trip companions and saved their itineraries securely.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => onOpenPlanModal && onOpenPlanModal()}
              className="bg-white text-sky-600 px-8 py-3.5 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Planning Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Planning;