# CreatorConnect AI — AI Content Creator Marketplace

CreatorConnect AI is a full-stack, AI-native marketplace connecting top generative content creators with brands and creative agencies — from discovery and portfolios to briefs, intelligent matching, proposals, and collaboration.

---

## 🌟 Key Features

### 1. Public Marketplace & Creator Discovery
- **Multi-Faceted Search & Filters:** Filter by AI specialization (AI Video & Commercials, Photorealistic Imagery, AI Influencers & Avatars, AI Animation & Motion, AI Voice & Audio, AI Branding & Concept Art, AI Storytelling), tools (Runway Gen-3, Midjourney v6.1, FLUX.1 Pro, ComfyUI, Kling AI, ElevenLabs), budget range, availability, rating, and experience.
- **Sorting:** Relevance / Featured, Highest Rated, Starting Price (Low to High / High to Low), and Experience.
- **Interactive Creator Cards:** Clean typography metadata, portfolio preview carousel, verified tool stack, starting rates, and 1-click bookmarks.

### 2. Creator Profiles & Rich Portfolios
- **Deep Public Profiles:** Hero banner, avatar, title, bio, location, languages, rate, availability status, social and portfolio links.
- **Project Lightbox:** Detailed view for portfolio works including prompt snippets, tools used, deliverables, client context, and likes.
- **Service Packages:** Standard Concept Sprint, Full Campaign Production, and Enterprise Retainer tiers.
- **Client Reviews & Ratings:** Star ratings and written reviews from completed brand campaigns.

### 3. Campaign Briefs Workflow & AI Assistant
- **Campaign Creation:** Define campaign title, category, objectives, deliverables, budget range, deadlines, required tools/skills, and experience level.
- **AI Campaign Brief Assistant (Gemini 3.8 Flash):** Converts rough ideas (e.g. *"I need an AI video advertisement for my new skincare product"*) into structured production-ready briefs with deliverables, tools, and budget range. Includes a fallback template assistant if offline.
- **Proposal Pitching:** Creators can submit custom pitches with pricing and delivery timelines, with duplicate pitch prevention.

### 4. Intelligent AI Creator Matching Studio
- **Transparent 5-Factor Scoring:** Evaluates Category Match (25%), Skills & Tools Match (30%), Budget Compatibility (20%), Rating & Experience (15%), and Availability (10%).
- **Gemini Qualitative Synthesis:** Evaluates creative alignment and suggests custom collaboration angles for the brand and creator.

### 5. Brand & Agency Dashboard
- Active campaigns management with status transitions (Open, In Progress, Completed).
- Review incoming creator pitches with one-click Accept / Decline / Message Creator actions.
- Bookmarked creators shortlist.
- Escrow and committed production budget analytics.
- Leave review modal upon campaign completion.

### 6. Creator Hub Dashboard
- Profile completion meter & checklist.
- Real-time availability status toggle (Available / Busy / Booked).
- Portfolio manager: Add new projects with prompt snippets and deliverables, or delete existing works.
- Submitted proposals status tracker (Accepted, In Review, Pending).

### 7. Direct Collaboration & Messaging
- Real-time database-backed conversations between creators and brands.
- Message history with timestamps and unread counters.

### 8. Admin & Moderation Console
- Overview of platform volume, total creators, brands, and campaigns.
- Commercial licensing and content moderation guidelines.
- In-app Supabase setup guide and SQL migration viewer.

---

## 🛠 Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Framer Motion
- **Backend:** Node.js, Express.js, TypeScript, TSX
- **Database:** Supabase PostgreSQL with Row Level Security (RLS) + built-in persistent storage engine (`data/db.json`)
- **AI Integration:** Google Gemini 3.8 Flash (`@google/genai`) for brief assistance & matching synthesis

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The server will start on `http://localhost:3000` with both Express API routes (`/api/*`) and Vite frontend hot-reloading mounted together.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 🗄 Supabase Setup (Optional)

CreatorConnect AI runs completely out of the box with its built-in database engine. To connect a Supabase project:

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard and run the migration script located at:
   ```
   supabase/migrations/20261012_init_schema.sql
   ```
3. Copy your project URL and service role / anon key into `.env`:
   ```env
   VITE_SUPABASE_URL="https://your-project.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key-here"
   SUPABASE_URL="https://your-project.supabase.co"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
   ```

---

## 🎭 Demo Personas

Use the **Demo Switcher** in the top navigation bar to test the application from any role:
- **Elena Rostova (Creator):** AI Cinematographer & Runway Specialist.
- **Aura Skincare Labs (Brand):** Biotech cosmetics brand with active briefs.
- **Admin Moderator:** Oversight of platform volume and moderation.
