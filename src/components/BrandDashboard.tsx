import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  Send,
  MessageSquare,
  DollarSign,
  Star,
  ExternalLink,
  ChevronRight,
  Bookmark,
  Check,
  X,
  AlertCircle
} from 'lucide-react';
import { Campaign, CampaignProposal, CreatorWithProfile, UserProfile } from '../types/index.js';
import { api } from '../services/api.js';

interface BrandDashboardProps {
  currentUser: UserProfile;
  onOpenCreateCampaign: () => void;
  onSelectCreator: (id: string) => void;
  onOpenMatching: (campaignId: string) => void;
  onStartMessageWithCreator: (creatorId: string, campaignId?: string) => void;
  onOpenReviewModal: (campaign: Campaign, creatorId: string) => void;
}

export const BrandDashboard: React.FC<BrandDashboardProps> = ({
  currentUser,
  onOpenCreateCampaign,
  onSelectCreator,
  onOpenMatching,
  onStartMessageWithCreator,
  onOpenReviewModal
}) => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [proposals, setProposals] = useState<CampaignProposal[]>([]);
  const [savedCreators, setSavedCreators] = useState<CreatorWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [allCamps, savedRes, stats] = await Promise.all([
        api.getCampaigns(),
        api.getSavedCreators(),
        api.getDashboardAnalytics()
      ]);

      const myCamps = allCamps.filter((c) => c.brandId === currentUser.id || currentUser.role === 'admin');
      setCampaigns(myCamps);
      setSavedCreators(savedRes.creators);
      setAnalytics(stats);

      // fetch proposals for first active campaign
      if (myCamps.length > 0) {
        const propsPromises = myCamps.map((c) => api.getCampaignProposals(c.id).catch(() => []));
        const allProps = (await Promise.all(propsPromises)).flat();
        setProposals(allProps);
      }
    } catch (err) {
      console.error('Error fetching brand dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [currentUser.id]);

  const handleUpdateProposalStatus = async (propId: string, status: string) => {
    try {
      await api.updateProposalStatus(propId, status);
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to update proposal:', err);
    }
  };

  const handleUpdateCampaignStatus = async (campId: string, status: string) => {
    try {
      await api.updateCampaignStatus(campId, status);
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to update campaign status:', err);
    }
  };

  const filteredCampaigns = campaigns.filter(
    (c) => statusFilter === 'all' || c.status === statusFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Brand Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#7C4DFF]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentUser.companyName || currentUser.name}
              </h1>
              <span className="text-[10px] font-bold text-[#FF7A1A] uppercase tracking-wider px-2 py-0.5 rounded bg-[#FF7A1A]/10 border border-[#FF7A1A]/30">
                Brand Studio
              </span>
            </div>
            <p className="text-xs text-[#B9B3D0] mt-0.5">{currentUser.bio}</p>
          </div>
        </div>

        <button
          onClick={onOpenCreateCampaign}
          className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A1A] to-[#FFA040] hover:from-[#E6660D] hover:to-[#FF8E2B] text-white font-semibold text-xs shadow-lg shadow-[#FF7A1A]/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Campaign Brief</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <span className="text-xs text-[#B9B3D0]">Active Campaigns</span>
          <div className="text-2xl font-black text-white">
            {analytics?.activeCampaigns ?? campaigns.filter((c) => c.status === 'open' || c.status === 'in_progress').length}
          </div>
          <span className="text-[10px] text-emerald-400 font-medium">Accepting pitches</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <span className="text-xs text-[#B9B3D0]">Proposals Received</span>
          <div className="text-2xl font-black text-[#9D7BFF]">
            {proposals.length}
          </div>
          <span className="text-[10px] text-[#B9B3D0]">Across all briefs</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <span className="text-xs text-[#B9B3D0]">Bookmarked Creators</span>
          <div className="text-2xl font-black text-[#FF7A1A]">
            {savedCreators.length}
          </div>
          <span className="text-[10px] text-[#B9B3D0]">Saved in shortlist</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <span className="text-xs text-[#B9B3D0]">Committed Production Budget</span>
          <div className="text-2xl font-black text-[#00E5FF]">
            ${analytics?.totalSpent ? analytics.totalSpent.toLocaleString() : '1,600'}
          </div>
          <span className="text-[10px] text-emerald-400 font-medium">Secured in milestone escrow</span>
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-white">Campaign Briefs Management</h2>
            <p className="text-xs text-[#B9B3D0]">Review milestones, proposals, and matching recommendations.</p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#17132E] border border-[#2A2453] text-xs">
            {['all', 'open', 'in_progress', 'completed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  statusFilter === st ? 'bg-[#7C4DFF] text-white font-semibold' : 'text-[#B9B3D0] hover:text-white'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {filteredCampaigns.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl text-center space-y-3">
            <Briefcase className="w-8 h-8 text-[#9D7BFF] mx-auto opacity-50" />
            <p className="text-xs text-[#B9B3D0]">No campaigns in this view. Post a brief to start receiving pitches.</p>
            <button
              onClick={onOpenCreateCampaign}
              className="px-4 py-2 rounded-xl bg-[#7C4DFF] text-white text-xs font-semibold"
            >
              Post Campaign Brief
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCampaigns.map((camp) => {
              const campProps = proposals.filter((p) => p.campaignId === camp.id);
              const acceptedProp = campProps.find((p) => p.status === 'accepted');

              return (
                <div
                  key={camp.id}
                  className="glass-panel rounded-2xl p-6 border border-[#2A2453] space-y-4"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            camp.status === 'open'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : camp.status === 'in_progress'
                              ? 'bg-[#7C4DFF]/15 text-[#9D7BFF] border border-[#7C4DFF]/30'
                              : 'bg-white/5 text-[#B9B3D0] border border-white/10'
                          }`}
                        >
                          {camp.status.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-[#9D7BFF] font-medium">{camp.category}</span>
                      </div>
                      <h3 className="text-base font-bold text-white">{camp.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#B9B3D0]">
                        <span>Budget: <strong>${camp.budgetMin}-${camp.budgetMax}</strong></span>
                        <span>·</span>
                        <span>Deadline: <strong>{camp.deadline}</strong></span>
                        <span>·</span>
                        <span>Proposals: <strong>{campProps.length}</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => onOpenMatching(camp.id)}
                        className="px-3 py-1.5 rounded-xl bg-[#17132E] hover:bg-[#201A40] border border-[#7C4DFF]/40 text-[#9D7BFF] font-semibold text-xs transition-colors flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Matchmaker</span>
                      </button>

                      {camp.status === 'in_progress' && (
                        <button
                          onClick={() => handleUpdateCampaignStatus(camp.id, 'completed')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                        >
                          Mark Completed
                        </button>
                      )}

                      {camp.status === 'completed' && acceptedProp && (
                        <button
                          onClick={() => onOpenReviewModal(camp, acceptedProp.creatorId)}
                          className="px-3 py-1.5 rounded-xl bg-[#FF7A1A] hover:bg-[#E6660D] text-white font-semibold text-xs transition-colors flex items-center gap-1"
                        >
                          <Star className="w-3.5 h-3.5 fill-white" />
                          <span>Leave Review</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Incoming Proposals for this campaign */}
                  {campProps.length > 0 && (
                    <div className="pt-4 border-t border-[#2A2453]/60 space-y-3">
                      <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                        Incoming Pitches ({campProps.length})
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {campProps.map((prop) => (
                          <div
                            key={prop.id}
                            className="p-4 rounded-xl bg-[#0B081D]/70 border border-[#2A2453] space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <div
                                className="flex items-center gap-2.5 cursor-pointer"
                                onClick={() => onSelectCreator(prop.creatorId)}
                              >
                                <img
                                  src={prop.creatorAvatar}
                                  alt={prop.creatorName}
                                  className="w-8 h-8 rounded-full object-cover ring-1 ring-[#7C4DFF]"
                                />
                                <div>
                                  <h4 className="text-xs font-bold text-white hover:text-[#9D7BFF]">
                                    {prop.creatorName}
                                  </h4>
                                  <span className="text-[10px] text-[#B9B3D0]">{prop.creatorSpecialization}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="font-extrabold text-white text-xs">${prop.price}</span>
                                <span className="text-[10px] text-[#B9B3D0] block">{prop.timelineDays} days</span>
                              </div>
                            </div>

                            <p className="text-xs text-[#B9B3D0] line-clamp-2 leading-relaxed">
                              "{prop.pitch}"
                            </p>

                            <div className="flex items-center justify-between pt-1 border-t border-[#2A2453]/40 text-xs">
                              <span
                                className={`text-[10px] font-semibold uppercase tracking-wider ${
                                  prop.status === 'accepted'
                                    ? 'text-emerald-400'
                                    : prop.status === 'in_review'
                                    ? 'text-[#9D7BFF]'
                                    : 'text-[#B9B3D0]'
                                }`}
                              >
                                Status: {prop.status}
                              </span>

                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => onStartMessageWithCreator(prop.creatorId, camp.id)}
                                  className="p-1.5 text-[#B9B3D0] hover:text-white rounded"
                                  title="Message Creator"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </button>

                                {prop.status !== 'accepted' && (
                                  <>
                                    <button
                                      onClick={() => handleUpdateProposalStatus(prop.id, 'accepted')}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[11px] flex items-center gap-1"
                                    >
                                      <Check className="w-3 h-3" />
                                      <span>Accept Pitch</span>
                                    </button>
                                    <button
                                      onClick={() => handleUpdateProposalStatus(prop.id, 'declined')}
                                      className="p-1 text-[#B9B3D0] hover:text-rose-400 rounded"
                                      title="Decline Pitch"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Saved Creators Shortlist */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-white">Saved Creators Shortlist</h2>
        {savedCreators.length === 0 ? (
          <div className="glass-panel p-6 rounded-2xl text-xs text-[#B9B3D0]">
            You haven't saved any creators to your shortlist yet. Bookmark creators from the discovery page to view them here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedCreators.map((creator) => (
              <div
                key={creator.user.id}
                onClick={() => onSelectCreator(creator.user.id)}
                className="glass-panel glass-panel-hover p-4 rounded-2xl cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={creator.user.avatar}
                    alt={creator.user.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-[#7C4DFF]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#9D7BFF]">
                      {creator.user.name}
                    </h4>
                    <span className="text-[11px] text-[#B9B3D0] block">{creator.profile.specialization}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#B9B3D0] group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
