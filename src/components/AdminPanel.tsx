import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  Briefcase,
  TrendingUp,
  Database,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api.js';

interface AdminPanelProps {
  onBack: () => void;
  onOpenSupabaseModal: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack, onOpenSupabaseModal }) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAdminStats().then(setStats).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00E5FF] uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Platform Administration & Trust</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Admin & Moderation Console
          </h1>
          <p className="text-xs sm:text-sm text-[#B9B3D0] mt-0.5">
            Monitor platform metrics, manage creator verification, and configure Supabase PostgreSQL persistence.
          </p>
        </div>

        <button
          onClick={onOpenSupabaseModal}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#17132E] hover:bg-[#201A40] border border-[#00E5FF]/40 text-[#00E5FF] font-semibold text-xs transition-colors flex items-center gap-1.5"
        >
          <Database className="w-4 h-4" />
          <span>Supabase SQL & Setup</span>
        </button>
      </div>

      {/* Platform Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <span className="text-xs text-[#B9B3D0]">Total Profiles</span>
          <div className="text-2xl font-black text-white">{stats?.totalUsers || 9}</div>
          <span className="text-[10px] text-[#00E5FF]">{stats?.creatorsCount || 6} Creators · {stats?.brandsCount || 2} Brands</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <span className="text-xs text-[#B9B3D0]">Published Campaigns</span>
          <div className="text-2xl font-black text-[#9D7BFF]">{stats?.activeCampaigns || 2}</div>
          <span className="text-[10px] text-[#B9B3D0]">{stats?.completedCampaigns || 1} Completed</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <span className="text-xs text-[#B9B3D0]">Proposals Submitted</span>
          <div className="text-2xl font-black text-[#FF7A1A]">{stats?.totalProposals || 4}</div>
          <span className="text-[10px] text-emerald-400 font-medium">100% On-time resolution</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <span className="text-xs text-[#B9B3D0]">Volume Cleared</span>
          <div className="text-2xl font-black text-white">
            ${stats?.platformVolumeEstimate ? stats.platformVolumeEstimate.toLocaleString() : '1,600'}
          </div>
          <span className="text-[10px] text-emerald-400 font-medium">Escrow protected</span>
        </div>
      </div>

      {/* Trust & Moderation Guidelines */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          AI Content Creator Quality & Moderation Standards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#B9B3D0]">
          <div className="p-4 rounded-xl bg-[#0B081D]/60 border border-[#2A2453] space-y-1.5">
            <h4 className="font-bold text-white">Commercial Model Licensing</h4>
            <p>Every creator must certify that their deliverables are rendered using enterprise-licensed AI tiers (Runway Gen-3, Midjourney Pro, FLUX Commercial, Kling AI, ElevenLabs Commercial).</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0B081D]/60 border border-[#2A2453] space-y-1.5">
            <h4 className="font-bold text-white">Character & Style Consistency</h4>
            <p>Creators offering virtual avatars or episodic campaigns must provide evidence of FaceID LoRA checkpoints or ControlNet workflows to guarantee consistency.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0B081D]/60 border border-[#2A2453] space-y-1.5">
            <h4 className="font-bold text-white">Escrow & Milestone Settlement</h4>
            <p>Milestone funds remain in platform escrow until the brand approves final 4K masters and signs off on the prompt IP documentation transfer.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
