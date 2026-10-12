import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  DollarSign,
  Calendar,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  Wand2,
  X,
  AlertCircle,
  Loader2,
  Plus,
  ChevronRight
} from 'lucide-react';
import { Campaign, UserProfile, CampaignProposal } from '../types/index.js';
import { api } from '../services/api.js';

interface CampaignsPageProps {
  currentUser: UserProfile;
  onOpenCreateCampaign: () => void;
  onSelectCampaignForMatch: (campaignId: string) => void;
  onStartMessageWithBrand: (brandId: string, campaignId?: string) => void;
}

export const CampaignsPage: React.FC<CampaignsPageProps> = ({
  currentUser,
  onOpenCreateCampaign,
  onSelectCampaignForMatch,
  onStartMessageWithBrand
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('open');

  // Proposal modal state
  const [selectedCampaignForProposal, setSelectedCampaignForProposal] = useState<Campaign | null>(null);
  const [pitch, setPitch] = useState('');
  const [price, setPrice] = useState<number>(2000);
  const [timelineDays, setTimelineDays] = useState<number>(10);
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [proposalSuccess, setProposalSuccess] = useState(false);
  const [proposalError, setProposalError] = useState('');

  // Selected Campaign Details Modal
  const [detailedCampaign, setDetailedCampaign] = useState<Campaign | null>(null);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const list = await api.getCampaigns({
        category: category !== 'all' ? category : undefined,
        search: search || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined
      });
      setCampaigns(list);
    } catch (err) {
      console.error('Failed to load campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [category, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCampaigns();
  };

  const handleOpenProposal = (campaign: Campaign) => {
    setSelectedCampaignForProposal(campaign);
    setPrice(Math.round((campaign.budgetMin + campaign.budgetMax) / 2));
    setPitch(
      `Hello ${campaign.brandName} team! I specialize in ${campaign.category} deliverables with ${campaign.requiredTools.slice(0, 2).join(' & ')}. I can produce the requested ${campaign.deliverables[0] || 'assets'} on schedule.`
    );
    setTimelineDays(10);
    setProposalSuccess(false);
    setProposalError('');
  };

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaignForProposal) return;
    if (!pitch.trim() || !price || !timelineDays) {
      setProposalError('Please provide a pitch message, price quote, and timeline in days.');
      return;
    }

    setSubmittingProposal(true);
    setProposalError('');

    try {
      await api.submitProposal(selectedCampaignForProposal.id, {
        pitch,
        price,
        timelineDays
      });
      setProposalSuccess(true);
      setTimeout(() => {
        setSelectedCampaignForProposal(null);
        setProposalSuccess(false);
        fetchCampaigns();
      }, 1800);
    } catch (err: any) {
      setProposalError(err.message || 'Could not submit proposal. A pitch may already exist.');
    } finally {
      setSubmittingProposal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FF7A1A] uppercase tracking-wider">
            <Briefcase className="w-4 h-4" />
            <span>Open Campaign Briefs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Browse Active Brand Briefs
          </h1>
          <p className="text-xs sm:text-sm text-[#B9B3D0] max-w-2xl mt-0.5">
            Discover verified commercial briefs published by brands and agencies. Pitch directly with your AI pipeline and timeline.
          </p>
        </div>

        {currentUser.role === 'brand' && (
          <button
            onClick={onOpenCreateCampaign}
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A1A] to-[#FFA040] hover:from-[#E6660D] hover:to-[#FF8E2B] text-white font-semibold text-xs shadow-lg shadow-[#FF7A1A]/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Brief</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl glass-panel">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B081D]/80 border border-[#7C4DFF]/30">
          <Search className="w-4 h-4 text-[#9D7BFF] shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campaigns by brand, objective, or tool..."
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-[#B9B3D0]/60 outline-none"
          />
          <button
            type="submit"
            className="px-3 py-1 rounded-lg bg-[#7C4DFF] hover:bg-[#6A3DE8] text-white text-xs font-medium transition-colors shrink-0"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 text-xs text-[#B9B3D0]">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#0B081D]/90 border border-[#2A2453] text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-[#7C4DFF]"
          >
            <option value="all">All Categories</option>
            <option value="AI Video & Commercials">AI Video & Commercials</option>
            <option value="AI Image & Photography">AI Image & Photography</option>
            <option value="AI Influencers & Avatars">AI Influencers & Avatars</option>
            <option value="AI Animation & Motion">AI Animation & Motion</option>
            <option value="AI Voice & Audio">AI Voice & Audio</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0B081D]/90 border border-[#2A2453] text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-[#7C4DFF]"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open for Pitches</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Campaigns List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-panel rounded-2xl h-64 animate-pulse p-6 space-y-4">
              <div className="h-6 bg-[#17132E] rounded w-1/2" />
              <div className="h-4 bg-[#17132E] rounded w-3/4" />
              <div className="h-16 bg-[#17132E] rounded" />
            </div>
          ))}
        </div>
      ) : campaigns.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-3xl p-8 space-y-4 max-w-lg mx-auto">
          <Briefcase className="w-12 h-12 text-[#9D7BFF] mx-auto opacity-60" />
          <h3 className="text-lg font-bold text-white">No Campaigns Found</h3>
          <p className="text-xs text-[#B9B3D0]">
            There are currently no campaigns matching your selected criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between space-y-5 border border-[#2A2453] hover:border-[#7C4DFF]/50 transition-all group"
            >
              <div className="space-y-4">
                {/* Brand & Category Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={camp.brandAvatar}
                      alt={camp.brandName}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-[#7C4DFF]/30"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{camp.brandName}</h4>
                      <span className="text-[11px] text-[#9D7BFF]">{camp.category}</span>
                    </div>
                  </div>

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
                </div>

                {/* Campaign Title & Description */}
                <div>
                  <h3
                    onClick={() => setDetailedCampaign(camp)}
                    className="text-base font-bold text-white group-hover:text-[#9D7BFF] transition-colors cursor-pointer line-clamp-1"
                  >
                    {camp.title}
                  </h3>
                  <p className="text-xs text-[#B9B3D0] line-clamp-2 mt-1 leading-relaxed">
                    {camp.description}
                  </p>
                </div>

                {/* Key Deliverables & Required Tools */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#B9B3D0]">
                    <span className="text-white font-medium">Deliverables:</span>
                    <span className="truncate">{camp.deliverables.slice(0, 2).join(' · ')}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#B9B3D0]">
                    <span className="text-white font-medium">Tools:</span>
                    <span className="truncate">{camp.requiredTools.join(' · ')}</span>
                  </div>
                </div>
              </div>

              {/* Footer: Budget, Deadline & Actions */}
              <div className="pt-4 border-t border-[#2A2453]/60 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#B9B3D0] block">Budget Range</span>
                  <span className="font-extrabold text-white text-sm">
                    ${camp.budgetMin.toLocaleString()} - ${camp.budgetMax.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectCampaignForMatch(camp.id)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#17132E] hover:bg-[#201A40] border border-[#7C4DFF]/30 text-[#9D7BFF] font-medium text-xs transition-colors flex items-center gap-1"
                    title="Find matching creators for this brief"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span className="hidden sm:inline">Match AI</span>
                  </button>

                  {currentUser.role === 'creator' && camp.status === 'open' && (
                    <button
                      onClick={() => handleOpenProposal(camp)}
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] text-white font-semibold text-xs shadow-md shadow-[#7C4DFF]/25 hover:brightness-110 transition-all flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Pitch</span>
                    </button>
                  )}

                  <button
                    onClick={() => setDetailedCampaign(camp)}
                    className="p-1.5 text-[#B9B3D0] hover:text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Proposal Submission Modal */}
      {selectedCampaignForProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-panel rounded-3xl max-w-xl w-full border border-[#7C4DFF]/40 shadow-2xl p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => setSelectedCampaignForProposal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#0B081D]/80 text-[#B9B3D0] hover:text-white border border-[#2A2453] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[11px] font-bold text-[#FF7A1A] uppercase tracking-wider">
                Pitch Proposal
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                {selectedCampaignForProposal.title}
              </h2>
              <p className="text-xs text-[#B9B3D0] mt-0.5">
                Posting to {selectedCampaignForProposal.brandName} · Budget: ${selectedCampaignForProposal.budgetMin} - ${selectedCampaignForProposal.budgetMax}
              </p>
            </div>

            {proposalError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{proposalError}</span>
              </div>
            )}

            {proposalSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Proposal Submitted Successfully!</h3>
                <p className="text-xs text-[#B9B3D0]">
                  {selectedCampaignForProposal.brandName} has received your pitch and timeline. You can track status in your Creator Dashboard.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white block">
                    Your Tailored Pitch & AI Workflow Approach *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    placeholder="Describe your creative angle, tools you will use, sample previous deliverables, and turnaround..."
                    className="w-full glass-input rounded-xl p-3 text-xs text-white outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white block">
                      Quoted Price ($USD) *
                    </label>
                    <input
                      type="number"
                      required
                      min={100}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white block">
                      Delivery Timeline (Days) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={60}
                      value={timelineDays}
                      onChange={(e) => setTimelineDays(Number(e.target.value))}
                      className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#2A2453]/60">
                  <button
                    type="button"
                    onClick={() => setSelectedCampaignForProposal(null)}
                    className="px-4 py-2 text-xs font-medium text-[#B9B3D0] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingProposal}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] text-white font-semibold text-xs shadow-lg shadow-[#7C4DFF]/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {submittingProposal ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Proposal</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Campaign Details Lightbox Modal */}
      {detailedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-panel rounded-3xl max-w-2xl w-full border border-[#7C4DFF]/40 shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setDetailedCampaign(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#0B081D]/80 text-[#B9B3D0] hover:text-white border border-[#2A2453] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <img
                src={detailedCampaign.brandAvatar}
                alt={detailedCampaign.brandName}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#7C4DFF]"
              />
              <div>
                <h3 className="text-base font-bold text-white">{detailedCampaign.brandName}</h3>
                <span className="text-xs text-[#9D7BFF]">{detailedCampaign.category}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-white">{detailedCampaign.title}</h2>
              <p className="text-xs sm:text-sm text-[#B9B3D0] leading-relaxed whitespace-pre-line">
                {detailedCampaign.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#0B081D]/60 border border-[#2A2453] text-xs">
              <div>
                <span className="text-[10px] text-[#B9B3D0] block">Budget</span>
                <span className="font-extrabold text-white">
                  ${detailedCampaign.budgetMin} - ${detailedCampaign.budgetMax}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#B9B3D0] block">Deadline</span>
                <span className="font-extrabold text-white">{detailedCampaign.deadline}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#B9B3D0] block">Experience</span>
                <span className="font-extrabold text-white capitalize">{detailedCampaign.experienceLevel}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Required Deliverables</h4>
                <ul className="list-disc list-inside text-xs text-[#B9B3D0] space-y-1">
                  {detailedCampaign.deliverables.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Tools & Skill Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {detailedCampaign.requiredTools.concat(detailedCampaign.requiredSkills).map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-[#17132E] border border-[#2A2453] text-white">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A2453]/60 flex items-center justify-between">
              <button
                onClick={() => {
                  const bId = detailedCampaign.brandId;
                  const cId = detailedCampaign.id;
                  setDetailedCampaign(null);
                  onStartMessageWithBrand(bId, cId);
                }}
                className="px-4 py-2 rounded-xl bg-[#17132E] hover:bg-[#201A40] text-xs font-medium text-[#B9B3D0] hover:text-white transition-colors"
              >
                Message Brand
              </button>

              {currentUser.role === 'creator' && detailedCampaign.status === 'open' && (
                <button
                  onClick={() => {
                    const c = detailedCampaign;
                    setDetailedCampaign(null);
                    handleOpenProposal(c);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] text-white font-semibold text-xs transition-all shadow-md shadow-[#7C4DFF]/30"
                >
                  Submit Pitch Proposal
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
