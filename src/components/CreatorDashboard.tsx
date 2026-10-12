import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Star,
  ExternalLink,
  Upload,
  X,
  Loader2,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { UserProfile, CreatorProfileDetails, PortfolioProject, CampaignProposal, SpecializationCategory } from '../types/index.js';
import { api } from '../services/api.js';

interface CreatorDashboardProps {
  currentUser: UserProfile;
  creatorProfile?: CreatorProfileDetails;
  onNavigateToCampaigns: () => void;
  onSelectCreator: (id: string) => void;
  onRefreshUser: () => void;
}

export const CreatorDashboard: React.FC<CreatorDashboardProps> = ({
  currentUser,
  creatorProfile,
  onNavigateToCampaigns,
  onSelectCreator,
  onRefreshUser
}) => {
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>([]);
  const [proposals, setProposals] = useState<CampaignProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState(creatorProfile?.availability || 'available');
  const [analytics, setAnalytics] = useState<any>(null);

  // New Project Modal State
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<SpecializationCategory>('AI Video & Commercials');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newTools, setNewTools] = useState('Runway Gen-3, Midjourney v6.1');
  const [newDeliverables, setNewDeliverables] = useState('1x 4K Master, 2x Social Cuts');
  const [newPrompt, setNewPrompt] = useState('');
  const [addingProject, setAddingProject] = useState(false);
  const [projectError, setProjectError] = useState('');

  const fetchCreatorData = async () => {
    setLoading(true);
    try {
      const [creatorRes, stats] = await Promise.all([
        api.getCreatorById(currentUser.id),
        api.getDashboardAnalytics()
      ]);
      setPortfolio(creatorRes.portfolio || []);
      setAnalytics(stats);

      // fetch proposals
      const myProposals = await api.getCampaignProposals('all').catch(() => []);
      setProposals(myProposals.filter((p: any) => p.creatorId === currentUser.id));
    } catch (err) {
      console.error('Error fetching creator dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreatorData();
  }, [currentUser.id]);

  const handleUpdateAvailability = async (newVal: 'available' | 'busy' | 'booked') => {
    setAvailability(newVal);
    try {
      await api.updateCreatorProfile(currentUser.id, { availability: newVal });
      onRefreshUser();
    } catch (err) {
      console.error('Failed to update availability:', err);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newMediaUrl) {
      setProjectError('Title, description, and media URL are required.');
      return;
    }

    setAddingProject(true);
    setProjectError('');

    try {
      const added = await api.addPortfolioProject(currentUser.id, {
        title: newTitle,
        description: newDesc,
        category: newCategory,
        mediaUrl: newMediaUrl,
        mediaType: 'image',
        toolsUsed: newTools.split(',').map((s) => s.trim()),
        deliverables: newDeliverables.split(',').map((s) => s.trim()),
        promptSnippet: newPrompt
      });

      setPortfolio([added, ...portfolio]);
      setIsAddProjectOpen(false);
      // Reset form
      setNewTitle('');
      setNewDesc('');
      setNewMediaUrl('');
      setNewPrompt('');
    } catch (err: any) {
      setProjectError(err.message || 'Error adding project.');
    } finally {
      setAddingProject(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this portfolio project?')) return;
    try {
      await api.deletePortfolioProject(currentUser.id, projectId);
      setPortfolio(portfolio.filter((p) => p.id !== projectId));
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#7C4DFF]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{currentUser.name}</h1>
              <span className="text-[10px] font-bold text-[#9D7BFF] uppercase tracking-wider px-2 py-0.5 rounded bg-[#7C4DFF]/20 border border-[#7C4DFF]/40">
                Creator Hub
              </span>
            </div>
            <p className="text-xs text-[#B9B3D0] mt-0.5">{creatorProfile?.title || 'AI Content Director'}</p>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#17132E] border border-[#2A2453] text-xs">
            <button
              onClick={() => handleUpdateAvailability('available')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                availability === 'available'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'text-[#B9B3D0] hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Available</span>
            </button>
            <button
              onClick={() => handleUpdateAvailability('busy')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                availability === 'busy'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'text-[#B9B3D0] hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Limited</span>
            </button>
          </div>

          <button
            onClick={() => onSelectCreator(currentUser.id)}
            className="px-4 py-2.5 rounded-xl bg-[#17132E] hover:bg-[#201A40] border border-[#7C4DFF]/40 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#9D7BFF]" />
            <span>View Public Profile</span>
          </button>
        </div>
      </div>

      {/* Metrics & Completion Score */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Profile Completion */}
        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-[#B9B3D0]">
            <span>Profile Completion</span>
            <span className="text-white font-bold">{creatorProfile?.completionPercentage || 95}%</span>
          </div>
          <div className="w-full bg-[#0B081D] h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#7C4DFF] to-[#00E5FF] h-full"
              style={{ width: `${creatorProfile?.completionPercentage || 95}%` }}
            />
          </div>
          <span className="text-[10px] text-emerald-400 block pt-0.5">Ready for enterprise matching</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <span className="text-xs text-[#B9B3D0]">Estimated Earnings</span>
          <div className="text-2xl font-black text-white">
            ${analytics?.estimatedEarnings ? analytics.estimatedEarnings.toLocaleString() : '3,600'}
          </div>
          <span className="text-[10px] text-[#B9B3D0]">Via completed briefs</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <span className="text-xs text-[#B9B3D0]">Active Pitches</span>
          <div className="text-2xl font-black text-[#9D7BFF]">
            {proposals.length || 2}
          </div>
          <span className="text-[10px] text-[#B9B3D0]">Submitted proposals</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <span className="text-xs text-[#B9B3D0]">Verified Rating</span>
          <div className="text-2xl font-black text-amber-400 flex items-center gap-1">
            <Star className="w-5 h-5 fill-amber-400" />
            <span>{creatorProfile?.rating || 4.95}</span>
          </div>
          <span className="text-[10px] text-[#B9B3D0]">From {creatorProfile?.reviewCount || 24} client reviews</span>
        </div>
      </div>

      {/* Portfolio Management Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white">Portfolio Management</h2>
            <p className="text-xs text-[#B9B3D0]">Upload case studies, generative models used, and style frames.</p>
          </div>

          <button
            onClick={() => setIsAddProjectOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] hover:from-[#6A3DE8] hover:to-[#8C66FF] text-white font-semibold text-xs shadow-md shadow-[#7C4DFF]/30 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Portfolio Work</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((proj) => (
            <div
              key={proj.id}
              className="glass-panel rounded-2xl overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-[#17132E]">
                  <img
                    src={proj.mediaUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17132E] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#0B081D]/80 text-white border border-[#7C4DFF]/30">
                    {proj.category}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-white line-clamp-1">{proj.title}</h3>
                  <p className="text-xs text-[#B9B3D0] line-clamp-2">{proj.description}</p>
                  <div className="text-[11px] text-[#B9B3D0] truncate">
                    <strong>Tools:</strong> {proj.toolsUsed.join(', ')}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#0B081D]/60 border-t border-[#2A2453]/60 flex items-center justify-between text-xs">
                <span className="text-[#B9B3D0] text-[11px]">{proj.deliverables.length} deliverables</span>
                <button
                  onClick={() => handleDeleteProject(proj.id)}
                  className="p-1.5 text-[#B9B3D0] hover:text-rose-400 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submitted Proposals Status Tracker */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white">Campaign Proposals Status</h2>
            <p className="text-xs text-[#B9B3D0]">Track brand responses to your pitches.</p>
          </div>

          <button
            onClick={onNavigateToCampaigns}
            className="text-xs text-[#9D7BFF] hover:text-white font-semibold transition-colors"
          >
            Browse More Briefs →
          </button>
        </div>

        {proposals.length === 0 ? (
          <div className="glass-panel p-6 rounded-2xl text-xs text-[#B9B3D0]">
            No submitted proposals yet. Visit Open Campaigns to submit pitches!
          </div>
        ) : (
          <div className="space-y-3">
            {proposals.map((prop) => (
              <div
                key={prop.id}
                className="glass-panel p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#2A2453]"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">{prop.campaignTitle}</h4>
                  <p className="text-xs text-[#B9B3D0] line-clamp-1">"{prop.pitch}"</p>
                </div>

                <div className="flex items-center gap-4 text-xs shrink-0">
                  <div>
                    <span className="text-[10px] text-[#B9B3D0] block">Quoted</span>
                    <span className="font-extrabold text-white">${prop.price}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#B9B3D0] block">Timeline</span>
                    <span className="font-extrabold text-white">{prop.timelineDays} days</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      prop.status === 'accepted'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : prop.status === 'in_review'
                        ? 'bg-[#7C4DFF]/20 text-[#9D7BFF] border border-[#7C4DFF]/40'
                        : 'bg-white/5 text-[#B9B3D0]'
                    }`}
                  >
                    {prop.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-panel rounded-3xl max-w-lg w-full border border-[#7C4DFF]/40 shadow-2xl p-6 sm:p-8 space-y-5 relative">
            <button
              onClick={() => setIsAddProjectOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#0B081D]/80 text-[#B9B3D0] hover:text-white border border-[#2A2453]"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[11px] font-bold text-[#FF7A1A] uppercase tracking-wider">
                Portfolio Upload
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">Add Case Study Project</h2>
            </div>

            {projectError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {projectError}
              </div>
            )}

            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white block">Project Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Lumina 4K Commercial Reel"
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-white block">Category *</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as SpecializationCategory)}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none bg-[#17132E]"
                >
                  <option value="AI Video & Commercials">AI Video & Commercials</option>
                  <option value="AI Image & Photography">AI Image & Photography</option>
                  <option value="AI Influencers & Avatars">AI Influencers & Avatars</option>
                  <option value="AI Animation & Motion">AI Animation & Motion</option>
                  <option value="AI Voice & Audio">AI Voice & Audio</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-white block">Media Image URL *</label>
                <input
                  type="url"
                  required
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-white block">Description & Client Context *</label>
                <textarea
                  required
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Explain the creative brief, physics realism, or model architecture..."
                  className="w-full glass-input rounded-xl p-3 text-xs text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-white block">AI Tools Used (comma separated)</label>
                <input
                  type="text"
                  value={newTools}
                  onChange={(e) => setNewTools(e.target.value)}
                  placeholder="Runway Gen-3, Midjourney v6.1, FLUX.1"
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-white block">Prompt Aesthetic Snippet (optional)</label>
                <input
                  type="text"
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="Cinematic reflections, anamorphic flare, studio lighting..."
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#2A2453]/60">
                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#B9B3D0] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingProject}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] text-white font-semibold text-xs shadow-md shadow-[#7C4DFF]/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  {addingProject ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Add to Portfolio</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
