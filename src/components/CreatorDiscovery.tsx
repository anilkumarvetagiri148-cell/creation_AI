import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Filter,
  Star,
  Bookmark,
  CheckCircle2,
  SlidersHorizontal,
  X,
  Compass,
  ArrowRight,
  Send,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Clock,
  Layers,
  Wand2,
  Check,
  Grid,
  ListFilter,
  GraduationCap,
  Briefcase,
  Cpu,
  Gamepad2,
  Activity,
  Utensils,
  Plane,
  Crown,
  Megaphone,
  Share2,
  Smile,
  Atom,
  Building2,
  ShoppingBag,
  Camera,
  Video,
  Music,
  Heart,
  Newspaper,
  Car,
  Sprout,
  Leaf,
  Shield,
  Eye,
  Info
} from 'lucide-react';
import { CreatorWithProfile, IndustryCategory } from '../types/index.js';
import { SafeImage } from './SafeImage.js';
import { api } from '../services/api.js';

interface CreatorDiscoveryProps {
  initialCategory?: string;
  initialSearch?: string;
  onSelectCreator: (id: string) => void;
  onInviteCreator: (creator: CreatorWithProfile) => void;
  savedCreatorIds: Set<string>;
  onToggleSave: (creatorId: string) => void;
}

export interface CategoryMetadata {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  shortDesc: string;
}

export const CATEGORIES_WITH_META: CategoryMetadata[] = [
  { name: 'All Creators', icon: Sparkles, shortDesc: 'Browse all creators across all 23 industries' },
  { name: 'Finance & Investing', icon: TrendingUp, shortDesc: 'Stock charts, FinTech, trading psychology & crypto motion' },
  { name: 'Education & E-Learning', icon: GraduationCap, shortDesc: 'STEM visualizers, biology tours, languages & courses' },
  { name: 'Business & Entrepreneurship', icon: Briefcase, shortDesc: 'Pitch decks, B2B commercials & startup manifestos' },
  { name: 'Technology & AI', icon: Cpu, shortDesc: 'Neural latent spaces, microchip renders & robotics' },
  { name: 'Gaming & Esports', icon: Gamepad2, shortDesc: 'Esports arena packages, character concepts & game trailers' },
  { name: 'Health & Fitness', icon: Activity, shortDesc: 'Athletic spots, mindfulness breathwork & sports nutrition' },
  { name: 'Food & Cooking', icon: Utensils, shortDesc: 'Fine dining spots, artisanal baking & beverage splash physics' },
  { name: 'Travel & Tourism', icon: Plane, shortDesc: 'Luxury resort films, drone vistas & UNESCO heritage tours' },
  { name: 'Fashion & Beauty', icon: Crown, shortDesc: 'Haute couture lookbooks, skincare fluid renders & virtual models' },
  { name: 'Digital Marketing', icon: Megaphone, shortDesc: 'High-CTR ad matrices, viral hooks & landing page assets' },
  { name: 'Social Media Influencers', icon: Share2, shortDesc: 'Virtual influencer personas, aesthetic feeds & trending reels' },
  { name: 'Entertainment & Comedy', icon: Smile, shortDesc: 'Satirical workplace comedy, parody shorts & festival VJ loops' },
  { name: 'Science & Research', icon: Atom, shortDesc: 'Astrophysics simulations, molecular biology & quantum mechanics' },
  { name: 'Real Estate', icon: Building2, shortDesc: 'Luxury cliffside villas, penthouses & biophilic architecture' },
  { name: 'E-commerce & Product Advertising', icon: ShoppingBag, shortDesc: 'Consumer tech renders, perfume splash bottles & Amazon suites' },
  { name: 'Photography & Videography', icon: Camera, shortDesc: 'Anamorphic film stills, 35mm Portra grain & street portraits' },
  { name: 'Animation & Motion Graphics', icon: Video, shortDesc: 'Kinetic 3D typography, anime fight choreography & dioramas' },
  { name: 'Music & Audio', icon: Music, shortDesc: 'Cinematic commercial scores, cymatics waves & podcast dubbing' },
  { name: 'Lifestyle & Personal Development', icon: Heart, shortDesc: 'Mindful morning rituals, Scandinavian hygge & desk setups' },
  { name: 'News & Media', icon: Newspaper, shortDesc: 'Virtual newsroom broadcasts, geopolitical maps & data journalism' },
  { name: 'Automotive', icon: Car, shortDesc: 'Electric hypercar commercial spots, luxury cockpits & overland trucks' },
  { name: 'Agriculture & Farming', icon: Sprout, shortDesc: 'Multispectral drone crop mapping & vertical hydroponic farms' },
  { name: 'Environment & Sustainability', icon: Leaf, shortDesc: 'Offshore wind farms, coral regeneration & drone reforestation' }
];

