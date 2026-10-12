import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Wand2,
  Calendar,
  DollarSign,
  Layers,
  CheckCircle2,
  ArrowRight,
  Loader2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { SpecializationCategory, ExperienceLevel, Campaign } from '../types/index.js';
import { api } from '../services/api.js';

interface CampaignCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignCreated: (campaign: Campaign) => void;
}

export const CampaignCreateModal: React.FC<CampaignCreateModalProps> = ({
  isOpen,
  onClose,
  onCampaignCreated
}) => {
  const [roughPrompt, setRoughPrompt] = useState('I need an AI video advertisement for my new skincare product.');
  const [isGeneratingWithAI, setIsGeneratingWithAI] = useState(false);
  const [aiAssistantSuccess, setAiAssistantSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<SpecializationCategory>('AI Video & Commercials');
  const [budgetMin, setBudgetMin] = useState(2000);
  const [budgetMax, setBudgetMax] = useState(4500);
  const [deadline, setDeadline] = useState('2026-11-20');
  const [deliverablesText, setDeliverablesText] = useState('1x 30s 4K Master Video\n3x 15s 9:16 Social Cutdowns\nStyle frames');
  const [requiredToolsText, setRequiredToolsText] = useState('Runway Gen-3, Midjourney v6.1, Topaz Video AI');
  const [requiredSkillsText, setRequiredSkillsText] = useState('Fluid Simulation Aesthetics, Luxury Color Grading, Prompt Engineering');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('intermediate');
  const [targetAudience, setTargetAudience] = useState('Women & Men aged 24-40 interested in clean biotech beauty');
  const [referenceImagesText, setReferenceImagesText] = useState('https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80');

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

  if (!isOpen) return null;

  const handleRunAIAssistant = async () => {
    if (!roughPrompt.trim()) return;
    setIsGeneratingWithAI(true);
    setErrorMsg('');
    try {
      const generated = await api.generateAIBrief(roughPrompt);
      setTitle(generated.title);
      setCategory(generated.category);
      setDescription(`${generated.objective}\n\nCreative Direction: ${generated.promptGuidance}`);
      setTargetAudience(generated.targetAudience);
      setDeliverablesText(generated.deliverables.join('\n'));
      setRequiredToolsText(generated.suggestedTools.join(', '));
      setRequiredSkillsText(generated.skillsRequired.join(', '));
      setBudgetMin(generated.budgetRange.min);
      setBudgetMax(generated.budgetRange.max);

      // Set target deadline based on suggested timeline days
      const d = new Date();
      d.setDate(d.getDate() + (generated.suggestedTimelineDays || 14));
      setDeadline(d.toISOString().split('T')[0]);

      setAiAssistantSuccess(true);
    } catch (err: any) {
      console.error('AI brief assistant error:', err);
      setErrorMsg('Could not run AI assistant. Please edit the fields manually.');
    } finally {
      setIsGeneratingWithAI(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMsg('Please provide a campaign title and description.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const deliverables = deliverablesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const requiredTools = requiredToolsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const requiredSkills = requiredSkillsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const referenceImages = referenceImagesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const created = await api.createCampaign({
        title,
        description,
        category,
        budgetMin,
        budgetMax,
        deadline,
        deliverables,
        requiredTools,
        requiredSkills,
        experienceLevel,
        targetAudience,
        referenceImages
      });

      onCampaignCreated(created);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error creating campaign brief.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel rounded-3xl max-w-3xl w-full border border-[#7C4DFF]/40 shadow-2xl p-6 sm:p-8 space-y-6 relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#0B081D]/80 text-[#B9B3D0] hover:text-white border border-[#2A2453] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#FF7A1A]" />
            <span>Creative Brief Studio</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Post a New AI Campaign Brief</h2>
          <p className="text-xs text-[#B9B3D0] mt-0.5">
            Define deliverables, budget, and required AI tools. Creators in your niche will receive notifications and pitch tailored proposals.
          </p>
        </div>

        {/* AI Brief Assistant Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#17132E] via-[#201A40] to-[#17132E] border border-[#7C4DFF]/40 shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Wand2 className="w-4 h-4 text-[#9D7BFF]" />
              AI Campaign Brief Assistant (Gemini 3.8 Flash)
            </span>
            <span className="text-[10px] text-[#B9B3D0] bg-[#0B081D]/70 px-2 py-0.5 rounded border border-[#2A2453]">
              Natural Language Prompting
            </span>
          </div>

          <p className="text-xs text-[#B9B3D0]">
            Have an unstructured idea? Describe it in one sentence, and Gemini will generate a production-ready brief with objectives, specs, and tool stack.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={roughPrompt}
              onChange={(e) => setRoughPrompt(e.target.value)}
              placeholder="e.g. I need an AI video advertisement for my new skincare product"
              className="flex-1 glass-input rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#B9B3D0]/60 outline-none"
            />
            <button
              type="button"
              disabled={isGeneratingWithAI}
              onClick={handleRunAIAssistant}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] hover:from-[#6A3DE8] hover:to-[#8C66FF] text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 shrink-0 shadow-md shadow-[#7C4DFF]/30"
            >
              {isGeneratingWithAI ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Brief with AI</span>
                </>
              )}
            </button>
          </div>

          {aiAssistantSuccess && (
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Brief generated successfully! You can review and adjust any field below.</span>
            </div>
          )}
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Campaign Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-white block">Campaign Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Lumina Hypercar: 4K Commercial Launch Spot"
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SpecializationCategory)}
                className="w-full glass-input rounded-xl px-3 py-2.5 text-xs text-white outline-none bg-[#17132E]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-white block">Brief Description & Goals *</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the campaign creative vision, narrative, key visual hooks, and output criteria..."
              className="w-full glass-input rounded-xl p-3 text-xs text-white outline-none leading-relaxed"
            />
          </div>

          {/* Budget Range & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">Budget Min ($USD) *</label>
              <input
                type="number"
                min={100}
                max={50000}
                required
                value={budgetMin}
                onChange={(e) => setBudgetMin(Number(e.target.value))}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">Budget Max ($USD) *</label>
              <input
                type="number"
                min={100}
                max={50000}
                required
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value))}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">Target Deadline *</label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* Deliverables & Target Audience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">Deliverables (one per line)</label>
              <textarea
                rows={3}
                value={deliverablesText}
                onChange={(e) => setDeliverablesText(e.target.value)}
                placeholder="1x 30s 4K Master Video&#10;3x 15s 9:16 Social Cutdowns&#10;Keyframe Still Extracts"
                className="w-full glass-input rounded-xl p-3 text-xs text-white outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">Target Audience</label>
              <textarea
                rows={3}
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Demographics, style affinities, tone of voice..."
                className="w-full glass-input rounded-xl p-3 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* AI Tools & Skills Required */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">Required AI Tools (comma separated)</label>
              <input
                type="text"
                value={requiredToolsText}
                onChange={(e) => setRequiredToolsText(e.target.value)}
                placeholder="Runway Gen-3, Midjourney v6.1, FLUX.1"
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">Required Skills (comma separated)</label>
              <input
                type="text"
                value={requiredSkillsText}
                onChange={(e) => setRequiredSkillsText(e.target.value)}
                placeholder="Fluid Dynamics, Luxury Color Grading, Prompt Consistency"
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* Experience level & Reference Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">Creator Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none bg-[#17132E]"
              >
                <option value="any">Any Experience Level</option>
                <option value="intermediate">Intermediate (2+ years AI directing)</option>
                <option value="expert">Expert / Commercial Director (3+ years)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white block">Moodboard / Reference Image URL</label>
              <input
                type="url"
                value={referenceImagesText}
                onChange={(e) => setReferenceImagesText(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#2A2453]/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#17132E] hover:bg-[#201A40] text-xs font-medium text-[#B9B3D0] hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] hover:from-[#6A3DE8] hover:to-[#8C66FF] text-white font-semibold text-xs shadow-lg shadow-[#7C4DFF]/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Publishing Brief...</span>
                </>
              ) : (
                <>
                  <span>Publish Campaign Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
