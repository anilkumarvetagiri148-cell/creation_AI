import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  Star,
  CheckCircle2,
  Cpu,
  Video,
  Image,
  Layers,
  Wand2,
  ShieldCheck,
  TrendingUp,
  ChevronDown,
  Compass,
  Briefcase,
  Play
} from 'lucide-react';
import { CreatorWithProfile } from '../types/index.js';

interface HomePageProps {
  featuredCreators: CreatorWithProfile[];
  onNavigate: (view: string, params?: any) => void;
  onOpenCreateCampaign: () => void;
  onSelectCreator: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  featuredCreators,
  onNavigate,
  onOpenCreateCampaign,
  onSelectCreator
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('discover', { search: searchQuery.trim() });
    } else {
      onNavigate('discover');
    }
  };

  const categories = [
    { name: 'Finance & Investing', icon: TrendingUp, tool: 'Midjourney v6.1, Runway Gen-3', count: '6 Creators' },
    { name: 'Technology & AI', icon: Cpu, tool: 'ComfyUI, FLUX.1 Pro', count: '6 Creators' },
    { name: 'Education & E-Learning', icon: Wand2, tool: 'Runway Gen-3, ElevenLabs', count: '6 Creators' },
    { name: 'Fashion & Beauty', icon: Sparkles, tool: 'FLUX.1 Pro, FaceID LoRA', count: '6 Creators' },
    { name: 'Gaming & Esports', icon: Video, tool: 'Runway Gen-3, Kling AI', count: '6 Creators' },
    { name: 'Real Estate', icon: Briefcase, tool: 'FLUX.1 Pro, D5 Render', count: '6 Creators' },
    { name: 'Health & Fitness', icon: TrendingUp, tool: 'Runway Gen-3, Topaz Video', count: '6 Creators' },
    { name: 'Food & Cooking', icon: Sparkles, tool: 'Midjourney, FLUX.1 Pro', count: '6 Creators' }
  ];

  const faqs = [
    {
      q: 'How does CreatorConnect AI verify generative content creators?',
      a: 'Every creator on the platform submits production workflow proof, including raw prompt structures, negative prompts, custom LoRA checkpoints, ComfyUI node graphs, and commercial deliverable resolutions. Our automated verification evaluates both technical reproducibility and aesthetic mastery.'
    },
    {
      q: 'How does the AI Creator Matching system work?',
      a: 'We use a dual-tier matching engine. A deterministic 5-factor baseline evaluates Category Alignment (25%), Skill & Tool Coverage (30%), Budget Compatibility (20%), Client Ratings & Experience (15%), and Real-time Availability (10%). For deep qualitative briefs, Google Gemini 3.8 Flash synthesizes custom collaboration angles and workflow feasibility.'
    },
    {
      q: 'Who owns the intellectual property and commercial copyright of deliverables?',
      a: 'Full commercial rights and intellectual property transfer directly to the brand upon final milestone approval and payout release. Creators guarantee that deliverables comply with commercial licensing terms of the underlying AI models (Runway, Midjourney Pro, FLUX Commercial, ElevenLabs).'
    },
    {
      q: 'Can brands generate campaign briefs if they do not know AI prompting?',
      a: 'Yes! Our built-in AI Campaign Brief Assistant takes natural language prompts (e.g., "I need an AI video advertisement for my new skincare product") and automatically generates structured objectives, technical tool requirements, deliverable formats, budget estimates, and timelines.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#7C4DFF]/25 via-[#9D7BFF]/20 to-[#FF7A1A]/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#FF7A1A]/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Live Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#17132E]/90 border border-[#7C4DFF]/40 text-xs font-semibold text-[#9D7BFF] shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#FF7A1A] animate-pulse"></span>
              <span>The Next Era of Commercial Production</span>
              <span className="text-white/40">·</span>
              <span className="text-white font-medium">Gemini & Supabase Powered</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Where AI Creativity Meets{' '}
              <span className="bg-gradient-to-r from-[#9D7BFF] via-[#7C4DFF] to-[#FF7A1A] bg-clip-text text-transparent">
                Brand Ambition.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-[#B9B3D0] max-w-2xl mx-auto font-normal leading-relaxed">
              Discover extraordinary AI creators, match with the right talent, and turn creative ideas into campaigns with intelligent briefs, verified portfolios, and instant collaboration.
            </p>

            {/* Search Bar Form */}
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-2xl mx-auto pt-2 flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-[#17132E]/90 border border-[#7C4DFF]/30 shadow-2xl backdrop-blur-xl focus-within:border-[#7C4DFF] focus-within:shadow-[#7C4DFF]/20 transition-all"
            >
              <div className="flex items-center gap-3 px-3 w-full py-2">
                <Search className="w-5 h-5 text-[#9D7BFF] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by creator name, AI tool (Runway, FLUX.1), or niche..."
                  className="w-full bg-transparent text-sm text-white placeholder-[#B9B3D0]/60 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] hover:from-[#6A3DE8] hover:to-[#8C66FF] text-white font-semibold text-sm shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-[#7C4DFF]/30 transition-all active:scale-95"
              >
                <span>Find Talent</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <button
                onClick={() => onNavigate('discover')}
                className="px-6 py-3 rounded-xl bg-[#7C4DFF] hover:bg-[#6A3DE8] text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-[#7C4DFF]/30 transition-all"
              >
                <Compass className="w-4 h-4" />
                Explore Creators
              </button>

              <button
                onClick={onOpenCreateCampaign}
                className="px-6 py-3 rounded-xl bg-[#17132E] hover:bg-[#201A40] border border-[#FF7A1A]/50 hover:border-[#FF7A1A] text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-md shadow-[#FF7A1A]/10"
              >
                <Sparkles className="w-4 h-4 text-[#FF7A1A]" />
                Post Campaign Brief
              </button>
            </div>
          </div>

          {/* Hero Visual: Generative Artwork Showcase Cards */}
          <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="glass-panel rounded-2xl overflow-hidden group hover:border-[#7C4DFF]/50 transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80"
                  alt="Hypercar Commercial"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B081D] via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 left-3 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded bg-[#0B081D]/80 backdrop-blur text-white border border-[#7C4DFF]/40">
                  Runway Gen-3 Alpha
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <div className="text-xs text-[#B9B3D0]">AI Commercial Video</div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#9D7BFF] transition-colors">
                  Lumina Electric Hypercar: 4K Reveal
                </h3>
                <div className="pt-2 flex items-center justify-between text-xs text-[#B9B3D0] border-t border-[#2A2453]/60">
                  <span>Elena Rostova</span>
                  <span className="text-white font-semibold">$1,800 Starting</span>
                </div>
              </div>
            </div>

            {/* Card 2 - Center Highlight */}
            <div className="glass-panel rounded-2xl overflow-hidden group hover:border-[#FF7A1A]/50 transition-all duration-300 -translate-y-2 border-[#7C4DFF]/40 shadow-xl shadow-[#7C4DFF]/10">
              <div className="relative h-60 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1608248597359-561db4057885?auto=format&fit=crop&w=800&q=80"
                  alt="Aethel Bio-Serum"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B081D] via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 left-3 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded bg-[#0B081D]/80 backdrop-blur text-[#FF7A1A] border border-[#FF7A1A]/40">
                  FLUX.1 Pro + ComfyUI
                </span>
                <span className="absolute top-3 right-3 text-[11px] font-semibold px-2 py-0.5 rounded bg-[#7C4DFF] text-white">
                  98% AI Match
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <div className="text-xs text-[#B9B3D0]">Photorealistic Cosmetics</div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#FF7A1A] transition-colors">
                  Aethel Bio-Serum: Wet Stone Caustics
                </h3>
                <div className="pt-2 flex items-center justify-between text-xs text-[#B9B3D0] border-t border-[#2A2453]/60">
                  <span>Kai Takahashi</span>
                  <span className="text-white font-semibold">$1,200 Starting</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-panel rounded-2xl overflow-hidden group hover:border-[#7C4DFF]/50 transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                  alt="Virtual Fashion Model"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B081D] via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 left-3 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded bg-[#0B081D]/80 backdrop-blur text-white border border-[#7C4DFF]/40">
                  Midjourney v6.1 + FaceID
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <div className="text-xs text-[#B9B3D0]">Virtual Influencer & Avatar</div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#9D7BFF] transition-colors">
                  Mira Vane: Neo-Tokyo Fashion Lookbook
                </h3>
                <div className="pt-2 flex items-center justify-between text-xs text-[#B9B3D0] border-t border-[#2A2453]/60">
                  <span>Sienna Marlowe</span>
                  <span className="text-white font-semibold">$1,500 Starting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured AI Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#FF7A1A] tracking-wider uppercase">Marketplace Specializations</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Top Generative Categories
            </h2>
          </div>
          <button
            onClick={() => onNavigate('discover')}
            className="text-xs font-semibold text-[#9D7BFF] hover:text-white flex items-center gap-1 transition-colors self-start"
          >
            <span>Browse All Disciplines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                onClick={() => onNavigate('discover', { category: c.name })}
                className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer group space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#17132E] border border-[#7C4DFF]/30 flex items-center justify-center group-hover:bg-[#7C4DFF] group-hover:text-white transition-all">
                  <Icon className="w-5 h-5 text-[#9D7BFF] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#9D7BFF] transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-xs text-[#B9B3D0] mt-0.5">{c.tool}</p>
                </div>
                <div className="text-[11px] font-semibold text-[#FF7A1A] flex items-center justify-between pt-1 border-t border-[#2A2453]/60">
                  <span>{c.count}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#7C4DFF] tracking-wider uppercase">Vetted Talent</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Featured AI Content Creators
            </h2>
            <p className="text-xs text-[#B9B3D0] mt-1">
              Hand-picked creators with verified enterprise deliverables and top client reviews.
            </p>
          </div>
          <button
            onClick={() => onNavigate('discover')}
            className="text-xs font-semibold text-[#9D7BFF] hover:text-white flex items-center gap-1 transition-colors self-start"
          >
            <span>View All {featuredCreators.length}+ Creators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCreators.slice(0, 3).map((creator) => (
            <div
              key={creator.user.id}
              onClick={() => onSelectCreator(creator.user.id)}
              className="glass-panel glass-panel-hover rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Portfolio Top Preview */}
                <div className="relative h-44 overflow-hidden bg-[#17132E]">
                  {creator.portfolio[0] ? (
                    <img
                      src={creator.portfolio[0].mediaUrl}
                      alt={creator.portfolio[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#B9B3D0]">
                      No portfolio work
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17132E] via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 text-[11px] font-semibold px-2 py-0.5 rounded bg-[#0B081D]/80 backdrop-blur text-white border border-[#7C4DFF]/30">
                    {creator.profile.specialization}
                  </span>
                </div>

                {/* Profile Header */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={creator.user.avatar}
                      alt={creator.user.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#7C4DFF]/40"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-white group-hover:text-[#9D7BFF] transition-colors">
                          {creator.user.name}
                        </h3>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                      </div>
                      <p className="text-xs text-[#B9B3D0] line-clamp-1">{creator.profile.title}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#B9B3D0] line-clamp-2 leading-relaxed">
                    {creator.user.bio}
                  </p>

                  {/* AI Tools Used */}
                  <div className="flex items-center gap-1.5 text-[11px] text-[#B9B3D0]">
                    <span className="text-white font-medium">Stack:</span>
                    <span className="truncate">{creator.profile.aiTools.join(' · ')}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Rating, Rate & Action */}
              <div className="px-5 py-3.5 bg-[#0B081D]/60 border-t border-[#2A2453]/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{creator.profile.rating}</span>
                  <span className="text-[#B9B3D0] font-normal">({creator.profile.reviewCount})</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#B9B3D0] block">Starting at</span>
                  <span className="font-extrabold text-white text-sm">
                    ${creator.profile.projectStartingRate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Workflow */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold text-[#FF7A1A] tracking-wider uppercase">Seamless Collaboration</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            How CreatorConnect AI Works
          </h2>
          <p className="text-xs sm:text-sm text-[#B9B3D0]">
            From brief generation to final commercial delivery in four streamlined phases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="glass-panel p-6 rounded-2xl space-y-3 relative group">
            <span className="text-3xl font-extrabold text-[#7C4DFF]/30 group-hover:text-[#7C4DFF]/60 transition-colors">
              01
            </span>
            <h3 className="text-base font-bold text-white">Discover & Post Brief</h3>
            <p className="text-xs text-[#B9B3D0] leading-relaxed">
              Search vetted AI artists by specialty or use our Gemini AI Brief Assistant to transform rough ideas into production-ready briefs.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-panel p-6 rounded-2xl space-y-3 relative group">
            <span className="text-3xl font-extrabold text-[#9D7BFF]/30 group-hover:text-[#9D7BFF]/60 transition-colors">
              02
            </span>
            <h3 className="text-base font-bold text-white">Intelligent AI Match</h3>
            <p className="text-xs text-[#B9B3D0] leading-relaxed">
              Our 5-factor matching algorithm evaluates niche, tools, past deliverables, budget, and availability to recommend the best creators.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-panel p-6 rounded-2xl space-y-3 relative group">
            <span className="text-3xl font-extrabold text-[#FF7A1A]/30 group-hover:text-[#FF7A1A]/60 transition-colors">
              03
            </span>
            <h3 className="text-base font-bold text-white">Pitches & Collaboration</h3>
            <p className="text-xs text-[#B9B3D0] leading-relaxed">
              Review custom proposals, style frames, prompt snippets, and chat in real-time with creators to align on creative direction.
            </p>
          </div>

          {/* Step 4 */}
          <div className="glass-panel p-6 rounded-2xl space-y-3 relative group">
            <span className="text-3xl font-extrabold text-[#00E5FF]/30 group-hover:text-[#00E5FF]/60 transition-colors">
              04
            </span>
            <h3 className="text-base font-bold text-white">Delivery & IP Transfer</h3>
            <p className="text-xs text-[#B9B3D0] leading-relaxed">
              Receive 4K UHD masters, source files, and complete commercial IP rights. Rate the creator upon verified completion.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Statistics (Clearly Identified Demo Metrics) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#17132E] via-[#100D28] to-[#17132E] border border-[#7C4DFF]/30 shadow-2xl">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#2A2453]/80">
            <div>
              <span className="text-xs font-bold text-[#9D7BFF] uppercase tracking-wider">Verified Performance</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">CreatorConnect Platform Metrics</h3>
            </div>
            <span className="text-[11px] font-semibold text-[#B9B3D0] px-2.5 py-1 rounded bg-[#0B081D]/60 border border-[#2A2453]">
              Sample Demo Data
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white">$1.8M+</div>
              <p className="text-xs text-[#B9B3D0]">Campaign Production Volume</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#9D7BFF]">2,400+</div>
              <p className="text-xs text-[#B9B3D0]">Vetted AI Creators</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#FF7A1A]">98.4%</div>
              <p className="text-xs text-[#B9B3D0]">Match Accuracy Rating</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#00E5FF]">48h</div>
              <p className="text-xs text-[#B9B3D0]">Average Pitch-to-Contract</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Testimonials (Labeled Sample Quotes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-[#7C4DFF] tracking-wider uppercase">Client Stories</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Trusted by Modern Brands & Agencies
          </h2>
          <span className="text-[11px] text-[#B9B3D0] block">(Sample Client Testimonials)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-white/90 leading-relaxed italic">
              "We replaced a $30,000 physical studio shoot with Elena's Runway Gen-3 campaign. The fluid dynamics and luxury aesthetic surpassed what physical cameras could capture."
            </p>
            <div className="pt-2 border-t border-[#2A2453]/60 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=150&q=80"
                alt="Aura Skincare"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="text-xs font-bold text-white">Astrid Lindholm</div>
                <div className="text-[11px] text-[#B9B3D0]">Creative Director, Aura Skincare Labs</div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-white/90 leading-relaxed italic">
              "Sienna delivered 15 hyper-consistent virtual avatar lookbook stills for our cyberpunk streetwear drop in just 4 days. The engagement on our AR launch skyrocketed by 400%."
            </p>
            <div className="pt-2 border-t border-[#2A2453]/60 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=150&q=80"
                alt="Veloce"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="text-xs font-bold text-white">Matteo Rossi</div>
                <div className="text-[11px] text-[#B9B3D0]">Founder, Veloce Neo-Streetwear</div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-white/90 leading-relaxed italic">
              "The AI Brief Assistant helped us formulate complex video specs in minutes, and the matchmaker connected us to Kai, who delivered 8K renders on budget."
            </p>
            <div className="pt-2 border-t border-[#2A2453]/60 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Agency Lead"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="text-xs font-bold text-white">Claire Vance</div>
                <div className="text-[11px] text-[#B9B3D0]">Head of Content, Kinetix Digital Agency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#FF7A1A] tracking-wider uppercase">Transparent Plans</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Plans for Creators & Brands
          </h2>
          <p className="text-xs sm:text-sm text-[#B9B3D0]">
            Zero hidden fees. Built-in milestone escrow and commercial IP clearance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Creator Free */}
          <div className="glass-panel p-6 rounded-2xl space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#B9B3D0] uppercase tracking-wider">Creator Starter</span>
                <div className="text-3xl font-extrabold text-white mt-1">$0</div>
                <p className="text-xs text-[#B9B3D0] mt-1">For emerging AI artists building their portfolio.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-white/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" /> Public AI Portfolio Profile
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" /> Submit up to 5 proposals / month
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" /> Standard 10% platform fee on payout
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" /> Community messaging
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('discover')}
              className="w-full py-2.5 rounded-xl bg-[#17132E] hover:bg-[#201A40] border border-[#7C4DFF]/30 text-white font-semibold text-xs transition-colors"
            >
              Get Started Free
            </button>
          </div>

          {/* Creator Pro - Highlighted */}
          <div className="glass-panel p-6 rounded-2xl space-y-5 flex flex-col justify-between border-[#7C4DFF] relative shadow-xl shadow-[#7C4DFF]/20">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#7C4DFF] text-white text-[10px] font-extrabold uppercase tracking-wide">
              Most Popular
            </span>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#9D7BFF] uppercase tracking-wider">Creator Pro</span>
                <div className="text-3xl font-extrabold text-white mt-1">
                  $49 <span className="text-xs text-[#B9B3D0] font-normal">/ month</span>
                </div>
                <p className="text-xs text-[#B9B3D0] mt-1">For professional AI directors and commercial visualizers.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-white">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7C4DFF]" /> Unlimited campaign proposals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7C4DFF]" /> Priority AI Matchmaker placement
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7C4DFF]" /> Reduced 5% platform fee
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7C4DFF]" /> Verified Pro badge on portfolio
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7C4DFF]" /> Custom LoRA & prompt showcase
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('discover')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] text-white font-semibold text-xs shadow-md shadow-[#7C4DFF]/30 transition-all hover:brightness-110"
            >
              Start Creator Pro
            </button>
          </div>

          {/* Brand & Agency */}
          <div className="glass-panel p-6 rounded-2xl space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">Brand & Agency Suite</span>
                <div className="text-3xl font-extrabold text-white mt-1">
                  $199 <span className="text-xs text-[#B9B3D0] font-normal">/ month</span>
                </div>
                <p className="text-xs text-[#B9B3D0] mt-1">For marketing departments, creative studios, and brands.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-white/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A1A]" /> Unlimited published campaign briefs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A1A]" /> Gemini AI Brief Assistant access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A1A]" /> Full AI Matchmaker Studio & scoring
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A1A]" /> Multi-seat agency collaboration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A1A]" /> Commercial IP clearance & escrow
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenCreateCampaign}
              className="w-full py-2.5 rounded-xl bg-[#17132E] hover:bg-[#201A40] border border-[#FF7A1A]/40 text-white font-semibold text-xs transition-colors"
            >
              Post a Campaign Now
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold text-[#7C4DFF] tracking-wider uppercase">Got Questions?</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-[#9D7BFF] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#B9B3D0] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#B9B3D0] leading-relaxed border-t border-[#2A2453]/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
