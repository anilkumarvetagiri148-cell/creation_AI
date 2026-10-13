import { UserProfile, CreatorProfileDetails, PortfolioProject, IndustryCategory } from '../src/types/index.js';

interface CategoryCreatorSeed {
  name: string;
  title: string;
  bio: string;
  location: string;
  avatar: string;
  specialization: string;
  skills: string[];
  aiTools: string[];
  projectStartingRate: number; // in INR (₹)
  hourlyRate: number; // in INR (₹)
  experienceYears: number;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Expert';
  contentFormat: 'Video & Motion' | 'Stills & Photography' | 'Audio & Voice' | '3D & Virtual';
  availability: 'available' | 'busy' | 'booked';
  rating: number;
  reviewCount: number;
  projects: {
    title: string;
    description: string;
    mediaUrl: string;
    toolsUsed: string[];
    deliverables: string[];
    promptSnippet: string;
  }[];
}

interface CategoryGroup {
  category: IndustryCategory;
  creators: CategoryCreatorSeed[];
}

export const CATEGORY_DEFINITIONS: CategoryGroup[] = [
  // 1. Finance & Investing
  {
    category: 'Finance & Investing',
    creators: [
      {
        name: 'Aarav Singhania',
        title: 'Fintech Visualizer & Market Trends Animator',
        bio: 'Crafting high-impact financial education reels, trading psychology visualizers, and institutional crypto analytics graphics using Midjourney and Runway Gen-3.',
        location: 'Mumbai, India',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        specialization: 'Financial Data & Trading Visuals',
        skills: ['Trading Infographics', 'Crypto Motion Explanains', 'Keyframe FinTech Ads'],
        aiTools: ['Midjourney v6.1', 'Runway Gen-3', 'After Effects AI'],
        projectStartingRate: 25000,
        hourlyRate: 3500,
        experienceYears: 4,
        experienceLevel: 'Expert',
        contentFormat: 'Video & Motion',
        availability: 'available',
        rating: 4.96,
        reviewCount: 32,
        projects: [
          {
            title: 'Global Macro Market Pulse: Bull-Bear 3D Visualizer',
            description: 'AI-rendered bull vs bear kinetic motion scene symbolizing equity momentum and rate cuts.',
            mediaUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Runway Gen-3', 'Midjourney v6.1'],
            deliverables: ['1x 45s Reel', '5x Infographic Stills'],
            promptSnippet: 'Cinematic glass bull and bear battling on digital candlestick graph, raytracing reflections, 8K --ar 16:9'
          },
          {
            title: 'NeoBank Card Reveal & Vault Security Animation',
            description: 'Photorealistic metal titanium credit card floating into a digital holographic bank vault.',
            mediaUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['FLUX.1 Pro', 'Topaz Video'],
            deliverables: ['30s Commercial', 'High-res Product Stills'],
            promptSnippet: 'Minimalist matte black metal credit card hovering in illuminated cyber vault, caustics'
          },
          {
            title: 'Gold Reserve Hedging & Liquidity Infographic',
            description: 'Surrealist visual metaphor of sovereign gold reserves and digital currency pegging.',
            mediaUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['FLUX.1 Pro', 'Photoshop GenFill'],
            deliverables: ['8x Infographic Stills'],
            promptSnippet: 'Gleaming gold bullion bars stacked with illuminated digital grid lines reflecting market depth'
          }
        ]
      },
      {
        name: 'Rohan Deshmukh',
        title: 'Algorithmic Stock Infographics & DeFi Artist',
        bio: 'Specialist in simplifying complex mutual fund, SIP, and index fund concepts through visually engaging generative AI illustrations and carousel sets.',
        location: 'Bengaluru, India',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        specialization: 'Wealth Management Creative',
        skills: ['Portfolio Breakdown Graphics', 'SIP Growth Visuals', 'Fintech Branding'],
        aiTools: ['FLUX.1 Pro', 'ComfyUI', 'Claude 3.5 Sonnet'],
        projectStartingRate: 18000,
        hourlyRate: 2200,
        experienceYears: 3,
        experienceLevel: 'Intermediate',
        contentFormat: 'Stills & Photography',
        availability: 'available',
        rating: 4.91,
        reviewCount: 19,
        projects: [
          {
            title: 'Compound Interest Tree: 30-Year Wealth Projection',
            description: 'Surrealist botanical metaphor representing dividend compounding growing into a golden tree.',
            mediaUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['FLUX.1 Pro', 'ComfyUI'],
            deliverables: ['8x High-Res Infographics', 'Social Carousel Suite'],
            promptSnippet: 'Lush golden bonsai growing coins in glass jar, soft sunlight rays, studio Hasselblad quality'
          },
          {
            title: 'FinTech Mobile App Interface Staging',
            description: 'Photorealistic lifestyle scenes of modern users reviewing AI-powered stock analytics.',
            mediaUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Midjourney v6.1', 'Photoshop GenFill'],
            deliverables: ['12x Marketing Stills'],
            promptSnippet: 'Young professional analyzing stock portfolio on frameless glass device in high-rise office'
          },
          {
            title: 'Algorithmic High-Frequency Trading Corridor',
            description: 'Dynamic light trails representing ultra-low latency exchange data feeds.',
            mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Runway Gen-3', 'ComfyUI'],
            deliverables: ['1x 30s Loop', '4x Editorial Graphics'],
            promptSnippet: 'Abstract glowing data streams crisscrossing global exchange servers, volumetric neon glow'
          }
        ]
      },
      {
        name: 'Pooja Kashyap',
        title: 'Crypto & Blockchain 3D Motion Director',
        bio: 'Designing cutting-edge Web3 and decentralized finance motion graphics, tokenomics explainer animations, and virtual currency launch reels.',
        location: 'Pune, India',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        specialization: 'Web3 & Blockchain Motion',
        skills: ['Blockchain Visualizers', 'Tokenomics Reels', 'Cybersecurity Aesthetics'],
        aiTools: ['Runway Gen-3', 'Kling AI', 'Midjourney v6.1'],
        projectStartingRate: 32000,
        hourlyRate: 4000,
        experienceYears: 5,
        experienceLevel: 'Expert',
        contentFormat: 'Video & Motion',
        availability: 'busy',
        rating: 4.98,
        reviewCount: 27,
        projects: [
          {
            title: 'Zero-Knowledge Cryptographic Shield Campaign',
            description: 'Hyper-detailed quantum cryptography shields and encrypted data streams visualized for enterprise FinTech.',
            mediaUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Runway Gen-3', 'Midjourney v6.1'],
            deliverables: ['60s Master Commercial', '3x Shorts'],
            promptSnippet: 'Luminescent cryptographic encryption nodes pulsing through obsidian marble matrix'
          },
          {
            title: 'Cross-Border Instant Settlement Hologram',
            description: 'Holographic continents sending fiber-optic liquidity streams across oceans.',
            mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Runway Gen-3', 'Kling AI'],
            deliverables: ['30s Motion Reel'],
            promptSnippet: 'Planet earth with glowing neon trade corridors and liquidity nodes, 8K ultra realistic'
          },
          {
            title: 'Institutional Cold-Storage Hardware Key',
            description: 'Industrial design render of titanium biometric crypto vault key in dark studio lighting.',
            mediaUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['FLUX.1 Pro', 'Midjourney'],
            deliverables: ['6x Studio Renders'],
            promptSnippet: 'Titanium hardware wallet on dark slate surface, precision chamfered edges, studio rim light'
          }
        ]
      },
      {
        name: 'Devraj Kapoor',
        title: 'Personal Finance Storyteller & Video Synthesizer',
        bio: 'Producing relatable personal finance micro-dramas and financial literacy shorts with photorealistic digital avatars and high-conversion hooks.',
        location: 'Delhi NCR, India',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
        specialization: 'Financial Literacy Storytelling',
        skills: ['Script-to-Video AI', 'Avatar Financial Planners', 'Tax Saving Carousels'],
        aiTools: ['HeyGen', 'Midjourney', 'ElevenLabs'],
        projectStartingRate: 20000,
        hourlyRate: 2500,
        experienceYears: 3,
        experienceLevel: 'Intermediate',
        contentFormat: 'Video & Motion',
        availability: 'available',
        rating: 4.88,
        reviewCount: 14,
        projects: [
          {
            title: 'Retirement Blueprint: Life Stages Transformation',
            description: 'Chronological visual journey showing financial security progression from age 25 to 60.',
            mediaUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['HeyGen', 'Midjourney'],
            deliverables: ['3x 30s Explainer Videos', 'Prompt Script Package'],
            promptSnippet: 'Split screen progression of family financial stability, warm cinematic daylight'
          },
          {
            title: 'Emergency Fund Safety Cushion Visual Metaphor',
            description: 'Floating glass lifebuoy protecting family home from turbulent storm clouds.',
            mediaUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Midjourney v6.1', 'FLUX.1'],
            deliverables: ['5x Social Creatives'],
            promptSnippet: 'Serene warm house illuminated under crystal glass dome while rain falls outside, 4K'
          },
          {
            title: 'Tax Optimization Year-End Checklist',
            description: 'Clean Scandinavian desk with iPad showing tax deduction flowchart in daylight.',
            mediaUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['FLUX.1 Pro'],
            deliverables: ['Carousel Infographic Deck'],
            promptSnippet: 'Modern minimalist desk setup with financial ledger, fresh coffee and tablet showing clean graph'
          }
        ]
      },
      {
        name: 'Ananya Mehra',
        title: 'Venture Capital & Pitch Deck Visual Architect',
        bio: 'Transforming investor decks and financial models into stunning, cinematic visual reports that capture institutional LP capital.',
        location: 'Hyderabad, India',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        specialization: 'VC & Investor Relations Creative',
        skills: ['Pitch Deck Artwork', 'Financial Growth Metaphors', 'Institutional Branding'],
        aiTools: ['Midjourney v6.1', 'FLUX.1', 'Gamma AI'],
        projectStartingRate: 35000,
        hourlyRate: 4500,
        experienceYears: 4,
        experienceLevel: 'Expert',
        contentFormat: 'Stills & Photography',
        availability: 'available',
        rating: 4.95,
        reviewCount: 22,
        projects: [
          {
            title: 'Series B FinTech Pitch Deck Vision Suite',
            description: 'Custom generative assets representing unified payment rails across 40 countries.',
            mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['FLUX.1 Pro', 'Midjourney v6.1'],
            deliverables: ['20x Slide Key Visuals', '1x Teaser Video Loop'],
            promptSnippet: 'Luminescent interconnected continents with glowing gold financial transactions fiberoptics'
          },
          {
            title: 'Fintech Unicorn Valuation Milestone Trophy',
            description: 'Crystalline sculpture refracting financial analytics into spectrum light beams.',
            mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Midjourney v6.1'],
            deliverables: ['Keynote Hero Graphics'],
            promptSnippet: 'Geometric obsidian and glass trophy etched with financial curves, cinematic studio rim lighting'
          },
          {
            title: 'Cross-Border Remittance Speed Infographic',
            description: 'Fiber-optic pulse traversing metropolitan cityscape at supersonic speed.',
            mediaUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['FLUX.1 Pro'],
            deliverables: ['4x Marketing Banners'],
            promptSnippet: 'Neon financial pulse racing across nighttime skyscraper cityscape, long exposure light trails'
          }
        ]
      },
      {
        name: 'Kabir Vashist',
        title: 'Macro Economy & Global Markets Synthesizer',
        bio: 'Creating cinematic explainer documentaries examining interest rate cycles, inflation dynamics, and commodities trading.',
        location: 'Mumbai, India',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        specialization: 'Macroeconomic Documentary Production',
        skills: ['Central Bank Policy Explanations', 'Oil & Commodity Visuals', 'Data Storytelling'],
        aiTools: ['Runway Gen-3', 'ElevenLabs', 'Midjourney v6.1'],
        projectStartingRate: 28000,
        hourlyRate: 3400,
        experienceYears: 4,
        experienceLevel: 'Expert',
        contentFormat: 'Video & Motion',
        availability: 'available',
        rating: 4.93,
        reviewCount: 25,
        projects: [
          {
            title: 'The Great Inflation Cycle: 60-Second Short',
            description: 'Visual metaphor of currency purchasing power through 100 years of monetary history.',
            mediaUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Runway Gen-3', 'Midjourney v6.1'],
            deliverables: ['1x 60s Reel', 'Social Teasers'],
            promptSnippet: 'Vintage currency notes dissolving into digital glowing particles in hourglass'
          },
          {
            title: 'Global Energy Transition & Crude Oil Markets',
            description: 'Offshore oil platform meeting futuristic floating offshore wind farm in dawn horizon.',
            mediaUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Midjourney v6.1', 'Runway Gen-3'],
            deliverables: ['Commodities Report Visuals'],
            promptSnippet: 'Industrial oil rig transitioning into sparkling green hydrogen offshore turbines at dawn'
          },
          {
            title: 'Interest Rate Seesaw: Equities vs Bonds',
            description: 'Kinetic 3D balance scale in architectural marble hall measuring yield spreads.',
            mediaUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['FLUX.1 Pro'],
            deliverables: ['10x Explainer Graphics'],
            promptSnippet: 'Polished bronze balance scale weighing government treasury bond against equity certificate, raytracing'
          }
        ]
      }
    ]
  },

  // 2. Education & E-Learning
  {
    category: 'Education & E-Learning',
    creators: [
      {
        name: 'Dr. Siddharth Varma',
        title: 'STEM Micro-Learning & Science Animator',
        bio: 'Physicist turned AI creator. Producing 3D animated science lectures, atomic physics simulations, and medical biology micro-lessons.',
        location: 'Chennai, India',
        avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
        specialization: 'STEM & Science Explainer Videos',
        skills: ['3D Biological Animations', 'Physics Simulation', 'EdTech Curriculum Design'],
        aiTools: ['Runway Gen-3', 'ComfyUI', 'ElevenLabs', 'Midjourney'],
        projectStartingRate: 28000,
        hourlyRate: 3200,
        experienceYears: 5,
        experienceLevel: 'Expert',
        contentFormat: 'Video & Motion',
        availability: 'available',
        rating: 4.97,
        reviewCount: 38,
        projects: [
          {
            title: 'Journey Inside the Human Cell: Organelle 4K Tour',
            description: 'Cellular biology walkthrough illustrating ribosomes, mitochondria, and ATP synthesis.',
            mediaUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Runway Gen-3', 'Midjourney v6.1'],
            deliverables: ['1x 3-min Video', '10x Diagrammatic Posters'],
            promptSnippet: 'Photorealistic mitochondrial matrix generating glowing ATP molecules, bioluminescent micro-world'
          },
          {
            title: 'Quantum Entanglement & Superposition Stills',
            description: 'Concept art making abstract quantum mechanics intuitive for high school and university students.',
            mediaUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Midjourney v6.1'],
            deliverables: ['8x High-res Educational Charts'],
            promptSnippet: 'Two intertwined photon wavefunctions vibrating across spacetime, neon sapphire glow'
          },
          {
            title: 'DNA Double Helix CRISPR Gene-Editing Flythrough',
            description: 'Molecular Cas9 protein precision incision visualized at nanometer scale.',
            mediaUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Runway Gen-3', 'ComfyUI'],
            deliverables: ['45s 3D Simulation'],
            promptSnippet: 'Luminescent CRISPR protein complex binding to luminous blue DNA helix, volumetric scientific lighting'
          }
        ]
      },
      {
        name: 'Meera Nambiar',
        title: 'Language Learning & Virtual Avatar Educator',
        bio: 'Designing multilingual conversational avatars that teach English, German, French, and Japanese with natural lip-syncing and cultural roleplays.',
        location: 'Kochi, India',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        specialization: 'Conversational Avatars & Linguistics',
        skills: ['HeyGen Avatar Tuning', 'Phonetics Motion', 'Adaptive Courseware'],
        aiTools: ['HeyGen', 'ElevenLabs', 'Midjourney', 'ChatGPT-4o'],
        projectStartingRate: 22000,
        hourlyRate: 2800,
        experienceYears: 3,
        experienceLevel: 'Intermediate',
        contentFormat: 'Video & Motion',
        availability: 'available',
        rating: 4.93,
        reviewCount: 21,
        projects: [
          {
            title: 'Global Polyglot Avatar Suite: 5 Languages',
            description: 'Interactive multilingual language instructor presenting daily vocabulary with native accents.',
            mediaUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['HeyGen', 'ElevenLabs'],
            deliverables: ['15x Short Lessons', 'Vocabulary Flashcards'],
            promptSnippet: 'Friendly university tutor in modern glass sunlit library, natural expressions'
          },
          {
            title: 'Accent Coaching Vocal Waveforms Stills',
            description: 'Visual acoustic resonance guides showing tongue and palate placement for foreign sounds.',
            mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Midjourney v6.1'],
            deliverables: ['12x Pronunciation Charts'],
            promptSnippet: 'Holographic vocal frequency curves illuminated over transparent glass profile head'
          },
          {
            title: 'Cultural Immersion Micro-Scenarios: Tokyo Cafe',
            description: 'Photorealistic generative scenario for practicing ordering sushi and conversational etiquette.',
            mediaUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['HeyGen', 'Midjourney'],
            deliverables: ['Interactive Lesson Clip'],
            promptSnippet: 'Cozy wooden Tokyo cafe counter with gentle lanterns and friendly barista in warm natural light'
          }
        ]
      },
      {
        name: 'Arjun Dasgupta',
        title: 'Historical Re-enactment & Ancient Worldbuilder',
        bio: 'Bringing ancient civilizations, architectural wonders, and historical battles to life with generative AI cinematography for history documentaries.',
        location: 'Kolkata, India',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        specialization: 'History Documentaries & Worldbuilding',
        skills: ['Historical Accuracy Prompts', 'Ancient Architecture', 'Cinematic Documentaries'],
        aiTools: ['Midjourney v6.1', 'Kling AI', 'Topaz Video'],
        projectStartingRate: 30000,
        hourlyRate: 3600,
        experienceYears: 4,
        experienceLevel: 'Expert',
        contentFormat: 'Video & Motion',
        availability: 'available',
        rating: 4.95,
        reviewCount: 29,
        projects: [
          {
            title: 'Indus Valley Civilization: 3D City Recreation',
            description: 'Archaeologically grounded architectural recreation of Mohenjo-daro street layouts and brick drainage.',
            mediaUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Midjourney v6.1', 'Kling AI'],
            deliverables: ['45s Cinematic Flythrough', 'Historical Artbook Stills'],
            promptSnippet: 'Ancient bronze age city in golden twilight, bustling market, baked brick walls, historic detail'
          },
          {
            title: 'Ancient Alexandria Library Hall Rebuilt',
            description: 'Scholarly atrium with illuminated papyrus scrolls and marble columns.',
            mediaUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Midjourney v6.1'],
            deliverables: ['6x High-Res Backgrounds'],
            promptSnippet: 'Magnificent Greco-Egyptian library with towering cedar shelves holding thousands of scrolls, morning sunlight rays'
          },
          {
            title: 'The Silk Road Caravan Trade Route',
            description: 'Atmospheric desert trading post with merchants, spices, and silk textiles at oasis.',
            mediaUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Kling AI', 'Midjourney'],
            deliverables: ['Historical Explainer Reel'],
            promptSnippet: 'Ancient desert trading oasis at sunset with camels resting beside turquoise water pools, cinematic 4K'
          }
        ]
      },
      {
        name: 'Neha Saxena',
        title: 'K-12 Gamified Storytelling & Interactive Illustrator',
        bio: 'Crafting enchanting children’s educational illustrations, animated storybooks, and gamified quiz graphics that spark wonder.',
        location: 'Jaipur, India',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        specialization: 'Children’s E-Learning & Storybooks',
        skills: ['Children Storybook Style', 'Gamification Badges', 'Animal Biology Art'],
        aiTools: ['Midjourney v6.1', 'DALL-E 3', 'Canva AI'],
        projectStartingRate: 16000,
        hourlyRate: 2000,
        experienceYears: 2,
        experienceLevel: 'Beginner',
        contentFormat: 'Stills & Photography',
        availability: 'available',
        rating: 4.87,
        reviewCount: 15,
        projects: [
          {
            title: 'The Secret Life of Rainforest Creatures: Kids Book',
            description: '24 illustrated pages introducing biodiversity to children aged 6 to 10.',
            mediaUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Midjourney v6.1', 'Canva AI'],
            deliverables: ['24x Storybook Pages', 'Character Sheet'],
            promptSnippet: 'Whimsical Pixar style tree frog with giant curious eyes in glowing emerald jungle'
          },
          {
            title: 'Solar System Planetary Explorer Cards',
            description: 'Playful planets with friendly astronaut children exploring Saturn rings and Mars dunes.',
            mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Midjourney v6.1'],
            deliverables: ['10x Collectible Cards'],
            promptSnippet: 'Adorable child astronaut planting flag on rainbow-tinted Saturn ring, vibrant pastel storybook art'
          },
          {
            title: 'Undersea Coral Reef Alphabet Quest',
            description: 'Animated alphabet adventure featuring sea turtles and fluorescent jellyfish.',
            mediaUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['DALL-E 3'],
            deliverables: ['26x Letter Flashcards'],
            promptSnippet: 'Smiling cartoon dolphin leaping through glowing underwater rainbow arch, bright coral background'
          }
        ]
      },
      {
        name: 'Gaurav Kulkarni',
        title: 'Coding Bootcamp & Software Architecture Visualizer',
        bio: 'Translating backend microservices, Kubernetes clusters, and cloud workflows into crystal clear 3D isometric architectural animations.',
        location: 'Pune, India',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
        specialization: 'Software Architecture & Tech Courses',
        skills: ['System Design Diagrams', 'Cloud Computing 3D', 'Data Pipeline Explanations'],
        aiTools: ['FLUX.1', 'ComfyUI', 'Claude 3.5 Sonnet'],
        projectStartingRate: 24000,
        hourlyRate: 3000,
        experienceYears: 4,
        experienceLevel: 'Expert',
        contentFormat: 'Stills & Photography',
        availability: 'available',
        rating: 4.92,
        reviewCount: 23,
        projects: [
          {
            title: 'Event-Driven Microservices: Isometric 3D Map',
            description: 'Aesthetic architectural isometric map showing Kafka message queues and Redis caching.',
            mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['FLUX.1 Pro', 'ComfyUI'],
            deliverables: ['High-res Tech Wallpapers', 'Slide Asset Kit'],
            promptSnippet: 'Clean modern isometric server cluster with glowing data pipelines, blue and violet gradient, tech aesthetic'
          },
          {
            title: 'Neural Network Layer Backpropagation Explained',
            description: 'Step-by-step visual representation of gradient descent flowing backward through tensors.',
            mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['FLUX.1 Pro'],
            deliverables: ['8x Architecture Slides'],
            promptSnippet: 'Multi-layer neural network with glowing synaptic weights transmitting data forward and backward, 8K render'
          },
          {
            title: 'DevOps CI/CD Deployment Pipeline Highway',
            description: 'Futuristic highway with automated robot inspection checkpoints approving code commits.',
            mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['ComfyUI'],
            deliverables: ['Curriculum Infographic Poster'],
            promptSnippet: 'Sleek glass assembly line where glowing digital software capsules pass automated security scanners'
          }
        ]
      },
      {
        name: 'Dr. Anita Roy',
        title: 'Medical Diagnostics & Human Anatomy Illustrator',
        bio: 'Clinical physician crafting surgical education visuals, cardiovascular blood flow animations, and pharmacology drug interaction models.',
        location: 'Bengaluru, India',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
        specialization: 'Medical & Surgical 3D Illustration',
        skills: ['Cardiovascular Simulation', 'Pharmacology Mechanisms', 'Surgical Guides'],
        aiTools: ['Midjourney v6.1', 'Runway Gen-3', 'FLUX.1 Pro'],
        projectStartingRate: 36000,
        hourlyRate: 4800,
        experienceYears: 6,
        experienceLevel: 'Expert',
        contentFormat: '3D & Virtual',
        availability: 'available',
        rating: 4.99,
        reviewCount: 42,
        projects: [
          {
            title: 'Cardiovascular Hemodynamics & Stent Placement',
            description: 'Ultra-detailed cross-section of coronary artery expansion with biodegradable stent deployment.',
            mediaUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Midjourney v6.1', 'Runway Gen-3'],
            deliverables: ['Surgical Training Clip', '10x Anatomical Stills'],
            promptSnippet: 'Hyperrealistic transparent coronary artery with glowing red blood cells flowing through surgical mesh stent, medical illustration'
          },
          {
            title: 'Synaptic Neurotransmitter Receptor Docking',
            description: 'Dopamine and serotonin molecules docking into post-synaptic neuron receptors.',
            mediaUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['FLUX.1 Pro'],
            deliverables: ['Medical Journal Cover Art'],
            promptSnippet: 'Fluorescent neurotransmitter ligand binding to protein receptor pocket, subsurface scattering, medical precision'
          },
          {
            title: 'Respiratory Alveoli Gas Exchange Micro-Model',
            description: 'Capillary network surrounding lung alveoli diffusing oxygen into hemoglobin.',
            mediaUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
            toolsUsed: ['Midjourney v6.1'],
            deliverables: ['Educational Textbook Suite'],
            promptSnippet: 'Luminous alveolus cluster in delicate pink and cyan light, capillary vessels wrapping around air sacs, 8K macro'
          }
        ]
      }
    ]
  }
];

