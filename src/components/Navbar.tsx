import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Compass,
  Briefcase,
  Cpu,
  Bell,
  MessageSquare,
  User,
  Shield,
  Menu,
  X,
  ChevronDown,
  LogOut,
  ExternalLink,
  Flame
} from 'lucide-react';
import { UserProfile, NotificationItem } from '../types/index.js';

interface NavbarProps {
  currentUser: UserProfile;
  notifications: NotificationItem[];
  unreadMessagesCount: number;
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
  onSwitchDemo: (role: 'creator' | 'brand' | 'admin') => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onMarkNotificationRead: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  notifications,
  unreadMessagesCount,
  currentView,
  onNavigate,
  onSwitchDemo,
  onOpenAuth,
  onLogout,
  onMarkNotificationRead
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2A2453]/60 bg-[#0B081D]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C4DFF] via-[#9D7BFF] to-[#FF7A1A] p-0.5 shadow-md shadow-[#7C4DFF]/20 group-hover:shadow-[#7C4DFF]/40 transition-shadow">
                <div className="w-full h-full bg-[#0B081D] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#9D7BFF] group-hover:text-white transition-colors" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-white to-[#B9B3D0] bg-clip-text text-transparent">
                  CreatorConnect<span className="text-[#FF7A1A]">.AI</span>
                </span>
                <span className="hidden sm:block text-[10px] font-medium text-[#B9B3D0] -mt-1 tracking-wider uppercase">
                  AI Talent Marketplace
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => onNavigate('discover')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentView === 'discover'
                    ? 'text-white bg-[#17132E] border border-[#7C4DFF]/40'
                    : 'text-[#B9B3D0] hover:text-white hover:bg-[#17132E]/50'
                }`}
              >
                <Compass className="w-4 h-4 text-[#9D7BFF]" />
                Discover Creators
              </button>

              <button
                onClick={() => onNavigate('campaigns')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentView === 'campaigns'
                    ? 'text-white bg-[#17132E] border border-[#7C4DFF]/40'
                    : 'text-[#B9B3D0] hover:text-white hover:bg-[#17132E]/50'
                }`}
              >
                <Briefcase className="w-4 h-4 text-[#FF7A1A]" />
                Campaign Briefs
              </button>

              <button
                onClick={() => onNavigate('matching')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentView === 'matching'
                    ? 'text-white bg-[#17132E] border border-[#7C4DFF]/40'
                    : 'text-[#B9B3D0] hover:text-white hover:bg-[#17132E]/50'
                }`}
              >
                <Cpu className="w-4 h-4 text-[#7C4DFF]" />
                AI Matchmaker
              </button>

              <button
                onClick={() => onNavigate('home', { scrollTo: 'how-it-works' })}
                className="px-3 py-1.5 text-sm font-medium text-[#B9B3D0] hover:text-white transition-colors"
              >
                How It Works
              </button>

              <button
                onClick={() => onNavigate('home', { scrollTo: 'pricing' })}
                className="px-3 py-1.5 text-sm font-medium text-[#B9B3D0] hover:text-white transition-colors"
              >
                Pricing
              </button>
            </nav>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Demo Persona Switcher (Convenient for quick demo / hackathon evaluation) */}
            <div className="relative">
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-[#17132E] border border-[#7C4DFF]/30 text-[#B9B3D0] hover:text-white hover:border-[#7C4DFF]/60 transition-all"
                title="Switch demo persona"
              >
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
                <span className="font-semibold text-white capitalize">{currentUser.role}:</span>
                <span className="max-w-[85px] truncate">{currentUser.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-[#B9B3D0]" />
              </button>

              {demoDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#17132E] border border-[#7C4DFF]/30 shadow-2xl py-1 z-50 backdrop-blur-xl">
                  <div className="px-3 py-1.5 border-b border-[#2A2453] text-[11px] font-semibold tracking-wider text-[#B9B3D0] uppercase">
                    Switch Demo Persona
                  </div>
                  <button
                    onClick={() => {
                      onSwitchDemo('creator');
                      setDemoDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#2A2453] transition-colors ${
                      currentUser.role === 'creator' ? 'text-[#9D7BFF] font-semibold' : 'text-white'
                    }`}
                  >
                    <span>Elena Rostova (Creator)</span>
                    <span className="text-[10px] text-[#B9B3D0]">Runway / Video</span>
                  </button>
                  <button
                    onClick={() => {
                      onSwitchDemo('brand');
                      setDemoDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#2A2453] transition-colors ${
                      currentUser.role === 'brand' ? 'text-[#FF7A1A] font-semibold' : 'text-white'
                    }`}
                  >
                    <span>Aura Skincare (Brand)</span>
                    <span className="text-[10px] text-[#B9B3D0]">Agency / Briefs</span>
                  </button>
                  <button
                    onClick={() => {
                      onSwitchDemo('admin');
                      setDemoDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#2A2453] transition-colors ${
                      currentUser.role === 'admin' ? 'text-[#00E5FF] font-semibold' : 'text-white'
                    }`}
                  >
                    <span>Admin Moderator</span>
                    <span className="text-[10px] text-[#B9B3D0]">Platform Oversight</span>
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-lg text-[#B9B3D0] hover:text-white hover:bg-[#17132E] transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF7A1A]"></span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[#17132E] border border-[#7C4DFF]/30 shadow-2xl p-3 z-50 backdrop-blur-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-[#2A2453]">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-[#9D7BFF]" /> Notifications
                    </span>
                    <span className="text-[10px] text-[#B9B3D0]">{unreadNotifs.length} unread</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-[#2A2453]/60 mt-1">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-[#B9B3D0]">No notifications yet</div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            onMarkNotificationRead(n.id);
                            if (n.link) {
                              if (n.link.includes('dashboard')) {
                                onNavigate(currentUser.role === 'creator' ? 'creator-dashboard' : 'brand-dashboard');
                              } else if (n.link.includes('campaigns')) {
                                onNavigate('campaigns');
                              }
                            }
                            setNotificationsOpen(false);
                          }}
                          className={`py-2.5 px-1.5 text-xs cursor-pointer hover:bg-[#2A2453]/40 rounded-lg transition-colors ${
                            !n.read ? 'bg-[#7C4DFF]/10 font-medium' : 'text-[#B9B3D0]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-white text-xs font-semibold">{n.title}</span>
                            <span className="text-[10px] text-[#B9B3D0]">Just now</span>
                          </div>
                          <p className="text-[11px] text-[#B9B3D0] leading-snug">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Messages Icon */}
            <button
              onClick={() => onNavigate('messages')}
              className="relative p-2 rounded-lg text-[#B9B3D0] hover:text-white hover:bg-[#17132E] transition-colors"
              aria-label="Direct Messages"
            >
              <MessageSquare className="w-4 h-4" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#7C4DFF]"></span>
              )}
            </button>

            {/* Dashboard / User Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (currentUser.role === 'creator') onNavigate('creator-dashboard');
                  else if (currentUser.role === 'brand') onNavigate('brand-dashboard');
                  else onNavigate('admin');
                }}
                className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-[#17132E] border border-[#7C4DFF]/30 hover:border-[#7C4DFF] hover:bg-[#201A40] transition-all text-xs font-medium text-white"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-[#7C4DFF]"
                />
                <span className="font-semibold">
                  {currentUser.role === 'creator' ? 'Creator Hub' : currentUser.role === 'brand' ? 'Brand Studio' : 'Admin'}
                </span>
              </button>

              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] hover:from-[#6A3DE8] hover:to-[#8C66FF] text-white shadow-md shadow-[#7C4DFF]/25 transition-all active:scale-95"
              >
                Account
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#B9B3D0] hover:text-white hover:bg-[#17132E]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2A2453] bg-[#0B081D]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => {
              onNavigate('discover');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-white hover:bg-[#17132E] flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#9D7BFF]" /> Discover Creators
          </button>
          <button
            onClick={() => {
              onNavigate('campaigns');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-white hover:bg-[#17132E] flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-[#FF7A1A]" /> Campaign Briefs
          </button>
          <button
            onClick={() => {
              onNavigate('matching');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-white hover:bg-[#17132E] flex items-center gap-2"
          >
            <Cpu className="w-4 h-4 text-[#7C4DFF]" /> AI Matchmaker
          </button>
          <button
            onClick={() => {
              onNavigate(currentUser.role === 'creator' ? 'creator-dashboard' : 'brand-dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-white hover:bg-[#17132E] flex items-center gap-2"
          >
            <User className="w-4 h-4 text-[#00E5FF]" /> My Dashboard
          </button>
          <button
            onClick={() => {
              onNavigate('messages');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-white hover:bg-[#17132E] flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#B9B3D0]" /> Messages ({unreadMessagesCount})
          </button>

          {/* Quick Demo Switcher on Mobile */}
          <div className="pt-2 border-t border-[#2A2453] text-xs text-[#B9B3D0]">
            <span className="block mb-1.5 uppercase font-semibold text-[10px] text-[#B9B3D0]">Switch Role:</span>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => {
                  onSwitchDemo('creator');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 text-center rounded text-xs ${
                  currentUser.role === 'creator' ? 'bg-[#7C4DFF] text-white font-bold' : 'bg-[#17132E] text-[#B9B3D0]'
                }`}
              >
                Creator
              </button>
              <button
                onClick={() => {
                  onSwitchDemo('brand');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 text-center rounded text-xs ${
                  currentUser.role === 'brand' ? 'bg-[#FF7A1A] text-white font-bold' : 'bg-[#17132E] text-[#B9B3D0]'
                }`}
              >
                Brand
              </button>
              <button
                onClick={() => {
                  onSwitchDemo('admin');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 text-center rounded text-xs ${
                  currentUser.role === 'admin' ? 'bg-[#00E5FF] text-black font-bold' : 'bg-[#17132E] text-[#B9B3D0]'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
