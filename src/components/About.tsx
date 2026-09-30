import { Globe, Heart, Shield, Zap } from 'lucide-react';

const values = [
  {
    icon: Globe,
    title: 'Global Connection',
    description: 'Breaking down barriers and connecting travelers from every corner of the world'
  },
  {
    icon: Heart,
    title: 'Authentic Relationships',
    description: 'Fostering genuine friendships that extend far beyond your travel adventures'
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Rigorous verification processes and safety protocols to ensure secure travels'
  },
  {
    icon: Zap,
    title: 'Seamless Experience',
    description: 'Intuitive platform design that makes finding travel companions effortless'
  }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-600">Trip Mates</span>
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Born from the belief that travel is better when shared, Trip Mates connects adventurous souls who dream of exploring the world with like-minded companions.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Since our launch in 2020, we've helped over 50,000 travelers find their perfect travel companions, creating lifelong friendships and unforgettable memories across 200+ destinations worldwide.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-gradient-to-r from-sky-600 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:from-sky-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
                Start Your Journey
              </button>
              <button className="border-2 border-sky-600 text-sky-600 px-8 py-3 rounded-full font-semibold hover:bg-sky-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Travelers exploring together"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/50 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="text-2xl font-bold text-sky-600">4.9★</div>
              <div className="text-sm text-gray-600">User Rating</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="text-2xl font-bold text-emerald-600">200+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-sky-50 hover:to-emerald-50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;