// Curated Unsplash photo pools for all 23 categories (guaranteeing exact thematic alignment)
export const CATEGORY_IMAGE_SETS: Record<IndustryCategory, string[]> = {
  'Finance & Investing': [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80'
  ],
  'Education & E-Learning': [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'
  ],
  'Business & Entrepreneurship': [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
  ],
  'Technology & AI': [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80'
  ],
  'Gaming & Esports': [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1548484352-ea579e5233a8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1612287233207-6b4df9d1cfdf?auto=format&fit=crop&w=1200&q=80'
  ],
  'Health & Fitness': [
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80'
  ],
  'Food & Cooking': [
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80'
  ],
  'Travel & Tourism': [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80'
  ],
  'Fashion & Beauty': [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80'
  ],
  'Digital Marketing': [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'
  ],
  'Social Media Influencers': [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80'
  ],
  'Entertainment & Comedy': [
    'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80'
  ],
  'Science & Research': [
    'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80'
  ],
  'Real Estate': [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
  ],
  'E-commerce & Product Advertising': [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80'
  ],
  'Photography & Videography': [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=80'
  ],
  'Animation & Motion Graphics': [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80'
  ],
  'Music & Audio': [
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1520523839898-507125ef538a?auto=format&fit=crop&w=1200&q=80'
  ],
  'Lifestyle & Personal Development': [
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80'
  ],
  'News & Media': [
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80'
  ],
  'Automotive': [
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80'
  ],
  'Agriculture & Farming': [
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80'
  ],
  'Environment & Sustainability': [
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80'
  ]
};

// Curated pool of high-resolution portraits
export const CURATED_PORTRAITS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80'
];

export const INDIAN_CITIES = [
  'Mumbai, India',
  'Bengaluru, India',
  'Delhi NCR, India',
  'Hyderabad, India',
  'Pune, India',
  'Chennai, India',
  'Kolkata, India',
  'Ahmedabad, India',
  'Goa, India',
  'Jaipur, India'
];

// Specification matrix for generating remaining 21 categories with 6 realistic creators each
interface CategoryMeta {
  category: IndustryCategory;
  titles: string[];
  bios: string[];
  specializations: string[];
  skillsList: string[][];
  toolsList: string[][];
  baseRate: number;
  format: 'Video & Motion' | 'Stills & Photography' | 'Audio & Voice' | '3D & Virtual';
  projectTemplates: {
    title: string;
    description: string;
    deliverables: string[];
    prompt: string;
  }[];
}

