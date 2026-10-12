import { GoogleGenAI } from '@google/genai';
import {
  Campaign,
  CreatorWithProfile,
  AIMatchScore,
  AIBriefGenerationResult,
  SpecializationCategory
} from '../src/types/index.js';

let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
    if (!genAIClient) {
      try {
        genAIClient = new GoogleGenAI();
      } catch (err) {
        console.warn('Failed to initialize GoogleGenAI client:', err);
      }
    }
    return genAIClient;
  }
  return null;
}

/**
 * Deterministic Baseline Scoring Algorithm
 * Weighting:
 * - Category Match: 25%
 * - Skills & Tools Match: 30%
 * - Budget Compatibility: 20%
 * - Rating & Experience: 15%
 * - Availability: 10%
 */
export function calculateDeterministicMatch(campaign: Campaign, creator: CreatorWithProfile): AIMatchScore {
  const { profile, portfolio } = creator;

  // 1. Category Score (25%)
  let catScore = 0;
  if (profile.specialization === campaign.category) {
    catScore = 100;
  } else if (profile.secondarySpecializations?.includes(campaign.category)) {
    catScore = 75;
  } else {
    // Check if any portfolio project matches category
    const hasCategoryWork = portfolio.some((p) => p.category === campaign.category);
    catScore = hasCategoryWork ? 50 : 20;
  }

  // 2. Skills & Tools Match (30%)
  let skillsScore = 50;
  const campaignTools = (campaign.requiredTools || []).map((t) => t.toLowerCase());
  const campaignSkills = (campaign.requiredSkills || []).map((s) => s.toLowerCase());
  const creatorTools = (profile.aiTools || []).map((t) => t.toLowerCase());
  const creatorSkills = (profile.skills || []).map((s) => s.toLowerCase());

  let matchedToolsCount = 0;
  for (const t of campaignTools) {
    if (creatorTools.some((ct) => ct.includes(t) || t.includes(ct))) {
      matchedToolsCount++;
    }
  }
  let matchedSkillsCount = 0;
  for (const s of campaignSkills) {
    if (creatorSkills.some((cs) => cs.includes(s) || s.includes(cs))) {
      matchedSkillsCount++;
    }
  }

  const totalReq = campaignTools.length + campaignSkills.length;
  if (totalReq > 0) {
    const ratio = (matchedToolsCount + matchedSkillsCount) / totalReq;
    skillsScore = Math.min(100, Math.round(ratio * 100));
  } else {
    skillsScore = 75;
  }

  // 3. Budget Compatibility (20%)
  // Compare campaign budget range with creator's projectStartingRate
  let budgetScore = 70;
  const avgCampaignBudget = (campaign.budgetMin + campaign.budgetMax) / 2;
  if (profile.projectStartingRate <= campaign.budgetMax) {
    if (profile.projectStartingRate <= avgCampaignBudget) {
      budgetScore = 100; // easily within budget
    } else {
      budgetScore = 85; // within max budget
    }
  } else {
    const diff = profile.projectStartingRate - campaign.budgetMax;
    const penalty = Math.min(60, Math.round((diff / campaign.budgetMax) * 100));
    budgetScore = Math.max(20, 100 - penalty);
  }

  // 4. Rating & Experience (15%)
  let ratingExpScore = 0;
  const ratingNormalized = (profile.rating / 5.0) * 60; // up to 60 pts
  const expNormalized = Math.min(40, profile.experienceYears * 8); // up to 40 pts
  ratingExpScore = Math.round(ratingNormalized + expNormalized);

  // 5. Availability (10%)
  let availScore = 40;
  if (profile.availability === 'available') availScore = 100;
  else if (profile.availability === 'busy') availScore = 60;
  else availScore = 20;

  // Weighted total
  const finalScore = Math.round(
    catScore * 0.25 +
    skillsScore * 0.30 +
    budgetScore * 0.20 +
    ratingExpScore * 0.15 +
    availScore * 0.10
  );

  // Compile specific reasons
  const reasons: string[] = [];
  if (catScore >= 75) {
    reasons.push(`Direct specialization in ${campaign.category}`);
  }
  if (matchedToolsCount > 0) {
    reasons.push(`Proficient in required tools (${campaignTools.slice(0, 2).join(', ')})`);
  }
  if (budgetScore >= 80) {
    reasons.push(`Starting rates ($${profile.projectStartingRate}) fit within your budget ($${campaign.budgetMin}-$${campaign.budgetMax})`);
  }
  if (profile.rating >= 4.8) {
    reasons.push(`Top-tier client rating (${profile.rating}/5.0 across ${profile.reviewCount} verified reviews)`);
  }
  if (profile.availability === 'available') {
    reasons.push('Immediately available for new campaigns');
  }

  const relevantPortfolioIds = portfolio
    .filter((p) => p.category === campaign.category || p.toolsUsed.some((tu) => campaignTools.includes(tu.toLowerCase())))
    .map((p) => p.id);

  const summary = `${finalScore}% Match — ${reasons.slice(0, 2).join(', ')}`;

  return {
    creatorId: creator.user.id,
    score: Math.min(99, Math.max(35, finalScore)),
    reasons,
    breakdown: {
      categoryMatch: catScore,
      skillsAndToolsMatch: skillsScore,
      budgetCompatibility: budgetScore,
      ratingAndExperience: ratingExpScore,
      availability: availScore
    },
    summary,
    relevantPortfolioIds: relevantPortfolioIds.length > 0 ? relevantPortfolioIds : portfolio.map((p) => p.id).slice(0, 2)
  };
}

