import React from 'react';
import { Sparkles, Shield, Cpu, Database, Heart, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, params?: any) => void;
  onOpenSupabaseModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSupabaseModal }) => {
  return (
    <footer className="border-t border-[#2A2453]/80 bg-[#070514] text-[#B9B3D0] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#2A2453]/60">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C4DFF] via-[#9D7BFF] to-[#FF7A1A] p-0.5">
                <div className="w-full h-full bg-[#0B081D] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#9D7BFF]" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white">
                CreatorConnect<span className="text-[#FF7A1A]">.AI</span>
              </span>
            </div>
            <p className="text-xs text-[#B9B3D0] leading-relaxed max-w-sm">
              The AI-native marketplace connecting premier generative content creators with progressive brands and creative agencies. From prompt engineering and custom LoRAs to commercial film delivery and virtual avatar campaigns.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#17132E] border border-[#7C4DFF]/30 text-white">
                <Cpu className="w-3 h-3 text-[#7C4DFF]" /> Gemini 3.8 Flash Engine
              </span>
              <button
                onClick={onOpenSupabaseModal}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#17132E] border border-[#2A2453] hover:border-[#00E5FF]/50 text-white transition-colors"
              >
                <Database className="w-3 h-3 text-[#00E5FF]" /> Supabase PostgreSQL
              </button>
            </div>
          </div>

          {/* AI Specializations */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">AI Disciplines</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('discover', { category: 'AI Video & Commercials' })}
                  className="hover:text-white transition-colors text-left"
                >
                  AI Video & Commercials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover', { category: 'AI Image & Photography' })}
                  className="hover:text-white transition-colors text-left"
                >
                  Photorealistic Product Renders
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover', { category: 'AI Influencers & Avatars' })}
                  className="hover:text-white transition-colors text-left"
                >
                  Virtual Influencers & Avatars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover', { category: 'AI Animation & Motion' })}
                  className="hover:text-white transition-colors text-left"
                >
                  ComfyUI Motion & Loops
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover', { category: 'AI Voice & Audio' })}
                  className="hover:text-white transition-colors text-left"
                >
                  ElevenLabs Voice & Audio
                </button>
              </li>
            </ul>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Marketplace</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('discover')} className="hover:text-white transition-colors">
                  Explore AI Creators
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('campaigns')} className="hover:text-white transition-colors">
                  Browse Campaign Briefs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('matching')} className="hover:text-white transition-colors">
                  AI Matchmaker Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home', { scrollTo: 'how-it-works' })} className="hover:text-white transition-colors">
                  How Collaboration Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home', { scrollTo: 'pricing' })} className="hover:text-white transition-colors">
                  Platform Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Platform & Trust */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Trust & Security</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-white font-medium">
                <Shield className="w-3.5 h-3.5 text-[#00E5FF]" /> Escrow & IP Protection
              </li>
              <li>Transparent 5-Factor Match</li>
              <li>Commercial IP Transfer</li>
              <li>Verified AI Model Workflows</li>
              <li>Prompt Source Provenance</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B9B3D0]/80">
          <p>© 2026 CreatorConnect AI Inc. All rights reserved. Built for high-velocity AI creative collaboration.</p>
          <div className="flex items-center gap-6">
            <span>Deterministic Baseline + Gemini AI Synthesis</span>
            <span>·</span>
            <span>PostgreSQL & RLS Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
