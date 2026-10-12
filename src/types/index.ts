export type UserRole = 'creator' | 'brand' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio: string;
  location: string;
  companyName?: string;
  createdAt: string;
}

export type SpecializationCategory =
  | 'AI Video & Commercials'
  | 'AI Image & Photography'
  | 'AI Influencers & Avatars'
  | 'AI Advertising Creatives'
  | 'AI Animation & Motion'
  | 'AI Voice & Audio'
  | 'AI Branding & Concept Art'
  | 'AI Storytelling & Narrative';

export type AvailabilityStatus = 'available' | 'busy' | 'booked';

export interface CreatorProfileDetails {
  userId: string;
  title: string;
  specialization: SpecializationCategory;
  secondarySpecializations: SpecializationCategory[];
  skills: string[];
  aiTools: string[];
  hourlyRate: number;
  projectStartingRate: number;
  availability: AvailabilityStatus;
  experienceYears: number;
  completedCampaigns: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  languages: string[];
  socialLinks: {
    x?: string;
    instagram?: string;
    youtube?: string;
    artstation?: string;
    website?: string;
  };
  completionPercentage: number;
}

export interface CreatorWithProfile {
  user: UserProfile;
  profile: CreatorProfileDetails;
  portfolio: PortfolioProject[];
}

export interface PortfolioProject {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  category: SpecializationCategory;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  thumbnailUrl?: string;
  toolsUsed: string[];
  deliverables: string[];
  clientRole: string;
  featured: boolean;
  promptSnippet?: string;
  likes: number;
  createdAt: string;
}

export type CampaignStatus = 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'expert' | 'any';

export interface Campaign {
  id: string;
  brandId: string;
  brandName: string;
  brandAvatar: string;
  title: string;
  description: string;
  category: SpecializationCategory;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  status: CampaignStatus;
  deliverables: string[];
  requiredTools: string[];
  requiredSkills: string[];
  experienceLevel: ExperienceLevel;
  targetAudience: string;
  referenceImages?: string[];
  proposalsCount: number;
  createdAt: string;
}

export type ProposalStatus = 'pending' | 'in_review' | 'accepted' | 'declined';

export interface CampaignProposal {
  id: string;
  campaignId: string;
  campaignTitle: string;
  brandId: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorSpecialization: string;
  pitch: string;
  price: number;
  timelineDays: number;
  status: ProposalStatus;
  createdAt: string;
}

export interface SavedCreator {
  id: string;
  brandId: string;
  creatorId: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participantNames: Record<string, string>;
  participantAvatars: Record<string, string>;
  campaignId?: string;
  campaignTitle?: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: Record<string, number>;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export interface Review {
  id: string;
  campaignId: string;
  campaignTitle: string;
  creatorId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  reviewerRole: string;
  rating: number; // 1-5
  feedback: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  recipientId: string;
  type: 'proposal_received' | 'proposal_accepted' | 'proposal_declined' | 'new_message' | 'campaign_invite' | 'review_received';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface AIMatchScore {
  creatorId: string;
  score: number; // 0 - 100
  reasons: string[];
  breakdown: {
    categoryMatch: number; // 0-100
    skillsAndToolsMatch: number; // 0-100
    budgetCompatibility: number; // 0-100
    ratingAndExperience: number; // 0-100
    availability: number; // 0-100
  };
  summary: string;
  aiSuggestedAngle?: string;
  relevantPortfolioIds: string[];
}

export interface AIBriefGenerationResult {
  title: string;
  category: SpecializationCategory;
  objective: string;
  targetAudience: string;
  suggestedFormats: string[];
  deliverables: string[];
  skillsRequired: string[];
  suggestedTools: string[];
  budgetRange: { min: number; max: number };
  suggestedTimelineDays: number;
  promptGuidance: string;
}
