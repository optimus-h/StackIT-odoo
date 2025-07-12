import React, { useState } from 'react';
import { Search, Bell, User, Plus, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import NotificationDropdown from './NotificationDropdown';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { currentUser, isLoggedIn, logout, searchQuery, setSearchQuery, getUnreadNotificationCount } = useApp();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadCount = getUnreadNotificationCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('search');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              StackIt
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Questions
            </button>
            <button
              onClick={() => onNavigate('tags')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'tags'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Tags
            </button>
            <button
              onClick={() => onNavigate('users')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'users'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Users
            </button>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </form>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Ask Question Button */}
                <button
                  onClick={() => onNavigate('ask')}
                  className="hidden sm:flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ask Question
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                  {isNotificationOpen && (
                    <NotificationDropdown onClose={() => setIsNotificationOpen(false)} />
                  )}
                </div>

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    {currentUser?.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {currentUser?.username}
                    </span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-1">
                      <button
                        onClick={() => onNavigate('profile')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => onNavigate('settings')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign up
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2 px-2">
                <button
                  onClick={() => {
                    onNavigate('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left py-2 px-2 rounded transition-colors ${
                    currentPage === 'home'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Questions
                </button>
                <button
                  onClick={() => {
                    onNavigate('tags');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left py-2 px-2 rounded transition-colors ${
                    currentPage === 'tags'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Tags
                </button>
                <button
                  onClick={() => {
                    onNavigate('users');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left py-2 px-2 rounded transition-colors ${
                    currentPage === 'users'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Users
                </button>
              </nav>

              {/* Mobile Ask Question Button */}
              {isLoggedIn && (
                <div className="px-2">
                  <button
                    onClick={() => {
                      onNavigate('ask');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ask Question
                  </button>
                </div>
              )}

              {/* Mobile Auth Buttons */}
              {!isLoggedIn && (
                <div className="flex flex-col space-y-2 px-2">
                  <button
                    onClick={() => {
                      onNavigate('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left py-2 px-2 rounded transition-colors ${
                      currentPage === 'login'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('signup');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left py-2 px-2 rounded transition-colors ${
                      currentPage === 'signup'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
