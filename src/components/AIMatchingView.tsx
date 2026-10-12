import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Star,
  Send,
  Loader2,
  ChevronRight,
  TrendingUp,
  Sliders,
  Info,
  DollarSign,
  Clock,
  Layers,
  Wand2
} from 'lucide-react';
import { Campaign, CreatorWithProfile, AIMatchScore } from '../types/index.js';
import { api } from '../services/api.js';

interface AIMatchingViewProps {
  campaigns: Campaign[];
  initialCampaignId?: string;
  onSelectCreator: (id: string) => void;
  onInviteCreator: (creator: CreatorWithProfile, campaignId: string) => void;
}

export const AIMatchingView: React.FC<AIMatchingViewProps> = ({
  campaigns,
  initialCampaignId,
  onSelectCreator,
  onInviteCreator
}) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(
    initialCampaignId || (campaigns[0]?.id || '')
  );
  const [matches, setMatches] = useState<{ creator: CreatorWithProfile; match: AIMatchScore }[]>([]);
  const [loading, setLoading] = useState(false);
  const [detailedScoreId, setDetailedScoreId] = useState<string | null>(null);

  const selectedCampaign = campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];

  const runMatching = async (campaignId: string) => {
    if (!campaignId) return;
    setLoading(true);
    try {
      const results = await api.getAIMatches(campaignId);
      setMatches(results);
    } catch (err) {
      console.error('Error running AI matching:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCampaignId) {
      runMatching(selectedCampaignId);
    }
  }, [selectedCampaignId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#7C4DFF] uppercase tracking-wider">
          <Cpu className="w-4 h-4 text-[#7C4DFF]" />
          <span>Intelligent Talent Recommendation Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          AI Creator Matchmaker
        </h1>
        <p className="text-xs sm:text-sm text-[#B9B3D0] max-w-2xl">
          Powered by a 5-factor weighted baseline (Category, Skills, Budget, Rating, Availability) combined with Google Gemini 3.8 Flash qualitative synthesis.
        </p>
      </div>

      {/* Campaign Selector Banner */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#7C4DFF]/40">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-[#FF7A1A] uppercase tracking-wider block">
            Target Campaign Brief
          </span>
          {campaigns.length > 0 ? (
            <select
              value={selectedCampaignId}
              onChange={(e) => setSelectedCampaignId(e.target.value)}
              className="bg-[#0B081D] text-white text-sm font-semibold rounded-xl px-3 py-2 border border-[#2A2453] outline-none focus:border-[#7C4DFF] w-full sm:w-96"
            >
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} (${c.budgetMin}-${c.budgetMax})
                </option>
              ))}
            </select>
          ) : (
            <span className="text-xs text-[#B9B3D0]">No campaigns available. Create one to run matches!</span>
          )}
        </div>

        {selectedCampaign && (
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#B9B3D0] bg-[#0B081D]/60 px-4 py-2 rounded-xl border border-[#2A2453]">
            <span>Category: <strong className="text-white">{selectedCampaign.category}</strong></span>
            <span>·</span>
            <span>Budget: <strong className="text-white">${selectedCampaign.budgetMin}-${selectedCampaign.budgetMax}</strong></span>
            <span>·</span>
            <span>Required: <strong className="text-white">{selectedCampaign.requiredTools.slice(0, 2).join(', ')}</strong></span>
          </div>
        )}
      </div>

      {/* Disclaimers & Methodology info */}
      <div className="p-3.5 rounded-xl bg-[#17132E]/60 border border-[#2A2453] text-[11px] text-[#B9B3D0] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#9D7BFF] shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Deterministic Baseline Methodology:</strong> Scores are calculated with fixed weights: Category Niche (25%), Skill & Tool Coverage (30%), Budget Compatibility (20%), Rating & Experience (15%), and Availability (10%). Match scores are recommendation indices, not guarantees of performance.
        </div>
      </div>

      {/* Matches Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-4">
          <Loader2 className="w-8 h-8 text-[#7C4DFF] animate-spin mx-auto" />
          <p className="text-xs text-[#B9B3D0]">Running 5-factor scoring and Gemini synthesis across creator pool...</p>
        </div>
      ) : matches.length === 0 ? (
        <div className="py-16 text-center glass-panel rounded-2xl text-xs text-[#B9B3D0]">
          No matches found for this campaign.
        </div>
      ) : (
        <div className="space-y-6">
          {matches.map(({ creator, match }, idx) => {
            const isTop = idx === 0;
            const isDetailed = detailedScoreId === creator.user.id;

            return (
              <div
                key={creator.user.id}
                className={`glass-panel rounded-2xl p-6 transition-all duration-300 relative border ${
                  isTop ? 'border-[#7C4DFF] shadow-xl shadow-[#7C4DFF]/15' : 'border-[#2A2453]'
                }`}
              >
                {isTop && (
                  <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] text-white text-[10px] font-extrabold uppercase tracking-wide shadow-md">
                    ★ Highest Recommended Match
                  </span>
                )}

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  {/* Left: Score Badge & Creator Identity */}
                  <div className="flex items-start gap-4">
                    {/* Radial Score Gauge */}
                    <div className="relative w-16 h-16 rounded-2xl bg-[#0B081D] border border-[#7C4DFF]/40 flex flex-col items-center justify-center shrink-0 shadow-inner">
                      <span className="text-xl font-black text-white leading-none">
                        {match.score}
                        <span className="text-[10px] text-[#9D7BFF]">%</span>
                      </span>
                      <span className="text-[9px] font-semibold text-[#B9B3D0] uppercase mt-0.5">Match</span>
                    </div>

                    {/* Creator Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={creator.user.avatar}
                          alt={creator.user.name}
                          onClick={() => onSelectCreator(creator.user.id)}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-[#7C4DFF] cursor-pointer"
                        />
                        <h3
                          onClick={() => onSelectCreator(creator.user.id)}
                          className="text-base font-bold text-white hover:text-[#9D7BFF] cursor-pointer transition-colors"
                        >
                          {creator.user.name}
                        </h3>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                      </div>
                      <p className="text-xs text-[#9D7BFF] font-medium">{creator.profile.title}</p>
                      <div className="flex items-center gap-3 text-xs text-[#B9B3D0]">
                        <span className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" /> {creator.profile.rating}
                        </span>
                        <span>·</span>
                        <span>Starts at <strong className="text-white">${creator.profile.projectStartingRate}</strong></span>
                        <span>·</span>
                        <span className="capitalize">{creator.profile.availability}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
                    <button
                      onClick={() => setDetailedScoreId(isDetailed ? null : creator.user.id)}
                      className="px-3 py-2 rounded-xl bg-[#17132E] hover:bg-[#201A40] text-xs font-medium text-[#B9B3D0] hover:text-white transition-colors border border-[#2A2453]"
                    >
                      {isDetailed ? 'Hide Factor Breakdown' : 'View Scoring Breakdown'}
                    </button>

                    <button
                      onClick={() => onSelectCreator(creator.user.id)}
                      className="px-3.5 py-2 rounded-xl bg-[#17132E] hover:bg-[#201A40] text-xs font-semibold text-white border border-[#7C4DFF]/40 transition-colors"
                    >
                      View Portfolio
                    </button>

                    <button
                      onClick={() => onInviteCreator(creator, selectedCampaignId)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] hover:from-[#6A3DE8] hover:to-[#8C66FF] text-white font-semibold text-xs shadow-md shadow-[#7C4DFF]/30 transition-all flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Invite</span>
                    </button>
                  </div>
                </div>

                {/* Match Summary & Reasons */}
                <div className="mt-4 p-4 rounded-xl bg-[#0B081D]/60 border border-[#2A2453]/60 space-y-2">
                  <p className="text-xs text-white/90 font-medium">
                    {match.summary}
                  </p>
                  {match.aiSuggestedAngle && (
                    <div className="text-xs text-[#9D7BFF] italic bg-[#7C4DFF]/10 p-2.5 rounded-lg border border-[#7C4DFF]/20 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF7A1A] shrink-0 mt-0.5" />
                      <span><strong>Collaboration Angle:</strong> {match.aiSuggestedAngle}</span>
                    </div>
                  )}

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-xs text-[#B9B3D0]">
                    {match.reasons.map((r, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expandable Transparent Breakdown */}
                {isDetailed && (
                  <div className="mt-4 p-4 rounded-xl bg-[#17132E] border border-[#7C4DFF]/30 space-y-3">
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                      Deterministic Weighted Breakdown:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[#B9B3D0]">
                          <span>Category (25%)</span>
                          <span className="text-white font-bold">{match.breakdown.categoryMatch}%</span>
                        </div>
                        <div className="w-full bg-[#0B081D] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#7C4DFF] h-full" style={{ width: `${match.breakdown.categoryMatch}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[#B9B3D0]">
                          <span>Tools & Skills (30%)</span>
                          <span className="text-white font-bold">{match.breakdown.skillsAndToolsMatch}%</span>
                        </div>
                        <div className="w-full bg-[#0B081D] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#9D7BFF] h-full" style={{ width: `${match.breakdown.skillsAndToolsMatch}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[#B9B3D0]">
                          <span>Budget Fit (20%)</span>
                          <span className="text-white font-bold">{match.breakdown.budgetCompatibility}%</span>
                        </div>
                        <div className="w-full bg-[#0B081D] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#FF7A1A] h-full" style={{ width: `${match.breakdown.budgetCompatibility}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[#B9B3D0]">
                          <span>Rating & Exp (15%)</span>
                          <span className="text-white font-bold">{match.breakdown.ratingAndExperience}%</span>
                        </div>
                        <div className="w-full bg-[#0B081D] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full" style={{ width: `${match.breakdown.ratingAndExperience}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[#B9B3D0]">
                          <span>Availability (10%)</span>
                          <span className="text-white font-bold">{match.breakdown.availability}%</span>
                        </div>
                        <div className="w-full bg-[#0B081D] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#00E5FF] h-full" style={{ width: `${match.breakdown.availability}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
