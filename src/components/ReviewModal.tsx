import React, { useState } from 'react';
import { Star, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Campaign, Review } from '../types/index.js';
import { api } from '../services/api.js';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
  creatorId: string;
  onReviewSubmitted: (review: Review) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  campaign,
  creatorId,
  onReviewSubmitted
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState(
    'Outstanding execution! The AI deliverables had incredible photorealism, strict brand consistency, and prompt turnaround. Highly recommend for enterprise creative.'
  );
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setErrorMsg('Please provide written feedback for this creator.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const review = await api.submitReview({
        campaignId: campaign.id,
        creatorId,
        rating,
        feedback: feedback.trim()
      });
      setSuccess(true);
      onReviewSubmitted(review);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not post review. Only 1 review per completed campaign is permitted.');
    } finally {
      setSubmitting(false);
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

        <div>
          <span className="text-[11px] font-bold text-[#FF7A1A] uppercase tracking-wider">
            Verified Client Review
          </span>
          <h2 className="text-xl font-extrabold text-white mt-1">Rate Creator Performance</h2>
          <p className="text-xs text-[#B9B3D0] mt-0.5">
            Campaign: <strong className="text-white">{campaign.title}</strong>
          </p>
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
            <h3 className="text-base font-bold text-white">Review Published</h3>
            <p className="text-xs text-[#B9B3D0]">
              Your star rating and testimonial have been added to the creator's public profile.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Star Rating Selector */}
            <div className="space-y-2 text-center p-4 rounded-2xl bg-[#0B081D]/60 border border-[#2A2453]">
              <span className="text-xs text-[#B9B3D0] block">Select Star Rating</span>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          filled ? 'text-amber-400 fill-amber-400' : 'text-[#2A2453]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-bold text-white">{rating} out of 5 Stars</span>
            </div>

            {/* Written Feedback */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">
                Written Feedback & Experience *
              </label>
              <textarea
                required
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Describe deliverable quality, technical AI mastery, prompt adherence, and turnaround..."
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
                disabled={submitting}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A1A] to-[#FFA040] text-white font-semibold text-xs shadow-md shadow-[#FF7A1A]/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <span>Submit Client Review</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
