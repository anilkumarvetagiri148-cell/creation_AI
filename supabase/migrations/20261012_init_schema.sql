-- ==============================================================================
-- CreatorConnect AI — Database Schema & Row Level Security (Supabase PostgreSQL)
-- ==============================================================================

-- 1. Profiles (Users, Brands, Creators, Admins)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('creator', 'brand', 'admin')),
  avatar TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  location TEXT DEFAULT '',
  company_name TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Creator Profiles (Creator-specific metadata & AI stack)
CREATE TABLE IF NOT EXISTS creator_profiles (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  specialization TEXT NOT NULL,
  secondary_specializations TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  ai_tools TEXT[] DEFAULT '{}',
  hourly_rate NUMERIC(10, 2) DEFAULT 0,
  project_starting_rate NUMERIC(10, 2) DEFAULT 0,
  availability TEXT DEFAULT 'available' CHECK (availability IN ('available', 'busy', 'booked')),
  experience_years INT DEFAULT 1,
  completed_campaigns INT DEFAULT 0,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  review_count INT DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  languages TEXT[] DEFAULT '{"English"}',
  social_links JSONB DEFAULT '{}',
  completion_percentage INT DEFAULT 85,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Portfolio Projects (AI artwork, videos, case studies)
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  thumbnail_url TEXT,
  tools_used TEXT[] DEFAULT '{}',
  deliverables TEXT[] DEFAULT '{}',
  client_role TEXT DEFAULT 'Lead AI Artist',
  featured BOOLEAN DEFAULT FALSE,
  prompt_snippet TEXT,
  likes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Campaigns (Briefs published by Brands & Creative Agencies)
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  budget_min NUMERIC(10, 2) NOT NULL,
  budget_max NUMERIC(10, 2) NOT NULL,
  deadline DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('draft', 'open', 'in_progress', 'completed', 'cancelled')),
  deliverables TEXT[] DEFAULT '{}',
  required_tools TEXT[] DEFAULT '{}',
  required_skills TEXT[] DEFAULT '{}',
  experience_level TEXT DEFAULT 'any' CHECK (experience_level IN ('beginner', 'intermediate', 'expert', 'any')),
  target_audience TEXT DEFAULT '',
  reference_images TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Campaign Proposals (Pitches submitted by creators)
CREATE TABLE IF NOT EXISTS campaign_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  pitch TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  timeline_days INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'accepted', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_campaign_creator_proposal UNIQUE (campaign_id, creator_id)
);

-- 6. Saved Creators (Brand favorites)
CREATE TABLE IF NOT EXISTS saved_creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_saved_creator UNIQUE (brand_id, creator_id)
);

-- 7. Conversations
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_ids UUID[] NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  last_message TEXT DEFAULT '',
  last_message_timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Reviews (Brands reviewing creators upon campaign completion)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  feedback TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_campaign_review UNIQUE (campaign_id, creator_id, reviewer_id)
);

-- 10. Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast query performance
CREATE INDEX IF NOT EXISTS idx_creator_profiles_specialization ON creator_profiles(specialization);
CREATE INDEX IF NOT EXISTS idx_creator_profiles_rating ON creator_profiles(rating DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_creator_id ON portfolio_projects(creator_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_brand_id ON campaigns(brand_id);
CREATE INDEX IF NOT EXISTS idx_proposals_campaign_id ON campaign_proposals(campaign_id);
CREATE INDEX IF NOT EXISTS idx_proposals_creator_id ON campaign_proposals(creator_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_reviews_creator_id ON reviews(creator_id);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient_id ON notifications(recipient_id);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Public Profiles and Creator Discovery (Anyone can read, owners can update)
CREATE POLICY "Public profiles are readable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Creator profiles are readable by everyone" ON creator_profiles FOR SELECT USING (true);
CREATE POLICY "Creators can update their own creator profile" ON creator_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Creators can insert their creator profile" ON creator_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Portfolio Projects
CREATE POLICY "Portfolios are readable by everyone" ON portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Creators can manage their own portfolio" ON portfolio_projects FOR ALL USING (auth.uid() = creator_id);

-- Campaigns
CREATE POLICY "Public campaigns are readable by all" ON campaigns FOR SELECT USING (status != 'draft' OR auth.uid() = brand_id);
CREATE POLICY "Brands can manage their own campaigns" ON campaigns FOR ALL USING (auth.uid() = brand_id);

-- Proposals: Creators can see their proposals; Brands can see proposals on their campaigns
CREATE POLICY "Users can view relevant proposals" ON campaign_proposals FOR SELECT USING (
  auth.uid() = creator_id OR
  auth.uid() IN (SELECT brand_id FROM campaigns WHERE id = campaign_id)
);
CREATE POLICY "Creators can insert proposals" ON campaign_proposals FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Participants can update proposal status" ON campaign_proposals FOR UPDATE USING (
  auth.uid() = creator_id OR
  auth.uid() IN (SELECT brand_id FROM campaigns WHERE id = campaign_id)
);

-- Saved Creators
CREATE POLICY "Brands can manage saved creators" ON saved_creators FOR ALL USING (auth.uid() = brand_id);

-- Conversations & Messages
CREATE POLICY "Participants can view conversations" ON conversations FOR SELECT USING (auth.uid() = ANY(participant_ids));
CREATE POLICY "Participants can view messages" ON messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Senders can insert messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Reviews
CREATE POLICY "Reviews are public" ON reviews FOR SELECT USING (true);
CREATE POLICY "Brands can create review for completed campaigns" ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Notifications
CREATE POLICY "Users can view their notifications" ON notifications FOR SELECT USING (auth.uid() = recipient_id);
CREATE POLICY "Users can update their notifications" ON notifications FOR UPDATE USING (auth.uid() = recipient_id);
