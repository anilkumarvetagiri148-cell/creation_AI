import fs from 'fs';
import path from 'path';
import {
  UserProfile,
  CreatorProfileDetails,
  PortfolioProject,
  Campaign,
  CampaignProposal,
  SavedCreator,
  Conversation,
  Message,
  Review,
  NotificationItem,
  CreatorWithProfile
} from '../src/types/index.js';
import { generateAllCreatorsSeed } from './seedCreators.js';

interface DatabaseSchema {
  profiles: UserProfile[];
  creatorProfiles: CreatorProfileDetails[];
  portfolioProjects: PortfolioProject[];
  campaigns: Campaign[];
  proposals: CampaignProposal[];
  savedCreators: SavedCreator[];
  conversations: Conversation[];
  messages: Message[];
  reviews: Review[];
  notifications: NotificationItem[];
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Realistic high-quality seed data
const initialData: DatabaseSchema = {
  profiles: [
    {
      id: 'creator-1',
      name: 'Elena Rostova',
      email: 'elena.rostova@creatorconnect.ai',
      role: 'creator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Award-winning AI Cinematographer & Creative Director. Specializing in high-end commercial video synthesis, photorealistic motion branding, and generative visual effects.',
      location: 'Berlin, Germany',
      createdAt: '2026-01-15T10:00:00Z'
    },
    {
      id: 'creator-2',
      name: 'Kai Takahashi',
      email: 'kai.takahashi@creatorconnect.ai',
      role: 'creator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Pioneering generative 3D & photorealistic product rendering. 6+ years in luxury cosmetics, automotive, and tech hardware visual campaigns.',
      location: 'Tokyo, Japan',
      createdAt: '2026-01-20T12:00:00Z'
    },
    {
      id: 'creator-3',
      name: 'Sienna Marlowe',
      email: 'sienna.marlowe@creatorconnect.ai',
      role: 'creator',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      bio: 'Hyper-realistic AI fashion influencer architect & editorial concept artist. Creating viral digital models and next-gen retail lookbooks.',
      location: 'London, UK',
      createdAt: '2026-02-01T08:30:00Z'
    },
    {
      id: 'creator-4',
      name: 'Marcus Vance',
      email: 'marcus.vance@creatorconnect.ai',
      role: 'creator',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: 'ComfyUI master & procedural AI animator. Crafting seamless loops, music video visualizers, and kinetic brand identities with custom LoRA pipelines.',
      location: 'Austin, TX, USA',
      createdAt: '2026-02-10T14:15:00Z'
    },
    {
      id: 'creator-5',
      name: 'Amara Chen',
      email: 'amara.chen@creatorconnect.ai',
      role: 'creator',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Multi-lingual voice synthesizer, sonic brand architect, and generative audio designer. ElevenLabs pioneer for narrative podcasts & AAA game trailers.',
      location: 'Singapore',
      createdAt: '2026-02-18T09:40:00Z'
    },
    {
      id: 'creator-6',
      name: 'Julian Sterling',
      email: 'julian.sterling@creatorconnect.ai',
      role: 'creator',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      bio: 'Cinematic worldbuilder & sci-fi brand storyteller. Transforming abstract product architectures into immersive sci-fi narratives and key visual sets.',
      location: 'Toronto, Canada',
      createdAt: '2026-03-01T11:20:00Z'
    },
    {
      id: 'brand-1',
      name: 'Aura Skincare Labs',
      email: 'marketing@auraskincare.io',
      role: 'brand',
      avatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
      bio: 'Next-generation bio-fermented skincare brand preparing global launch in 14 countries.',
      location: 'Stockholm, Sweden',
      companyName: 'Aura Skincare Labs AB',
      createdAt: '2026-01-05T09:00:00Z'
    },
    {
      id: 'brand-2',
      name: 'Veloce Neo-Streetwear',
      email: 'creative@velocestreet.com',
      role: 'brand',
      avatar: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80',
      bio: 'High-performance cyberpunk streetwear brand blending augmented reality drops and physical garments.',
      location: 'Milan, Italy',
      companyName: 'Veloce Apparel Ltd',
      createdAt: '2026-01-12T16:00:00Z'
    },
    {
      id: 'admin-1',
      name: 'Admin Moderator',
      email: 'admin@creatorconnect.ai',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      bio: 'Platform trust, safety, and creator verification manager.',
      location: 'San Francisco, CA',
      createdAt: '2026-01-01T00:00:00Z'
    }
  ],
  creatorProfiles: [
    {
      userId: 'creator-1',
      title: 'Senior AI Cinematographer & Runway Specialist',
      industry: 'Fashion & Beauty',
      specialization: 'AI Video & Commercials',
      secondarySpecializations: ['AI Advertising Creatives', 'AI Storytelling & Narrative'],
      skills: ['Runway Gen-3', 'Kling AI 1.5', 'Luma Dream Machine', 'After Effects', 'Midjourney v6.1', 'Prompt Engineering'],
      aiTools: ['Runway Gen-3', 'Kling AI', 'Midjourney', 'Topaz Video AI', 'ElevenLabs'],
      hourlyRate: 4500,
      projectStartingRate: 35000,
      currency: 'INR',
      experienceLevel: 'Expert',
      contentFormat: 'Video & Motion',
      availability: 'available',
      experienceYears: 4,
      completedCampaigns: 29,
      rating: 4.95,
      reviewCount: 24,
      featured: true,
      languages: ['English', 'German'],
      socialLinks: { x: 'https://x.com/elenarostova', website: 'https://elenarostova.art' },
      completionPercentage: 98
    },
    {
      userId: 'creator-2',
      title: 'Lead Photorealistic AI Product Visualizer',
      industry: 'E-commerce & Product Advertising',
      specialization: 'AI Image & Photography',
      secondarySpecializations: ['AI Advertising Creatives', 'AI Branding & Concept Art'],
      skills: ['FLUX.1 Pro', 'Midjourney v6.1', 'ComfyUI ControlNet', 'Photoshop GenFill', 'Blender Hybrid'],
      aiTools: ['FLUX.1', 'Midjourney', 'ComfyUI', 'Magnific AI', 'Photoshop'],
      hourlyRate: 3800,
      projectStartingRate: 28000,
      currency: 'INR',
      experienceLevel: 'Expert',
      contentFormat: 'Stills & Photography',
      availability: 'available',
      experienceYears: 5,
      completedCampaigns: 34,
      rating: 4.98,
      reviewCount: 31,
      featured: true,
      languages: ['English', 'Japanese'],
      socialLinks: { x: 'https://x.com/kaitakahashi', website: 'https://kaitakahashi.design' },
      completionPercentage: 100
    },
    {
      userId: 'creator-3',
      title: 'AI Fashion Director & Virtual Avatar Creator',
      industry: 'Social Media Influencers',
      specialization: 'AI Influencers & Avatars',
      secondarySpecializations: ['AI Image & Photography', 'AI Advertising Creatives'],
      skills: ['Midjourney v6.1', 'Stable Diffusion XL', 'Character Consistency', 'Virtual Try-On', 'CLO3D'],
      aiTools: ['Midjourney', 'SDXL', 'FaceID LoRA', 'Runway Gen-3'],
      hourlyRate: 3600,
      projectStartingRate: 30000,
      currency: 'INR',
      experienceLevel: 'Intermediate',
      contentFormat: 'Video & Motion',
      availability: 'available',
      experienceYears: 3,
      completedCampaigns: 19,
      rating: 4.91,
      reviewCount: 16,
      featured: true,
      languages: ['English', 'French'],
      socialLinks: { instagram: 'https://instagram.com/siennamarlowe_ai' },
      completionPercentage: 94
    },
    {
      userId: 'creator-4',
      title: 'Procedural ComfyUI Animator & Motion Designer',
      industry: 'Animation & Motion Graphics',
      specialization: 'AI Animation & Motion',
      secondarySpecializations: ['AI Video & Commercials', 'AI Storytelling & Narrative'],
      skills: ['ComfyUI Custom Nodes', 'AnimateDiff', 'Stable Video Diffusion', 'TouchDesigner', 'LoRA Training'],
      aiTools: ['ComfyUI', 'AnimateDiff', 'SVD', 'Kling AI', 'Premiere Pro'],
      hourlyRate: 4000,
      projectStartingRate: 32000,
      currency: 'INR',
      experienceLevel: 'Expert',
      contentFormat: 'Video & Motion',
      availability: 'busy',
      experienceYears: 4,
      completedCampaigns: 22,
      rating: 4.88,
      reviewCount: 18,
      featured: false,
      languages: ['English'],
      socialLinks: { x: 'https://x.com/marcusvance_ai' },
      completionPercentage: 90
    },
    {
      userId: 'creator-5',
      title: 'AI Voice Actor & Soundscape Designer',
      industry: 'Music & Audio',
      specialization: 'AI Voice & Audio',
      secondarySpecializations: ['AI Advertising Creatives', 'AI Storytelling & Narrative'],
      skills: ['ElevenLabs Voice Synthesis', 'Suno AI', 'Udio Music Gen', 'Reaper DAW', 'Binaural Audio'],
      aiTools: ['ElevenLabs', 'Suno v3.5', 'Udio', 'Audition', 'Izotope RX'],
      hourlyRate: 3000,
      projectStartingRate: 24000,
      currency: 'INR',
      experienceLevel: 'Intermediate',
      contentFormat: 'Audio & Voice',
      availability: 'available',
      experienceYears: 3,
      completedCampaigns: 15,
      rating: 4.92,
      reviewCount: 13,
      featured: false,
      languages: ['English', 'Mandarin'],
      socialLinks: { website: 'https://amarachen.audio' },
      completionPercentage: 92
    },
    {
      userId: 'creator-6',
      title: 'Sci-Fi Worldbuilder & Narrative Concept Artist',
      industry: 'Technology & AI',
      specialization: 'AI Branding & Concept Art',
      secondarySpecializations: ['AI Storytelling & Narrative', 'AI Image & Photography'],
      skills: ['Midjourney v6.1', 'FLUX.1 Dev', 'Key Visuals', 'World Architecture', 'Moodboards'],
      aiTools: ['Midjourney', 'FLUX.1', 'Photoshop', 'Krea AI'],
      hourlyRate: 4200,
      projectStartingRate: 34000,
      currency: 'INR',
      experienceLevel: 'Intermediate',
      contentFormat: '3D & Virtual',
      availability: 'available',
      experienceYears: 3,
      completedCampaigns: 17,
      rating: 4.89,
      reviewCount: 14,
      featured: false,
      languages: ['English'],
      socialLinks: { artstation: 'https://artstation.com/juliansterling' },
      completionPercentage: 88
    }
  ],
  portfolioProjects: [
    {
      id: 'proj-1',
      creatorId: 'creator-1',
      title: 'Lumina Electric Hypercar: 4K Cinematic Reveal',
      description: 'End-to-end AI generated 45-second launch commercial using Runway Gen-3 and Kling AI, with photorealistic physics and studio reflection maps.',
      category: 'AI Video & Commercials',
      mediaUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'image',
      toolsUsed: ['Runway Gen-3', 'Kling AI', 'Topaz Video AI'],
      deliverables: ['45s 4K Commercial', '3x 15s Vertical Cutdowns', 'Keyframe Still Assets'],
      clientRole: 'Solo AI Director',
      featured: true,
      promptSnippet: 'Cinematic tracking shot, ultra-realistic midnight reflections, carbon fiber curves, anamorphic lens flare --ar 16:9',
      likes: 342,
      createdAt: '2026-02-14T11:00:00Z'
    },
    {
      id: 'proj-2',
      creatorId: 'creator-1',
      title: 'Komorebi Luxury Fragrance: Atmospheric Sequence',
      description: 'Dreamlike macro mist particles, botanical crystal formations, and delicate slow-motion fluid dynamics for high-perfumery campaign.',
      category: 'AI Video & Commercials',
      mediaUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'image',
      toolsUsed: ['Runway Gen-3', 'Midjourney v6.1', 'Topaz Video AI'],
      deliverables: ['30s Main Film', 'Social cutdowns'],
      clientRole: 'Creative Director',
      featured: false,
      likes: 215,
      createdAt: '2026-02-28T14:30:00Z'
    },
    {
      id: 'proj-3',
      creatorId: 'creator-2',
      title: 'Aethel Bio-Serum: Macro Studio Product Photography',
      description: 'Zero physical photoshoot required: 100% FLUX.1 + ComfyUI generated hyper-detailed cosmetic bottle packaging with dynamic water splash caustics.',
      category: 'AI Image & Photography',
      mediaUrl: 'https://images.unsplash.com/photo-1608248597359-561db4057885?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'image',
      toolsUsed: ['FLUX.1 Pro', 'ComfyUI ControlNet', 'Photoshop'],
      deliverables: ['12x High-res Studio Stills (8K)', 'Transparent Background Cutouts'],
      clientRole: 'Lead Visualizer',
      featured: true,
      promptSnippet: 'Macro cosmetic glass bottle on wet volcanic stone, natural dew droplets, soft warm rim lighting, Hasselblad 100mm f/2.8',
      likes: 489,
      createdAt: '2026-03-02T16:00:00Z'
    },
    {
      id: 'proj-4',
      creatorId: 'creator-2',
      title: 'Chronos Quantum Watch: Titanium Macro Suite',
      description: 'Precision mechanical watch render showing tourbillon movement and sapphire crystal reflection with micro-scratches for tactile authenticity.',
      category: 'AI Image & Photography',
      mediaUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'image',
      toolsUsed: ['FLUX.1', 'Midjourney v6.1', 'Magnific AI'],
      deliverables: ['8x Product Hero Renders', 'Exploded View Schematic'],
      clientRole: 'Product Visualizer',
      featured: false,
      likes: 310,
      createdAt: '2026-03-10T10:00:00Z'
    },
    {
      id: 'proj-5',
      creatorId: 'creator-3',
      title: 'Mira Vane: Spring 2026 Virtual Runway Lookbook',
      description: 'Consistent AI digital influencer Mira featured in 20 high-fashion street couture outfits across Milan, Seoul, and Tokyo backdrops.',
      category: 'AI Influencers & Avatars',
      mediaUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'image',
      toolsUsed: ['Midjourney v6.1', 'FaceID LoRA', 'SDXL'],
      deliverables: ['20x High-Fashion Stills', 'Social media engagement package'],
      clientRole: 'Avatar Creator & Stylist',
      featured: true,
      promptSnippet: 'High-fashion model in metallic oversized trenchcoat, architectural Tokyo crossing at dusk, editorial lighting --v 6.1',
      likes: 560,
      createdAt: '2026-03-12T13:20:00Z'
    },
    {
      id: 'proj-6',
      creatorId: 'creator-4',
      title: 'Synesthesia: Procedural Liquid Motion Beats',
      description: 'Reactive generative audio-visual motion piece built entirely in ComfyUI with AnimateDiff and custom latency-smoothing nodes.',
      category: 'AI Animation & Motion',
      mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'image',
      toolsUsed: ['ComfyUI', 'AnimateDiff', 'TouchDesigner'],
      deliverables: ['Seamless 60s 60fps Loop', 'Concert Visual Package'],
      clientRole: 'Motion Designer',
      featured: true,
      likes: 278,
      createdAt: '2026-03-15T09:00:00Z'
    }
  ],
  campaigns: [
    {
      id: 'camp-1',
      brandId: 'brand-1',
      brandName: 'Aura Skincare Labs',
      brandAvatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
      title: 'Global Launch: Bio-Fermented Serum AI Video Campaign',
      description: 'We need a premier AI cinematographer to direct and render a 30-second commercial and 3 social variations showing cellular bio-fermentation transforming tired skin into radiant glow. Requires realistic fluid physics, cellular simulation aesthetics, and premium luxury color grading.',
      category: 'AI Video & Commercials',
      budgetMin: 2500,
      budgetMax: 5000,
      deadline: '2026-11-15',
      status: 'open',
      deliverables: ['1x 30s Master 4K Video', '3x 15s 9:16 Social Cutdowns', '5x High-res Still Extracts'],
      requiredTools: ['Runway Gen-3', 'Midjourney', 'Topaz Video AI'],
      requiredSkills: ['Photorealistic Fluid Dynamics', 'Luxury Color Grading', 'Cellular Simulation Visuals'],
      experienceLevel: 'expert',
      targetAudience: 'Women & Men aged 24-42 passionate about biotech skincare and clean beauty',
      referenceImages: ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'],
      proposalsCount: 2,
      createdAt: '2026-03-20T10:00:00Z'
    },
    {
      id: 'camp-2',
      brandId: 'brand-2',
      brandName: 'Veloce Neo-Streetwear',
      brandAvatar: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80',
      title: 'Cyberpunk Fall Capsule: 15 Lookbook Stills with Virtual Model',
      description: 'Seeking an expert AI influencer stylist to generate a 15-look autumn lookbook featuring an edgy digital model in rainy Tokyo street settings, styled with our technical jackets and LED footwear.',
      category: 'AI Influencers & Avatars',
      budgetMin: 1200,
      budgetMax: 2200,
      deadline: '2026-11-05',
      status: 'open',
      deliverables: ['15x Ultra-res Fashion Stills', 'Color-matched Instagram Grid Carousel'],
      requiredTools: ['Midjourney v6.1', 'FaceID LoRA', 'Photoshop'],
      requiredSkills: ['Consistent Character Rendering', 'Fabric Texture Realism', 'Urban Lighting'],
      experienceLevel: 'intermediate',
      targetAudience: 'Gen-Z and millennial fashion enthusiasts and streetwear collectors',
      proposalsCount: 1,
      createdAt: '2026-03-22T14:00:00Z'
    },
    {
      id: 'camp-3',
      brandId: 'brand-1',
      brandName: 'Aura Skincare Labs',
      brandAvatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
      title: 'Summer Hydration Mist: Product Photography Suite',
      description: 'A completed campaign for our limited edition summer mist render suite.',
      category: 'AI Image & Photography',
      budgetMin: 1500,
      budgetMax: 2000,
      deadline: '2026-03-01',
      status: 'completed',
      deliverables: ['10x Studio Renders'],
      requiredTools: ['FLUX.1', 'ComfyUI'],
      requiredSkills: ['Water splash physics', 'Glass transparency'],
      experienceLevel: 'intermediate',
      targetAudience: 'Skincare consumers',
      proposalsCount: 3,
      createdAt: '2026-02-01T10:00:00Z'
    }
  ],
  proposals: [
    {
      id: 'prop-1',
      campaignId: 'camp-1',
      campaignTitle: 'Global Launch: Bio-Fermented Serum AI Video Campaign',
      brandId: 'brand-1',
      creatorId: 'creator-1',
      creatorName: 'Elena Rostova',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      creatorSpecialization: 'AI Video & Commercials',
      pitch: 'I have directed multiple luxury cosmetic AI spots with Runway Gen-3 and Topaz. I can craft custom fluid fermentation sequences with crystal clarity and deliver the 30s master plus 3 vertical cuts within 12 days.',
      price: 3600,
      timelineDays: 12,
      status: 'in_review',
      createdAt: '2026-03-21T11:00:00Z'
    },
    {
      id: 'prop-2',
      campaignId: 'camp-1',
      campaignTitle: 'Global Launch: Bio-Fermented Serum AI Video Campaign',
      brandId: 'brand-1',
      creatorId: 'creator-4',
      creatorName: 'Marcus Vance',
      creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      creatorSpecialization: 'AI Animation & Motion',
      pitch: 'Using ComfyUI AnimateDiff workflows with custom LoRA nodes trained on bio-luminescence, I can create breathtaking generative micro-cellular motion.',
      price: 2900,
      timelineDays: 10,
      status: 'pending',
      createdAt: '2026-03-22T08:00:00Z'
    },
    {
      id: 'prop-3',
      campaignId: 'camp-2',
      campaignTitle: 'Cyberpunk Fall Capsule: 15 Lookbook Stills with Virtual Model',
      brandId: 'brand-2',
      creatorId: 'creator-3',
      creatorName: 'Sienna Marlowe',
      creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      creatorSpecialization: 'AI Influencers & Avatars',
      pitch: 'Virtual fashion and avatar consistency is my core craft. I have a custom workflow that preserves clothing logos, seam patterns, and lighting continuity across all 15 poses in neon Tokyo aesthetics.',
      price: 1800,
      timelineDays: 7,
      status: 'pending',
      createdAt: '2026-03-23T15:00:00Z'
    },
    {
      id: 'prop-4',
      campaignId: 'camp-3',
      campaignTitle: 'Summer Hydration Mist: Product Photography Suite',
      brandId: 'brand-1',
      creatorId: 'creator-2',
      creatorName: 'Kai Takahashi',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      creatorSpecialization: 'AI Image & Photography',
      pitch: 'High-speed water refraction renders using FLUX.1 and ComfyUI depth conditioning.',
      price: 1600,
      timelineDays: 5,
      status: 'accepted',
      createdAt: '2026-02-05T12:00:00Z'
    }
  ],
  savedCreators: [
    {
      id: 'saved-1',
      brandId: 'brand-1',
      creatorId: 'creator-1',
      createdAt: '2026-03-20T12:00:00Z'
    },
    {
      id: 'saved-2',
      brandId: 'brand-1',
      creatorId: 'creator-2',
      createdAt: '2026-03-20T12:05:00Z'
    }
  ],
  conversations: [
    {
      id: 'conv-1',
      participantIds: ['brand-1', 'creator-1'],
      participantNames: {
        'brand-1': 'Aura Skincare Labs',
        'creator-1': 'Elena Rostova'
      },
      participantAvatars: {
        'brand-1': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
        'creator-1': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      },
      campaignId: 'camp-1',
      campaignTitle: 'Global Launch: Bio-Fermented Serum AI Video Campaign',
      lastMessage: 'Your initial style frames look fantastic Elena! Can we add a soft golden hour glow to the cellular phase?',
      lastMessageTimestamp: '2026-03-24T14:22:00Z',
      unreadCount: {
        'creator-1': 1,
        'brand-1': 0
      }
    }
  ],
  messages: [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      senderId: 'brand-1',
      senderName: 'Aura Skincare Labs',
      senderAvatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
      receiverId: 'creator-1',
      body: 'Hi Elena! We loved your Lumina Hypercar film. We would love to collaborate on our upcoming Bio-Fermented Serum campaign.',
      createdAt: '2026-03-24T11:00:00Z',
      read: true
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      senderId: 'creator-1',
      senderName: 'Elena Rostova',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      receiverId: 'brand-1',
      body: 'Hello Aura team! Thank you so much. Biotech cosmetics is an exciting visual genre for Runway Gen-3. I have submitted my formal proposal through the campaign page.',
      createdAt: '2026-03-24T12:15:00Z',
      read: true
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      senderId: 'brand-1',
      senderName: 'Aura Skincare Labs',
      senderAvatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
      receiverId: 'creator-1',
      body: 'Your initial style frames look fantastic Elena! Can we add a soft golden hour glow to the cellular phase?',
      createdAt: '2026-03-24T14:22:00Z',
      read: false
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      campaignId: 'camp-3',
      campaignTitle: 'Summer Hydration Mist: Product Photography Suite',
      creatorId: 'creator-2',
      reviewerId: 'brand-1',
      reviewerName: 'Aura Skincare Labs',
      reviewerAvatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
      reviewerRole: 'Brand Director',
      rating: 5,
      feedback: 'Kai delivered breathtaking studio renders that completely superseded our physical photographer tests. Saved us $15k in studio rental and 3 weeks of production time. Flawless execution with FLUX.1!',
      createdAt: '2026-02-15T16:00:00Z'
    }
  ],
  notifications: [
    {
      id: 'notif-1',
      recipientId: 'creator-1',
      type: 'proposal_received',
      title: 'Proposal Under Review',
      message: 'Aura Skincare Labs moved your proposal for "Bio-Fermented Serum AI Video Campaign" to In Review.',
      link: '/creator-dashboard',
      read: false,
      createdAt: '2026-03-22T10:00:00Z'
    },
    {
      id: 'notif-2',
      recipientId: 'brand-1',
      type: 'proposal_received',
      title: 'New Campaign Proposal',
      message: 'Marcus Vance submitted a proposal for "Global Launch: Bio-Fermented Serum AI Video Campaign".',
      link: '/brand-dashboard',
      read: false,
      createdAt: '2026-03-22T08:00:00Z'
    }
  ]
};

