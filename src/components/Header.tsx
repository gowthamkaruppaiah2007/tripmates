import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, Bookmark, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserPlansModal } from './UserPlansModal';

interface HeaderProps {
  onOpenPlanModal?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenPlanModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserPlansOpen, setIsUserPlansOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, openAuthModal, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src="/logo.jpg" alt="TripMates Tamil Nadu Logo" className="h-11 w-11 object-cover rounded-full border-2 border-amber-400 shadow-md" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight leading-tight text-white">
                  TripMates
                </span>
                <span className="text-[10px] font-semibold text-amber-400 tracking-wider uppercase -mt-0.5">
                  Tamil Nadu
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['destinations', 'planning', 'community', 'about'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="capitalize font-medium text-gray-200 hover:text-amber-400 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2.5 bg-gradient-to-r from-amber-500/20 to-sky-500/20 border border-amber-400/30 text-white px-4 py-2 rounded-full font-medium hover:border-amber-400 transition-all duration-300"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-sky-500 text-gray-900 font-bold flex items-center justify-center text-xs">
                      {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                    </div>
                    <span className="max-w-[120px] truncate text-sm font-semibold">{user.fullName || user.email}</span>
                  </button>

                  {/* User Menu Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-sky-500/20 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in text-sm text-gray-200">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="font-bold text-white truncate">{user.fullName || 'Traveler'}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          setIsUserPlansOpen(true);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-white/5 flex items-center space-x-2.5 text-gray-200 hover:text-amber-400 transition"
                      >
                        <Bookmark className="h-4 w-4 text-amber-400" />
                        <span>My Plans & Saved Trips</span>
                      </button>

                      {onOpenPlanModal && (
                        <button
                          onClick={() => {
                            onOpenPlanModal();
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-white/5 flex items-center space-x-2.5 text-gray-200 hover:text-sky-400 transition"
                        >
                          <PlusCircle className="h-4 w-4 text-sky-400" />
                          <span>Plan New Trip</span>
                        </button>
                      )}

                      <div className="border-t border-white/10 mt-1 pt-1">
                        <button
                          onClick={() => {
                            signOut();
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-red-500/10 flex items-center space-x-2.5 text-red-400 transition"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-white font-medium hover:text-amber-400 transition-colors duration-300 px-3 py-2 text-sm"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="bg-gradient-to-r from-sky-500 via-emerald-500 to-amber-500 text-white px-5 py-2 rounded-full font-bold shadow-lg hover:shadow-sky-500/25 transition-all duration-300 transform hover:scale-105 text-sm"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Drawer */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-900/95 border-t border-white/10 py-4 px-4 space-y-3">
              {['destinations', 'planning', 'community', 'about'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left capitalize font-medium text-gray-200 hover:text-amber-400 py-2 text-sm"
                >
                  {item}
                </button>
              ))}

              {user ? (
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <button
                    onClick={() => {
                      setIsUserPlansOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left font-medium text-amber-400 py-2 text-sm flex items-center space-x-2"
                  >
                    <Bookmark className="h-4 w-4" />
                    <span>My Plans & Saved Trips</span>
                  </button>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left font-medium text-red-400 py-2 text-sm flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      openAuthModal('login');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-center text-white bg-white/10 py-2.5 rounded-xl text-sm font-semibold"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      openAuthModal('signup');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-center text-white bg-gradient-to-r from-sky-500 to-amber-500 py-2.5 rounded-xl text-sm font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* User Plans Modal */}
      <UserPlansModal
        isOpen={isUserPlansOpen}
        onClose={() => setIsUserPlansOpen(false)}
        onOpenPlanTrip={() => {
          if (onOpenPlanModal) onOpenPlanModal();
        }}
      />
    </>
  );
};

export default Header;