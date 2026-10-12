import React, { useState } from 'react';
import { Database, X, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlSample = `-- CreatorConnect AI: 10 PostgreSQL Tables & RLS Policies
-- Execute in Supabase SQL Editor:
-- 1. profiles (users, brands, creators)
-- 2. creator_profiles (AI models, rates, availability)
-- 3. portfolio_projects (media, prompt snippets, deliverables)
-- 4. campaigns (briefs, budgets, deadlines)
-- 5. campaign_proposals (pitches, pricing, timeline)
-- 6. saved_creators (brand shortlists)
-- 7. conversations & 8. messages (realtime collaboration)
-- 9. reviews (star ratings, feedback for completed campaigns)
-- 10. notifications (inbox events)
-- Complete migration script: /supabase/migrations/20261012_init_schema.sql`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlSample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="glass-panel rounded-3xl max-w-2xl w-full border border-[#00E5FF]/40 shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#0B081D]/80 text-[#B9B3D0] hover:text-white border border-[#2A2453]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/40 flex items-center justify-center">
            <Database className="w-5 h-5 text-[#00E5FF]" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Database & Supabase Integration</h2>
            <p className="text-xs text-[#B9B3D0]">PostgreSQL with Row Level Security (RLS) & Built-in Engine</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-[#B9B3D0] leading-relaxed">
          <p>
            CreatorConnect AI features a dual database strategy:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#0B081D]/70 border border-[#2A2453] space-y-1">
              <strong className="text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Active Built-in Engine
              </strong>
              <p className="text-[11px]">
                Runs seamlessly in AI Studio and local dev without requiring external cloud accounts. Persists state to <code>data/db.json</code>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B081D]/70 border border-[#2A2453] space-y-1">
              <strong className="text-white flex items-center gap-1.5">
                <Database className="w-4 h-4 text-[#00E5FF]" /> Supabase Cloud Ready
              </strong>
              <p className="text-[11px]">
                Configurable via <code>SUPABASE_URL</code> and <code>SUPABASE_KEY</code> in <code>.env</code> with complete Row Level Security.
              </p>
            </div>
          </div>
        </div>

        {/* SQL Script View */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              Migration File: /supabase/migrations/20261012_init_schema.sql
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-[#00E5FF] hover:underline flex items-center gap-1 font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-3.5 rounded-xl bg-[#070514] border border-[#2A2453] text-[11px] font-mono text-[#B9B3D0] overflow-x-auto">
            {sqlSample}
          </pre>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#17132E] hover:bg-[#201A40] text-xs font-semibold text-white border border-[#2A2453]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
