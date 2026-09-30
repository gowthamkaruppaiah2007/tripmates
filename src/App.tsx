import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { PlanTripModal } from './components/PlanTripModal';
import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Planning from './components/Planning';
import Community from './components/Community';
import About from './components/About';
import Footer from './components/Footer';

function AppContent() {
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const handleOpenPlanModal = () => {
    setIsPlanModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased selection:bg-amber-500 selection:text-gray-900">
      <Header onOpenPlanModal={handleOpenPlanModal} />
      <main>
        <Hero onOpenPlanModal={handleOpenPlanModal} />
        <Destinations onSelectDestination={(_name) => handleOpenPlanModal()} />
        <Planning onOpenPlanModal={handleOpenPlanModal} />
        <Community />
        <About />
      </main>
      <Footer />

      {/* Global Auth and Planning Modals */}
      <AuthModal />
      <PlanTripModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;