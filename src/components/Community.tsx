import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    text: 'Found my perfect travel buddy for a 3-week Europe trip! The matching system is incredible and we had such similar interests. Best travel experience ever!',
    trip: 'Europe Adventure'
  },
  {
    id: 2,
    name: 'Miguel Rodriguez',
    location: 'Barcelona, Spain',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    text: 'As a solo traveler, Trip Mates gave me the confidence to explore Southeast Asia with amazing companions. The safety features and verification process are top-notch.',
    trip: 'Southeast Asia Explorer'
  },
  {
    id: 3,
    name: 'Emma Chen',
    location: 'Toronto, Canada',
    image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    text: 'Met my travel group through Trip Mates and we\'ve now done 5 trips together! It\'s not just about finding travel partners, it\'s about building lifelong friendships.',
    trip: 'African Safari'
  }
];

const stats = [
  { number: '50,000+', label: 'Active Travelers' },
  { number: '200+', label: 'Countries Covered' },
  { number: '95%', label: 'Successful Matches' },
  { number: '4.9★', label: 'Average Rating' }
];

const Community = () => {
  return (
    <section id="community" className="py-20 bg-gradient-to-br from-gray-900 to-sky-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Community</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Connect with passionate travelers from around the world and be part of a community that values adventure, friendship, and authentic experiences
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="mb-6">
                <Quote className="h-8 w-8 text-sky-400 mb-4" />
                <p className="text-white/90 leading-relaxed">{testimonial.text}</p>
              </div>

              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-white/70">{testimonial.location}</div>
                  <div className="text-sm text-sky-400">{testimonial.trip}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Find Your Travel Tribe?
            </h3>
            <p className="text-white/80 mb-6 text-lg">
              Join our community of verified travelers and start planning your next adventure with the perfect companions
            </p>
            <button className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-sky-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-xl">
              Join the Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;