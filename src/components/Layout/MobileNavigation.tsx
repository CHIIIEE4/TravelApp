import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, User, Settings, LogOut, Home, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { useMessages } from '../../hooks/useMessages';

const navItems = [
  { icon: Search, label: 'Search', path: '/search' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Mail, label: 'Messages', path: '/messages' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const MobileNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();
  const { unreadCount } = useNotifications();
  const { totalUnreadCount: unreadMessagesCount } = useMessages();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setSettingsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 z-50 shadow-lg">
      <div className="flex items-center justify-around px-6">
        {/* Search */}
        <Button
          variant="ghost"
          size="lg"
          className={`p-4 min-w-0 rounded-xl transition-colors ${
            location.pathname === '/search' ? 'text-blue-500 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => handleNavClick('/search')}
        >
          <Search className="w-8 h-8" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="lg"
          className={`p-4 min-w-0 rounded-xl transition-colors relative ${
            location.pathname === '/notifications' ? 'text-blue-500 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => handleNavClick('/notifications')}
        >
          <Bell className="w-8 h-8" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Button>

        {/* Home Button - Centered and Larger */}
        <Button
          variant="default"
          size="lg"
          className={`rounded-full p-6 shadow-lg transform hover:scale-105 transition-all duration-200 ${
            location.pathname === '/' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          onClick={() => handleNavClick('/')}
        >
          <Home className="w-9 h-9" />
        </Button>

        {/* Messages */}
        <Button
          variant="ghost"
          size="lg"
          className={`p-4 min-w-0 rounded-xl transition-colors relative ${
            location.pathname === '/messages' ? 'text-blue-500 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => handleNavClick('/messages')}
        >
          <Mail className="w-8 h-8" />
          {unreadMessagesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
              {unreadMessagesCount > 99 ? '99+' : unreadMessagesCount}
            </span>
          )}
        </Button>

        {/* Profile */}
        <Button
          variant="ghost"
          size="lg"
          className={`p-4 min-w-0 rounded-xl transition-colors ${
            location.pathname === '/profile' ? 'text-blue-500 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => handleNavClick('/profile')}
        >
          <User className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};