/**
 * AI Enhanced Creator Matching
 * Uses Gemini (gemini-3.8-flash) if available to generate deep qualitative rationale,
 * collaboration angle, and customized value pitch. Falls back gracefully to deterministic logic.
 */
export async function matchCreatorWithAI(
  campaign: Campaign,
  creator: CreatorWithProfile
): Promise<AIMatchScore> {
  const base = calculateDeterministicMatch(campaign, creator);
  const ai = getGenAI();

  if (!ai) {
    // Graceful fallback with deterministic algorithm
    base.aiSuggestedAngle = `Collaborate with ${creator.user.name} on ${campaign.category} deliverables, leveraging their proven background in ${creator.profile.aiTools.slice(0, 3).join(', ')}.`;
    return base;
  }

  try {
    const prompt = `
You are the Chief Creative Matchmaker for CreatorConnect AI, an AI content creator marketplace.
Evaluate how well this AI creator fits the brand's campaign brief.

CAMPAIGN BRIEF:
- Title: ${campaign.title}
- Category: ${campaign.category}
- Description: ${campaign.description}
- Budget: $${campaign.budgetMin} - $${campaign.budgetMax}
- Required Tools: ${campaign.requiredTools.join(', ')}
- Required Skills: ${campaign.requiredSkills.join(', ')}

CREATOR PROFILE:
- Name: ${creator.user.name}
- Title: ${creator.profile.title}
- Specialization: ${creator.profile.specialization}
- AI Tools: ${creator.profile.aiTools.join(', ')}
- Skills: ${creator.profile.skills.join(', ')}
- Starting Rate: $${creator.profile.projectStartingRate}
- Rating: ${creator.profile.rating}/5.0 (${creator.profile.reviewCount} reviews)
- Availability: ${creator.profile.availability}

BASELINE SCORE: ${base.score} / 100.

Return a JSON object with:
1. "enhancedSummary": a concise 1-sentence executive summary highlighting why they match (include their score).
2. "collaborationAngle": a 1-2 sentence recommendation for how the brand should brief this creator or utilize their distinct style.
3. "topReasons": array of 3 bullet points with specific match merits.
Respond ONLY with raw JSON, no markdown code fence.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt
    });

    const text = response.text ? response.text.trim() : '';
    // Clean potential markdown blocks
    const cleanJson = text.replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();
    const parsed = JSON.parse(cleanJson);

    if (parsed.enhancedSummary) base.summary = parsed.enhancedSummary;
    if (parsed.collaborationAngle) base.aiSuggestedAngle = parsed.collaborationAngle;
    if (Array.isArray(parsed.topReasons) && parsed.topReasons.length > 0) {
      base.reasons = parsed.topReasons;
    }
  } catch (err) {
    console.warn('Gemini creator matching fallback active:', err);
    base.aiSuggestedAngle = `Leverage ${creator.user.name}'s proficiency in ${creator.profile.aiTools.slice(0, 3).join(', ')} to deliver high-fidelity ${campaign.category} assets.`;
  }

  return base;
}

/**
 * AI Campaign Brief Assistant
 * Transforms rough brand prompts into structured creative campaign briefs.
 */
