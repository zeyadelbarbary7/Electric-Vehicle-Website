import React, { useState, useEffect } from 'react';
import { useLocation } from './hooks/useLocation';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MapInterface from './components/map/MapInterface';
import BookingFlow from './components/booking/BookingFlow';
import TrackingInterface from './components/tracking/TrackingInterface';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState<'map' | 'booking' | 'tracking'>('map');
  const location = useLocation();

  useEffect(() => {
    // Check if the user has a dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    // Listen for changes to the user's dark mode preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    // Apply dark mode to the document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // For demo purposes, we'll simulate navigation between views
  // In a real app, you'd use a router like React Router
  const navigateTo = (newView: 'map' | 'booking' | 'tracking') => {
    setView(newView);
  };

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow">
        {/* For demo purposes, we'll conditionally render components based on the view */}
        {view === 'map' && (
          <div>
            <MapInterface />
            
            {/* Quick Action Buttons */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-4">
              <button
                onClick={() => navigateTo('booking')}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full shadow-lg transition-colors flex items-center"
              >
                Book a Charge
              </button>
              <button
                onClick={() => navigateTo('tracking')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-lg transition-colors flex items-center"
              >
                Track Current Booking
              </button>
            </div>
          </div>
        )}
        
        {view === 'booking' && (
          <BookingFlow />
        )}
        
        {view === 'tracking' && (
          <TrackingInterface />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;