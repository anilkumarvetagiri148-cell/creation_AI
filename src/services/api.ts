import {
  UserProfile,
  CreatorWithProfile,
  Campaign,
  CampaignProposal,
  PortfolioProject,
  Review,
  Conversation,
  Message,
  NotificationItem,
  AIMatchScore,
  AIBriefGenerationResult
} from '../types/index.js';

class ApiService {
  private activeUserId: string | null = null;

  public setUserId(id: string) {
    this.activeUserId = id;
    localStorage.setItem('cc_active_user_id', id);
  }

  public getUserId(): string | null {
    if (!this.activeUserId) {
      this.activeUserId = localStorage.getItem('cc_active_user_id');
    }
    return this.activeUserId;
  }

  private async fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {})
    };

    const currentId = this.getUserId();
    if (currentId) {
      headers['x-user-id'] = currentId;
    }

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      let errorMsg = `Error ${response.status}: ${response.statusText}`;
      try {
        const body = await response.json();
        if (body.error) errorMsg = body.error;
      } catch {
        // use default
      }
      throw new Error(errorMsg);
    }
    return response.json() as Promise<T>;
  }

  // Auth
  public async getMe(): Promise<{ user: UserProfile; creatorProfile?: any }> {
    return this.fetchJson('/api/auth/me');
  }

  public async switchDemo(role: 'creator' | 'brand' | 'admin', userId?: string): Promise<{ success: boolean; user: UserProfile }> {
    const res = await this.fetchJson<{ success: boolean; user: UserProfile }>('/api/auth/switch-demo', {
      method: 'POST',
      body: JSON.stringify({ role, userId })
    });
    if (res.user) {
      this.setUserId(res.user.id);
    }
    return res;
  }

  public async login(email: string): Promise<{ success: boolean; user: UserProfile }> {
    const res = await this.fetchJson<{ success: boolean; user: UserProfile }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
    if (res.user) {
      this.setUserId(res.user.id);
    }
    return res;
  }

  public async register(payload: {
    name: string;
    email: string;
    role: string;
    specialization?: string;
    title?: string;
    companyName?: string;
  }): Promise<{ success: boolean; user: UserProfile }> {
    const res = await this.fetchJson<{ success: boolean; user: UserProfile }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (res.user) {
      this.setUserId(res.user.id);
    }
    return res;
  }

  public async logout(): Promise<void> {
    await this.fetchJson('/api/auth/logout', { method: 'POST' });
    this.activeUserId = null;
    localStorage.removeItem('cc_active_user_id');
  }

  // Creators
  public async getCreators(params: Record<string, string | number | undefined> = {}): Promise<{
    creators: CreatorWithProfile[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') query.append(k, String(v));
    });
    return this.fetchJson(`/api/creators?${query.toString()}`);
  }

  public async getCreatorById(id: string): Promise<CreatorWithProfile & { reviews: Review[] }> {
    return this.fetchJson(`/api/creators/${id}`);
  }

  public async updateCreatorProfile(id: string, updates: any): Promise<CreatorWithProfile> {
    return this.fetchJson(`/api/creators/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  public async addPortfolioProject(creatorId: string, project: Partial<PortfolioProject>): Promise<PortfolioProject> {
    return this.fetchJson(`/api/creators/${creatorId}/portfolio`, {
      method: 'POST',
      body: JSON.stringify(project)
    });
  }

  public async deletePortfolioProject(creatorId: string, projectId: string): Promise<{ success: boolean }> {
    return this.fetchJson(`/api/creators/${creatorId}/portfolio/${projectId}`, {
      method: 'DELETE'
    });
  }

  // Campaigns
  public async getCampaigns(params: Record<string, string | undefined> = {}): Promise<Campaign[]> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v) query.append(k, v);
    });
    return this.fetchJson(`/api/campaigns?${query.toString()}`);
  }

  public async getCampaignById(id: string): Promise<{ campaign: Campaign; proposals: CampaignProposal[] }> {
    return this.fetchJson(`/api/campaigns/${id}`);
  }

  public async createCampaign(campaign: Partial<Campaign>): Promise<Campaign> {
    return this.fetchJson('/api/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaign)
    });
  }

  public async updateCampaignStatus(id: string, status: string): Promise<Campaign> {
    return this.fetchJson(`/api/campaigns/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }

  // Proposals
  public async getCampaignProposals(campaignId: string): Promise<CampaignProposal[]> {
    return this.fetchJson(`/api/campaigns/${campaignId}/proposals`);
  }

  public async submitProposal(
    campaignId: string,
    proposal: { pitch: string; price: number; timelineDays: number }
  ): Promise<CampaignProposal> {
    return this.fetchJson(`/api/campaigns/${campaignId}/proposals`, {
      method: 'POST',
      body: JSON.stringify(proposal)
    });
  }

  public async updateProposalStatus(proposalId: string, status: string): Promise<CampaignProposal> {
    return this.fetchJson(`/api/proposals/${proposalId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }

  // Favorites
  public async getSavedCreators(): Promise<{ saved: any[]; creators: CreatorWithProfile[] }> {
    return this.fetchJson('/api/saved-creators');
  }

  public async toggleSaveCreator(creatorId: string): Promise<{ saved: boolean }> {
    return this.fetchJson('/api/saved-creators/toggle', {
      method: 'POST',
      body: JSON.stringify({ creatorId })
    });
  }

  // Messaging
  public async getConversations(): Promise<Conversation[]> {
    return this.fetchJson('/api/conversations');
  }

  public async getMessages(conversationId: string): Promise<Message[]> {
    return this.fetchJson(`/api/conversations/${conversationId}/messages`);
  }

  public async sendMessage(conversationId: string, receiverId: string, body: string): Promise<Message> {
    return this.fetchJson(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ receiverId, body })
    });
  }

  public async startConversation(recipientId: string, campaignId?: string): Promise<Conversation> {
    return this.fetchJson('/api/conversations/start', {
      method: 'POST',
      body: JSON.stringify({ recipientId, campaignId })
    });
  }

  // Reviews
  public async submitReview(payload: {
    campaignId: string;
    creatorId: string;
    rating: number;
    feedback: string;
  }): Promise<Review> {
    return this.fetchJson('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  // Notifications
  public async getNotifications(): Promise<NotificationItem[]> {
    return this.fetchJson('/api/notifications');
  }

  public async markNotificationRead(id: string): Promise<void> {
    await this.fetchJson(`/api/notifications/${id}/read`, { method: 'PATCH' });
  }

  // AI
  public async getAIMatches(campaignId: string, creatorId?: string): Promise<{ creator: CreatorWithProfile; match: AIMatchScore }[]> {
    return this.fetchJson('/api/ai/match', {
      method: 'POST',
      body: JSON.stringify({ campaignId, creatorId })
    });
  }

  public async generateAIBrief(roughIdea: string): Promise<AIBriefGenerationResult> {
    return this.fetchJson('/api/ai/brief-assistant', {
      method: 'POST',
      body: JSON.stringify({ roughIdea })
    });
  }

  // Analytics & Admin
  public async getDashboardAnalytics(): Promise<any> {
    return this.fetchJson('/api/analytics/dashboard');
  }

  public async getAdminStats(): Promise<any> {
    return this.fetchJson('/api/admin/stats');
  }
}

export const api = new ApiService();
