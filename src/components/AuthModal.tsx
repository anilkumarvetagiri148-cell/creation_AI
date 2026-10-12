import React, { useState } from 'react';
import {
  X,
  User,
  Briefcase,
  Shield,
  Sparkles,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  LogOut
} from 'lucide-react';
import { UserProfile, UserRole } from '../types/index.js';
import { api } from '../services/api.js';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUserChanged: (user: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChanged,
  onLogout
}) => {
  const [mode, setMode] = useState<'profile' | 'login' | 'register'>('profile');
  const [role, setRole] = useState<UserRole>('creator');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [specialization, setSpecialization] = useState('AI Video & Commercials');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.login(email);
      onUserChanged(res.user);
      setSuccessMsg('Successfully signed in!');
      setTimeout(() => {
        onClose();
        setSuccessMsg('');
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error signing in.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.register({
        name,
        email,
        role,
        companyName,
        specialization
      });
      onUserChanged(res.user);
      setSuccessMsg('Account created successfully!');
      setTimeout(() => {
        onClose();
        setSuccessMsg('');
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error creating account.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchDemoPersona = async (demoRole: 'creator' | 'brand' | 'admin') => {
    setLoading(true);
    try {
      const res = await api.switchDemo(demoRole);
      onUserChanged(res.user);
      setSuccessMsg(`Switched active session to ${res.user.name} (${res.user.role})!`);
      setTimeout(() => {
        onClose();
        setSuccessMsg('');
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error switching persona.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="glass-panel rounded-3xl max-w-lg w-full border border-[#7C4DFF]/40 shadow-2xl p-6 sm:p-8 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#0B081D]/80 text-[#B9B3D0] hover:text-white border border-[#2A2453]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7C4DFF] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#7C4DFF]" />
            <span>Account & Authentication</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {mode === 'profile'
              ? 'Active Account Profile'
              : mode === 'login'
              ? 'Sign In to CreatorConnect'
              : 'Join as a Creator or Brand'}
          </h2>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Mode 1: Active Profile View */}
        {mode === 'profile' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[#0B081D]/70 border border-[#2A2453] flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#7C4DFF]"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white truncate">{currentUser.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#7C4DFF]/20 text-[#9D7BFF] border border-[#7C4DFF]/40">
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-xs text-[#B9B3D0] truncate">{currentUser.email}</p>
                <span className="text-[11px] text-[#B9B3D0]/70">{currentUser.location}</span>
              </div>
            </div>

            {/* Quick Demo Personas Buttons for Instant Evaluation */}
            <div className="space-y-2 pt-2 border-t border-[#2A2453]/60">
              <span className="text-[11px] font-bold text-[#B9B3D0] uppercase tracking-wider block">
                Quick 1-Click Demo Evaluation Switcher:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSwitchDemoPersona('creator')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    currentUser.role === 'creator'
                      ? 'bg-[#7C4DFF]/20 border-[#7C4DFF] text-white'
                      : 'bg-[#17132E] border-[#2A2453] text-[#B9B3D0] hover:text-white'
                  }`}
                >
                  <User className="w-4 h-4 text-[#9D7BFF]" />
                  <span>Elena (Creator)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSwitchDemoPersona('brand')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    currentUser.role === 'brand'
                      ? 'bg-[#FF7A1A]/20 border-[#FF7A1A] text-white'
                      : 'bg-[#17132E] border-[#2A2453] text-[#B9B3D0] hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-[#FF7A1A]" />
                  <span>Aura (Brand)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSwitchDemoPersona('admin')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    currentUser.role === 'admin'
                      ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-white'
                      : 'bg-[#17132E] border-[#2A2453] text-[#B9B3D0] hover:text-white'
                  }`}
                >
                  <Shield className="w-4 h-4 text-[#00E5FF]" />
                  <span>Admin Moderator</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#2A2453]/60 text-xs">
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-[#9D7BFF] hover:underline font-semibold"
              >
                Create New Account
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="px-3.5 py-2 rounded-xl bg-[#17132E] hover:bg-rose-500/20 text-rose-400 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-rose-500/30"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Mode 2: Register */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Role selector */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#0B081D]/80 border border-[#2A2453]">
              <button
                type="button"
                onClick={() => setRole('creator')}
                className={`py-2 rounded-lg text-xs font-bold transition-colors ${
                  role === 'creator' ? 'bg-[#7C4DFF] text-white' : 'text-[#B9B3D0]'
                }`}
              >
                AI Creator
              </button>
              <button
                type="button"
                onClick={() => setRole('brand')}
                className={`py-2 rounded-lg text-xs font-bold transition-colors ${
                  role === 'brand' ? 'bg-[#FF7A1A] text-white' : 'text-[#B9B3D0]'
                }`}
              >
                Brand / Agency
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@creativeagency.com"
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            {role === 'creator' ? (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white block">Primary Specialization</label>
                <select
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none bg-[#17132E]"
                >
                  <option value="AI Video & Commercials">AI Video & Commercials</option>
                  <option value="AI Image & Photography">AI Image & Photography</option>
                  <option value="AI Influencers & Avatars">AI Influencers & Avatars</option>
                  <option value="AI Animation & Motion">AI Animation & Motion</option>
                  <option value="AI Voice & Audio">AI Voice & Audio</option>
                </select>
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white block">Brand or Agency Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Aura Skincare Labs"
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t border-[#2A2453]/60 text-xs">
              <button
                type="button"
                onClick={() => setMode('profile')}
                className="text-[#B9B3D0] hover:text-white"
              >
                Back to Profile
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] text-white font-semibold text-xs shadow-md shadow-[#7C4DFF]/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Sign Up</span>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
