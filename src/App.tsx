import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { MobileNavigation } from './components/Layout/MobileNavigation';
import { Timeline } from './components/Feed/Timeline';
import { FloatingActionButton } from './components/ui/FloatingActionButton';
import { AuthPage } from './components/Auth/AuthPage';
import { LazyLoadWrapper } from './components/ui/LazyLoadWrapper';
import { useAuth } from './hooks/useAuth';
import { usePreloader } from './hooks/usePreloader';

// Lazy load heavy components
import {
  LazyTweetDetailPage,
  LazyComposePage,
  LazyProfilePage,
  LazyUserProfilePage,
  LazyOptimizedSearchPage,
  LazyHashtagPage,
  LazyNotificationsPage,
  LazyMessagesPage,
} from './components/LazyComponents';

function App() {
  const { user, loading } = useAuth();
  
  // Initialize preloader when user is authenticated
  usePreloader();

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show auth page if user is not logged in
  if (!user) {
    return <AuthPage />;
  }

  // Show main app if user is logged in
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <div className="flex h-screen overflow-hidden justify-center">
          {/* Centered container with max-width */}
          <div className="flex flex-1 max-w-[1200px]">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              <Sidebar />
            </div>
            
            {/* Main Content - Takes remaining space */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <Routes>
                <Route path="/" element={<Timeline />} />
                <Route 
                  path="/compose" 
                  element={
                    <LazyLoadWrapper>
                      <LazyComposePage />
                    </LazyLoadWrapper>
                  } 
                />
                <Route 
                  path="/tweet/:tweetId" 
                  element={
                    <LazyLoadWrapper>
                      <LazyTweetDetailPage />
                    </LazyLoadWrapper>
                  } 
                />
                <Route 
                  path="/search" 
                  element={
                    <LazyLoadWrapper>
                      <LazyOptimizedSearchPage />
                    </LazyLoadWrapper>
                  } 
                />
                <Route 
                  path="/hashtag/:hashtag" 
                  element={
                    <LazyLoadWrapper>
                      <LazyHashtagPage />
                    </LazyLoadWrapper>
                  } 
                />
                <Route 
                  path="/notifications" 
                  element={
                    <LazyLoadWrapper>
                      <LazyNotificationsPage />
                    </LazyLoadWrapper>
                  } 
                />
                <Route 
                  path="/messages" 
                  element={
                    <LazyLoadWrapper>
                      <LazyMessagesPage />
                    </LazyLoadWrapper>
                  } 
                />
                <Route 
                  path="/profile/:username" 
                  element={
                    <LazyLoadWrapper>
                      <LazyProfilePage />
                    </LazyLoadWrapper>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <LazyLoadWrapper>
                      <LazyUserProfilePage />
                    </LazyLoadWrapper>
                  } 
                />
                <Route 
                  path="/explore" 
                  element={
                    <div className="p-8 text-center text-gray-500">Explore Page</div>
                  } 
                />
                {/* Catch-all route for direct links */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <MobileNavigation />
        
        {/* Floating Action Button */}
        <FloatingActionButton />
      </div>
    </Router>
  );
}

export default App;