export const CATEGORIES_LIST = CATEGORIES_WITH_META.map((c) => c.name) as readonly string[];

export const POPULAR_AI_TOOLS = [
  'All Tools',
  'Midjourney v6.1',
  'Runway Gen-3',
  'FLUX.1 Pro',
  'ComfyUI',
  'Kling AI',
  'ElevenLabs',
  'HeyGen',
  'Suno v3.5',
  'Topaz Video AI',
  'Photoshop AI',
  'Claude 3.5 Sonnet'
];

// Helper to format currency in INR (₹)
const formatINR = (val: number) => {
  return `₹${val.toLocaleString('en-IN')}`;
};

// Interactive Single Creator Portfolio Card with 3-project previewer
interface CreatorCardProps {
  creator: CreatorWithProfile;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectCreator: (id: string) => void;
  onInviteCreator: (creator: CreatorWithProfile) => void;
}

const CreatorCard: React.FC<CreatorCardProps> = ({
  creator,
  isSaved,
  onToggleSave,
  onSelectCreator,
  onInviteCreator
}) => {
  const { user, profile, portfolio } = creator;
  const [activePreviewIdx, setActivePreviewIdx] = useState<number>(0);

  const activeProject = portfolio[activePreviewIdx] || portfolio[0];

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between group border border-[#2A2453] hover:border-[#7C4DFF]/60 transition-all duration-300 shadow-lg shadow-black/30">
      <div>
        {/* 1. Main Portfolio Visual Hero Container */}
        <div className="relative h-52 bg-[#17132E] overflow-hidden select-none">
          {activeProject ? (
            <div
              className="w-full h-full cursor-pointer relative"
              onClick={() => onSelectCreator(user.id)}
            >
              <SafeImage
                src={activeProject.mediaUrl}
                alt={activeProject.title}
                categoryLabel={profile.industry || profile.specialization}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B081D] via-transparent to-transparent opacity-90" />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-[#B9B3D0]">
              No portfolio works uploaded
            </div>
          )}

          {/* Industry / Category Badge with Glow */}
          <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-lg bg-[#0B081D]/85 backdrop-blur text-white border border-[#7C4DFF]/40 shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9D7BFF]" />
            <span className="truncate max-w-[140px]">{profile.industry || profile.specialization}</span>
          </span>

          {/* Save / Bookmark Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(user.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur transition-all ${
              isSaved
                ? 'bg-[#FF7A1A] text-white shadow-lg shadow-[#FF7A1A]/40 scale-105'
                : 'bg-[#0B081D]/80 text-[#B9B3D0] hover:text-white hover:bg-[#17132E] border border-[#2A2453]'
            }`}
            title={isSaved ? 'Remove from Saved Creators' : 'Save / Favorite Creator'}
            aria-label="Save Creator"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white stroke-white' : ''}`} />
          </button>

          {/* Bottom Badges: Availability Status & Experience Level */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
            {/* Availability Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B081D]/90 backdrop-blur text-[10px] text-white border border-white/10 shadow-sm">
              <span
                className={`w-2 h-2 rounded-full ${
                  profile.availability === 'available'
                    ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse'
                    : profile.availability === 'busy'
                    ? 'bg-amber-400'
                    : 'bg-slate-400'
                }`}
              />
              <span className="capitalize font-semibold">
                {profile.availability === 'available' ? 'Available for Hire' : profile.availability}
              </span>
            </div>

            {/* Experience Level Badge */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B081D]/90 backdrop-blur text-[10px] text-white border border-white/10 shadow-sm">
              <Shield className="w-3 h-3 text-[#9D7BFF]" />
              <span className="font-semibold text-white/95">
                {profile.experienceLevel || (profile.experienceYears >= 5 ? 'Expert' : 'Intermediate')}
              </span>
              <span className="text-[#B9B3D0]/60">·</span>
              <span className="text-[#B9B3D0]">{profile.experienceYears}y exp</span>
            </div>
          </div>
        </div>

        {/* 2. Three Portfolio Preview Images Interactive Strip */}
        {portfolio.length > 0 && (
          <div className="px-4 pt-3 pb-1 bg-[#120E29]/70 border-b border-[#2A2453]/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-[#B9B3D0] uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#7C4DFF]" />
                Portfolio Previews ({portfolio.length})
              </span>
              <span className="text-[10px] text-[#9D7BFF] font-medium">Click or hover to inspect</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {portfolio.slice(0, 3).map((pj, idx) => {
                const isActive = activePreviewIdx === idx;
                return (
                  <button
                    key={pj.id}
                    type="button"
                    onMouseEnter={() => setActivePreviewIdx(idx)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePreviewIdx(idx);
                    }}
                    className={`relative h-14 rounded-lg overflow-hidden border transition-all text-left group/thumb ${
                      isActive
                        ? 'border-[#7C4DFF] ring-2 ring-[#7C4DFF]/40 scale-[1.02]'
                        : 'border-[#2A2453] opacity-75 hover:opacity-100 hover:border-[#9D7BFF]'
                    }`}
                    title={pj.title}
                  >
                    <SafeImage
                      src={pj.mediaUrl}
                      alt={pj.title}
                      categoryLabel={profile.industry}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/25 hover:bg-transparent transition-colors" />
                    <span className="absolute bottom-1 left-1 px-1 py-0.2 rounded bg-black/80 text-[8px] text-white font-mono">
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Creator Identity & Professional Info */}
        <div className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div
              className="relative cursor-pointer shrink-0"
              onClick={() => onSelectCreator(user.id)}
            >
              <SafeImage
                src={user.avatar}
                alt={user.name}
                fallbackType="avatar"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#7C4DFF]/40 group-hover:ring-[#7C4DFF] transition-all shadow-md"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#0B081D] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div
                className="flex items-center gap-1.5 cursor-pointer"
                onClick={() => onSelectCreator(user.id)}
              >
                <h3 className="text-sm font-bold text-white group-hover:text-[#9D7BFF] transition-colors truncate">
                  {user.name}
                </h3>
                <span title="Verified AI Creator">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                </span>
              </div>
              <p className="text-xs text-[#B9B3D0] truncate mt-0.5 font-medium">{profile.title}</p>
              <p className="text-[11px] text-[#B9B3D0]/70 truncate mt-0.5">{user.location}</p>
            </div>
          </div>

          {/* Short readable biography */}
          <p className="text-xs text-[#B9B3D0] line-clamp-2 leading-relaxed">
            {user.bio}
          </p>

          {/* Specialization & AI Tools Stack */}
          <div className="pt-1 space-y-1.5 text-[11px]">
            <div className="flex items-center gap-1.5 text-[#B9B3D0]">
              <span className="text-white font-semibold shrink-0">Focus:</span>
              <span className="truncate text-white/90">{profile.specialization}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#B9B3D0]">
              <span className="text-white font-semibold shrink-0">AI Tools:</span>
              <span className="truncate text-[#9D7BFF] font-medium">{profile.aiTools.join(' · ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Card Footer: Pricing, Demo Star Rating & Action Buttons */}
      <div className="px-4 py-3 bg-[#0B081D]/90 border-t border-[#2A2453]/60 space-y-3">
        {/* Rating with explicit Demo Data badge & Starting Rate */}
        <div className="flex items-center justify-between text-xs">
          <div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{profile.rating.toFixed(2)}</span>
                <span className="text-[#B9B3D0] font-normal text-[11px]">
                  ({profile.reviewCount})
                </span>
              </div>
              {/* Clearly labeled as demo data where applicable */}
              <span
                className="text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#17132E] text-[#B9B3D0]/80 border border-[#2A2453]"
                title="Demonstration platform sample rating & reviews"
              >
                Demo Data
              </span>
            </div>

            <div className="text-[11px] text-[#B9B3D0] mt-1">
              Starting from <strong className="text-white text-sm font-extrabold">{formatINR(profile.projectStartingRate)}</strong>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[#B9B3D0] block">Hourly Rate</span>
            <span className="text-xs font-semibold text-white/90">{formatINR(profile.hourlyRate)}/hr</span>
          </div>
        </div>

        {/* Action Buttons: Contact or Hire Creator & View Portfolio */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onInviteCreator(creator)}
            className="w-full py-2 px-2.5 rounded-xl bg-[#17132E] hover:bg-[#201A40] border border-[#FF7A1A]/40 text-[#FF7A1A] hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm hover:border-[#FF7A1A]"
            title="Invite or contact creator for active campaign brief"
          >
            <Send className="w-3 h-3 text-[#FF7A1A]" />
            <span>Hire Creator</span>
          </button>

          <button
            onClick={() => onSelectCreator(user.id)}
            className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] hover:from-[#6A3DE8] hover:to-[#8C66FF] text-white font-bold text-xs shadow-md shadow-[#7C4DFF]/25 transition-all flex items-center justify-center gap-1"
          >
            <span>View Portfolio</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const CreatorDiscovery: React.FC<CreatorDiscoveryProps> = ({
  initialCategory,
  initialSearch,
  onSelectCreator,
  onInviteCreator,
  savedCreatorIds,
  onToggleSave
}) => {
  const [creators, setCreators] = useState<CreatorWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch || '');
  const [category, setCategory] = useState<string>(initialCategory || 'All Creators');
  const [selectedTool, setSelectedTool] = useState<string>('All Tools');
  const [contentFormat, setContentFormat] = useState<string>('all');
  const [experienceLevel, setExperienceLevel] = useState<string>('all');
  const [availability, setAvailability] = useState<string>('all');
  const [minRating, setMinRating] = useState<string>('0');
  const [maxPrice, setMaxPrice] = useState<number>(150000); // INR
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [showCategoryGrid, setShowCategoryGrid] = useState<boolean>(false);

  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const res = await api.getCreators({
        search: search || undefined,
        category: category !== 'All Creators' ? category : undefined,
        tool: selectedTool !== 'All Tools' ? selectedTool : undefined,
        contentFormat: contentFormat !== 'all' ? contentFormat : undefined,
        experienceLevel: experienceLevel !== 'all' ? experienceLevel : undefined,
        availability: availability !== 'all' ? availability : undefined,
        minRating: Number(minRating) > 0 ? minRating : undefined,
        maxPrice: maxPrice < 150000 ? maxPrice : undefined,
        sort: sortBy,
        page,
        limit: 12
      });
      setCreators(res.creators);
      setTotalPages(res.pagination.totalPages || 1);
      setTotalCount(res.pagination.total);
    } catch (err) {
      console.error('Failed to fetch creators:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, [category, selectedTool, contentFormat, experienceLevel, availability, minRating, maxPrice, sortBy, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchCreators();
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All Creators');
    setSelectedTool('All Tools');
    setContentFormat('all');
    setExperienceLevel('all');
    setAvailability('all');
    setMinRating('0');
    setMaxPrice(150000);
    setSortBy('recommended');
    setPage(1);
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const hasActiveFilters =
    search !== '' ||
    category !== 'All Creators' ||
    selectedTool !== 'All Tools' ||
    contentFormat !== 'all' ||
    experienceLevel !== 'all' ||
    availability !== 'all' ||
    minRating !== '0' ||
    maxPrice < 150000 ||
    sortBy !== 'recommended';

  // Active Category Meta
  const activeCategoryMeta =
    CATEGORIES_WITH_META.find((c) => c.name === category) || CATEGORIES_WITH_META[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header & Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF7A1A] mb-1">
            <Sparkles className="w-4 h-4 text-[#FF7A1A]" />
            <span>Curated AI Talent Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Discover Extraordinary <span className="text-gradient">AI Creators</span>
          </h1>
          <p className="text-sm text-[#B9B3D0] mt-1 max-w-2xl">
            Explore 138+ verified generative AI directors, prompt engineers, and visual artists across 23 commercial industries.
          </p>
        </div>

        {/* Global Stats Pill */}
        <div className="flex items-center gap-3 bg-[#17132E]/80 border border-[#2A2453] px-4 py-2 rounded-2xl text-xs text-[#B9B3D0] self-start md:self-auto">
          <div>
            <span className="font-extrabold text-white text-base mr-1">138+</span>
            <span>Creators</span>
          </div>
          <div className="w-px h-6 bg-[#2A2453]" />
          <div>
            <span className="font-extrabold text-[#9D7BFF] text-base mr-1">23</span>
            <span>Industries</span>
          </div>
          <div className="w-px h-6 bg-[#2A2453]" />
          <div>
            <span className="font-extrabold text-[#00E5FF] text-base mr-1">414+</span>
            <span>Works</span>
          </div>
        </div>
      </div>

      {/* 2. Global Search Bar */}
      <div className="glass-panel p-2.5 rounded-2xl">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#B9B3D0] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by creator name, title, skill (e.g. 'FinTech', 'Runway', 'Midjourney', '3D') or keywords..."
              className="w-full bg-transparent pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#B9B3D0]/50 outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B9B3D0] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] hover:from-[#6A3DE8] hover:to-[#8C66FF] text-white text-xs font-semibold shadow-md shadow-[#7C4DFF]/30 transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* 3. Category Selector Section (Horizontal Scroll Chips or Expandable Grid View) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Creator Categories
            </span>
            <span className="text-[11px] text-[#B9B3D0] bg-[#17132E] px-2 py-0.5 rounded-full border border-[#2A2453]">
              24 Options
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle Button */}
            <button
              onClick={() => setShowCategoryGrid(!showCategoryGrid)}
              className="px-3 py-1.5 text-xs text-[#9D7BFF] hover:text-white rounded-xl bg-[#17132E] border border-[#2A2453] hover:border-[#7C4DFF]/50 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{showCategoryGrid ? 'Horizontal Scroll' : 'Category Grid (24)'}</span>
            </button>

            {/* Scroll Navigation Chevrons */}
            {!showCategoryGrid && (
              <div className="hidden sm:flex items-center gap-1">
                <button
                  onClick={() => scrollCategories('left')}
                  className="p-1.5 rounded-xl bg-[#17132E] hover:bg-[#201A40] text-[#B9B3D0] hover:text-white border border-[#2A2453] transition-colors shadow-sm"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollCategories('right')}
                  className="p-1.5 rounded-xl bg-[#17132E] hover:bg-[#201A40] text-[#B9B3D0] hover:text-white border border-[#2A2453] transition-colors shadow-sm"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Category Container: Either 24-box Grid or Smooth Scroll Chips */}
        {showCategoryGrid ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 p-3.5 rounded-2xl bg-[#17132E]/70 border border-[#2A2453]">
            {CATEGORIES_WITH_META.map((catMeta) => {
              const isActive = category === catMeta.name;
              const IconComp = catMeta.icon;
              return (
                <button
                  key={catMeta.name}
                  onClick={() => {
                    setCategory(catMeta.name);
                    setPage(1);
                  }}
                  className={`p-2.5 rounded-xl text-left transition-all flex flex-col justify-between group ${
                    isActive
                      ? 'bg-gradient-to-br from-[#7C4DFF] to-[#9D7BFF] text-white shadow-md shadow-[#7C4DFF]/40 border border-white/20'
                      : 'bg-[#0B081D]/80 text-[#B9B3D0] hover:text-white hover:bg-[#201A40] border border-[#2A2453]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#9D7BFF] group-hover:text-white'}`} />
                    <span className={`text-[10px] px-1.5 py-0.2 rounded ${isActive ? 'bg-black/25 text-white' : 'bg-[#17132E] text-[#B9B3D0]'}`}>
                      {catMeta.name === 'All Creators' ? '138+' : '6'}
                    </span>
                  </div>
                  <span className="text-xs font-bold truncate block">{catMeta.name}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div
            ref={categoryScrollRef}
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth select-none"
          >
            {CATEGORIES_WITH_META.map((catMeta) => {
              const isActive = category === catMeta.name;
              const IconComp = catMeta.icon;
              return (
                <button
                  key={catMeta.name}
                  onClick={() => {
                    setCategory(catMeta.name);
                    setPage(1);
                  }}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] text-white shadow-md shadow-[#7C4DFF]/30 scale-[1.02] border border-white/20 font-bold'
                      : 'bg-[#17132E] text-[#B9B3D0] hover:text-white hover:bg-[#201A40] border border-[#2A2453]'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#9D7BFF]'}`} />
                  <span>{catMeta.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-black/25 text-white' : 'bg-[#0B081D] text-[#B9B3D0]/80'
                    }`}
                  >
                    {catMeta.name === 'All Creators' ? '138+' : '6'}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Selected Category Informational Banner */}
        {category !== 'All Creators' && (
          <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#17132E]/50 border border-[#7C4DFF]/20 text-xs">
            <div className="flex items-center gap-2">
              <activeCategoryMeta.icon className="w-4 h-4 text-[#9D7BFF]" />
              <span className="text-white font-bold">{activeCategoryMeta.name}:</span>
              <span className="text-[#B9B3D0] hidden sm:inline">{activeCategoryMeta.shortDesc}</span>
            </div>
            <button
              onClick={() => {
                setCategory('All Creators');
                setPage(1);
              }}
              className="text-[#FF7A1A] hover:underline font-semibold text-xs flex items-center gap-1"
            >
              <span>View All 24 Categories</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. Controls Bar: AI Tools, Sort Options & Filter Drawers */}
      <div className="glass-panel p-4 rounded-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Quick AI Tools selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-[#FF7A1A] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Wand2 className="w-3 h-3 text-[#FF7A1A]" />
              AI Tools:
            </span>
            {POPULAR_AI_TOOLS.slice(0, 8).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setSelectedTool(t);
                  setPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedTool === t
                    ? 'bg-[#7C4DFF] text-white border border-[#9D7BFF] shadow-sm'
                    : 'bg-[#0B081D]/70 text-[#B9B3D0] hover:text-white border border-[#2A2453]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Right Controls: Sort & Filter Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs text-[#B9B3D0]">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="bg-[#0B081D] text-white text-xs font-medium rounded-xl px-3 py-2 border border-[#2A2453] outline-none focus:border-[#7C4DFF]"
              >
                <option value="recommended">Recommended (Featured)</option>
                <option value="relevance">Most Relevant</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Creators</option>
                <option value="price_low">Lowest Price (INR)</option>
                <option value="price_high">Highest Price (INR)</option>
                <option value="experience">Most Experienced</option>
              </select>
            </div>

            {/* Toggle Advanced Filters Button */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                showAdvancedFilters
                  ? 'bg-[#7C4DFF] text-white border-[#7C4DFF]'
                  : 'bg-[#0B081D] text-[#B9B3D0] hover:text-white border-[#2A2453]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2 text-xs text-[#FF7A1A] hover:bg-[#FF7A1A]/10 rounded-xl transition-colors border border-[#FF7A1A]/30 flex items-center gap-1"
                title="Clear all active filters"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Expandable Advanced Filters Drawer */}
        {showAdvancedFilters && (
          <div className="pt-4 border-t border-[#2A2453]/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {/* Content Format */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-white block">Content Format</label>
              <select
                value={contentFormat}
                onChange={(e) => {
                  setContentFormat(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-[#0B081D] border border-[#2A2453] text-white text-xs rounded-xl p-2 outline-none"
              >
                <option value="all">All Formats</option>
                <option value="Video & Motion">Video & Motion</option>
                <option value="Stills & Photography">Stills & Photography</option>
                <option value="3D & Virtual">3D & Virtual</option>
                <option value="Audio & Voice">Audio & Voice</option>
              </select>
            </div>

            {/* Experience Level */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-white block">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => {
                  setExperienceLevel(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-[#0B081D] border border-[#2A2453] text-white text-xs rounded-xl p-2 outline-none"
              >
                <option value="all">All Experience Levels</option>
                <option value="Beginner">Beginner (1-2 Years)</option>
                <option value="Intermediate">Intermediate (3-4 Years)</option>
                <option value="Expert">Expert (5+ Years)</option>
              </select>
            </div>

            {/* Availability */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-white block">Availability</label>
              <select
                value={availability}
                onChange={(e) => {
                  setAvailability(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-[#0B081D] border border-[#2A2453] text-white text-xs rounded-xl p-2 outline-none"
              >
                <option value="all">All Availability</option>
                <option value="available">Available Now</option>
                <option value="busy">Busy (In Campaign)</option>
                <option value="booked">Booked Out</option>
              </select>
            </div>

            {/* Minimum Star Rating */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-white block">Min Rating</label>
              <select
                value={minRating}
                onChange={(e) => {
                  setMinRating(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-[#0B081D] border border-[#2A2453] text-white text-xs rounded-xl p-2 outline-none"
              >
                <option value="0">Any Star Rating</option>
                <option value="4.8">★ 4.8 & Above</option>
                <option value="4.9">★ 4.9 & Above</option>
                <option value="4.95">★ 4.95+ Top Rated</option>
              </select>
            </div>

            {/* Price Range Slider in INR */}
            <div className="sm:col-span-2 md:col-span-4 pt-2 border-t border-[#2A2453]/40">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#B9B3D0]">
                  Max Project Budget: <strong className="text-white">{formatINR(maxPrice)}</strong>
                </span>
                <span className="text-[11px] text-[#B9B3D0]/60">Range: ₹10,000 - ₹1,50,000+</span>
              </div>
              <input
                type="range"
                min="10000"
                max="150000"
                step="5000"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setPage(1);
                }}
                className="w-full accent-[#7C4DFF] bg-[#17132E] h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. Active Filter Status & Count */}
      <div className="flex items-center justify-between text-xs text-[#B9B3D0] px-1">
        <div>
          Showing <strong className="text-white">{creators.length}</strong> of{' '}
          <strong className="text-white">{totalCount}</strong> creators
          {category !== 'All Creators' && (
            <span>
              {' '}in <strong className="text-[#9D7BFF]">{category}</strong>
            </span>
          )}
          {selectedTool !== 'All Tools' && (
            <span>
              {' '}using <strong className="text-[#00E5FF]">{selectedTool}</strong>
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="text-xs text-[#FF7A1A] hover:underline font-semibold flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear All Filters</span>
          </button>
        )}
      </div>

      {/* 6. Main Creator Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-panel rounded-2xl h-96 animate-pulse p-4 space-y-4">
              <div className="h-48 bg-[#17132E] rounded-xl" />
              <div className="h-12 bg-[#17132E] rounded-lg" />
              <div className="h-4 bg-[#17132E] rounded w-3/4" />
              <div className="h-3 bg-[#17132E] rounded w-1/2" />
              <div className="h-10 bg-[#17132E] rounded-xl" />
            </div>
          ))}
        </div>
      ) : creators.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-3xl p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#17132E] border border-[#7C4DFF]/30 mx-auto flex items-center justify-center">
            <Compass className="w-6 h-6 text-[#9D7BFF]" />
          </div>
          <h3 className="text-lg font-bold text-white">No AI Creators Found</h3>
          <p className="text-xs text-[#B9B3D0]">
            No creators match the current filter combination. Try resetting your search query or selecting a different category from the 24 options above.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] text-white text-xs font-semibold transition-colors shadow-md"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <CreatorCard
              key={creator.user.id}
              creator={creator}
              isSaved={savedCreatorIds.has(creator.user.id)}
              onToggleSave={onToggleSave}
              onSelectCreator={onSelectCreator}
              onInviteCreator={onInviteCreator}
            />
          ))}
        </div>
      )}

      {/* 7. Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#2A2453]/60 text-xs">
          <span className="text-[#B9B3D0]">
            Showing page <strong className="text-white">{page}</strong> of{' '}
            <strong className="text-white">{totalPages}</strong> ({totalCount} total verified creators)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-xl bg-[#17132E] text-white border border-[#2A2453] hover:bg-[#201A40] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Page number indicators */}
            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setPage(pageNum);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className={`w-8 h-8 rounded-xl font-bold text-xs transition-colors ${
                      page === pageNum
                        ? 'bg-[#7C4DFF] text-white shadow-md shadow-[#7C4DFF]/30'
                        : 'bg-[#17132E] text-[#B9B3D0] hover:text-white border border-[#2A2453]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && (
                <span className="text-[#B9B3D0] px-1">...</span>
              )}
            </div>

            <button
              onClick={() => {
                setPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-xl bg-[#17132E] text-white border border-[#2A2453] hover:bg-[#201A40] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 font-semibold"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