export async function generateBriefWithAI(roughIdea: string): Promise<AIBriefGenerationResult> {
  const ai = getGenAI();

  if (!ai) {
    return generateFallbackBrief(roughIdea);
  }

  try {
    const prompt = `
You are an expert Creative Director and AI Production Specialist.
The user wants to create a campaign brief on CreatorConnect AI.
Convert their rough input into a structured, production-ready AI campaign brief.

USER'S ROUGH IDEA:
"${roughIdea}"

Return ONLY a valid JSON object matching this schema:
{
  "title": "Compelling campaign title (e.g. NextGen Bio-Serum: 4K Runway Commercial)",
  "category": "One of: AI Video & Commercials | AI Image & Photography | AI Influencers & Avatars | AI Advertising Creatives | AI Animation & Motion | AI Voice & Audio | AI Branding & Concept Art | AI Storytelling & Narrative",
  "objective": "Clear 1-2 sentence primary campaign objective",
  "targetAudience": "Target demographic and consumer mindset",
  "suggestedFormats": ["Format 1", "Format 2"],
  "deliverables": ["Deliverable 1 with specs", "Deliverable 2 with specs", "Deliverable 3"],
  "skillsRequired": ["Skill 1", "Skill 2", "Skill 3"],
  "suggestedTools": ["AI Tool 1 (e.g. Runway Gen-3)", "AI Tool 2 (e.g. Midjourney)", "AI Tool 3"],
  "budgetRange": { "min": 1500, "max": 4000 },
  "suggestedTimelineDays": 14,
  "promptGuidance": "Key creative direction, mood, color palette, and prompt aesthetics for the AI artist"
}
Respond strictly with valid JSON without markdown wrapping.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt
    });

    const text = response.text ? response.text.trim() : '';
    const cleanJson = text.replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();
    const parsed = JSON.parse(cleanJson);

    return {
      title: parsed.title || 'AI Creative Campaign',
      category: parsed.category || 'AI Video & Commercials',
      objective: parsed.objective || 'Create engaging high-impact AI assets for product launch.',
      targetAudience: parsed.targetAudience || 'Modern digital consumers and brand audience.',
      suggestedFormats: parsed.suggestedFormats || ['16:9 4K Video', '9:16 Social Reel'],
      deliverables: parsed.deliverables || ['1x Master Video', '3x Social Cutdowns'],
      skillsRequired: parsed.skillsRequired || ['Prompt Engineering', 'Motion Design', 'Color Grading'],
      suggestedTools: parsed.suggestedTools || ['Runway Gen-3', 'Midjourney v6.1'],
      budgetRange: parsed.budgetRange || { min: 2000, max: 4500 },
      suggestedTimelineDays: parsed.suggestedTimelineDays || 14,
      promptGuidance: parsed.promptGuidance || 'Cinematic composition, natural lighting, high dynamic range.'
    };
  } catch (err) {
    console.warn('Gemini brief generation fallback active:', err);
    return generateFallbackBrief(roughIdea);
  }
}

/**
 * Heuristic fallback template assistant when AI API is unavailable
 */
function generateFallbackBrief(roughIdea: string): AIBriefGenerationResult {
  const lower = roughIdea.toLowerCase();

  let category: SpecializationCategory = 'AI Video & Commercials';
  let suggestedTools = ['Runway Gen-3', 'Midjourney v6.1', 'Topaz Video AI'];
  let min = 2000;
  let max = 4500;
  let days = 14;

  if (lower.includes('photo') || lower.includes('product') || lower.includes('image') || lower.includes('packaging')) {
    category = 'AI Image & Photography';
    suggestedTools = ['FLUX.1 Pro', 'Midjourney v6.1', 'ComfyUI ControlNet', 'Photoshop'];
    min = 1200;
    max = 2800;
    days = 7;
  } else if (lower.includes('influencer') || lower.includes('avatar') || lower.includes('model') || lower.includes('fashion')) {
    category = 'AI Influencers & Avatars';
    suggestedTools = ['Midjourney v6.1', 'FaceID LoRA', 'SDXL', 'Runway Gen-3'];
    min = 1800;
    max = 3500;
    days = 10;
  } else if (lower.includes('voice') || lower.includes('audio') || lower.includes('sound') || lower.includes('podcast')) {
    category = 'AI Voice & Audio';
    suggestedTools = ['ElevenLabs Voice Synthesis', 'Suno v3.5', 'Reaper DAW'];
    min = 800;
    max = 1800;
    days = 5;
  } else if (lower.includes('animation') || lower.includes('loop') || lower.includes('motion')) {
    category = 'AI Animation & Motion';
    suggestedTools = ['ComfyUI AnimateDiff', 'Kling AI', 'TouchDesigner'];
    min = 1600;
    max = 3800;
    days = 12;
  }

  const sanitized = roughIdea.trim();
  const title = sanitized.length > 5
    ? `${sanitized.slice(0, 40).replace(/[^\w\s]/gi, '')}: High-Impact Creative`
    : 'New AI Creative Campaign';

  return {
    title,
    category,
    objective: `Produce premium ${category} assets based on concept: "${sanitized}".`,
    targetAudience: 'Tech-forward digital audience, early adopters, and brand loyalists.',
    suggestedFormats: category === 'AI Image & Photography'
      ? ['High-Res 8K Stills (PNG/TIFF)', 'Transparent Cutouts', 'Social Grid Layouts']
      : ['4K UHD Master (16:9)', 'Vertical Short-Form (9:16)', 'Teaser Clips (1:1)'],
    deliverables: [
      `Hero ${category} Master File`,
      '3x Adaptive Social Variations',
      'Production Source Prompts & Style Guide'
    ],
    skillsRequired: ['Prompt Engineering & Composition', 'Lighting & Texture Realism', 'Post-processing & Upscaling'],
    suggestedTools,
    budgetRange: { min, max },
    suggestedTimelineDays: days,
    promptGuidance: 'High-contrast studio lighting, rich textural detail, cinematic atmosphere, clean modern palette.'
  };
}