export const CATEGORY_METAS: CategoryMeta[] = [
  // 3. Business & Entrepreneurship
  {
    category: 'Business & Entrepreneurship',
    titles: [
      'B2B Brand Identity & Vision Deck Architect',
      'Corporate Keynote & Commercial Storyteller',
      'AI Startup Brand Evangelist & Visual Director',
      'Enterprise SaaS Motion Designer',
      'Annual Report & ESG Graphics Synthesizer',
      'Leadership Personal Branding Director'
    ],
    bios: [
      'Translating complex venture narratives into award-winning visual decks, investor keynotes, and enterprise brand systems.',
      'Specializing in high-production commercial video ads for hyper-growth startups using Runway Gen-3 and Kling AI.',
      'Directing futuristic brand guidelines, brand manifestos, and generative asset design systems for unicorn startups.',
      'Crafting micro-interaction motion loops and product marketing hero reels for cloud and enterprise software companies.',
      'Visualizing institutional sustainability reports, board presentations, and multinational corporate transformations.',
      'Helping CXOs and startup founders build authority on LinkedIn and X through photorealistic custom visual storytelling.'
    ],
    specializations: [
      'Venture Brand Systems',
      'Commercial Brand Videos',
      'Startup Manifestos',
      'SaaS Product Renders',
      'Corporate Visual Reports',
      'Executive Brand Portfolios'
    ],
    skillsList: [
      ['Brand Guidelines', 'Investor Decks', 'Generative Design Systems'],
      ['Keyframe Video Ads', 'Script-to-Screen', 'VFX Retouching'],
      ['Logo Explorations', 'Virtual Brand Kits', 'Midjourney V6.1'],
      ['SaaS Product Tours', 'Isometric Diagrams', 'Figma AI'],
      ['ESG Infographics', 'Annual Reports', 'Corporate Charts'],
      ['Executive Headshots', 'Thought Leadership Stills', 'Social Reels']
    ],
    toolsList: [
      ['Midjourney v6.1', 'FLUX.1 Pro', 'Photoshop AI'],
      ['Runway Gen-3', 'ElevenLabs', 'Topaz Video AI'],
      ['Midjourney v6.1', 'ComfyUI', 'Illustrator AI'],
      ['Runway Gen-3', 'ComfyUI', 'Luma Dream Machine'],
      ['FLUX.1 Pro', 'Gamma AI', 'Canva AI'],
      ['Midjourney v6.1', 'FaceID LoRA', 'HeyGen']
    ],
    baseRate: 28000,
    format: 'Video & Motion',
    projectTemplates: [
      {
        title: 'Global Unicorn Launch: Brand Manifesto Film',
        description: 'Cinematic 60s brand anthem celebrating founders disrupting legacy enterprise infrastructure.',
        deliverables: ['1x 60s Master Commercial', '4x Social Cutdowns'],
        prompt: 'Futuristic glass architectural headquarters at blue hour, confident leaders collaborating over holographic data table'
      },
      {
        title: 'B2B Cloud Security: Product Suite 3D Metaphors',
        description: 'Crystalline shields and illuminated network architecture representing zero-trust architecture.',
        deliverables: ['12x Website Hero Assets', '3x Animated Loops'],
        prompt: 'Minimalist titanium corporate shield hovering over illuminated fiber-optic metropolis, volumetric studio lighting'
      },
      {
        title: 'Annual ESG Impact Report: Visual Narrative',
        description: 'Harmonious blend of renewable solar infrastructure and urban corporate greenery.',
        deliverables: ['16x High-Res Report Infographics'],
        prompt: 'Modern sustainable corporate campus with living green walls, solar glass canopies, soft natural sunlight, architectural 8K'
      }
    ]
  },

  // 4. Technology & AI
  {
    category: 'Technology & AI',
    titles: [
      'Neural Network & Cybernetic Visual Specialist',
      'Generative AI Product Commercial Director',
      'Autonomous Systems & Robotics Animator',
      'Semiconductor & Hardware 3D Visualizer',
      'Spatial Computing & Mixed Reality Concept Artist',
      'Quantum Computing Visualization Engineer'
    ],
    bios: [
      'Building mind-bending abstract representations of LLM attention mechanisms, latent spaces, and neural computation.',
      'Directing viral hardware launch spots and AI copilot feature reveals for silicon valley and Bangalore tech leaders.',
      'Simulating photorealistic humanoid robotics, warehouse automation, and autonomous drone delivery workflows.',
      'Crafting nanometer-scale photorealistic renders of advanced silicon chip dies, wafer packaging, and GPU clusters.',
      'Concepting futuristic vision OS interfaces, glass holographic widgets, and next-gen spatial computing workflows.',
      'Bridging mathematical quantum physics and generative cinematography to explain quantum supremacy.'
    ],
    specializations: [
      'Neural Latent Space Visuals',
      'AI Product Teasers',
      'Humanoid Robotics Motion',
      'Silicon Die Renders',
      'Spatial UI Concept Art',
      'Quantum Computation Art'
    ],
    skillsList: [
      ['Latent Space Walkthroughs', 'Neural Attention Art', 'Sci-Fi VFX'],
      ['Hardware Reveals', 'Choreographed Motion', 'Topaz 60fps'],
      ['Robot Kinematics', 'Warehouse Sim', 'Runway Motion Brush'],
      ['Subsurface Raytracing', 'PCB Micro-Detail', 'FLUX.1 Pro'],
      ['Holographic Shaders', 'Volumetric Interface', 'Midjourney v6.1'],
      ['Quantum Entanglement', 'Qubit Visualizers', 'Particle Physics']
    ],
    toolsList: [
      ['ComfyUI', 'Deforum SD', 'Runway Gen-3'],
      ['Runway Gen-3', 'Kling AI', 'Midjourney v6.1'],
      ['Kling AI', 'Luma Dream Machine', 'After Effects AI'],
      ['FLUX.1 Pro', 'ComfyUI', 'Photoshop GenFill'],
      ['Midjourney v6.1', 'Blender AI', 'Photoshop'],
      ['Midjourney v6.1', 'Runway Gen-3', 'FLUX.1']
    ],
    baseRate: 35000,
    format: 'Video & Motion',
    projectTemplates: [
      {
        title: 'The Latent Dimension: Multi-Modal AI Teaser',
        description: 'Hypnotic continuous camera flythrough inside high-dimensional embedding spaces transforming into speech and images.',
        deliverables: ['1x 45s Commercial', '8x 4K Wallpapers'],
        prompt: 'Glowing multidimensional geometric vectors collapsing into photorealistic human expressions, cosmic neon violet caustics'
      },
      {
        title: '3-Nanometer AI Accelerator Chip Die Reveal',
        description: 'Microscopic camera dive through millions of glowing copper interconnects and silicon transistors.',
        deliverables: ['30s Hardware Launch Teaser', '5x Press Stills'],
        prompt: 'Microscopic silicon wafer surface with iridescent circuits etched in gold and cobalt, macro depth of field'
      },
      {
        title: 'Humanoid Bipedal Robot: Warehouse Staging',
        description: 'Precision robotic assistant autonomously picking precision microelectronics in automated dark factory.',
        deliverables: ['3x Feature Short Clips', 'Social Banner Kit'],
        prompt: 'Matte white humanoid robot with carbon fiber joints inspecting semiconductor module with illuminated blue optical sensor'
      }
    ]
  },

  // 5. Gaming & Esports
  {
    category: 'Gaming & Esports',
    titles: [
      'Esports Tournament Branding & Stage Visualizer',
      'Fantasy & Sci-Fi Character Concept Artist',
      'Game Trailer Cinematographer & Storyboarder',
      'Twitch & Kick Streamer Virtual Environment Architect',
      'In-Game Weapon & Vehicle Generative Designer',
      'Mobile Gaming User Acquisition Ad Specialist'
    ],
    bios: [
      'Designing thunderous stadium broadcast packages, player intro sequences, and championship trophies for Tier-1 esports.',
      'Generating original AAA character rosters, mech designs, cyber-ninjas, and mythic beasts for game studios.',
      'Directing cinematic game reveal trailers with custom sound design, dramatic camera angles, and dynamic motion pacing.',
      'Constructing immersive 3D virtual broadcast sets, interactive stream overlays, and dynamic VTuber avatars.',
      'Rendering hyper-customized futuristic weaponry skins, tactical gear, and cyberpunk hovering vehicles.',
      'Engineering high-conversion gameplay mockups and viral split-test motion creatives for top mobile publishers.'
    ],
    specializations: [
      'Esports Broadcast Packages',
      'AAA Character Concepts',
      'Cinematic Game Trailers',
      'Virtual Stream Sets',
      'Weapon & Skin Renders',
      'High-CTR Mobile Game Ads'
    ],
    skillsList: [
      ['Dynamic Keyframes', 'Tournament GFX', 'Audio-Reactive Motion'],
      ['Character Orthographics', 'Material Studies', 'Costume Design'],
      ['Cinematic Framing', 'Action Choreography', 'Pacing & Hooks'],
      ['3D Stream Overlays', 'VTuber Rigging', 'OBS Integration'],
      ['Hard Surface Renders', 'Sci-Fi Texturing', 'FLUX.1 LoRA'],
      ['Playable Mockups', 'CTR Optimization', 'Fast Turnaround']
    ],
    toolsList: [
      ['Runway Gen-3', 'After Effects AI', 'Midjourney v6.1'],
      ['Midjourney v6.1', 'FLUX.1 Pro', 'Photoshop'],
      ['Kling AI', 'Runway Gen-3', 'ElevenLabs'],
      ['Midjourney v6.1', 'HeyGen', 'ComfyUI'],
      ['FLUX.1 Pro', 'ComfyUI', 'Substance AI'],
      ['Kling AI', 'Canva AI', 'CapCut AI']
    ],
    baseRate: 26000,
    format: 'Video & Motion',
    projectTemplates: [
      {
        title: 'Championship Grand Finals: Stage Intro Package',
        description: 'Pulsing electric arena broadcast intro featuring team badges and holographic mascot showdowns.',
        deliverables: ['1x 60s Intro Film', '16x Team Interstitials'],
        prompt: 'Massive esports stadium illuminated in electric purple lasers with tens of thousands of cheering fans and holographic arena'
      },
      {
        title: 'Cyberpunk Mech Pilot Character Roster',
        description: 'Complete 6-character concept package with battle-worn exosuits, biometric helmets, and companion drones.',
        deliverables: ['6x Full Character Turnarounds', 'Lore Artbook'],
        prompt: 'Badass female mech pilot in carbon fiber tactical suit standing beside towering humanoid battle mech in neon rain'
      },
      {
        title: 'Mythic Energy Blade: 10 Skin Evolutions',
        description: 'Tiered cosmetic weapon progression from ancient obsidian rune dagger to plasma radiant katana.',
        deliverables: ['10x Skin Stills', '1x 30s Showcase Reel'],
        prompt: 'Glowing Damascus steel katana surrounded by swirling violet plasma arcs hovering in dark stone dojo, 8K ultra detail'
      }
    ]
  },

  // 6. Health & Fitness
  {
    category: 'Health & Fitness',
    titles: [
      'Athletic Apparel & Performance Ad Director',
      'Holistic Wellness & Mindfulness Storyteller',
      'Sports Nutrition & Supplement 3D Renderer',
      'Functional Fitness & HIIT Routine Visualizer',
      'Physical Therapy & Biomechanics Animator',
      'Wearables & Health Tech Lifestyle Creative'
    ],
    bios: [
      'Crafting high-adrenaline athletic commercials featuring elite runners, crossfit champions, and modern gym culture.',
      'Producing serene breathwork visuals, morning yoga flows, and calming meditation sequences for wellness apps.',
      'Rendering photorealistic protein tubs, hydration electrolytes, and effervescent recovery supplements with fluid splashes.',
      'Creating dynamic motion tutorials and form-correction animations for digital fitness apps and gym chains.',
      'Simulating musculoskeletal alignment, muscle engagement heatmaps, and joint recovery dynamics for physiotherapy.',
      'Directing lifestyle visuals showing smart rings, fitness trackers, and biometric displays in modern living scenes.'
    ],
    specializations: [
      'Athletic Commercials',
      'Mindfulness Visuals',
      'Supplement Packaging',
      'HIIT Motion Guides',
      'Biomechanics Anatomy',
      'Health Tech Staging'
    ],
    skillsList: [
      ['Dynamic Action Stills', 'Sweat & Muscle Shading', 'High-Speed Video'],
      ['Peaceful Lighting', 'Nature Integration', 'Atmospheric Ambience'],
      ['Liquid Splash Physics', 'Powder Explosion Renders', 'Studio Lighting'],
      ['Kinetic Movement', 'Exercise Breakdown', 'Social Reels'],
      ['Anatomy Heatmaps', 'Posture Correction', 'Medical Motion'],
      ['Wearable Device Staging', 'Lifestyle Framing', 'UI Glow Overlays']
    ],
    toolsList: [
      ['Runway Gen-3', 'Midjourney v6.1', 'Topaz Video'],
      ['Midjourney v6.1', 'Runway Gen-3', 'ElevenLabs'],
      ['FLUX.1 Pro', 'ComfyUI', 'Photoshop'],
      ['Kling AI', 'Midjourney', 'CapCut AI'],
      ['ComfyUI', 'Midjourney v6.1', 'After Effects'],
      ['FLUX.1 Pro', 'Midjourney v6.1', 'Photoshop GenFill']
    ],
    baseRate: 24000,
    format: 'Video & Motion',
    projectTemplates: [
      {
        title: 'Midnight Marathon: Pure Focus Athletic Spot',
        description: 'Heart-pumping commercial tracking a marathoner powering through rain-slicked city streets under streetlights.',
        deliverables: ['30s Master Commercial', '3x Vertical Stories'],
        prompt: 'Elite athletic runner sprinting through wet dark city asphalt, raindrops reflecting neon streetlights, determined expression'
      },
      {
        title: 'Electrolyte Hydration Fizz: Product Suite',
        description: 'Vibrant citrus electrolyte tablet dissolving into crystal clear bubbling water with floating lemon wedges.',
        deliverables: ['8x Product Stills', '1x 15s Hero Loop'],
        prompt: 'Clear glass of sparkling effervescent water with rising bubbles and floating slice of lime on dark slate, studio macro'
      },
      {
        title: 'Himalayan Sunrise Yoga & Breathwork Guide',
        description: 'Calming sequence of yogic master meditating on mountain edge overlooking misty valleys at golden hour.',
        deliverables: ['1x 10-min Guided Video', 'Instagram Carousel'],
        prompt: 'Serene woman in mindful meditation posture on high cliff overlooking Himalayan sea of clouds at sunrise, warm golden light'
      }
    ]
  },

  // 7. Food & Cooking
  {
    category: 'Food & Cooking',
    titles: [
      'Gourmet Culinary & Fine Dining AI Cinematographer',
      'Artisanal Bakery & Coffee Culture Visualist',
      'Cocktail Mixology & Beverage Splash Director',
      'Plant-Based & Farm-to-Table Food Stylist',
      'Street Food & Regional Gastronomy Storyteller',
      'Cloud Kitchen & Fast Casual Menu Campaigner'
    ],
    bios: [
      'Crafting Michelin-caliber food commercials, slow-motion searing sizzles, and sauce emulsions with mouthwatering realism.',
      'Capturing golden buttery croissants, flaky sourdough crusts, and silky microfoam latte art in cozy rustic sunlight.',
      'Mastering fluid mechanics, ice splash physics, citrus zest mists, and luxury glassware for spirits and mocktail brands.',
      'Showcasing colorful organic farm produce, vibrant acai bowls, and fresh macro microgreens with earth-friendly aesthetics.',
      'Documenting bustling Asian night markets, spicy tandoori skewers, and piping hot dumplings in atmospheric steam.',
      'Optimizing high-converting visual menus and food delivery app banners that drive 40%+ click-through rates.'
    ],
    specializations: [
      'Michelin Fine Dining Spots',
      'Artisanal Coffee & Bakery',
      'Beverage Splash Physics',
      'Farm-to-Table Food Styling',
      'Street Food Cinematography',
      'High-Conversion Food Ads'
    ],
    skillsList: [
      ['Sizzle & Steam Physics', 'Macro Food Lighting', 'Runway Gen-3 Slow-Mo'],
      ['Crust Textures', 'Latte Art Detail', 'Warm Natural Light'],
      ['Liquid Caustics', 'Cocktail Garnish Styling', 'Glass Refractions'],
      ['Vibrant Produce Staging', 'Eco-Packaging', 'Overhead Flatlays'],
      ['Night Market Ambience', 'Wok Hei Flare', 'Cultural Food Narratives'],
      ['Delivery Banner Optimization', 'App Menu Staging', 'Social Carousel Packs']
    ],
    toolsList: [
      ['Runway Gen-3', 'Midjourney v6.1', 'Topaz Video'],
      ['Midjourney v6.1', 'FLUX.1 Pro', 'Photoshop'],
      ['ComfyUI', 'Runway Gen-3', 'FLUX.1 Pro'],
      ['FLUX.1 Pro', 'Midjourney v6.1', 'Canva AI'],
      ['Kling AI', 'Midjourney v6.1', 'ElevenLabs'],
      ['Midjourney v6.1', 'Canva AI', 'Photoshop GenFill']
    ],
    baseRate: 22000,
    format: 'Video & Motion',
    projectTemplates: [
      {
        title: 'Tasting Menu: Searing Wagyu & Truffle Emulsion',
        description: 'Sensory slow-motion sequence capturing butter-basted A5 wagyu sizzling on cast iron with shaved black truffle.',
        deliverables: ['1x 45s Commercial Spot', '10x Social Food Stills'],
        prompt: 'Gourmet wagyu steak searing in bubbling butter on cast iron skillet with thyme and garlic, cinematic steam, macro 8K'
      },
      {
        title: 'Botanical Gin & Tonic: Citrus Mist Reveal',
        description: 'Crystal balloon glass filled with botanical herbs and artisanal tonic water exploding with effervescent bubbles.',
        deliverables: ['1x 20s Loop', '6x Commercial Renders'],
        prompt: 'Elegant gin and tonic cocktail with frozen ice cube, rosemary sprig and grapefruit slice splashing in sunlight, studio caustics'
      },
      {
        title: 'Artisan Sourdough: Steam Cracking Oven Spring',
        description: 'Loaf of rustic country sourdough expanding and browning in stone hearth with golden crackling crust.',
        deliverables: ['1x 30s Reel', 'High-Res Bakery Menu Assets'],
        prompt: 'Rustic sourdough bread loaf with flour dust and deep blistered ear, resting on wooden peel with steam rising, warm bakery light'
      }
    ]
  },

  // 8. Travel & Tourism
  {
    category: 'Travel & Tourism',
    titles: [
      'Luxury Resort & Boutique Hospitality Filmmaker',
      'Wilderness Adventure & Drone Aerial Synthesizer',
      'Cultural Heritage & Ancient Wonder Documentarian',
      'Urban Metropole & Nightlife Tourism Director',
      'Eco-Glamping & Regenerative Tourism Storyteller',
      'Solo Travel & Backpacker Experience Creator'
    ],
    bios: [
      'Creating dreamy travel commercials for five-star overwater villas, private infinity pools, and secluded tropical sanctuaries.',
      'Synthesizing majestic bird’s-eye drone perspectives over jagged alpine peaks, Norwegian fjords, and Icelandic volcanic beaches.',
      'Bringing historical UNESCO monuments, Moroccan medinas, and ancient temple ruins to life for national tourism boards.',
      'Capturing neon Tokyo alleyways, rooftop jazz bars in New York, and bustling street markets with electric energy.',
      'Highlighting sustainable off-grid eco-domes, stargazing retreats, and farm stays for conscious luxury travelers.',
      'Inspiring wanderlust with authentic first-person travel reels, train journeys, and hidden gem recommendations.'
    ],
    specializations: [
      'Luxury Resort Films',
      'Aerial Landscape Cinematography',
      'Cultural Heritage Documentaries',
      'Urban Tourism Campaigns',
      'Eco-Glamping Retelling',
      'First-Person Travel Reels'
    ],
    skillsList: [
      ['Golden Hour Architectural Lighting', 'Water Reflection Shaders', 'Runway Camera Flythroughs'],
      ['FPV Drone Simulation', 'Cloud & Fog Dynamics', 'Scale & Depth Framing'],
      ['Cultural Authenticity', 'Historic Textures', 'Voiceover Synchronization'],
      ['Night City Lighting', 'Bokeh & Rain Reflections', 'Upbeat Sound Design'],
      ['Off-Grid Architecture', 'Stargazing Night Skies', 'Sustainable Tourism'],
      ['POV Travel Angles', 'Dynamic Transitions', 'Short-Form Viral Hooks']
    ],
    toolsList: [
      ['Runway Gen-3', 'Midjourney v6.1', 'Topaz Video'],
      ['Kling AI', 'Runway Gen-3', 'Luma Dream Machine'],
      ['Midjourney v6.1', 'ElevenLabs', 'Runway Gen-3'],
      ['Runway Gen-3', 'Midjourney v6.1', 'After Effects'],
      ['FLUX.1 Pro', 'Midjourney v6.1', 'Photoshop'],
      ['Kling AI', 'CapCut AI', 'ElevenLabs']
    ],
    baseRate: 30000,
    format: 'Video & Motion',
    projectTemplates: [
      {
        title: 'Maldives Overwater Sanctuary: Escape Commercial',
        description: 'Breathtaking sunrise drone sweep across turquoise atolls landing on a luxury teak deck over crystal water.',
        deliverables: ['1x 60s Tourism Anthem', '6x Instagram Reels'],
        prompt: 'Luxury overwater villa bungalow in Maldives turquoise lagoon with infinity pool overlooking calm azure ocean, golden hour'
      },
      {
        title: 'Patagonia Glacial Expedition: FPV Alpine Run',
        description: 'High-speed cinematic flythrough carving through granite towers, glacial waterfalls, and wind-swept valleys.',
        deliverables: ['1x 45s Adventure Film', '12x 4K Wallpapers'],
        prompt: 'Majestic jagged granite mountain peaks in Patagonia with turquoise glacial lake, dramatic clouds, cinematic golden light'
      },
      {
        title: 'Kyoto Autumn Temple: Strolling through Red Maples',
        description: 'Peaceful POV walk through ancient wooden temple courtyard surrounded by blazing crimson maple leaves and moss.',
        deliverables: ['3x 30s Meditative Reels', 'Travel Guide Stills'],
        prompt: 'Traditional Japanese temple veranda overlooking zen rock garden and vibrant scarlet maple foliage in soft autumn morning mist'
      }
    ]
  },

  // 9. Fashion & Beauty
  {
    category: 'Fashion & Beauty',
    titles: [
      'Haute Couture & Runway Editorial Director',
      'Cosmetics & Skincare Fluid Texture Visualizer',
      'Cyber-Streetwear & Virtual Sneaker Designer',
      'AI Virtual Supermodel & Consistency Stylist',
      'Jewelry & Precious Gems Macro Cinematographer',
      'Sustainable Capsule & Eco-Fabric Campaigner'
    ],
    bios: [
      'Directing avant-garde fashion campaigns, Paris Fashion Week editorial looks, and surrealist high-fashion lookbooks.',
      'Specializing in micro-droplets, hyaluronic serum pipettes, whipped moisturizer textures, and radiant dewy skin glazes.',
      'Designing futuristic streetwear apparel, holographic sneakers, and cyberpunk technical garments for digital fashion houses.',
      'Training consistent photorealistic virtual models with precise face consistency across diverse campaign poses and lighting.',
      'Capturing diamond brilliance, golden reflections, and intricate gemstones under precision studio spotlighting.',
      'Promoting circular fashion, organic linen textures, and plant-dyed garments for conscious ethical fashion brands.'
    ],
    specializations: [
      'High-Fashion Lookbooks',
      'Skincare Fluid Renders',
      'Virtual Footwear Design',
      'Consistent AI Model Staging',
      'Fine Jewelry Renders',
      'Eco-Fashion Campaigns'
    ],
    skillsList: [
      ['Editorial Lighting', 'Drape & Fabric Shading', 'Runway Style Transfer'],
      ['Viscous Liquid Sim', 'Skin Pore Realism', 'Cosmetic Glass Bottles'],
      ['Sneaker Mesh Topology', 'Futuristic Textiles', 'Photoshop Retouching'],
      ['FaceID LoRA Training', 'Outfit Swap Consistency', 'Pose Matching'],
      ['Gemstone Refractions', 'Macro Studio Caustics', 'Metallic Lustre'],
      ['Natural Fiber Textures', 'Earth Tone Styling', 'Conscious Branding']
    ],
    toolsList: [
      ['Midjourney v6.1', 'Runway Gen-3', 'Photoshop AI'],
      ['FLUX.1 Pro', 'ComfyUI', 'Midjourney v6.1'],
      ['Midjourney v6.1', 'FLUX.1 Pro', 'Blender AI'],
      ['ComfyUI', 'InstantID', 'FLUX.1 Dev'],
      ['FLUX.1 Pro', 'Midjourney v6.1', 'Topaz Photo'],
      ['Midjourney v6.1', 'Canva AI', 'Photoshop']
    ],
    baseRate: 32000,
    format: 'Stills & Photography',
    projectTemplates: [
      {
        title: 'Cyberpunk Fall Capsule: 15 Lookbook Stills',
        description: 'Ultra-stylish virtual model wearing metallic puffer jacket and chromatic eyewear in rainy Tokyo neon.',
        deliverables: ['15x High-Fashion Editorial Stills', 'Lookbook PDF'],
        prompt: 'High fashion editorial photo of striking model wearing oversized iridescent chromatic trenchcoat on rainy neon city street'
      },
      {
        title: 'Bio-Fermented Peptide Serum: Launch Visuals',
        description: 'Frosted amber glass dropper bottle releasing a golden droplet into rippling water with botanical extracts.',
        deliverables: ['8x Product Stills', '1x 15s Hero Loop'],
        prompt: 'Luxury skincare serum bottle on wet stone pedestal with water ripples and golden glowing oil droplet suspended in air'
      },
      {
        title: 'Solitaire Platinum Ring: 360 Shimmer Rotation',
        description: 'Flawless round cut diamond sparkling in platinum prong setting with iridescent rainbow prism fire.',
        deliverables: ['1x 360 Spin Loop', '6x Macro Close-Up Stills'],
        prompt: 'Macro shot of magnificent diamond engagement ring on dark velvet, light reflecting rainbow prisms from facets, studio rim light'
      }
    ]
  },

  // 10. Digital Marketing
  {
    category: 'Digital Marketing',
    titles: [
      'Performance Creative & DCO Ad Matrix Director',
      'Social Growth Funnel & Hook Optimization Specialist',
      'SaaS Landing Page Hero & UI Graphics Designer',
      'Omnichannel Brand Campaign Art Director',
      'Paid Search & Display Banner Automator',
      'Influencer Marketing Strategy Visualizer'
    ],
    bios: [
      'Generating high-converting ad variations for Meta, TikTok, and Google Ads tested across programmatic creative frameworks.',
      'Engineering first-3-second viral video hooks, split-screen comparison formats, and high-CTR UGC-style creative assets.',
      'Designing conversion-optimized SaaS hero graphics, isometric dashboard mockups, and customer testimonial cards.',
      'Orchestrating cohesive multi-platform campaigns spanning billboard mockups, social carousels, and email header sets.',
      'Automating 100+ creative ad resize variations using ComfyUI pipelines and dynamic prompt overlays.',
      'Visualizing influencer marketing ROI, brand partnership proposals, and campaign performance report suites.'
    ],
    specializations: [
      'Performance Meta/TikTok Ads',
      'Short-Form Viral Hooks',
      'Landing Page Hero Assets',
      'Omnichannel Campaigns',
      'Programmatic Ad Matrices',
      'Campaign Analytics Graphics'
    ],
    skillsList: [
      ['A/B Creative Testing', 'Ad Psychology', 'UGC Style Prompts'],
      ['Attention Retention', 'Text Overlay Styling', 'Audio Pacing'],
      ['Conversion UI Layouts', 'Glassmorphism Cards', 'Vector Polish'],
      ['Brand Guidelines Adherence', 'Omnichannel Formats', 'Style Transfer'],
      ['Batch Image Pipelines', 'Responsive Resizes', 'Python Scripting'],
      ['Data Visualization', 'Report Layouts', 'Presentation Decks']
    ],
    toolsList: [
      ['Midjourney v6.1', 'Runway Gen-3', 'CapCut AI'],
      ['Kling AI', 'ElevenLabs', 'Canva AI'],
      ['FLUX.1 Pro', 'Figma AI', 'Photoshop'],
      ['Midjourney v6.1', 'FLUX.1', 'Illustrator AI'],
      ['ComfyUI', 'Python Automations', 'Canva AI'],
      ['Gamma AI', 'Midjourney', 'Photoshop']
    ],
    baseRate: 25000,
    format: 'Stills & Photography',
    projectTemplates: [
      {
        title: 'D2C Skincare: 20 Split-Test Performance Ads',
        description: 'Comprehensive suite of 20 distinct visual ad angles testing before/after, ingredient highlights, and customer reviews.',
        deliverables: ['20x 1:1 & 9:16 Ad Creatives', 'A/B Hook Copy Variations'],
        prompt: 'Split screen lifestyle ad showing tired dry skin vs radiant glowing refreshed skin, clean aesthetic typography overlay'
      },
      {
        title: 'SaaS Analytics: Modern Landing Page Hero Graphic',
        description: 'Floating glass interface panels displaying real-time revenue graphs with soft violet and amber gradients.',
        deliverables: ['1x Web Hero Master', '4x Feature Spotlights'],
        prompt: 'Futuristic glass dashboard panels with real-time analytics graphs floating against dark midnight purple background, clean UI'
      },
      {
        title: 'Holiday Mega-Sale: Omnichannel Promo Suite',
        description: 'Festive cyber-gifting campaign assets optimized for Instagram Stories, Google Display, and hero newsletters.',
        deliverables: ['15x Formatted Banners', 'Animated GIF Teaser'],
        prompt: 'Modern glowing gift boxes floating in illuminated violet and gold confetti storm, high energy commercial product staging'
      }
    ]
  },

  // 11. Social Media Influencers
  {
    category: 'Social Media Influencers',
    titles: [
      'Virtual Persona & AI Influencer Architect',
      'Short-Form Video & Trending Reels Synthesizer',
      'Lifestyle & Aesthetic Feed Content Director',
      'Virtual Fashion Model & Collab Creator',
      'Travel & Wanderlust Digital Nomad Influencer',
      'Tech Reviewer & AI Gadget Creator Persona'
    ],
    bios: [
      'Building ultra-consistent virtual AI influencers with established personalities, follower engagement, and brand partnerships.',
      'Crafting viral reels, trending lip-sync hooks, and aesthetic day-in-the-life vlogs with realistic digital personas.',
      'Curating cohesive Instagram grid aesthetics with warm minimalist coffee runs, street style, and golden hour portraiture.',
      'Collaborating with leading fashion brands to model luxury capsule collections on virtual avatars across 15+ countries.',
      'Documenting nomadic lifestyle journeys from Bali cafes to Swiss chalets with mesmerizing digital storytelling.',
      'Producing virtual gadget unboxings, desk setup transformations, and future tech reviews with engaging storytelling.'
    ],
    specializations: [
      'Virtual Influencer Identity',
      'Trending Reel Formats',
      'Aesthetic Feed Curation',
      'Digital Model Partnerships',
      'Virtual Nomad Vlogs',
      'Tech Desk Setups'
    ],
    skillsList: [
      ['Face Consistency LoRA', 'Persona Storytelling', 'Brand Collaborations'],
      ['Reels Pacing', 'Voice Syncing with ElevenLabs', 'CapCut Templates'],
      ['Color Palette Harmony', 'Lifestyle Framing', 'High-Res Stills'],
      ['Outfit Consistency', 'Fashion Styling', 'Editorial Posing'],
      ['Travel Scenarios', 'POV Vlogging', 'Atmospheric Lighting'],
      ['Unboxing Staging', 'Gadget Renders', 'Voiceover Narration']
    ],
    toolsList: [
      ['ComfyUI', 'FaceID', 'Midjourney v6.1'],
      ['Kling AI', 'ElevenLabs', 'Runway Gen-3'],
      ['Midjourney v6.1', 'Lightroom AI', 'FLUX.1 Pro'],
      ['ComfyUI', 'FLUX.1 Dev', 'Photoshop'],
      ['Runway Gen-3', 'Midjourney', 'ElevenLabs'],
      ['Midjourney v6.1', 'HeyGen', 'CapCut AI']
    ],
    baseRate: 28000,
    format: 'Video & Motion',
    projectTemplates: [
      {
        title: 'Virtual Influencer "Aria": 30-Day Content Suite',
        description: 'Complete 30-post cohesive Instagram grid featuring morning matcha, urban rooftop walks, and casual streetwear.',
        deliverables: ['30x High-Res Feed Stills', '6x Dynamic Reels'],
        prompt: 'Aesthetic virtual model in stylish beige trench coat sipping matcha latte outside modern sunlit Tokyo cafe, natural film grain'
      },
      {
        title: 'Minimalist Desk Setup: Viral Reel Walkthrough',
        description: 'POV tour of ultra-clean Scandinavian desk setup with curved monitor, ambient backlight, and floating mechanical keyboard.',
        deliverables: ['1x 30s Viral Reel', '5x Detail Stills'],
        prompt: 'Minimalist wooden desk with ultrawide monitor displaying code, warm amber desk lamp, mechanical keyboard, aesthetic plant'
      },
      {
        title: 'Golden Hour Paris Rooftop Golden Hour Series',
        description: 'Dreamy lifestyle shots overlooking Eiffel Tower at sunset with vintage champagne and chic silk outfit.',
        deliverables: ['8x Editorial Social Stills'],
        prompt: 'Chic stylish influencer sitting on Paris balcony holding vintage glassware, golden sunset illuminating Eiffel Tower background'
      }
    ]
  },

  // 12. Entertainment & Comedy
  {
    category: 'Entertainment & Comedy',
    titles: [
      'Satirical Comedy & Parody Video Director',
      'Animated Sketch & Character Voice Synthesizer',
      'Sci-Fi Fantasy Micro-Short Filmmaker',
      'Meme Culture & Viral Humor Animator',
      'Audio-Reactive Music Video Visualist',
      'Immersive Theater & Digital Stage Designer'
    ],
    bios: [
      'Creating hilarious generative deep-parodies, relatable workplace sketch comedy, and trending satirical shorts.',
      'Synthesizing original cartoon characters, celebrity parody impersonations, and voiceover-driven comedic narratives.',
      'Directing dramatic 60-second sci-fi epics with cinematic score, cliffhanger narrative pacing, and Hollywood visual punch.',
      'Translating current internet meme trends into hyper-realistic 3D animations that drive millions of shares.',
      'Crafting hypnotic audio-reactive visualizers, psychedelic narrative loops, and festival LED stage backdrops.',
      'Designing digital projection mapping, virtual theater sets, and dynamic holographic concert backdrops.'
    ],
    specializations: [
      'Workplace Satire Shorts',
      'Character Voice Comedy',
      'Micro-Sci-Fi Films',
      '3D Meme Animations',
      'Music Video Loops',
      'Concert LED Visuals'
    ],
    skillsList: [
      ['Humor Timing', 'Facial Expression Prompts', 'ElevenLabs Voice Clones'],
      ['Character Consistency', 'Dynamic Lip-Sync', 'Sound FX Mixing'],
      ['Dramatic Lighting', 'Cliffhanger Pacing', 'Runway Motion Brush'],
      ['Meme Adaptation', 'Fast Trend Turnaround', 'Viral Hooks'],
      ['Audio Beat-Syncing', 'Psychedelic VFX', 'ComfyUI AnimateDiff'],
      ['Stage Resolution Scaling', 'Atmospheric Lighting', 'VJ Loops']
    ],
    toolsList: [
      ['ElevenLabs', 'Kling AI', 'Runway Gen-3'],
      ['HeyGen', 'Midjourney v6.1', 'ElevenLabs'],
      ['Runway Gen-3', 'Midjourney v6.1', 'Suno v3.5'],
      ['ComfyUI', 'Kling AI', 'CapCut AI'],
      ['ComfyUI AnimateDiff', 'TouchDesigner AI', 'FLUX.1'],
      ['Midjourney v6.1', 'Runway Gen-3', 'After Effects']
    ],
    baseRate: 22000,
    format: 'Video & Motion',
    projectTemplates: [
      {
        title: 'The AI Corporate Standup: 60s Viral Comedy Reel',
        description: 'Witty satirical sketch parodying endless corporate video meetings with hilarious glitchy avatars.',
        deliverables: ['1x 60s Master Sketch', '3x Short Memes'],
        prompt: 'Funny corporate meeting where participant avatars glitch into medieval knights while arguing over quarterly spreadsheets'
      },
      {
        title: 'Cyberpunk Neon Detective: Micro-Film Teaser',
        description: 'Moody film noir teaser following a cyborg detective interrogating an android bartender in neon rain.',
        deliverables: ['1x 45s Cinematic Teaser', 'Original Soundtrack Clip'],
        prompt: 'Cyborg detective in trenchcoat smoking glowing cigarette in neon-drenched retro-futuristic alley, moody noir shadows'
      },
      {
        title: 'Festival Stage Visualizer: Holographic Portal Loop',
        description: 'Seamless 4K stage loop showing an ancient stone ring spinning into a vibrant vortex of crystalline light.',
        deliverables: ['1x Seamless 4K VJ Loop', 'Audio-Reactive Variants'],
        prompt: 'Giant stone portal hovering over alien desert emitting pulsing ultraviolet geometric energy rings, 60fps loop'
      }
    ]
  },

  // 13. Science & Research
  {
    category: 'Science & Research',
    titles: [
      'Astrophysics & Deep Space Cinematographer',
      'Molecular Biology & Biochemistry Illustrator',
      'Quantum Mechanics & Subatomic Animator',
      'Climate Science & Geophysics Data Visualizer',
      'Neuroscience & Brain Connectome Artist',
      'Nanotechnology & Material Science Specialist'
    ],
    bios: [
      'Visualizing distant exoplanets, supermassive black hole accretion disks, and nebula stellar nurseries with scientific grounding.',
      'Translating protein crystallography, enzyme catalytic cycles, and cellular organelles into peer-reviewed cover art.',
      'Rendering quantum tunneling, wavefunction collapses, and particle collider antimatter collisions in vivid detail.',
      'Mapping global atmospheric ocean currents, tectonic fault movements, and ice sheet dynamics from satellite datasets.',
      'Simulating synaptic action potentials, neural axon pathway networks, and neurotransmitter diffusion at high resolution.',
      'Designing carbon nanotube lattices, graphene sheets, and molecular nanorobots for academic and biotech institutions.'
    ],
    specializations: [
      'Deep Space & Astrophysics',
      'Biochem & Molecular Art',
      'Quantum Particle Animation',
      'Climate & Geophysical Maps',
      'Neural Connectome Visuals',
      'Nanotech & Materials'
    ],
    skillsList: [
      ['Accretion Disk Shaders', 'Nebula Volumetrics', 'Gravitational Lensing'],
      ['PDB Protein Models', 'Subsurface Organic Scattering', 'Biochemical Accuracy'],
      ['Wavefunction Visualizers', 'Particle Sim', 'Neon Quantum Glow'],
      ['GIS Map Overlays', 'Ocean Thermal Dynamics', 'Satellite Data Staging'],
      ['Neural Pathways', 'Fluorescent Microscopy Look', 'Brain Micro-Structure'],
      ['Molecular Lattice Rendering', 'Electron Microscope Realism', 'Nanotech']
    ],
    toolsList: [
      ['Midjourney v6.1', 'Runway Gen-3', 'ComfyUI'],
      ['FLUX.1 Pro', 'Midjourney v6.1', 'Photoshop'],
      ['Runway Gen-3', 'ComfyUI', 'Kling AI'],
      ['FLUX.1 Pro', 'Midjourney v6.1', 'QGIS AI'],
      ['Midjourney v6.1', 'Runway Gen-3', 'Photoshop'],
      ['FLUX.1 Pro', 'Blender AI', 'ComfyUI']
    ],
    baseRate: 34000,
    format: 'Video & Motion',
    projectTemplates: [
      {
        title: 'Supermassive Black Hole: Accretion Disk Flyaround',
        description: 'Relativistically beamed glowing orange accretion disk bending light around a pitch black event horizon.',
        deliverables: ['1x 45s Scientific Video', '8x 4K Research Graphics'],
        prompt: 'Scientific simulation of supermassive black hole with glowing plasma accretion disk bending spacetime, gravitational lensing, 8K'
      },
      {
        title: 'Ribosome Protein Synthesis 3D Mechanism',
        description: 'Ribosome reading mRNA messenger strand and synthesizing a growing polypeptide amino acid chain.',
        deliverables: ['Academic Journal Cover Art', 'Slide Deck Assets'],
        prompt: 'Molecular visualization of cellular ribosome assembling glowing protein chain from tRNA molecules, bioluminescent blue and amber'
      },
      {
        title: 'Brain Neural Connectome: Synaptic Network Glow',
        description: 'Thousands of luminescent neurons firing synchronized electrical impulses across cerebral cortex.',
        deliverables: ['1x 30s Loop', '10x Microscopic Stills'],
        prompt: 'Dense network of transparent glowing blue neurons transmitting electrical gold spark impulses, dark background, macro depth of field'
      }
    ]
  },

  // 14. Real Estate
  {
    category: 'Real Estate',
    titles: [
      'Ultra-Luxury Villa & Penthouse Visualizer',
      'Architectural Concept & Biophilic Home Designer',
      'Commercial Skyscraper & Mixed-Use Animator',
      'Interior Virtual Staging & Scandinavian Styler',
      'Resort Masterplan & Aerial Real Estate Filmmaker',
      'Historic Renovation & Adaptive Reuse Artist'
    ],
    bios: [
      'Creating photorealistic marketing flythroughs for high-end beachfront mansions, cliffside penthouses, and private islands.',
      'Pioneering biophilic architecture renders blending organic rammed-earth walls, living indoor trees, and sunlit courtyards.',
      'Rendering multi-tower commercial skylines, pedestrian plazas, and transit-oriented developments for real estate developers.',
      'Transforming vacant luxury concrete shells into warmly furnished Scandinavian, Japandi, and contemporary spaces.',
      'Synthesizing majestic bird’s-eye masterplan flyovers showcasing golf courses, marinas, and residential communities.',
      'Reimagining historic industrial brick warehouses and heritage palaces into modern luxury residential lofts.'
    ],
    specializations: [
      'Luxury Villa Renderings',
      'Biophilic Architectural Art',
      'Skyscraper & Masterplans',
      'Virtual Interior Staging',
      'Aerial Resort Masterplans',
      'Heritage Loft Renovation'
    ],
    skillsList: [
      ['Architectural Lighting', 'Glass & Water Refractions', 'D5 / Lumion Look'],
      ['Biophilic Design', 'Indoor Vegetation Realism', 'Earth Tone Shaders'],
      ['Urban Scale Perspective', 'Pedestrian Life Staging', 'Twilight Renders'],
      ['Furniture Layouts', 'Fabric Soft Goods Textures', 'Warm Daylight'],
      ['Masterplan Orthographics', 'Drone Camera Curves', 'Topaz Upscaling'],
      ['Historic Brick Patina', 'Industrial Steel Windows', 'Modern Lighting']
    ],
    toolsList: [
      ['FLUX.1 Pro', 'Midjourney v6.1', 'Runway Gen-3'],
      ['Midjourney v6.1', 'FLUX.1 Pro', 'Photoshop'],
      ['Runway Gen-3', 'FLUX.1 Pro', 'Topaz Video'],
      ['FLUX.1 Pro', 'ComfyUI', 'Photoshop GenFill'],
      ['Kling AI', 'Midjourney v6.1', 'Runway Gen-3'],
      ['Midjourney v6.1', 'FLUX.1 Pro', 'Photoshop']
    ],
    baseRate: 32000,
    format: '3D & Virtual',
    projectTemplates: [
      {
        title: 'Monaco Cliffside Penthouse: Sunset Tour',
        description: 'Infinity pool suspended over Mediterranean azure waters with floor-to-ceiling glass walls and Italian marble interior.',
        deliverables: ['1x 45s Flythrough Video', '12x High-Res Marketing Stills'],
        prompt: 'Luxury penthouse terrace overlooking Mediterranean sunset with glass infinity pool, travertine marble deck and warm evening lighting'
      },
      {
        title: 'Japandi Biophilic Residence: Interior Suite',
        description: 'Minimalist oak wood cabinetry, paper lanterns, bonsai courtyard, and soft linen furnishings in sunlit daylight.',
        deliverables: ['8x Interior Staging Renders'],
        prompt: 'Japandi interior living room with light oak slatted walls, low linen sofa, sliding shoji screens, soft natural daylight, peaceful'
      },
      {
        title: 'Skyline Landmark Tower: Glass Facade Twilight',
        description: 'Twisting architectural tower reflecting evening sunset clouds over metropolitan waterfront skyline.',
        deliverables: ['1x 30s Exterior Flyaround', 'Billboard Key Visual'],
        prompt: 'Futuristic sculptural glass skyscraper reflecting pink sunset clouds over illuminated urban bay, architectural photograph 8K'
      }
    ]
  },

  // 15. E-commerce & Product Advertising
  {
    category: 'E-commerce & Product Advertising',
    titles: [
      'Luxury Consumer Tech & Audio Product Renderer',
      'Cosmetic Bottle & Liquid Viscosity Specialist',
      'Footwear & Streetwear Product Cinematographer',
      'Eco-Packaging & CPG Branding Visualizer',
      'Fine Watches & Horology Macro Artist',
      'High-Conversion Amazon & Shopify Image Suite Specialist'
    ],
    bios: [
      'Rendering matte black anodized aluminum gadgets, noise-canceling headphones, and smart home speakers in studio environments.',
      'Mastering perfume glass caustics, splash physics, serum viscosity, and luxury embossing for beauty brand campaigns.',
      'Showcasing futuristic sneakers on floating pedestals with dynamic lighting, material breakdown layers, and outsole details.',
      'Designing sustainable paperboard boxes, biodegradable bottles, and clean minimalist consumer packaged goods.',
      'Capturing intricate mechanical watch gears, guilloché dials, and sapphire crystal anti-reflective coatings with macro fidelity.',
      'Crafting complete 7-image Amazon listing conversion suites with infographic callouts, lifestyle staging, and scale comparisons.'
    ],
    specializations: [
      'Consumer Tech Renders',
      'Beauty & Cosmetic Bottles',
      'Footwear Commercial Staging',
      'CPG Eco-Packaging',
      'Horology Macro Watch Art',
      'Amazon Conversion Suites'
    ],
    skillsList: [
      ['Matte Metal Textures', 'Studio Softbox Lighting', 'Exploded View Diagrams'],
      ['Glass Transparency', 'Fluid Splash Dynamics', 'Gold Hot-Stamping'],
      ['Fabric & Mesh Textures', 'Kinetic Lighting', 'Sneaker Deconstruction'],
      ['Paperboard Texture Realism', 'Minimalist Branding', 'Color Accuracies'],
      ['Macro Depth of Field', 'Metallic Brushed Finishes', 'Jeweled Movements'],
      ['Infographic Callouts', 'White Background Isolation', 'Dimensions Staging']
    ],
    toolsList: [
      ['FLUX.1 Pro', 'Midjourney v6.1', 'Photoshop'],
      ['ComfyUI', 'FLUX.1 Pro', 'Runway Gen-3'],
      ['Midjourney v6.1', 'Runway Gen-3', 'Photoshop'],
      ['FLUX.1 Pro', 'Illustrator AI', 'Midjourney'],
      ['FLUX.1 Pro', 'Midjourney v6.1', 'Topaz Photo'],
      ['Canva AI', 'FLUX.1 Pro', 'Photoshop GenFill']
    ],
    baseRate: 26000,
    format: 'Stills & Photography',
    projectTemplates: [
      {
        title: 'Wireless Audiophile Headphones: Commercial Hero Suite',
        description: 'Matte titanium headphones hovering in dark studio with soft violet edge lights and acoustic wave backdrop.',
        deliverables: ['10x Studio Product Stills', '1x 20s Exploded View Reel'],
        prompt: 'Studio hero shot of sleek matte black over-ear headphones floating on dark slate, precision rim lighting, premium tech product'
      },
      {
        title: 'Botanical Eau De Parfum: Amber Bottle Splash',
        description: 'Faceted crystal perfume bottle resting in clear stream with wild orchids and water droplets suspended in mid-air.',
        deliverables: ['6x Campaign Stills', 'Social Banner Package'],
        prompt: 'Luxury perfume bottle on mossy wet river stone surrounded by gentle water ripples and wild white orchids, sunlight caustics'
      },
      {
        title: 'Mechanical Tourbillon Watch: Skeleton Dial Macro',
        description: 'Extreme close-up of rotating gold tourbillon cage, rubies, and blued screws behind sapphire crystal.',
        deliverables: ['8x Ultra-Macro Horology Stills'],
        prompt: 'Macro photography of luxury skeleton mechanical watch movement, blued titanium hands, ruby jewels, polished bevels, studio lighting'
      }
    ]
  },

  // 16. Photography & Videography
  {
    category: 'Photography & Videography',
    titles: [
      'Cinematic Film Still & Anamorphic Director',
      'Moody Street & Documentary Portraitist',
      'Vintage 35mm Analog & Film Emulsion Specialist',
      'Editorial Studio Portrait & Strobe Master',
      'Golden Hour Landscape & Travel Cinematographer',
      'Experimental High-Fashion Film Director'
    ],
    bios: [
      'Crafting cinematic 2.39:1 widescreen stills with anamorphic blue horizontal flares, halation, and Kodak 5219 film grain.',
      'Capturing authentic human emotion, urban alleyway grit, and candid slice-of-life portraits in bustling metropolises.',
      'Replicating genuine vintage Portra 400, Tri-X 400 black-and-white, and Cinestill 800T halation aesthetics.',
      'Mastering dramatic high-contrast studio strobe lighting, colored gels, and sculpted Rembrandt facial portraiture.',
      'Shooting sweeping golden hour vistas, sunlit misty pine forests, and dramatic coastal sea cliffs with cinematic warmth.',
      'Directing surrealist fashion micro-films with non-linear pacing, double exposures, and dreamlike visual metaphors.'
    ],
    specializations: [
      'Anamorphic Film Stills',
      'Documentary Street Portraits',
      'Analog Film Emulation',
      'Dramatic Studio Strobes',
      'Golden Hour Landscapes',
      'Surrealist Fashion Films'
    ],
    skillsList: [
      ['Anamorphic Bokeh', 'Color Grading LUTs', 'Atmospheric Haze'],
      ['Candid Framing', 'Natural Light Scenarios', 'Street Storytelling'],
      ['Film Stock Emulation', 'Halation & Grain', 'Vintage Color Palettes'],
      ['Split Lighting', 'Strobe Sync', 'Editorial Skin Retouching'],
      ['Golden Hour Rays', 'Landscape Composition', 'HDR Dynamic Range'],
      ['Double Exposure Art', 'Abstract Color Palettes', 'Runway Gen-3 Motion']
    ],
    toolsList: [
      ['Midjourney v6.1', 'Runway Gen-3', 'Dehancer AI'],
      ['Midjourney v6.1', 'FLUX.1 Pro', 'Lightroom AI'],
      ['FLUX.1 Pro', 'ComfyUI', 'Photoshop'],
      ['Midjourney v6.1', 'FLUX.1 Pro', 'Photoshop'],
      ['Midjourney v6.1', 'Runway Gen-3', 'Topaz Photo'],
      ['Runway Gen-3', 'Midjourney v6.1', 'After Effects']
    ],
    baseRate: 28000,
    format: 'Stills & Photography',
    projectTemplates: [
      {
        title: 'Neon Tokyo Noir: 12 Anamorphic Film Stills',
        description: 'Cinematic widescreen stills following a lone traveler across Shinjuku crosswalks illuminated by neon kanji signs.',
        deliverables: ['12x 2.39:1 Anamorphic Stills', 'Color Grading Breakdown'],
        prompt: 'Cinematic 35mm film still of lone figure under umbrella on rain-soaked Tokyo street, glowing neon signs reflecting on wet asphalt, halation'
      },
      {
        title: 'Desert Mirage: Kodak Portra 400 Editorial Series',
        description: 'Sun-drenched editorial series in Mojave desert with vintage American sports car and warm analog tones.',
        deliverables: ['10x High-Res Film Emulsion Stills'],
        prompt: 'Warm vintage 35mm photograph of classic sports car parked on desert highway at sunset, soft warm Kodak Portra tones, natural grain'
      },
      {
        title: 'Sculpted Shadows: Monochromatic Strobe Portraits',
        description: 'Striking black and white portraits utilizing dramatic chiaroscuro and sculpted rim light.',
        deliverables: ['8x Fine Art Gallery Stills'],
        prompt: 'Dramatic black and white studio portrait with strong side lighting highlighting facial contours, deep shadows, fine art grain'
      }
    ]
  },

  // 17. Animation & Motion Graphics
  {
    category: 'Animation & Motion Graphics',
    titles: [
      'Procedural 3D & Kinetic Typography Director',
      'Stylized 2D Anime & Cel-Shaded Storyteller',
      'Abstract Geometric & Brand Identity Animator',
      'Isometric Worldbuilding & Game Loop Creator',
      'VFX Liquid Dynamics & Particle Simulation Artist',
      'Broadcast Sports & High-Energy Motion Specialist'
    ],
    bios: [
      'Designing dynamic kinetic typography, fluid morphing brand monograms, and procedural geometric title sequences.',
      'Crafting hand-drawn aesthetic anime shorts, vibrant cel-shaded fight choreography, and emotional character narratives.',
      'Translating abstract strategic concepts into hypnotic 3D loops, shifting optical illusions, and brand systems.',
      'Constructing intricate miniature isometric dioramas, bustling cyberpunk city blocks, and retro game loops.',
      'Simulating photorealistic viscous fluids, fiery nebula explosions, and swirling metaphysical dust storms.',
      'Creating high-voltage sports broadcast openers, player stat cards, and thunderous countdown packages.'
    ],
    specializations: [
      'Kinetic 3D Typography',
      'Cel-Shaded Anime Action',
      'Abstract Geometric Loops',
      'Isometric Dioramas',
      'Fluid & Particle VFX',
      'Sports Broadcast Motion'
    ],
    skillsList: [
      ['Kinetic Type Choreography', '3D Extrusions', 'After Effects AI'],
      ['Anime Keyframing', 'Cel Shading', 'Expressive Line Art'],
      ['Seamless Looping', 'Color Theory', 'Optical Illusions'],
      ['Isometric Perspective', 'Miniature Lighting', 'Pixel Art Polish'],
      ['Fluid SPH Solvers', 'Particle Fields', 'Volumetric Shaders'],
      ['High-Energy Transitions', 'Impact Frames', 'Sound Design Sync']
    ],
    toolsList: [
      ['ComfyUI AnimateDiff', 'After Effects', 'Midjourney v6.1'],
      ['Runway Gen-3', 'Kling AI', 'Midjourney v6.1'],
      ['ComfyUI', 'Midjourney v6.1', 'Cinema4D AI'],
      ['Midjourney v6.1', 'FLUX.1 Pro', 'Blender AI'],
      ['Runway Gen-3', 'ComfyUI', 'Topaz Video'],
      ['After Effects AI', 'Runway Gen-3', 'Kling AI']
    ],
    baseRate: 30000,
    format: 'Video & Motion',
    projectTemplates: [
      {
        title: 'Kinetic Brand Manifesto: Morphing Monogram Sequence',
        description: 'Futuristic animated brand film where typographic letters dissolve into fluid glass ribbons and snap into place.',
        deliverables: ['1x 30s Master Loop', 'Social Cutdowns'],
        prompt: 'Abstract liquid glass typography transforming smoothly into modern tech brand logo, illuminated by soft violet and teal caustics'
      },
      {
        title: 'Neo-Tokyo Cyber Samurai: Anime Combat Sequence',
        description: 'Vibrant cel-shaded action duel atop a rain-soaked pagoda with lightning sparks and laser katanas.',
        deliverables: ['1x 45s Action Sequence', 'Character Model Sheets'],
        prompt: 'Studio Trigger style anime samurai clashing glowing swords in torrential rain on neon pagoda roof, dynamic camera angle'
      },
      {
        title: 'Cyberpunk Arcade: Isometric Night Diorama',
        description: 'Miniature floating cube containing a bustling multi-level arcade with ramen stall and flashing retro CRT screens.',
        deliverables: ['1x Seamless 4K Loop', '5x Isometric Stills'],
        prompt: 'Detailed isometric 3D miniature diorama of cozy cyberpunk ramen bar with glowing lanterns and cat sleeping on rooftop'
      }
    ]
  },

  // 18. Music & Audio
  {
    category: 'Music & Audio',
    titles: [
      'Commercial Soundtrack & AI Score Composer',
      'Audio Waveform & Generative Frequency Artist',
      'Podcast Voice Cloning & Multilingual Dubbing Specialist',
      'Spatial Audio & Sonic Branding Sound Designer',
      'Lo-Fi Beats & Ambient Soundscape Producer',
      'Electronic Dance Music & Synthwave Producer'
    ],
    bios: [
      'Composing full cinematic scores, commercial advertising jingles, and emotional backing tracks using Suno and Udio.',
      'Visualizing sound frequencies into breathtaking holographic 3D waveforms, cymatics plates, and audio-reactive lasers.',
      'Engineering natural multilingual podcast dubs, studio voice restorations, and crystal clear voiceovers with ElevenLabs.',
      'Crafting unforgettable brand audio logos, UI sonic feedback cues, and binaural 3D spatial audio experiences.',
      'Producing cozy lo-fi hip hop study beats paired with looping anime room animations that garner millions of streams.',
      'Producing retro 80s synthwave anthems, driving neon basslines, and punchy festival drop tracks for media campaigns.'
    ],
    specializations: [
      'Cinematic Commercial Scores',
      'Cymatics & Audio Waveforms',
      'Voice Cloning & Dubbing',
      'Sonic Brand Identity',
      'Lo-Fi Beats & Ambient',
      'Synthwave & EDM Tracks'
    ],
    skillsList: [
      ['Prompt-to-Music Composition', 'Stem Separation', 'Mastering Polish'],
      ['Cymatics Sound Waves', 'Audio-Reactive Motion', 'Spectrum Shaders'],
      ['Voice Cloning Accuracy', 'Emotional Cadence', 'Lip-Sync Alignment'],
      ['Sonic Branding Logos', 'Binaural Audio', 'Sound Design Effects'],
      ['Chillhop Beats', 'Atmospheric Textures', 'Loop Production'],
      ['Analog Synth Emulation', 'Sidechain Compression', 'Drop Energy']
    ],
    toolsList: [
      ['Suno v3.5', 'Udio v1.5', 'Logic Pro'],
      ['Midjourney v6.1', 'TouchDesigner AI', 'ComfyUI'],
      ['ElevenLabs', 'HeyGen', 'Adobe Audition'],
      ['ElevenLabs', 'Suno v3.5', 'Ableton Live'],
      ['Suno v3.5', 'Midjourney v6.1', 'CapCut AI'],
      ['Udio', 'FL Studio', 'Runway Gen-3']
    ],
    baseRate: 20000,
    format: 'Audio & Voice',
    projectTemplates: [
      {
        title: 'Electric Vehicle Commercial: Original Cinematic Score',
        description: 'Orchestral hybrid score building from subtle heartbeat pulse to triumphant soaring brass and synthesizer climax.',
        deliverables: ['1x 60s Master Score', 'Stems & Instrumental Cuts'],
        prompt: 'Futuristic audio waveform sculpture made of liquid gold and titanium pulsing to heartbeat rhythm, dark studio setting'
      },
      {
        title: 'Cymatics in Liquid Mercury: Sound Frequency Art',
        description: 'Hypnotic geometric resonance patterns forming on liquid metal dish vibrating at sacred solfeggio frequencies.',
        deliverables: ['1x 30s Audio-Visual Loop', '6x High-Res Cymatic Stills'],
        prompt: 'Sacred geometric mandala formed on surface of vibrating liquid mercury, illuminated by soft violet and gold studio rim lighting'
      },
      {
        title: 'Midnight Coding: 10-Track Lo-Fi Chillhop Album',
        description: 'Curated 10-track lo-fi album complete with warm vinyl crackle, tape saturation, and illustrated anime loop.',
        deliverables: ['10x Full Tracks', 'Album Cover Art & Animated Loop'],
        prompt: 'Anime girl wearing large headphones studying at desk on rainy night, warm lamp, sleeping cat on windowsill, cozy lo-fi art'
      }
    ]
  },

  // 19. Lifestyle & Personal Development
  {
    category: 'Lifestyle & Personal Development',
    titles: [
      'Mindful Living & Morning Routine Visualist',
      'Executive Productivity & Workspace Architect',
      'Habit Tracking & Journaling Content Designer',
      'Scandinavian Hygge & Cozy Living Storyteller',
      'Digital Detox & Nature Immersion Filmmaker',
      'Holistic Wellness & Self-Care Reel Creator'
    ],
    bios: [
      'Curating inspiring 5:00 AM morning routines, mindfulness meditations, and clean holistic lifestyle sequences.',
      'Designing aesthetic ergonomic home offices, dual-monitor executive desks, and focus-enhancing productivity spaces.',
      'Creating aesthetic digital planner templates, bullet journal spreads, and motivational visual quote carousels.',
      'Evoking warm Danish hygge with flickering beeswax candles, oversized wool blankets, and steaming artisan tea mugs.',
      'Documenting restorative forest bathing walks, mountain cabin retreats, and intentional slow living.',
      'Producing viral self-care reels, evening wind-down rituals, and holistic herbal tea preparations.'
    ],
    specializations: [
      'Mindful Morning Routines',
      'Productive Desk Setups',
      'Digital Planner Assets',
      'Cozy Hygge Living',
      'Forest Bathing Films',
      'Self-Care Evening Rituals'
    ],
    skillsList: [
      ['Natural Soft Lighting', 'Warm Color Palettes', 'Serene Pacing'],
      ['Clean Ergonomic Staging', 'Minimalist Composition', 'Ambient Backlight'],
      ['Planner Typography', 'Social Carousel Design', 'Canva AI'],
      ['Texture Warmth', 'Cozy Candlelight', 'Hygge Aesthetics'],
      ['Forest Nature Audio', 'Slow Motion Wind', 'Earthy Tones'],
      ['Evening Lighting', 'Skincare Rituals', 'Reels Hook Creation']
    ],
    toolsList: [
      ['Midjourney v6.1', 'Runway Gen-3', 'Lightroom AI'],
      ['FLUX.1 Pro', 'Midjourney v6.1', 'Photoshop'],
      ['Midjourney v6.1', 'Canva AI', 'Photoshop'],
      ['Midjourney v6.1', 'FLUX.1 Pro', 'Lightroom AI'],
      ['Runway Gen-3', 'ElevenLabs', 'Midjourney'],
      ['Kling AI', 'CapCut AI', 'Midjourney v6.1']
    ],
    baseRate: 19000,
    format: 'Stills & Photography',
    projectTemplates: [
      {
        title: 'The 5 AM Miracle: Morning Ritual Reel Suite',
        description: 'Inspiring sequence showing gentle alarm, lemon water, journaling in sunrise rays, and calm yoga stretch.',
        deliverables: ['1x 45s Viral Reel', '10x Aesthetic Stills'],
        prompt: 'Peaceful morning ritual with fresh journal open beside glass of warm water on sunlit wooden kitchen table, golden morning rays'
      },
      {
        title: 'Deep Focus: Minimalist Walnut Desk Suite',
        description: 'Architectural solid walnut desk with minimalist ultrawide display, warm desk mat, and brass task lamp.',
        deliverables: ['8x High-Res Workspace Stills'],
        prompt: 'Minimalist executive workspace with solid walnut desk, clean ambient brass task lamp, mechanical keyboard, calm room'
      },
      {
        title: 'Alpine Cabin Rain: Meditative Hygge Evening',
        description: 'Warm cedar wood cabin with rain tapping against giant picture window overlooking evergreen pine forest.',
        deliverables: ['1x 15-min Ambience Video', 'Soundscape Audio'],
        prompt: 'Cozy wooden cabin interior with fireplace crackling while rain falls outside large window overlooking misty pine trees'
      }
    ]
  },

  // 20. News & Media
  {
    category: 'News & Media',
    titles: [
      'Broadcast Studio & Digital Newsroom Director',
      'Investigative Journalism & Explainer Animator',
      'Editorial Infographics & Global Data Cartographer',
      'Documentary Archival & Photojournalism Restorer',
      'Breaking News Social Graphics Automator',
      'Podcast Network Brand & Key Visual Designer'
    ],
    bios: [
      'Designing cutting-edge broadcast television newsroom sets, curved virtual video walls, and lower-third graphics.',
      'Synthesizing geopolitical explainer documentaries, complex investigative flows, and historical background reels.',
      'Visualizing interactive world maps, election results, global supply chain corridors, and economic indices.',
      'Restoring historical news footage and generating photorealistic re-enactments for journalistic documentaries.',
      'Automating instant breaking news templates for news networks on X, Instagram, and YouTube Community.',
      'Crafting premium cover art, episodic promo clips, and audiograms for leading daily news podcasts.'
    ],
    specializations: [
      'Virtual Broadcast Sets',
      'Geopolitical Explainers',
      'Global Data Cartography',
      'Archival Re-enactments',
      'Fast Breaking News GFX',
      'News Podcast Branding'
    ],
    skillsList: [
      ['Broadcast Resolution GFX', 'Lower Third Packages', 'Newsroom Lighting'],
      ['Documentary Scripting', 'Pacing & Tone', 'Runway Camera Moves'],
      ['Geographic Mapping', 'Choropleth Infographics', 'Editorial Balance'],
      ['Historic Film Patina', 'Documentary Authenticity', 'Topaz Restoration'],
      ['Fast Turnaround Templates', 'Automated Resizes', 'Clean Typography'],
      ['Podcast Cover Art', 'Audiogram Styling', 'Audiowaveform Animation']
    ],
    toolsList: [
      ['Midjourney v6.1', 'After Effects AI', 'Runway Gen-3'],
      ['Runway Gen-3', 'ElevenLabs', 'Midjourney v6.1'],
      ['FLUX.1 Pro', 'QGIS AI', 'Illustrator AI'],
      ['Topaz Video AI', 'Midjourney v6.1', 'Photoshop'],
      ['Canva AI', 'Photoshop GenFill', 'FLUX.1'],
      ['Midjourney v6.1', 'ElevenLabs', 'Canva AI']
    ],
    baseRate: 27000,
    format: 'Video & Motion',
    projectTemplates: [
      {
        title: 'The AI Century: 3-Part Investigative Documentary',
        description: 'Comprehensive investigative explainer tracing the geopolitical race for advanced microchips and GPU datacenters.',
        deliverables: ['3x 3-min Documentary Chapters', 'Social Teaser Suite'],
        prompt: 'High-tech television news broadcast studio with curved video walls displaying global data maps, modern lighting'
      },
      {
        title: 'Global Chip Supply Chain: Isometric 3D Map',
        description: 'Interconnected global map detailing silicon wafer transport routes from Taiwan, Netherlands, and South Korea.',
        deliverables: ['High-Res Infographic Poster', 'Motion Graphic Loop'],
        prompt: 'Stylized 3D global geopolitical map showing glowing shipping lanes and illuminated semiconductor fabrication hubs'
      },
      {
        title: 'Election Night 2026: Live Broadcast GFX Suite',
        description: 'Dynamic lower-thirds, tally scoreboards, breaking news alerts, and electoral vote countdown packages.',
        deliverables: ['12x Broadcast Asset Overlays'],
        prompt: 'Ultra-modern broadcast television lower third graphic package with blue and crimson glass banners and breaking news badge'
      }
    ]
  },

  // 21. Automotive
  {
    category: 'Automotive',
    titles: [
      'Electric Supercar & Hypercar Commercial Director',
      'Concept Vehicle & Exterior Aerodynamics Designer',
      'Luxury Cockpit & Automotive Interior Specialist',
      'Off-Road Overland & Adventure Truck Visualist',
      'Motorsport & Track Racing Cinematographer',
      'Classic Vintage Car Restomod Visualizer'
    ],
    bios: [
      'Directing high-octane commercial spots for high-performance electric supercars ripping through mountain switchbacks.',
      'Designing futuristic concept vehicles, active aerodynamic spoilers, gullwing doors, and sculpted carbon fiber splitters.',
      'Rendering luxury hand-stitched Nappa leather cockpits, illuminated ambient light strips, and curved OLED infotainment screens.',
      'Crafting rugged overland truck campaigns traversing muddy rivers, sand dunes, and snowdrifts with raw elemental power.',
      'Capturing track-day apex corners, smoking tire drifts, glowing ceramic brakes, and aerodynamic speed blur.',
      'Reimagining vintage 1970s sports cars with modern electric powertrains, carbon fiber bodywork, and LED lighting.'
    ],
    specializations: [
      'Hypercar Commercial Films',
      'Aerodynamic Concept Vehicles',
      'Luxury Cockpit Renders',
      'Overland Off-Road Campaigns',
      'Track Racing Action',
      'Restomod Vintage Cars'
    ],
    skillsList: [
      ['Car Paint Shader Realism', 'Motion Blur Curves', 'Wet Asphalt Reflections'],
      ['Concept Vehicle Design', 'Airflow Caustics', 'Carbon Fiber Textures'],
      ['Interior Stitching Detail', 'Infotainment UI Glow', 'Leather Sheen'],
      ['Mud & Dust Particle Sim', 'Rugged Lighting', 'Dramatic Off-Road Angles'],
      ['High-Speed Tracking Shot', 'Brake Caliper Glow', 'Sound FX Sync'],
      ['Vintage Proportions', 'Modern LED Retrofit', 'Studio Automotive Lighting']
    ],
    toolsList: [
      ['Runway Gen-3', 'Midjourney v6.1', 'Topaz Video'],
      ['Midjourney v6.1', 'FLUX.1 Pro', 'Blender AI'],
      ['FLUX.1 Pro', 'Midjourney v6.1', 'Photoshop'],
      ['Kling AI', 'Runway Gen-3', 'Midjourney v6.1'],
      ['Runway Gen-3', 'Kling AI', 'Topaz 60fps'],
      ['FLUX.1 Pro', 'Midjourney v6.1', 'Photoshop']
    ],
    baseRate: 36000,
    format: 'Video & Motion',
    projectTemplates: [
      {
        title: 'Project Apex: 2000HP Hypercar Launch Film',
        description: 'Thrilling commercial spot tracking matte black electric hypercar carving alpine pass at sunset with glowing taillights.',
        deliverables: ['1x 60s Launch Spot', '8x 4K Automotive Press Stills'],
        prompt: 'Futuristic matte black electric hypercar drifting through wet mountain road corner at sunset, red taillight streaks, 8K commercial'
      },
      {
        title: 'Autonomous Luxury Lounge Cockpit Concept',
        description: 'Swiveling cashmere armchairs, floating holographic navigation, and starlight glass roof in self-driving limousine.',
        deliverables: ['6x Interior Perspective Renders'],
        prompt: 'Interior cockpit of futuristic luxury autonomous car with ambient violet lighting, white leather seats and panoramic glass roof'
      },
      {
        title: 'Desert Dunes: 4x4 Cyber Overland Truck',
        description: 'Rugged titanium overland truck kicking up towering sand roosts while conquering massive desert dunes at golden hour.',
        deliverables: ['1x 30s Dynamic Reel', 'Social Banner Suite'],
        prompt: 'Futuristic heavy duty off-road truck climbing massive desert sand dune, sand roosting from aggressive all-terrain tires, golden sunlight'
      }
    ]
  },

  // 22. Agriculture & Farming
  {
    category: 'Agriculture & Farming',
    titles: [
      'Precision Agritech & Drone Farming Animator',
      'Vertical Hydroponic & Indoor Cultivation Visualizer',
      'Organic Harvest & Sustainable Farm Storyteller',
      'Autonomous Tractor & Robotics Field Specialist',
      'Vineyard & Agrigastronomy Terroir Filmmaker',
      'Global Food Security & Regenerative Ag Visualist'
    ],
    bios: [
      'Visualizing smart agricultural drones monitoring crop health with multispectral NDVI thermal mapping sensors.',
      'Rendering futuristic multi-story vertical indoor farms with purple LED grow lights and automated nutrient hydroponics.',
      'Documenting golden wheat field harvests, organic heirloom apple orchards, and regenerative soil restoration.',
      'Simulating autonomous electric tractors tilling precision GPS rows under vast open blue skies.',
      'Capturing historic sun-drenched vineyards, morning dew on grape clusters, and sustainable cellar winemaking.',
      'Illustrating regenerative agricultural practices, nitrogen fixing cover crops, and soil microbiome biodiversity.'
    ],
    specializations: [
      'Agritech Multispectral Drones',
      'Vertical Indoor Greenhouses',
      'Golden Harvest Documentaries',
      'Autonomous Farm Robotics',
      'Vineyard Terroir Films',
      'Regenerative Soil Visuals'
    ],
    skillsList: [
      ['Multispectral Drone Visuals', 'Crop Health Overlays', 'Aerial Topography'],
      ['LED Grow Spectrum Lighting', 'Hydroponic Water Racks', 'Cleanroom Sim'],
      ['Golden Hour Wheat Fields', 'Organic Produce Realism', 'Natural Soundscapes'],
      ['Autonomous Machine Design', 'Precision Furrow Tracking', 'Runway Motion'],
      ['Dewdrop Macro Shading', 'Terroir Sunlight', 'Cinematic Grape Clusters'],
      ['Soil Microorganism Metaphors', 'Carbon Sequestration Art', 'Infographic Charts']
    ],
    toolsList: [
      ['Midjourney v6.1', 'Runway Gen-3', 'QGIS AI'],
      ['FLUX.1 Pro', 'Midjourney v6.1', 'Photoshop'],
      ['Runway Gen-3', 'Midjourney v6.1', 'Topaz Video'],
      ['Kling AI', 'FLUX.1 Pro', 'Runway Gen-3'],
      ['Midjourney v6.1', 'Runway Gen-3', 'Lightroom AI'],
      ['FLUX.1 Pro', 'Midjourney v6.1', 'Canva AI']
    ],
    baseRate: 22000,
    format: 'Video & Motion',
    projectTemplates: [
      {
        title: 'Smart Agronomy: Autonomous Drone Field Scan',
        description: 'Agricultural drone hovering over golden wheat field displaying real-time soil moisture and chlorophyll heatmaps.',
        deliverables: ['1x 45s Commercial Spot', '6x Agritech Marketing Stills'],
        prompt: 'Futuristic agricultural drone scanning golden wheat crop field with transparent holographic data grid, bright sun, 4K'
      },
      {
        title: 'Vertical Eden: 50-Story Hydroponic Farm Tower',
        description: 'Vast architectural greenhouse with glowing magenta LED arrays cultivating millions of fresh organic greens.',
        deliverables: ['1x 30s Flythrough Reel', '8x Cleanroom Renders'],
        prompt: 'High-tech vertical indoor farm with rows of fresh green butterhead lettuce under glowing purple LED grow lights, cleanroom aesthetic'
      },
      {
        title: 'Tuscan Vineyard: Autumn Harvest Terroir',
        description: 'Rolling hills of Tuscany covered in golden grapevines with dewdrops glistening on plump Sangiovese clusters.',
        deliverables: ['10x Fine Art Vineyard Stills', 'Social Banner Kit'],
        prompt: 'Tuscan vineyard landscape in warm morning fog with close-up of dark purple grape cluster on vine with water droplets, sunrise'
      }
    ]
  },

  // 23. Environment & Sustainability
  {
    category: 'Environment & Sustainability',
    titles: [
      'Renewable Energy & Wind / Solar Megaproject Visualizer',
      'Ocean Conservation & Coral Regeneration Filmmaker',
      'Reforestation Robotics & Carbon Offset Storyteller',
      'Circular Economy & Zero-Waste Architecture Artist',
      'Wildlife Habitat & Endangered Species Visualist',
      'Green Hydrogen & Clean Tech Transition Animator'
    ],
    bios: [
      'Rendering colossal offshore wind turbines turning gracefully in sunset seas and vast desert photovoltaic solar farms.',
      'Synthesizing vibrant bioluminescent coral reef restoration projects, sea turtles, and pristine oceanic sanctuaries.',
      'Visualizing automated seed-firing reforestation drones planting biodiverse native trees across deforested landscapes.',
      'Designing zero-waste buildings made of recycled mass timber, biopolymer facades, and closed-loop rainwater collection.',
      'Creating photorealistic endangered wildlife portraits and cinematic habitat preservation documentaries.',
      'Simulating green hydrogen electrolysis facilities, geothermal power tap points, and clean energy transport grids.'
    ],
    specializations: [
      'Offshore Wind & Solar Mega-Arrays',
      'Coral Reef Marine Biology',
      'Drone Reforestation Films',
      'Circular Mass Timber Design',
      'Wildlife Conservation Art',
      'Clean Hydrogen Infrastructure'
    ],
    skillsList: [
      ['Wind Turbine Scale Physics', 'Ocean Swell Shaders', 'Sunset Volumetric Light'],
      ['Underwater Caustics', 'Coral Fluorescence', 'Marine Life Motion'],
      ['Aerial Drone Formations', 'Seedling Planting Sim', 'Forest Canopy Growth'],
      ['Mass Timber Textures', 'Eco-Architecture Layouts', 'Water Filtration Art'],
      ['Fur & Feather Realism', 'Natural Animal Pose Studies', 'Documentary Mood'],
      ['Clean Energy Pipelines', 'Industrial Molecular Models', 'Sustainability Decks']
    ],
    toolsList: [
      ['Runway Gen-3', 'Midjourney v6.1', 'Topaz Video'],
      ['Runway Gen-3', 'Kling AI', 'Midjourney v6.1'],
      ['Kling AI', 'Midjourney v6.1', 'Runway Gen-3'],
      ['FLUX.1 Pro', 'Midjourney v6.1', 'Photoshop'],
      ['Midjourney v6.1', 'FLUX.1 Pro', 'Topaz Photo'],
      ['Runway Gen-3', 'FLUX.1 Pro', 'After Effects']
    ],
    baseRate: 28000,
    format: 'Video & Motion',
    projectTemplates: [
      {
        title: 'North Sea Wind: 15-Gigawatt Offshore Horizon',
        description: 'Majestic aerial sweep past giant 300-meter offshore wind turbines spinning gracefully over calm evening seas.',
        deliverables: ['1x 60s ESG Vision Film', '8x High-Res Energy Stills'],
        prompt: 'Colossal offshore wind turbines standing in calm deep blue ocean water at golden sunset, clean renewable energy commercial, 8K'
      },
      {
        title: 'The Living Reef: Bioluminescent Coral Regeneration',
        description: 'Restored coral reef flourishing with fluorescent polyps, clownfish, and sea turtles under pristine tropical water.',
        deliverables: ['1x 45s Ocean Conservation Clip', '10x Marine Stills'],
        prompt: 'Thriving tropical coral reef teeming with colorful fish and sea turtle under crystal clear turquoise water, sunbeams breaking surface'
      },
      {
        title: 'Amazon Reforestation: Autonomous Drone Canopy',
        description: 'Fleet of eco-drones flying in formation over misty rainforest canopy dropping bio-encapsulated native tree seeds.',
        deliverables: ['1x 30s Short', 'Infographic Impact Report'],
        prompt: 'Aerial view of lush green rainforest canopy with autonomous electric drones planting trees in morning mist, hope for nature'
      }
    ]
  }
];

