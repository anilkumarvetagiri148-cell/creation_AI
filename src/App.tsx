import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './components/HomePage.js';
import { CreatorDiscovery } from './components/CreatorDiscovery.js';
import { CreatorProfileView } from './components/CreatorProfileView.js';
import { CampaignsPage } from './components/CampaignsPage.js';
import { CampaignCreateModal } from './components/CampaignCreateModal.js';
import { AIMatchingView } from './components/AIMatchingView.js';
import { BrandDashboard } from './components/BrandDashboard.js';
import { CreatorDashboard } from './components/CreatorDashboard.js';
import { MessagingView } from './components/MessagingView.js';
import { AuthModal } from './components/AuthModal.js';
import { ReviewModal } from './components/ReviewModal.js';
import { InviteModal } from './components/InviteModal.js';
import { SupabaseModal } from './components/SupabaseModal.js';
import { api } from './services/api.js';
import { BackgroundDecorations, BackgroundTheme } from './components/BackgroundDecorations.js';
import {
  UserProfile,
  CreatorWithProfile,
  Campaign,
  NotificationItem,
  Review
} from './types/index.js';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentCreatorProfile, setCurrentCreatorProfile] = useState<any>(null);
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParams, setViewParams] = useState<any>({});

  // Data lists
  const [featuredCreators, setFeaturedCreators] = useState<CreatorWithProfile[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [savedCreatorIds, setSavedCreatorIds] = useState<Set<string>>(new Set());
  const [unreadMessagesCount, setUnreadMessagesCount] = useState<number>(0);

  // Selected Creator for Profile View
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);
  const [selectedCreatorData, setSelectedCreatorData] = useState<(CreatorWithProfile & { reviews: Review[] }) | null>(null);

  // Modals state
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [inviteModalCreator, setInviteModalCreator] = useState<CreatorWithProfile | null>(null);
  const [reviewModalData, setReviewModalData] = useState<{ campaign: Campaign; creatorId: string } | null>(null);

  // Background Atmosphere Theme State
  const [bgTheme, setBgTheme] = useState<BackgroundTheme>(() => {
    try {
      return (localStorage.getItem('creatorconnect_bg_theme') as BackgroundTheme) || 'nebula';
    } catch {
      return 'nebula';
    }
  });

  const handleThemeChange = (newTheme: BackgroundTheme) => {
    setBgTheme(newTheme);
    try {
      localStorage.setItem('creatorconnect_bg_theme', newTheme);
    } catch {}
  };

  // Load initial session and app data
  const loadInitialData = async () => {
    try {
      const authRes = await api.getMe();
      setCurrentUser(authRes.user);
      setCurrentCreatorProfile(authRes.creatorProfile);

      const [creatorsRes, campsRes, notifsRes, savedRes, convsRes] = await Promise.all([
        api.getCreators({ sort: 'relevance', limit: 6 }),
        api.getCampaigns(),
        api.getNotifications(),
        api.getSavedCreators(),
        api.getConversations()
      ]);

      setFeaturedCreators(creatorsRes.creators);
      setCampaigns(campsRes);
      setNotifications(notifsRes);
      setSavedCreatorIds(new Set(savedRes.saved.map((s: any) => s.creatorId)));

      const unreadTotal = convsRes.reduce((acc, c) => acc + (c.unreadCount[authRes.user.id] || 0), 0);
      setUnreadMessagesCount(unreadTotal);
    } catch (err) {
      console.error('Initialization error:', err);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Fetch full creator data when selecting profile
  useEffect(() => {
    if (selectedCreatorId) {
      api.getCreatorById(selectedCreatorId)
        .then((data) => {
          setSelectedCreatorData(data);
        })
        .catch((err) => console.error('Failed to load creator profile:', err));
    }
  }, [selectedCreatorId]);

  const handleNavigate = (view: string, params: any = {}) => {
    setViewParams(params);
    if (params.scrollTo) {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(params.scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchDemo = async (role: 'creator' | 'brand' | 'admin') => {
    try {
      const res = await api.switchDemo(role);
      setCurrentUser(res.user);
      loadInitialData();
      if (role === 'creator') handleNavigate('creator-dashboard');
      else if (role === 'brand') handleNavigate('brand-dashboard');
      else handleNavigate('admin');
    } catch (err) {
      console.error('Switch demo error:', err);
    }
  };

  const handleToggleSave = async (creatorId: string) => {
    try {
      const res = await api.toggleSaveCreator(creatorId);
      setSavedCreatorIds((prev) => {
        const next = new Set(prev);
        if (res.saved) next.add(creatorId);
        else next.delete(creatorId);
        return next;
      });
    } catch (err) {
      console.error('Failed to toggle save creator:', err);
    }
  };

  const handleMarkNotificationRead = async (id: string) => {
    await api.markNotificationRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleSelectCreator = (id: string) => {
    setSelectedCreatorId(id);
    setCurrentView('creator-profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInviteCreator = (creator: CreatorWithProfile) => {
    setInviteModalCreator(creator);
  };

  const handleStartMessageWithUser = async (recipientId: string, campaignId?: string) => {
    try {
      await api.startConversation(recipientId, campaignId);
      setCurrentView('messages');
    } catch (err) {
      console.error('Failed to start conversation:', err);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#0B081D] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#7C4DFF] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#B9B3D0]">Initializing CreatorConnect AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col text-white transition-colors duration-700 theme-${bgTheme} relative selection:bg-[#7C4DFF] selection:text-white`}>
      {/* Dynamic Ambient Background Canvas & Atmospheric Theme Switcher */}
      <BackgroundDecorations theme={bgTheme} onThemeChange={handleThemeChange} />

      {/* Navigation */}
      <Navbar
        currentUser={currentUser}
        notifications={notifications}
        unreadMessagesCount={unreadMessagesCount}
        currentView={currentView}
        currentTheme={bgTheme}
        onThemeChange={handleThemeChange}
        onNavigate={handleNavigate}
        onSwitchDemo={handleSwitchDemo}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={async () => {
          await api.logout();
          loadInitialData();
        }}
        onMarkNotificationRead={handleMarkNotificationRead}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            featuredCreators={featuredCreators}
            onNavigate={handleNavigate}
            onOpenCreateCampaign={() => setIsCampaignModalOpen(true)}
            onSelectCreator={handleSelectCreator}
          />
        )}

        {currentView === 'discover' && (
          <CreatorDiscovery
            initialCategory={viewParams.category}
            initialSearch={viewParams.search}
            onSelectCreator={handleSelectCreator}
            onInviteCreator={handleInviteCreator}
            savedCreatorIds={savedCreatorIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {currentView === 'creator-profile' && selectedCreatorData && (
          <CreatorProfileView
            creator={selectedCreatorData}
            onBack={() => handleNavigate('discover')}
            onInviteToCampaign={handleInviteCreator}
            onSendMessage={(cId) => handleStartMessageWithUser(cId)}
            isSaved={savedCreatorIds.has(selectedCreatorData.user.id)}
            onToggleSave={handleToggleSave}
          />
        )}

        {currentView === 'campaigns' && (
          <CampaignsPage
            currentUser={currentUser}
            onOpenCreateCampaign={() => setIsCampaignModalOpen(true)}
            onSelectCampaignForMatch={(cId) => handleNavigate('matching', { campaignId: cId })}
            onStartMessageWithBrand={(bId, cId) => handleStartMessageWithUser(bId, cId)}
          />
        )}

        {currentView === 'matching' && (
          <AIMatchingView
            campaigns={campaigns}
            initialCampaignId={viewParams.campaignId}
            onSelectCreator={handleSelectCreator}
            onInviteCreator={(c, campId) => {
              setInviteModalCreator(c);
            }}
          />
        )}

        {currentView === 'brand-dashboard' && (
          <BrandDashboard
            currentUser={currentUser}
            onOpenCreateCampaign={() => setIsCampaignModalOpen(true)}
            onSelectCreator={handleSelectCreator}
            onOpenMatching={(campId) => handleNavigate('matching', { campaignId: campId })}
            onStartMessageWithCreator={(cId, campId) => handleStartMessageWithUser(cId, campId)}
            onOpenReviewModal={(camp, cId) => setReviewModalData({ campaign: camp, creatorId: cId })}
          />
        )}

        {currentView === 'creator-dashboard' && (
          <CreatorDashboard
            currentUser={currentUser}
            creatorProfile={currentCreatorProfile}
            onNavigateToCampaigns={() => handleNavigate('campaigns')}
            onSelectCreator={handleSelectCreator}
            onRefreshUser={loadInitialData}
          />
        )}

        {currentView === 'messages' && (
          <MessagingView
            currentUser={currentUser}
            initialConversationId={viewParams.convId}
          />
        )}

        {currentView === 'admin' && (
          <BrandDashboard
            currentUser={currentUser}
            onOpenCreateCampaign={() => setIsCampaignModalOpen(true)}
            onSelectCreator={handleSelectCreator}
            onOpenMatching={(campId) => handleNavigate('matching', { campaignId: campId })}
            onStartMessageWithCreator={(cId, campId) => handleStartMessageWithUser(cId, campId)}
            onOpenReviewModal={(camp, cId) => setReviewModalData({ campaign: camp, creatorId: cId })}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
      />

      {/* Campaign Brief Creation Modal (with Gemini AI Brief Assistant) */}
      <CampaignCreateModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
        onCampaignCreated={(newCamp) => {
          setCampaigns([newCamp, ...campaigns]);
          handleNavigate('campaigns');
        }}
      />

      {/* Campaign Invite Modal */}
      <InviteModal
        isOpen={Boolean(inviteModalCreator)}
        onClose={() => setInviteModalCreator(null)}
        creator={inviteModalCreator}
        campaigns={campaigns.filter((c) => c.status === 'open')}
        onInviteSent={() => {
          loadInitialData();
        }}
      />

      {/* Review Modal */}
      {reviewModalData && (
        <ReviewModal
          isOpen={Boolean(reviewModalData)}
          onClose={() => setReviewModalData(null)}
          campaign={reviewModalData.campaign}
          creatorId={reviewModalData.creatorId}
          onReviewSubmitted={() => {
            loadInitialData();
          }}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onUserChanged={(user) => {
          setCurrentUser(user);
          loadInitialData();
        }}
        onLogout={async () => {
          await api.logout();
          setIsAuthModalOpen(false);
          loadInitialData();
        }}
      />

      {/* Supabase Schema Modal */}
      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />
    </div>
  );
}
