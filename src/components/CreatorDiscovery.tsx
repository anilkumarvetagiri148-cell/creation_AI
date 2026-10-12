import React, { useState, useEffect } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { CreatorWithProfile, SpecializationCategory, AvailabilityStatus } from '../types/index.js';
import { api } from '../services/api.js';

interface CreatorDiscoveryProps {
  initialCategory?: string;
  initialSearch?: string;
  onSelectCreator: (id: string) => void;
  onInviteCreator: (creator: CreatorWithProfile) => void;
  savedCreatorIds: Set<string>;
  onToggleSave: (creatorId: string) => void;
}

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
  const [category, setCategory] = useState<string>(initialCategory || 'all');
  const [selectedTool, setSelectedTool] = useState<string>('all');
  const [availability, setAvailability] = useState<string>('all');
  const [minRating, setMinRating] = useState<string>('0');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const categories: SpecializationCategory[] = [
    'AI Video & Commercials',
    'AI Image & Photography',
    'AI Influencers & Avatars',
    'AI Advertising Creatives',
    'AI Animation & Motion',
    'AI Voice & Audio',
    'AI Branding & Concept Art',
    'AI Storytelling & Narrative'
  ];

  const popularTools = [
    'Runway Gen-3',
    'Midjourney',
    'FLUX.1',
    'ComfyUI',
    'Kling AI',
    'ElevenLabs',
    'Topaz Video AI'
  ];

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const res = await api.getCreators({
        search: search || undefined,
        category: category !== 'all' ? category : undefined,
        tool: selectedTool !== 'all' ? selectedTool : undefined,
        availability: availability !== 'all' ? availability : undefined,
        minRating: Number(minRating) > 0 ? minRating : undefined,
        maxPrice: maxPrice < 3000 ? maxPrice : undefined,
        sort: sortBy,
        page,
        limit: 9
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
  }, [category, selectedTool, availability, minRating, maxPrice, sortBy, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchCreators();
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('all');
    setSelectedTool('all');
    setAvailability('all');
    setMinRating('0');
    setMaxPrice(3000);
    setSortBy('relevance');
    setPage(1);
  };

  const hasActiveFilters =
    search !== '' ||
    category !== 'all' ||
    selectedTool !== 'all' ||
    availability !== 'all' ||
    minRating !== '0' ||
    maxPrice < 3000 ||
    sortBy !== 'relevance';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#9D7BFF] uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Talent Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Discover Extraordinary AI Creators
        </h1>
        <p className="text-xs sm:text-sm text-[#B9B3D0] max-w-2xl">
          Browse verified AI cinematographers, virtual avatar designers, and generative artists. Review transparent project rates and past commercial deliverables.
        </p>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl glass-panel">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#0B081D]/80 border border-[#7C4DFF]/30">
          <Search className="w-4 h-4 text-[#9D7BFF] shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search creator name, bio, LoRAs, or tools..."
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-[#B9B3D0]/60 outline-none"
          />
          {search && (
            <button type="button" onClick={() => { setSearch(''); setPage(1); }} className="text-[#B9B3D0] hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="submit"
            className="px-3 py-1 rounded-lg bg-[#7C4DFF] hover:bg-[#6A3DE8] text-white text-xs font-medium shrink-0 transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-3">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs text-[#B9B3D0]">
            <span className="shrink-0 hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="bg-[#0B081D]/90 border border-[#2A2453] text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-[#7C4DFF]"
            >
              <option value="relevance">Featured / Relevance</option>
              <option value="rating">Highest Rated</option>
              <option value="price_low">Starting Price: Low to High</option>
              <option value="price_high">Starting Price: High to Low</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="px-3 py-2 text-xs text-[#FF7A1A] hover:bg-[#FF7A1A]/10 rounded-xl transition-colors border border-[#FF7A1A]/30 flex items-center gap-1 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Filter Pills & Tool Selectors */}
      <div className="space-y-3">
        {/* Specialization Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => { setCategory('all'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              category === 'all'
                ? 'bg-[#7C4DFF] text-white shadow-md shadow-[#7C4DFF]/30'
                : 'bg-[#17132E] text-[#B9B3D0] hover:text-white hover:bg-[#201A40]'
            }`}
          >
            All Disciplines
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                category === cat
                  ? 'bg-[#7C4DFF] text-white shadow-md shadow-[#7C4DFF]/30'
                  : 'bg-[#17132E] text-[#B9B3D0] hover:text-white hover:bg-[#201A40]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* AI Tools Quick Filter Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-semibold text-[#B9B3D0] uppercase tracking-wider mr-1">AI Stack:</span>
          <button
            onClick={() => { setSelectedTool('all'); setPage(1); }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              selectedTool === 'all'
                ? 'bg-white/10 text-white border border-[#9D7BFF]'
                : 'bg-[#17132E] text-[#B9B3D0] hover:text-white border border-transparent'
            }`}
          >
            Any Tool
          </button>
          {popularTools.map((t) => (
            <button
              key={t}
              onClick={() => { setSelectedTool(t); setPage(1); }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                selectedTool === t
                  ? 'bg-white/10 text-white border border-[#9D7BFF]'
                  : 'bg-[#17132E] text-[#B9B3D0] hover:text-white border border-transparent'
              }`}
            >
              {t}
            </button>
          ))}

          {/* Availability Selector */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[11px] text-[#B9B3D0]">Status:</span>
            <select
              value={availability}
              onChange={(e) => { setAvailability(e.target.value); setPage(1); }}
              className="bg-[#17132E] border border-[#2A2453] text-[11px] text-white rounded-lg px-2 py-1 outline-none"
            >
              <option value="all">Any Availability</option>
              <option value="available">Available Now</option>
              <option value="busy">Busy / Limited</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-panel rounded-2xl h-80 animate-pulse p-4 space-y-4">
              <div className="h-40 bg-[#17132E] rounded-xl" />
              <div className="h-4 bg-[#17132E] rounded w-3/4" />
              <div className="h-3 bg-[#17132E] rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : creators.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-3xl p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#17132E] border border-[#7C4DFF]/30 mx-auto flex items-center justify-center">
            <Compass className="w-6 h-6 text-[#9D7BFF]" />
          </div>
          <h3 className="text-lg font-bold text-white">No AI Creators Matched</h3>
          <p className="text-xs text-[#B9B3D0]">
            We could not find creators matching your active filter combination. Try adjusting keywords, price ceiling, or AI tool selection.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-[#7C4DFF] hover:bg-[#6A3DE8] text-white text-xs font-semibold transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => {
            const isSaved = savedCreatorIds.has(creator.user.id);
            return (
              <div
                key={creator.user.id}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Top Portfolio Work Preview Carousel / Mosaic */}
                  <div className="relative h-48 overflow-hidden bg-[#17132E]">
                    {creator.portfolio.length > 0 ? (
                      <div className="w-full h-full relative cursor-pointer" onClick={() => onSelectCreator(creator.user.id)}>
                        <img
                          src={creator.portfolio[0].mediaUrl}
                          alt={creator.portfolio[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#17132E] via-transparent to-transparent opacity-90" />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#B9B3D0]">
                        No portfolio images
                      </div>
                    )}

                    {/* Discipline Badge */}
                    <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded bg-[#0B081D]/80 backdrop-blur text-white border border-[#7C4DFF]/30">
                      {creator.profile.specialization}
                    </span>

                    {/* Bookmark Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(creator.user.id);
                      }}
                      className={`absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur transition-all ${
                        isSaved
                          ? 'bg-[#FF7A1A] text-white shadow-md shadow-[#FF7A1A]/30'
                          : 'bg-[#0B081D]/80 text-[#B9B3D0] hover:text-white border border-[#2A2453]'
                      }`}
                      title={isSaved ? 'Remove from Saved' : 'Save Creator'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                    </button>

                    {/* Availability Dot */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#0B081D]/80 backdrop-blur text-[10px] text-white">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          creator.profile.availability === 'available'
                            ? 'bg-emerald-400 animate-pulse'
                            : 'bg-amber-400'
                        }`}
                      />
                      <span className="capitalize">{creator.profile.availability}</span>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={creator.user.avatar}
                        alt={creator.user.name}
                        onClick={() => onSelectCreator(creator.user.id)}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-[#7C4DFF]/30 cursor-pointer hover:ring-[#7C4DFF] transition-all"
                      />
                      <div className="flex-1 min-w-0">
                        <div
                          className="flex items-center gap-1.5 cursor-pointer"
                          onClick={() => onSelectCreator(creator.user.id)}
                        >
                          <h3 className="text-sm font-bold text-white group-hover:text-[#9D7BFF] transition-colors truncate">
                            {creator.user.name}
                          </h3>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                        </div>
                        <p className="text-xs text-[#B9B3D0] truncate">{creator.profile.title}</p>
                        <span className="text-[11px] text-[#B9B3D0]/70">{creator.user.location}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#B9B3D0] line-clamp-2 leading-relaxed">
                      {creator.user.bio}
                    </p>

                    {/* AI Tools List (Clean unboxed typography) */}
                    <div className="text-[11px] text-[#B9B3D0] flex items-center gap-1.5">
                      <span className="text-white font-medium">Tools:</span>
                      <span className="truncate">{creator.profile.aiTools.join(' · ')}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Bar: Starting Price & Actions */}
                <div className="px-5 py-3.5 bg-[#0B081D]/60 border-t border-[#2A2453]/60 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{creator.profile.rating}</span>
                      <span className="text-[#B9B3D0] font-normal text-[11px]">
                        ({creator.profile.reviewCount})
                      </span>
                    </div>
                    <div className="text-[11px] text-[#B9B3D0]">
                      From <span className="font-extrabold text-white text-sm">${creator.profile.projectStartingRate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onInviteCreator(creator)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#17132E] hover:bg-[#201A40] border border-[#FF7A1A]/40 text-[#FF7A1A] hover:text-white font-semibold text-xs transition-colors flex items-center gap-1"
                      title="Invite to Campaign Brief"
                    >
                      <Send className="w-3 h-3" />
                      <span className="hidden sm:inline">Invite</span>
                    </button>
                    <button
                      onClick={() => onSelectCreator(creator.user.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#7C4DFF] hover:bg-[#6A3DE8] text-white font-semibold text-xs transition-all shadow-md shadow-[#7C4DFF]/20"
                    >
                      View Portfolio
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6 border-t border-[#2A2453]/60">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="p-2 rounded-xl bg-[#17132E] border border-[#2A2453] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#201A40] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-[#B9B3D0]">
            Page <span className="font-bold text-white">{page}</span> of{' '}
            <span className="font-bold text-white">{totalPages}</span>
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="p-2 rounded-xl bg-[#17132E] border border-[#2A2453] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#201A40] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
