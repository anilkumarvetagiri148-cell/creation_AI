import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './server/db.js';
import { calculateDeterministicMatch, matchCreatorWithAI, generateBriefWithAI } from './server/ai.js';
import {
  UserProfile,
  CreatorWithProfile,
  Campaign,
  CampaignProposal,
  PortfolioProject,
  Review,
  Message
} from './src/types/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Simulated active session for demo / ease of use
// Defaults to Elena Rostova (creator) or can be switched via header or endpoint
let currentActiveUserId = 'creator-1';

// Session helper middleware
function getCurrentUser(req: Request): UserProfile {
  const customId = req.headers['x-user-id'] as string;
  const targetId = customId || currentActiveUserId;
  const user = db.getProfileById(targetId);
  if (user) return user;
  return db.getProfileById('creator-1') || db.getProfiles()[0];
}

// -----------------------------------------------------------------------------
// Authentication Endpoints
// -----------------------------------------------------------------------------
app.get('/api/auth/me', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const creatorProfile = user.role === 'creator' ? db.getCreatorProfileByUserId(user.id) : undefined;
  res.json({ user, creatorProfile });
});

app.post('/api/auth/switch-demo', (req: Request, res: Response) => {
  const { role, userId } = req.body;
  if (userId) {
    const user = db.getProfileById(userId);
    if (user) {
      currentActiveUserId = user.id;
      return res.json({ success: true, user });
    }
  }
  if (role === 'creator') {
    currentActiveUserId = 'creator-1';
  } else if (role === 'brand') {
    currentActiveUserId = 'brand-1';
  } else if (role === 'admin') {
    currentActiveUserId = 'admin-1';
  }
  const user = getCurrentUser(req);
  res.json({ success: true, user });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, role, specialization, title, companyName } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ error: 'Name, email, and role are required.' });
  }

  const existing = db.getProfileByEmail(email);
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  const newId = `user-${Date.now()}`;
  const newProfile: UserProfile = {
    id: newId,
    name,
    email,
    role: role as 'creator' | 'brand' | 'admin',
    avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80`,
    bio: role === 'creator' ? `AI creative specializing in ${specialization || 'AI Content Creation'}.` : 'Brand marketing team.',
    location: 'Remote, Global',
    companyName: companyName || '',
    createdAt: new Date().toISOString()
  };

  db.createProfile(newProfile);

  if (role === 'creator') {
    db.updateCreatorProfile(newId, {
      title: title || 'AI Content Creator',
      specialization: specialization || 'AI Video & Commercials',
      skills: ['Midjourney v6.1', 'Prompt Engineering', 'Runway Gen-3'],
      aiTools: ['Midjourney', 'Runway', 'FLUX.1'],
      hourlyRate: 85,
      projectStartingRate: 900,
      availability: 'available',
      experienceYears: 1
    });
  }

  currentActiveUserId = newId;
  res.json({ success: true, user: newProfile });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const user = db.getProfileByEmail(email);
  if (!user) {
    return res.status(404).json({ error: 'No account found with this email. Please sign up or use Demo accounts.' });
  }

  currentActiveUserId = user.id;
  res.json({ success: true, user });
});

app.post('/api/auth/logout', (_req: Request, res: Response) => {
  currentActiveUserId = 'creator-1';
  res.json({ success: true });
});

// -----------------------------------------------------------------------------
// Creator Marketplace & Portfolios
// -----------------------------------------------------------------------------
app.get('/api/creators', (req: Request, res: Response) => {
  let creators = db.getAllCreators();
  const {
    search,
    category,
    tool,
    availability,
    minPrice,
    maxPrice,
    minRating,
    minExperience,
    sort,
    page = '1',
    limit = '9'
  } = req.query as Record<string, string>;

  // Filters
  if (search) {
    const q = search.toLowerCase();
    creators = creators.filter(
      (c) =>
        c.user.name.toLowerCase().includes(q) ||
        c.profile.title.toLowerCase().includes(q) ||
        c.user.bio.toLowerCase().includes(q) ||
        c.profile.skills.some((s) => s.toLowerCase().includes(q)) ||
        c.profile.aiTools.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (category && category !== 'all') {
    creators = creators.filter(
      (c) =>
        c.profile.specialization === category ||
        c.profile.secondarySpecializations.includes(category as any)
    );
  }

  if (tool && tool !== 'all') {
    const t = tool.toLowerCase();
    creators = creators.filter((c) =>
      c.profile.aiTools.some((toolItem) => toolItem.toLowerCase().includes(t))
    );
  }

  if (availability && availability !== 'all') {
    creators = creators.filter((c) => c.profile.availability === availability);
  }

  if (minPrice) {
    const minP = Number(minPrice);
    creators = creators.filter((c) => c.profile.projectStartingRate >= minP);
  }

  if (maxPrice) {
    const maxP = Number(maxPrice);
    creators = creators.filter((c) => c.profile.projectStartingRate <= maxP);
  }

  if (minRating) {
    const minR = Number(minRating);
    creators = creators.filter((c) => c.profile.rating >= minR);
  }

  if (minExperience) {
    const minExp = Number(minExperience);
    creators = creators.filter((c) => c.profile.experienceYears >= minExp);
  }

  // Sort
  if (sort === 'rating') {
    creators.sort((a, b) => b.profile.rating - a.profile.rating);
  } else if (sort === 'price_low') {
    creators.sort((a, b) => a.profile.projectStartingRate - b.profile.projectStartingRate);
  } else if (sort === 'price_high') {
    creators.sort((a, b) => b.profile.projectStartingRate - a.profile.projectStartingRate);
  } else if (sort === 'experience') {
    creators.sort((a, b) => b.profile.experienceYears - a.profile.experienceYears);
  } else {
    // Relevance / Featured
    creators.sort((a, b) => (b.profile.featured ? 1 : 0) - (a.profile.featured ? 1 : 0));
  }

  const total = creators.length;
  const p = Math.max(1, parseInt(page, 10));
  const l = Math.max(1, parseInt(limit, 10));
  const startIndex = (p - 1) * l;
  const paginated = creators.slice(startIndex, startIndex + l);

  res.json({
    creators: paginated,
    pagination: {
      page: p,
      limit: l,
      total,
      totalPages: Math.ceil(total / l)
    }
  });
});

app.get('/api/creators/:id', (req: Request, res: Response) => {
  const creator = db.getCreatorById(req.params.id);
  if (!creator) {
    return res.status(404).json({ error: 'Creator not found.' });
  }
  const reviews = db.getReviews(creator.user.id);
  res.json({ ...creator, reviews });
});

app.put('/api/creators/:id', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  if (user.id !== req.params.id && user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized to edit this profile.' });
  }

  const { name, bio, location, title, specialization, skills, aiTools, hourlyRate, projectStartingRate, availability } = req.body;

  if (name || bio || location) {
    db.updateProfile(req.params.id, { name, bio, location });
  }

  const updatedProfile = db.updateCreatorProfile(req.params.id, {
    title,
    specialization,
    skills,
    aiTools,
    hourlyRate,
    projectStartingRate,
    availability
  });

  const creator = db.getCreatorById(req.params.id);
  res.json(creator);
});

// Portfolio management
app.post('/api/creators/:id/portfolio', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  if (user.id !== req.params.id && user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized to add projects.' });
  }

  const { title, description, category, mediaUrl, mediaType, toolsUsed, deliverables, clientRole, promptSnippet } = req.body;

  if (!title || !description || !mediaUrl) {
    return res.status(400).json({ error: 'Title, description, and mediaUrl are required.' });
  }

  const newProject: PortfolioProject = {
    id: `proj-${Date.now()}`,
    creatorId: req.params.id,
    title,
    description,
    category: category || 'AI Image & Photography',
    mediaUrl,
    mediaType: mediaType || 'image',
    toolsUsed: Array.isArray(toolsUsed) ? toolsUsed : ['Midjourney', 'FLUX.1'],
    deliverables: Array.isArray(deliverables) ? deliverables : ['High-res assets'],
    clientRole: clientRole || 'AI Creator',
    featured: false,
    promptSnippet: promptSnippet || '',
    likes: 0,
    createdAt: new Date().toISOString()
  };

  db.addPortfolioProject(newProject);
  res.json(newProject);
});

app.delete('/api/creators/:id/portfolio/:projectId', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  if (user.id !== req.params.id && user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized to delete this project.' });
  }

  const deleted = db.deletePortfolioProject(req.params.projectId, req.params.id);
  res.json({ success: deleted });
});

// -----------------------------------------------------------------------------
// Campaigns & Proposals
// -----------------------------------------------------------------------------
app.get('/api/campaigns', (req: Request, res: Response) => {
  const { status, category, search } = req.query as Record<string, string>;
  const campaigns = db.getCampaigns({ status, category, search });
  res.json(campaigns);
});

app.get('/api/campaigns/:id', (req: Request, res: Response) => {
  const campaign = db.getCampaignById(req.params.id);
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found.' });
  }

  const user = getCurrentUser(req);
  let proposals: CampaignProposal[] = [];
  if (user.id === campaign.brandId || user.role === 'admin') {
    proposals = db.getProposals(campaign.id);
  } else if (user.role === 'creator') {
    proposals = db.getProposals(campaign.id, user.id);
  }

  res.json({ campaign, proposals });
});

app.post('/api/campaigns', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  if (user.role !== 'brand' && user.role !== 'admin') {
    return res.status(403).json({ error: 'Only brands and creative agencies can create campaign briefs.' });
  }

  const {
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
  } = req.body;

  if (!title || !description || !category || !budgetMin || !budgetMax || !deadline) {
    return res.status(400).json({ error: 'Title, description, category, budget range, and deadline are required.' });
  }

  const newCampaign: Campaign = {
    id: `camp-${Date.now()}`,
    brandId: user.id,
    brandName: user.companyName || user.name,
    brandAvatar: user.avatar,
    title,
    description,
    category,
    budgetMin: Number(budgetMin),
    budgetMax: Number(budgetMax),
    deadline,
    status: 'open',
    deliverables: Array.isArray(deliverables) ? deliverables : ['High-res assets'],
    requiredTools: Array.isArray(requiredTools) ? requiredTools : ['Runway', 'Midjourney'],
    requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : ['Prompt Engineering'],
    experienceLevel: experienceLevel || 'intermediate',
    targetAudience: targetAudience || '',
    referenceImages: Array.isArray(referenceImages) ? referenceImages : [],
    proposalsCount: 0,
    createdAt: new Date().toISOString()
  };

  db.createCampaign(newCampaign);

  // Notify creators with matching specialization
  const matchingCreators = db.getAllCreators().filter((c) => c.profile.specialization === category);
  for (const mc of matchingCreators.slice(0, 3)) {
    db.addNotification({
      id: `notif-${Date.now()}-${mc.user.id}`,
      recipientId: mc.user.id,
      type: 'campaign_invite',
      title: 'New Campaign Brief in Your Niche',
      message: `${newCampaign.brandName} published "${newCampaign.title}".`,
      link: `/campaigns/${newCampaign.id}`,
      read: false,
      createdAt: new Date().toISOString()
    });
  }

  res.json(newCampaign);
});

app.patch('/api/campaigns/:id/status', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const campaign = db.getCampaignById(req.params.id);
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found.' });
  }

  if (campaign.brandId !== user.id && user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized to change campaign status.' });
  }

  const { status } = req.body;
  if (!['draft', 'open', 'in_progress', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid campaign status.' });
  }

  const updated = db.updateCampaign(campaign.id, { status });
  res.json(updated);
});

// Proposals
app.get('/api/campaigns/:id/proposals', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const campaign = db.getCampaignById(req.params.id);
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found.' });
  }

  if (campaign.brandId !== user.id && user.role !== 'admin') {
    const creatorProposals = db.getProposals(campaign.id, user.id);
    return res.json(creatorProposals);
  }

  const proposals = db.getProposals(campaign.id);
  res.json(proposals);
});

app.post('/api/campaigns/:id/proposals', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  if (user.role !== 'creator') {
    return res.status(403).json({ error: 'Only creators can submit proposals.' });
  }

  const campaign = db.getCampaignById(req.params.id);
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found.' });
  }

  if (campaign.status !== 'open') {
    return res.status(400).json({ error: 'This campaign is not currently open for proposals.' });
  }

  const { pitch, price, timelineDays } = req.body;
  if (!pitch || !price || !timelineDays) {
    return res.status(400).json({ error: 'Pitch, price, and timeline are required.' });
  }

  const creatorProfile = db.getCreatorProfileByUserId(user.id);

  try {
    const proposal: CampaignProposal = {
      id: `prop-${Date.now()}`,
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      brandId: campaign.brandId,
      creatorId: user.id,
      creatorName: user.name,
      creatorAvatar: user.avatar,
      creatorSpecialization: creatorProfile?.specialization || 'AI Creator',
      pitch,
      price: Number(price),
      timelineDays: Number(timelineDays),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const created = db.createProposal(proposal);

    // Notify brand
    db.addNotification({
      id: `notif-${Date.now()}`,
      recipientId: campaign.brandId,
      type: 'proposal_received',
      title: 'New Campaign Proposal',
      message: `${user.name} submitted a pitch for "${campaign.title}" ($${proposal.price}).`,
      link: `/campaigns/${campaign.id}`,
      read: false,
      createdAt: new Date().toISOString()
    });

    res.json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Could not submit proposal.' });
  }
});

app.patch('/api/proposals/:id/status', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const { status } = req.body;
  const proposal = db.getProposals().find((p) => p.id === req.params.id);
  if (!proposal) {
    return res.status(404).json({ error: 'Proposal not found.' });
  }

  if (proposal.brandId !== user.id && user.role !== 'admin') {
    return res.status(403).json({ error: 'Only the campaign brand owner can update proposal status.' });
  }

  const updated = db.updateProposalStatus(proposal.id, status);

  // Notify creator
  db.addNotification({
    id: `notif-${Date.now()}`,
    recipientId: proposal.creatorId,
    type: status === 'accepted' ? 'proposal_accepted' : 'proposal_declined',
    title: status === 'accepted' ? 'Proposal Accepted!' : 'Proposal Status Updated',
    message: `Your proposal for "${proposal.campaignTitle}" was marked as ${status}.`,
    link: `/creator-dashboard`,
    read: false,
    createdAt: new Date().toISOString()
  });

  res.json(updated);
});

// -----------------------------------------------------------------------------
// Favorites / Saved Creators
// -----------------------------------------------------------------------------
app.get('/api/saved-creators', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const saved = db.getSavedCreators(user.id);
  const creators = saved.map((s) => db.getCreatorById(s.creatorId)).filter(Boolean);
  res.json({ saved, creators });
});

app.post('/api/saved-creators/toggle', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const { creatorId } = req.body;
  if (!creatorId) {
    return res.status(400).json({ error: 'creatorId is required.' });
  }
  const result = db.toggleSaveCreator(user.id, creatorId);
  res.json(result);
});

// -----------------------------------------------------------------------------
// Messaging & Conversations
// -----------------------------------------------------------------------------
app.get('/api/conversations', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const conversations = db.getConversations(user.id);
  res.json(conversations);
});

app.get('/api/conversations/:id/messages', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const messages = db.getMessages(req.params.id);
  db.markMessagesRead(req.params.id, user.id);
  res.json(messages);
});

app.post('/api/conversations/:id/messages', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const { receiverId, body } = req.body;
  if (!body || !receiverId) {
    return res.status(400).json({ error: 'body and receiverId are required.' });
  }

  const newMsg: Message = {
    id: `msg-${Date.now()}`,
    conversationId: req.params.id,
    senderId: user.id,
    senderName: user.name,
    senderAvatar: user.avatar,
    receiverId,
    body,
    createdAt: new Date().toISOString(),
    read: false
  };

  const sent = db.sendMessage(newMsg);

  // Notify receiver
  db.addNotification({
    id: `notif-${Date.now()}`,
    recipientId: receiverId,
    type: 'new_message',
    title: `Message from ${user.name}`,
    message: body.slice(0, 70),
    link: `/messages?conv=${req.params.id}`,
    read: false,
    createdAt: new Date().toISOString()
  });

  res.json(sent);
});

app.post('/api/conversations/start', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const { recipientId, campaignId } = req.body;
  if (!recipientId) {
    return res.status(400).json({ error: 'recipientId is required.' });
  }

  const conversation = db.findOrCreateConversation(user.id, recipientId, campaignId);
  res.json(conversation);
});

// -----------------------------------------------------------------------------
// Reviews & Ratings
// -----------------------------------------------------------------------------
app.get('/api/creators/:id/reviews', (req: Request, res: Response) => {
  const reviews = db.getReviews(req.params.id);
  res.json(reviews);
});

app.post('/api/reviews', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const { campaignId, creatorId, rating, feedback } = req.body;

  if (!campaignId || !creatorId || !rating || !feedback) {
    return res.status(400).json({ error: 'campaignId, creatorId, rating, and feedback are required.' });
  }

  const campaign = db.getCampaignById(campaignId);
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found.' });
  }

  if (campaign.brandId !== user.id && user.role !== 'admin') {
    return res.status(403).json({ error: 'Only the brand of this campaign can submit a review.' });
  }

  if (campaign.status !== 'completed') {
    return res.status(400).json({ error: 'Reviews can only be posted once the campaign is marked completed.' });
  }

  try {
    const review: Review = {
      id: `rev-${Date.now()}`,
      campaignId,
      campaignTitle: campaign.title,
      creatorId,
      reviewerId: user.id,
      reviewerName: user.companyName || user.name,
      reviewerAvatar: user.avatar,
      reviewerRole: 'Brand Client',
      rating: Number(rating),
      feedback,
      createdAt: new Date().toISOString()
    };

    const created = db.addReview(review);

    // Notify creator
    db.addNotification({
      id: `notif-${Date.now()}`,
      recipientId: creatorId,
      type: 'review_received',
      title: 'New Client Review Received',
      message: `${user.name} rated your work ${rating}★ for "${campaign.title}".`,
      link: `/creator-dashboard`,
      read: false,
      createdAt: new Date().toISOString()
    });

    res.json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Error adding review.' });
  }
});

// -----------------------------------------------------------------------------
// Notifications
// -----------------------------------------------------------------------------
app.get('/api/notifications', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const notifications = db.getNotifications(user.id);
  res.json(notifications);
});

app.patch('/api/notifications/:id/read', (req: Request, res: Response) => {
  db.markNotificationRead(req.params.id);
  res.json({ success: true });
});

// -----------------------------------------------------------------------------
// AI Integration Endpoints
// -----------------------------------------------------------------------------
app.post('/api/ai/match', async (req: Request, res: Response) => {
  const { campaignId, creatorId } = req.body;
  if (!campaignId) {
    return res.status(400).json({ error: 'campaignId is required.' });
  }

  const campaign = db.getCampaignById(campaignId);
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found.' });
  }

  if (creatorId) {
    const creator = db.getCreatorById(creatorId);
    if (!creator) return res.status(404).json({ error: 'Creator not found.' });
    const match = await matchCreatorWithAI(campaign, creator);
    return res.json({ match, creator });
  }

  // Rank all creators for this campaign
  const allCreators = db.getAllCreators();
  const scoredCreators = await Promise.all(
    allCreators.map(async (c) => {
      // Deterministic baseline for speed across list
      const match = calculateDeterministicMatch(campaign, c);
      return { creator: c, match };
    })
  );

  scoredCreators.sort((a, b) => b.match.score - a.match.score);
  res.json(scoredCreators);
});

app.post('/api/ai/brief-assistant', async (req: Request, res: Response) => {
  const { roughIdea } = req.body;
  if (!roughIdea || typeof roughIdea !== 'string') {
    return res.status(400).json({ error: 'Please provide a rough idea prompt for the brief assistant.' });
  }

  const generatedBrief = await generateBriefWithAI(roughIdea);
  res.json(generatedBrief);
});

// -----------------------------------------------------------------------------
// Dashboard & Analytics
// -----------------------------------------------------------------------------
app.get('/api/analytics/dashboard', (req: Request, res: Response) => {
  const user = getCurrentUser(req);

  if (user.role === 'brand') {
    const brandCampaigns = db.getCampaigns().filter((c) => c.brandId === user.id);
    const brandProposals = db.getProposals().filter((p) => p.brandId === user.id);
    const saved = db.getSavedCreators(user.id);

    const totalSpent = brandProposals
      .filter((p) => p.status === 'accepted')
      .reduce((sum, p) => sum + p.price, 0);

    return res.json({
      role: 'brand',
      totalCampaigns: brandCampaigns.length,
      activeCampaigns: brandCampaigns.filter((c) => c.status === 'open' || c.status === 'in_progress').length,
      completedCampaigns: brandCampaigns.filter((c) => c.status === 'completed').length,
      totalProposalsReceived: brandProposals.length,
      savedCreatorsCount: saved.length,
      totalSpent
    });
  }

  if (user.role === 'creator') {
    const creatorProposals = db.getProposals(undefined, user.id);
    const profile = db.getCreatorProfileByUserId(user.id);
    const portfolio = db.getPortfolioProjects(user.id);
    const reviews = db.getReviews(user.id);

    const earnings = creatorProposals
      .filter((p) => p.status === 'accepted')
      .reduce((sum, p) => sum + p.price, 0);

    return res.json({
      role: 'creator',
      submittedProposals: creatorProposals.length,
      acceptedProposals: creatorProposals.filter((p) => p.status === 'accepted').length,
      pendingProposals: creatorProposals.filter((p) => p.status === 'pending' || p.status === 'in_review').length,
      portfolioProjectsCount: portfolio.length,
      totalReviews: reviews.length,
      averageRating: profile?.rating || 5.0,
      completionPercentage: profile?.completionPercentage || 85,
      estimatedEarnings: earnings
    });
  }

  // Admin stats fallback
  res.json(db.getAdminStats());
});

app.get('/api/admin/stats', (req: Request, res: Response) => {
  const stats = db.getAdminStats();
  res.json(stats);
});

// -----------------------------------------------------------------------------
// Dev & Production Frontend Serving
// -----------------------------------------------------------------------------
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CreatorConnect AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
