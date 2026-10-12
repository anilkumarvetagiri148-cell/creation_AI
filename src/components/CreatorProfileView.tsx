import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  MapPin,
  Globe,
  Clock,
  Sparkles,
  Send,
  MessageSquare,
  Bookmark,
  Share2,
  ExternalLink,
  X,
  Layers,
  Wand2,
  ArrowLeft,
  Check,
  ChevronRight
} from 'lucide-react';
import { CreatorWithProfile, PortfolioProject, Review } from '../types/index.js';

interface CreatorProfileViewProps {
  creator: CreatorWithProfile & { reviews: Review[] };
  onBack: () => void;
  onInviteToCampaign: (creator: CreatorWithProfile) => void;
  onSendMessage: (creatorId: string) => void;
  isSaved: boolean;
  onToggleSave: (creatorId: string) => void;
}

export const CreatorProfileView: React.FC<CreatorProfileViewProps> = ({
  creator,
  onBack,
  onInviteToCampaign,
  onSendMessage,
  isSaved,
  onToggleSave
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'packages' | 'reviews' | 'about'>('portfolio');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const { user, profile, portfolio, reviews } = creator;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const servicePackages = [
    {
      name: 'Standard Concept Sprint',
      price: profile.projectStartingRate,
      turnaround: '3-5 Business Days',
      description: 'Ideal for rapid creative exploration, keyframe ideation, or initial style development.',
      includes: [
        '3x High-Fidelity Style Frames (8K resolution)',
        'Prompt architecture documentation',
        'Commercial single-use license',
        '1 round of revisions'
      ]
    },
    {
      name: 'Full Campaign Production',
      price: Math.round(profile.projectStartingRate * 2.2),
      turnaround: '7-10 Business Days',
      featured: true,
      description: 'Complete commercial package with primary deliverable, vertical cutdowns, and sound mix.',
      includes: [
        '1x 30-45s 4K Master Deliverable (or 10 Stills)',
        '3x Social Cutdowns (9:16 vertical & 1:1 square)',
        'Custom LoRA checkpoint / Prompt IP release',
        'Full commercial global rights transfer',
        '2 rounds of revisions'
      ]
    },
    {
      name: 'Enterprise Retainer',
      price: Math.round(profile.projectStartingRate * 4.5),
      turnaround: 'Monthly Dedicated Seat',
      description: 'Dedicated creative director capacity for ongoing monthly drops and rapid-response assets.',
      includes: [
        'Up to 4 complete campaigns per month',
        'Direct Slack / Discord channel access',
        'Priority 24-48h turnaround on urgent assets',
        'Proprietary model fine-tuning & brand LoRAs',
        'Unlimited revisions within scope'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-[#B9B3D0] hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Creator Marketplace</span>
      </button>

      {/* Profile Header Banner & Card */}
      <div className="glass-panel rounded-3xl overflow-hidden relative">
        {/* Banner Gradient / Artwork */}
        <div className="h-44 sm:h-56 w-full relative bg-gradient-to-r from-[#17132E] via-[#201A40] to-[#0B081D] overflow-hidden">
          {portfolio[0] && (
            <img
              src={portfolio[0].mediaUrl}
              alt="Banner"
              className="w-full h-full object-cover opacity-30 blur-sm scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#17132E] via-transparent to-transparent" />
        </div>

        {/* Profile Details Container */}
        <div className="px-6 sm:px-10 pb-8 pt-0 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 -mt-16 sm:-mt-20">
            {/* Avatar & Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-[#17132E] shadow-2xl"
                />
                <span
                  className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-[#17132E] ${
                    profile.availability === 'available' ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                  title={profile.availability}
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{user.name}</h1>
                  <CheckCircle2 className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <p className="text-sm font-medium text-[#9D7BFF]">{profile.title}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#B9B3D0] pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#7C4DFF]" /> {user.location}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-[#7C4DFF]" /> {profile.languages.join(', ')}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#7C4DFF]" /> {profile.experienceYears} Years AI Directing
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Invite, Message, Save */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <button
                onClick={() => onToggleSave(user.id)}
                className={`p-2.5 rounded-xl border transition-all ${
                  isSaved
                    ? 'bg-[#FF7A1A] text-white border-[#FF7A1A]'
                    : 'bg-[#0B081D]/80 border-[#2A2453] text-[#B9B3D0] hover:text-white'
                }`}
                title={isSaved ? 'Saved' : 'Save to Favorites'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-[#0B081D]/80 border border-[#2A2453] text-[#B9B3D0] hover:text-white transition-all"
                title="Share Profile"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => onSendMessage(user.id)}
                className="px-4 py-2.5 rounded-xl bg-[#17132E] hover:bg-[#201A40] border border-[#7C4DFF]/40 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#9D7BFF]" />
                <span>Message</span>
              </button>

              <button
                onClick={() => onInviteToCampaign(creator)}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] hover:from-[#6A3DE8] hover:to-[#8C66FF] text-white font-semibold text-xs shadow-lg shadow-[#7C4DFF]/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Invite to Campaign</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#2A2453]/60">
            <div>
              <span className="text-[11px] text-[#B9B3D0] block">Client Rating</span>
              <div className="flex items-center gap-1 text-amber-400 font-extrabold text-base mt-0.5">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{profile.rating}</span>
                <span className="text-xs font-normal text-[#B9B3D0]">({profile.reviewCount} reviews)</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-[#B9B3D0] block">Completed Campaigns</span>
              <div className="font-extrabold text-white text-base mt-0.5">
                {profile.completedCampaigns} Projects
              </div>
            </div>

            <div>
              <span className="text-[11px] text-[#B9B3D0] block">Project Starting Rate</span>
              <div className="font-extrabold text-white text-base mt-0.5">
                ${profile.projectStartingRate} <span className="text-xs text-[#B9B3D0] font-normal">/ milestone</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-[#B9B3D0] block">Hourly Rate</span>
              <div className="font-extrabold text-white text-base mt-0.5">
                ${profile.hourlyRate} <span className="text-xs text-[#B9B3D0] font-normal">/ hr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#2A2453]">
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'portfolio'
              ? 'border-[#7C4DFF] text-white'
              : 'border-transparent text-[#B9B3D0] hover:text-white'
          }`}
        >
          Portfolio Gallery ({portfolio.length})
        </button>
        <button
          onClick={() => setActiveTab('packages')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'packages'
              ? 'border-[#7C4DFF] text-white'
              : 'border-transparent text-[#B9B3D0] hover:text-white'
          }`}
        >
          Service Packages (3)
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'reviews'
              ? 'border-[#7C4DFF] text-white'
              : 'border-transparent text-[#B9B3D0] hover:text-white'
          }`}
        >
          Verified Client Reviews ({reviews.length})
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'about'
              ? 'border-[#7C4DFF] text-white'
              : 'border-transparent text-[#B9B3D0] hover:text-white'
          }`}
        >
          About & AI Stack
        </button>
      </div>

      {/* Tab 1: Portfolio Gallery */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-[#17132E]">
                    <img
                      src={project.mediaUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#17132E] via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase px-2.5 py-1 rounded bg-[#0B081D]/80 backdrop-blur text-white border border-[#7C4DFF]/30">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#9D7BFF] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#B9B3D0] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="pt-2 text-[11px] text-[#B9B3D0] flex items-center gap-1.5">
                      <span className="text-white font-medium">Tools:</span>
                      <span className="truncate">{project.toolsUsed.join(' · ')}</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 bg-[#0B081D]/60 border-t border-[#2A2453]/60 flex items-center justify-between text-xs text-[#B9B3D0]">
                  <span>{project.deliverables.length} deliverables</span>
                  <span className="text-[#9D7BFF] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Project</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Service Packages */}
      {activeTab === 'packages' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicePackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-5 relative ${
                pkg.featured ? 'border-[#7C4DFF] shadow-xl shadow-[#7C4DFF]/15' : ''
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#7C4DFF] text-white text-[10px] font-bold uppercase tracking-wider">
                  Recommended
                </span>
              )}
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">{pkg.name}</h3>
                  <div className="text-2xl font-extrabold text-white mt-1">
                    ${pkg.price}
                  </div>
                  <span className="text-[11px] text-[#9D7BFF] font-medium block mt-0.5">
                    Estimated {pkg.turnaround}
                  </span>
                  <p className="text-xs text-[#B9B3D0] mt-2 leading-relaxed">{pkg.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#2A2453]/60">
                  <span className="text-[11px] font-semibold text-white uppercase tracking-wider block">
                    What's Included:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#B9B3D0]">
                    {pkg.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#00E5FF] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => onInviteToCampaign(creator)}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 ${
                  pkg.featured
                    ? 'bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] text-white shadow-md shadow-[#7C4DFF]/30'
                    : 'bg-[#17132E] hover:bg-[#201A40] border border-[#7C4DFF]/30 text-white'
                }`}
              >
                <span>Select & Book Brief</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-4 max-w-3xl">
          {reviews.length === 0 ? (
            <div className="glass-panel p-8 text-center rounded-2xl text-xs text-[#B9B3D0]">
              No reviews published yet. Completed campaigns will appear here.
            </div>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="glass-panel p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.reviewerAvatar}
                      alt={rev.reviewerName}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-[#7C4DFF]/40"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{rev.reviewerName}</h4>
                      <p className="text-[11px] text-[#B9B3D0]">{rev.reviewerRole} · {rev.campaignTitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-white/90 leading-relaxed italic bg-[#0B081D]/40 p-3 rounded-xl border border-[#2A2453]/40">
                  "{rev.feedback}"
                </p>
                <div className="text-[10px] text-[#B9B3D0] text-right">
                  Verified Completion · {new Date(rev.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 4: About & AI Stack */}
      {activeTab === 'about' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Creative Background & Vision</h3>
            <p className="text-xs text-[#B9B3D0] leading-relaxed whitespace-pre-line">
              {user.bio}
            </p>

            <div className="pt-4 border-t border-[#2A2453]/60 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Skills & Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs bg-[#17132E] border border-[#2A2453] text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Verified AI Tool Stack</h3>
            <ul className="space-y-2 text-xs text-[#B9B3D0]">
              {profile.aiTools.map((tool, i) => (
                <li key={i} className="flex items-center gap-2 text-white">
                  <Wand2 className="w-3.5 h-3.5 text-[#9D7BFF]" />
                  <span>{tool}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-[#2A2453]/60 space-y-2">
              <h4 className="text-xs font-bold text-white">Social & Web</h4>
              <div className="space-y-1.5 text-xs">
                {profile.socialLinks.website && (
                  <a
                    href={profile.socialLinks.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#9D7BFF] hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" /> Personal Website
                  </a>
                )}
                {profile.socialLinks.x && (
                  <a
                    href={profile.socialLinks.x}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#9D7BFF] hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" /> X / Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-panel rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#7C4DFF]/40 shadow-2xl p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#0B081D]/80 text-[#B9B3D0] hover:text-white border border-[#2A2453] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden bg-[#0B081D] border border-[#2A2453] max-h-[460px]">
              <img
                src={selectedProject.mediaUrl}
                alt={selectedProject.title}
                className="w-full h-full object-contain max-h-[460px] mx-auto"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-[#FF7A1A] uppercase tracking-wider">
                    {selectedProject.category} · {selectedProject.clientRole}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">{selectedProject.title}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onInviteToCampaign(creator);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#7C4DFF] hover:bg-[#6A3DE8] text-white font-semibold text-xs transition-colors shrink-0"
                >
                  Commission Similar Project
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#B9B3D0] leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Prompt Snippet & Workflow if present */}
              {selectedProject.promptSnippet && (
                <div className="p-4 rounded-xl bg-[#0B081D] border border-[#7C4DFF]/30 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9D7BFF]">
                    Master Prompt Aesthetic & Guidance:
                  </span>
                  <p className="font-mono text-xs text-white/90 selection:bg-[#7C4DFF]">
                    "{selectedProject.promptSnippet}"
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-[#17132E] border border-[#2A2453] space-y-1">
                  <span className="text-[10px] text-[#B9B3D0] uppercase font-bold tracking-wider">
                    AI Pipeline & Models:
                  </span>
                  <div className="text-xs text-white font-medium">
                    {selectedProject.toolsUsed.join(', ')}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#17132E] border border-[#2A2453] space-y-1">
                  <span className="text-[10px] text-[#B9B3D0] uppercase font-bold tracking-wider">
                    Deliverables Produced:
                  </span>
                  <div className="text-xs text-white font-medium">
                    {selectedProject.deliverables.join(' · ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
