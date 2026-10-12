import React, { useState } from 'react';
import { Send, X, CheckCircle2, AlertCircle, Loader2, Briefcase } from 'lucide-react';
import { CreatorWithProfile, Campaign } from '../types/index.js';
import { api } from '../services/api.js';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  creator: CreatorWithProfile | null;
  campaigns: Campaign[];
  onInviteSent: () => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({
  isOpen,
  onClose,
  creator,
  campaigns,
  onInviteSent
}) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaigns[0]?.id || '');
  const [customMessage, setCustomMessage] = useState(
    "Hi! We were thoroughly impressed by your portfolio and think you would be the ideal fit for our active campaign brief."
  );
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !creator) return null;

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaignId) {
      setErrorMsg('Please select a campaign to invite this creator to.');
      return;
    }

    setSending(true);
    setErrorMsg('');

    try {
      // Start or retrieve conversation and send invitation message
      const conv = await api.startConversation(creator.user.id, selectedCampaignId);
      const camp = campaigns.find((c) => c.id === selectedCampaignId);
      const messageBody = `[Campaign Invitation: ${camp?.title || 'Brief'}]\n${customMessage}\nBudget: $${camp?.budgetMin}-$${camp?.budgetMax}`;

      await api.sendMessage(conv.id, creator.user.id, messageBody);

      setSuccess(true);
      onInviteSent();
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 1600);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error sending invitation.');
    } finally {
      setSending(false);
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

        <div className="flex items-center gap-3">
          <img
            src={creator.user.avatar}
            alt={creator.user.name}
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#7C4DFF]"
          />
          <div>
            <span className="text-[11px] font-bold text-[#FF7A1A] uppercase tracking-wider">
              Talent Invitation
            </span>
            <h2 className="text-xl font-extrabold text-white">Invite {creator.user.name}</h2>
            <p className="text-xs text-[#B9B3D0]">{creator.profile.title}</p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {success ? (
          <div className="py-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Invitation Dispatched!</h3>
            <p className="text-xs text-[#B9B3D0]">
              {creator.user.name} has been notified and invited to collaborate on your campaign.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendInvite} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">Select Campaign Brief *</label>
              {campaigns.length === 0 ? (
                <p className="text-xs text-rose-400">
                  You don't have any published campaigns yet. Please post a brief first.
                </p>
              ) : (
                <select
                  value={selectedCampaignId}
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2.5 text-xs text-white outline-none bg-[#17132E]"
                >
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} (${c.budgetMin} - ${c.budgetMax})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">Invitation Note *</label>
              <textarea
                required
                rows={4}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Add personalized context on why their style fits your brief..."
                className="w-full glass-input rounded-xl p-3 text-xs text-white outline-none leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#2A2453]/60">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#B9B3D0] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={sending || campaigns.length === 0}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] text-white font-semibold text-xs shadow-md shadow-[#7C4DFF]/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending Invite...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Campaign Invite</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