// Database class managing state and storage
class DatabaseManager {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDir();
    this.data = this.loadData();
  }

  private ensureDir() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    let currentStore: DatabaseSchema = JSON.parse(JSON.stringify(initialData));
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        currentStore = JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Error reading db.json, initializing fresh store:', err);
    }

    // If creators count is below 138, enrich with full diverse categorized creators
    if (!currentStore.creatorProfiles || currentStore.creatorProfiles.length < 138) {
      const seed = generateAllCreatorsSeed();
      // Keep existing non-duplicate profiles
      const existingProfileIds = new Set(currentStore.profiles.map((p) => p.id));
      for (const sp of seed.profiles) {
        if (!existingProfileIds.has(sp.id)) {
          currentStore.profiles.push(sp);
        }
      }

      const existingCreatorIds = new Set(currentStore.creatorProfiles.map((cp) => cp.userId));
      for (const scp of seed.creatorProfiles) {
        if (!existingCreatorIds.has(scp.userId)) {
          currentStore.creatorProfiles.push(scp);
        }
      }

      const existingProjectIds = new Set(currentStore.portfolioProjects.map((pj) => pj.id));
      for (const spj of seed.portfolioProjects) {
        if (!existingProjectIds.has(spj.id)) {
          currentStore.portfolioProjects.push(spj);
        }
      }

      this.saveData(currentStore);
    }

    return currentStore;
  }

  private saveData(data: DatabaseSchema) {
    try {
      this.ensureDir();
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving db.json:', err);
    }
  }

  public getRawData(): DatabaseSchema {
    return this.data;
  }

  // --- Profiles & Creators ---
  public getProfiles(): UserProfile[] {
    return this.data.profiles;
  }

  public getProfileById(id: string): UserProfile | undefined {
    return this.data.profiles.find((p) => p.id === id);
  }

  public getProfileByEmail(email: string): UserProfile | undefined {
    return this.data.profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
  }

  public createProfile(profile: UserProfile): UserProfile {
    this.data.profiles.push(profile);
    this.saveData(this.data);
    return profile;
  }

  public updateProfile(id: string, updates: Partial<UserProfile>): UserProfile | null {
    const idx = this.data.profiles.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.data.profiles[idx] = { ...this.data.profiles[idx], ...updates };
    this.saveData(this.data);
    return this.data.profiles[idx];
  }

  public getCreatorProfiles(): CreatorProfileDetails[] {
    return this.data.creatorProfiles;
  }

  public getCreatorProfileByUserId(userId: string): CreatorProfileDetails | undefined {
    return this.data.creatorProfiles.find((cp) => cp.userId === userId);
  }

  public updateCreatorProfile(userId: string, updates: Partial<CreatorProfileDetails>): CreatorProfileDetails | null {
    const idx = this.data.creatorProfiles.findIndex((cp) => cp.userId === userId);
    if (idx === -1) {
      // create if not existing
      const newCP: CreatorProfileDetails = {
        userId,
        title: updates.title || 'AI Creator',
        specialization: updates.specialization || 'AI Video & Commercials',
        secondarySpecializations: updates.secondarySpecializations || [],
        skills: updates.skills || [],
        aiTools: updates.aiTools || [],
        hourlyRate: updates.hourlyRate || 80,
        projectStartingRate: updates.projectStartingRate || 800,
        availability: updates.availability || 'available',
        experienceYears: updates.experienceYears || 2,
        completedCampaigns: 0,
        rating: 5.0,
        reviewCount: 0,
        featured: false,
        languages: updates.languages || ['English'],
        socialLinks: updates.socialLinks || {},
        completionPercentage: 80
      };
      this.data.creatorProfiles.push(newCP);
      this.saveData(this.data);
      return newCP;
    }
    this.data.creatorProfiles[idx] = { ...this.data.creatorProfiles[idx], ...updates };
    this.saveData(this.data);
    return this.data.creatorProfiles[idx];
  }

  public getAllCreators(): CreatorWithProfile[] {
    const creators: CreatorWithProfile[] = [];
    const creatorUsers = this.data.profiles.filter((p) => p.role === 'creator');
    for (const u of creatorUsers) {
      const profile = this.getCreatorProfileByUserId(u.id);
      if (profile) {
        const portfolio = this.data.portfolioProjects.filter((pj) => pj.creatorId === u.id);
        creators.push({ user: u, profile, portfolio });
      }
    }
    return creators;
  }

  public getCreatorById(id: string): CreatorWithProfile | null {
    const u = this.data.profiles.find((p) => p.id === id && p.role === 'creator');
    if (!u) return null;
    const profile = this.getCreatorProfileByUserId(u.id);
    if (!profile) return null;
    const portfolio = this.data.portfolioProjects.filter((pj) => pj.creatorId === u.id);
    return { user: u, profile, portfolio };
  }

  // --- Portfolio Projects ---
  public getPortfolioProjects(creatorId?: string): PortfolioProject[] {
    if (creatorId) {
      return this.data.portfolioProjects.filter((p) => p.creatorId === creatorId);
    }
    return this.data.portfolioProjects;
  }

  public addPortfolioProject(project: PortfolioProject): PortfolioProject {
    this.data.portfolioProjects.unshift(project);
    this.saveData(this.data);
    return project;
  }

  public deletePortfolioProject(projectId: string, creatorId: string): boolean {
    const initialLen = this.data.portfolioProjects.length;
    this.data.portfolioProjects = this.data.portfolioProjects.filter(
      (p) => !(p.id === projectId && p.creatorId === creatorId)
    );
    if (this.data.portfolioProjects.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // --- Campaigns ---
  public getCampaigns(filters?: { status?: string; category?: string; search?: string }): Campaign[] {
    let results = [...this.data.campaigns];
    if (filters?.status && filters.status !== 'all') {
      results = results.filter((c) => c.status === filters.status);
    }
    if (filters?.category && filters.category !== 'all') {
      results = results.filter((c) => c.category === filters.category);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.requiredTools.some((t) => t.toLowerCase().includes(q))
      );
    }
    return results;
  }

  public getCampaignById(id: string): Campaign | undefined {
    return this.data.campaigns.find((c) => c.id === id);
  }

  public createCampaign(campaign: Campaign): Campaign {
    this.data.campaigns.unshift(campaign);
    this.saveData(this.data);
    return campaign;
  }

  public updateCampaign(id: string, updates: Partial<Campaign>): Campaign | null {
    const idx = this.data.campaigns.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.data.campaigns[idx] = { ...this.data.campaigns[idx], ...updates };
    this.saveData(this.data);
    return this.data.campaigns[idx];
  }

  // --- Proposals ---
  public getProposals(campaignId?: string, creatorId?: string): CampaignProposal[] {
    let list = this.data.proposals;
    if (campaignId) {
      list = list.filter((p) => p.campaignId === campaignId);
    }
    if (creatorId) {
      list = list.filter((p) => p.creatorId === creatorId);
    }
    return list;
  }

  public createProposal(proposal: CampaignProposal): CampaignProposal {
    // Check duplicate
    const exists = this.data.proposals.some(
      (p) => p.campaignId === proposal.campaignId && p.creatorId === proposal.creatorId
    );
    if (exists) {
      throw new Error('A proposal for this campaign has already been submitted by this creator.');
    }
    this.data.proposals.unshift(proposal);
    // increment proposals count on campaign
    const camp = this.data.campaigns.find((c) => c.id === proposal.campaignId);
    if (camp) {
      camp.proposalsCount = (camp.proposalsCount || 0) + 1;
    }
    this.saveData(this.data);
    return proposal;
  }

  public updateProposalStatus(proposalId: string, status: CampaignProposal['status']): CampaignProposal | null {
    const prop = this.data.proposals.find((p) => p.id === proposalId);
    if (!prop) return null;
    prop.status = status;
    if (status === 'accepted') {
      const camp = this.data.campaigns.find((c) => c.id === prop.campaignId);
      if (camp) camp.status = 'in_progress';
    }
    this.saveData(this.data);
    return prop;
  }

  // --- Saved Creators ---
  public getSavedCreators(brandId: string): SavedCreator[] {
    return this.data.savedCreators.filter((s) => s.brandId === brandId);
  }

  public toggleSaveCreator(brandId: string, creatorId: string): { saved: boolean } {
    const idx = this.data.savedCreators.findIndex((s) => s.brandId === brandId && s.creatorId === creatorId);
    if (idx !== -1) {
      this.data.savedCreators.splice(idx, 1);
      this.saveData(this.data);
      return { saved: false };
    } else {
      this.data.savedCreators.push({
        id: `saved-${Date.now()}`,
        brandId,
        creatorId,
        createdAt: new Date().toISOString()
      });
      this.saveData(this.data);
      return { saved: true };
    }
  }

  // --- Conversations & Messages ---
  public getConversations(userId: string): Conversation[] {
    return this.data.conversations
      .filter((c) => c.participantIds.includes(userId))
      .sort((a, b) => new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime());
  }

  public getMessages(conversationId: string): Message[] {
    return this.data.messages.filter((m) => m.conversationId === conversationId);
  }

  public sendMessage(message: Message): Message {
    this.data.messages.push(message);
    const conv = this.data.conversations.find((c) => c.id === message.conversationId);
    if (conv) {
      conv.lastMessage = message.body;
      conv.lastMessageTimestamp = message.createdAt;
      conv.unreadCount[message.receiverId] = (conv.unreadCount[message.receiverId] || 0) + 1;
    }
    this.saveData(this.data);
    return message;
  }

  public markMessagesRead(conversationId: string, userId: string): void {
    let changed = false;
    for (const m of this.data.messages) {
      if (m.conversationId === conversationId && m.receiverId === userId && !m.read) {
        m.read = true;
        changed = true;
      }
    }
    const conv = this.data.conversations.find((c) => c.id === conversationId);
    if (conv) {
      conv.unreadCount[userId] = 0;
      changed = true;
    }
    if (changed) this.saveData(this.data);
  }

  public findOrCreateConversation(userA: string, userB: string, campaignId?: string): Conversation {
    let conv = this.data.conversations.find(
      (c) => c.participantIds.includes(userA) && c.participantIds.includes(userB)
    );
    if (!conv) {
      const uA = this.getProfileById(userA);
      const uB = this.getProfileById(userB);
      const camp = campaignId ? this.getCampaignById(campaignId) : undefined;
      conv = {
        id: `conv-${Date.now()}`,
        participantIds: [userA, userB],
        participantNames: {
          [userA]: uA?.name || 'User',
          [userB]: uB?.name || 'User'
        },
        participantAvatars: {
          [userA]: uA?.avatar || '',
          [userB]: uB?.avatar || ''
        },
        campaignId,
        campaignTitle: camp?.title,
        lastMessage: 'Conversation started',
        lastMessageTimestamp: new Date().toISOString(),
        unreadCount: { [userA]: 0, [userB]: 0 }
      };
      this.data.conversations.unshift(conv);
      this.saveData(this.data);
    }
    return conv;
  }

  // --- Reviews ---
  public getReviews(creatorId?: string): Review[] {
    if (creatorId) {
      return this.data.reviews.filter((r) => r.creatorId === creatorId);
    }
    return this.data.reviews;
  }

  public addReview(review: Review): Review {
    // ensure unique campaign review
    const exists = this.data.reviews.some(
      (r) => r.campaignId === review.campaignId && r.creatorId === review.creatorId && r.reviewerId === review.reviewerId
    );
    if (exists) {
      throw new Error('A review for this campaign has already been submitted.');
    }
    this.data.reviews.unshift(review);

    // recalculate creator average rating and reviewCount
    const creatorReviews = this.data.reviews.filter((r) => r.creatorId === review.creatorId);
    const sum = creatorReviews.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = Number((sum / creatorReviews.length).toFixed(2));
    const cp = this.data.creatorProfiles.find((p) => p.userId === review.creatorId);
    if (cp) {
      cp.rating = avg;
      cp.reviewCount = creatorReviews.length;
    }

    this.saveData(this.data);
    return review;
  }

  // --- Notifications ---
  public getNotifications(userId: string): NotificationItem[] {
    return this.data.notifications.filter((n) => n.recipientId === userId);
  }

  public addNotification(notification: NotificationItem): NotificationItem {
    this.data.notifications.unshift(notification);
    this.saveData(this.data);
    return notification;
  }

  public markNotificationRead(id: string): void {
    const notif = this.data.notifications.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
      this.saveData(this.data);
    }
  }

  // --- Admin stats ---
  public getAdminStats() {
    return {
      totalUsers: this.data.profiles.length,
      creatorsCount: this.data.profiles.filter((p) => p.role === 'creator').length,
      brandsCount: this.data.profiles.filter((p) => p.role === 'brand').length,
      activeCampaigns: this.data.campaigns.filter((c) => c.status === 'open' || c.status === 'in_progress').length,
      completedCampaigns: this.data.campaigns.filter((c) => c.status === 'completed').length,
      totalProposals: this.data.proposals.length,
      totalProjects: this.data.portfolioProjects.length,
      totalReviews: this.data.reviews.length,
      platformVolumeEstimate: this.data.proposals
        .filter((p) => p.status === 'accepted')
        .reduce((sum, p) => sum + p.price, 0)
    };
  }
}

export const db = new DatabaseManager();