export function generateAllCreatorsSeed(): {
  profiles: UserProfile[];
  creatorProfiles: CreatorProfileDetails[];
  portfolioProjects: PortfolioProject[];
} {
  const profiles: UserProfile[] = [];
  const creatorProfiles: CreatorProfileDetails[] = [];
  const portfolioProjects: PortfolioProject[] = [];

  let creatorCounter = 101;

  // 1. Process custom-defined categories (Finance & Investing, Education & E-Learning)
  for (const group of CATEGORY_DEFINITIONS) {
    for (const c of group.creators) {
      const uId = `creator-${creatorCounter++}`;
      profiles.push({
        id: uId,
        name: c.name,
        email: `${c.name.toLowerCase().replace(/\s+/g, '.')}.ai@creatorconnect.ai`,
        role: 'creator',
        avatar: c.avatar,
        bio: c.bio,
        location: c.location,
        createdAt: new Date(Date.now() - Math.random() * 8000000000).toISOString()
      });

      creatorProfiles.push({
        userId: uId,
        title: c.title,
        industry: group.category,
        specialization: c.specialization,
        secondarySpecializations: [group.category],
        skills: c.skills,
        aiTools: c.aiTools,
        hourlyRate: c.hourlyRate,
        projectStartingRate: c.projectStartingRate,
        currency: 'INR',
        experienceLevel: c.experienceLevel,
        contentFormat: c.contentFormat,
        availability: c.availability,
        experienceYears: c.experienceYears,
        completedCampaigns: Math.floor(Math.random() * 25) + 10,
        rating: c.rating,
        reviewCount: c.reviewCount,
        featured: creatorCounter % 4 === 0,
        languages: ['English', 'Hindi'],
        socialLinks: {
          x: `https://x.com/${c.name.toLowerCase().replace(/\s+/g, '')}`,
          website: `https://${c.name.toLowerCase().replace(/\s+/g, '')}.design`
        },
        completionPercentage: 96
      });

      c.projects.forEach((proj, pIdx) => {
        portfolioProjects.push({
          id: `proj-${uId}-${pIdx + 1}`,
          creatorId: uId,
          title: proj.title,
          description: proj.description,
          category: group.category,
          mediaUrl: proj.mediaUrl,
          mediaType: 'image',
          toolsUsed: proj.toolsUsed,
          deliverables: proj.deliverables,
          clientRole: 'Lead AI Creator',
          featured: pIdx === 0,
          promptSnippet: proj.promptSnippet,
          likes: Math.floor(Math.random() * 300) + 80,
          createdAt: new Date(Date.now() - Math.random() * 5000000000).toISOString()
        });
      });
    }
  }

  // 2. Process all remaining 21 categories with exactly 6 realistic creators per category
  const FIRST_NAMES = [
    'Aarav', 'Rohan', 'Pooja', 'Vikram', 'Ananya', 'Siddharth', 'Meera', 'Kabir', 'Zoya',
    'Nikhil', 'Dia', 'Arjun', 'Ishaani', 'Gaurav', 'Tara', 'Rajat', 'Neha', 'Armaan', 'Kriti',
    'Harsh', 'Maya', 'Kunal', 'Simran', 'Dev', 'Tanvi', 'Aditya', 'Rhea', 'Karan', 'Priya', 'Samir'
  ];
  const LAST_NAMES = [
    'Verma', 'Sharma', 'Patel', 'Kapoor', 'Mehta', 'Nair', 'Reddy', 'Singhania', 'Chopra',
    'Deshmukh', 'Joshi', 'Bhatia', 'Malhotra', 'Gupta', 'Sengupta', 'Iyer', 'Saxena', 'Kulkarni'
  ];

  for (const meta of CATEGORY_METAS) {
    const images = CATEGORY_IMAGE_SETS[meta.category] || [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
    ];

    for (let i = 0; i < 6; i++) {
      const uId = `creator-${creatorCounter++}`;
      const fName = FIRST_NAMES[(creatorCounter * 3 + i * 5) % FIRST_NAMES.length];
      const lName = LAST_NAMES[(creatorCounter * 7 + i * 3) % LAST_NAMES.length];
      const name = `${fName} ${lName}`;
      const city = INDIAN_CITIES[(creatorCounter + i) % INDIAN_CITIES.length];
      const avatar = CURATED_PORTRAITS[(creatorCounter + i * 2) % CURATED_PORTRAITS.length];

      const expYrs = i >= 4 ? 6 : i >= 2 ? 4 : 2;
      const expLevel: 'Beginner' | 'Intermediate' | 'Expert' = expYrs >= 5 ? 'Expert' : expYrs >= 3 ? 'Intermediate' : 'Beginner';
      const rate = meta.baseRate + (i * 2500);
      const rating = Number((4.86 + ((creatorCounter * 17) % 13) * 0.01).toFixed(2));
      const reviews = 15 + ((creatorCounter * 11) % 25);
      const availability: 'available' | 'busy' | 'booked' = i === 3 ? 'busy' : i === 5 ? 'booked' : 'available';

      const title = meta.titles[i % meta.titles.length];
      const bio = meta.bios[i % meta.bios.length];
      const specialization = meta.specializations[i % meta.specializations.length];
      const skills = meta.skillsList[i % meta.skillsList.length];
      const aiTools = meta.toolsList[i % meta.toolsList.length];

      profiles.push({
        id: uId,
        name,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}.ai@creatorconnect.ai`,
        role: 'creator',
        avatar,
        bio,
        location: city,
        createdAt: new Date(Date.now() - Math.random() * 8000000000).toISOString()
      });

      creatorProfiles.push({
        userId: uId,
        title,
        industry: meta.category,
        specialization,
        secondarySpecializations: [meta.category],
        skills,
        aiTools,
        hourlyRate: Math.round(rate / 8),
        projectStartingRate: rate,
        currency: 'INR',
        experienceLevel: expLevel,
        contentFormat: meta.format,
        availability,
        experienceYears: expYrs,
        completedCampaigns: Math.floor(Math.random() * 20) + 8,
        rating,
        reviewCount: reviews,
        featured: i === 0,
        languages: ['English', 'Hindi'],
        socialLinks: {
          x: `https://x.com/${name.toLowerCase().replace(/\s+/g, '')}`,
          website: `https://${name.toLowerCase().replace(/\s+/g, '')}.design`
        },
        completionPercentage: 95
      });

      // EXACTLY 3 Portfolio projects per creator matching category and visuals
      for (let pIdx = 0; pIdx < 3; pIdx++) {
        const mediaUrl = images[(i * 3 + pIdx) % images.length];
        const template = meta.projectTemplates[pIdx % meta.projectTemplates.length];

        portfolioProjects.push({
          id: `proj-${uId}-${pIdx + 1}`,
          creatorId: uId,
          title: `${template.title} [Part 0${pIdx + 1}]`,
          description: template.description,
          category: meta.category,
          mediaUrl,
          mediaType: 'image',
          toolsUsed: aiTools,
          deliverables: template.deliverables,
          clientRole: 'Lead AI Creator',
          featured: pIdx === 0,
          promptSnippet: template.prompt,
          likes: Math.floor(Math.random() * 200) + 60,
          createdAt: new Date(Date.now() - Math.random() * 5000000000).toISOString()
        });
      }
    }
  }

  return { profiles, creatorProfiles, portfolioProjects };
}
