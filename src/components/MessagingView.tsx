import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  Loader2,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  User,
  Briefcase
} from 'lucide-react';
import { Conversation, Message, UserProfile } from '../types/index.js';
import { api } from '../services/api.js';

interface MessagingViewProps {
  currentUser: UserProfile;
  initialConversationId?: string;
}

export const MessagingView: React.FC<MessagingViewProps> = ({
  currentUser,
  initialConversationId
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(initialConversationId || null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [loadingConv, setLoadingConv] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchConversations = async () => {
    try {
      const list = await api.getConversations();
      setConversations(list);
      if (!activeConversationId && list.length > 0) {
        setActiveConversationId(list[0].id);
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
    } finally {
      setLoadingConv(false);
    }
  };

  const fetchMessages = async (convId: string) => {
    setLoadingMessages(true);
    try {
      const msgs = await api.getMessages(convId);
      setMessages(msgs);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [currentUser.id]);

  useEffect(() => {
    if (activeConversationId) {
      fetchMessages(activeConversationId);
    }
  }, [activeConversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const activeConv = conversations.find((c) => c.id === activeConversationId);
  const otherUserId = activeConv?.participantIds.find((id) => id !== currentUser.id) || '';
  const otherUserName = activeConv ? activeConv.participantNames[otherUserId] || 'Collaborator' : '';
  const otherUserAvatar = activeConv ? activeConv.participantAvatars[otherUserId] || '' : '';

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeConversationId || !otherUserId) return;

    const text = messageText.trim();
    setMessageText('');
    setSending(true);

    try {
      const sent = await api.sendMessage(activeConversationId, otherUserId, text);
      setMessages((prev) => [...prev, sent]);
      fetchConversations();
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#7C4DFF] uppercase tracking-wider">
          <MessageSquare className="w-4 h-4" />
          <span>Real-time Workspace</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Direct Messages & Campaign Collaboration
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 rounded-3xl glass-panel border border-[#2A2453] overflow-hidden min-h-[580px]">
        {/* Left: Conversations List */}
        <div className="border-r border-[#2A2453] bg-[#0B081D]/60 flex flex-col">
          <div className="p-4 border-b border-[#2A2453]">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Active Threads ({conversations.length})
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#2A2453]/40">
            {loadingConv ? (
              <div className="p-6 text-center text-xs text-[#B9B3D0]">Loading threads...</div>
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#B9B3D0]">
                No active conversations. Reach out to a creator or brand from the marketplace.
              </div>
            ) : (
              conversations.map((conv) => {
                const partnerId = conv.participantIds.find((id) => id !== currentUser.id) || '';
                const partnerName = conv.participantNames[partnerId] || 'User';
                const partnerAvatar = conv.participantAvatars[partnerId] || '';
                const unread = conv.unreadCount[currentUser.id] || 0;
                const isSelected = conv.id === activeConversationId;

                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#17132E] border-l-4 border-[#7C4DFF]'
                        : 'hover:bg-[#17132E]/40'
                    }`}
                  >
                    <img
                      src={partnerAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                      alt={partnerName}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-[#7C4DFF]/30 shrink-0 mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-xs font-bold text-white truncate">{partnerName}</h4>
                        {unread > 0 && (
                          <span className="px-1.5 py-0.2 rounded-full bg-[#FF7A1A] text-white text-[10px] font-bold">
                            {unread}
                          </span>
                        )}
                      </div>
                      {conv.campaignTitle && (
                        <span className="text-[10px] text-[#9D7BFF] font-medium truncate block">
                          {conv.campaignTitle}
                        </span>
                      )}
                      <p className="text-xs text-[#B9B3D0] truncate mt-0.5">{conv.lastMessage}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Message Thread */}
        <div className="md:col-span-2 flex flex-col bg-[#17132E]/30">
          {activeConv ? (
            <>
              {/* Thread Header */}
              <div className="p-4 border-b border-[#2A2453] bg-[#0B081D]/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={otherUserAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={otherUserName}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-[#7C4DFF]"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{otherUserName}</h3>
                    {activeConv.campaignTitle && (
                      <span className="text-[11px] text-[#9D7BFF] flex items-center gap-1">
                        <Briefcase className="w-3 h-3" /> {activeConv.campaignTitle}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[440px]">
                {loadingMessages ? (
                  <div className="py-12 text-center text-xs text-[#B9B3D0]">Loading messages...</div>
                ) : messages.length === 0 ? (
                  <div className="py-16 text-center text-xs text-[#B9B3D0]">
                    Start the collaboration discussion with {otherUserName}!
                  </div>
                ) : (
                  messages.map((m) => {
                    const isMe = m.senderId === currentUser.id;
                    return (
                      <div
                        key={m.id}
                        className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isMe && (
                          <img
                            src={m.senderAvatar}
                            alt={m.senderName}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        )}
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed space-y-1 ${
                            isMe
                              ? 'bg-gradient-to-r from-[#7C4DFF] to-[#9D7BFF] text-white rounded-br-sm'
                              : 'bg-[#17132E] border border-[#2A2453] text-white/95 rounded-bl-sm'
                          }`}
                        >
                          <p>{m.body}</p>
                          <div
                            className={`text-[9px] text-right ${
                              isMe ? 'text-white/70' : 'text-[#B9B3D0]'
                            }`}
                          >
                            {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Send Form */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-[#2A2453] bg-[#0B081D]/80 flex items-center gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={`Reply to ${otherUserName}...`}
                  className="flex-1 glass-input rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                />
                <button
                  type="submit"
                  disabled={sending || !messageText.trim()}
                  className="px-4 py-2.5 rounded-xl bg-[#7C4DFF] hover:bg-[#6A3DE8] text-white font-semibold text-xs shadow-md shadow-[#7C4DFF]/30 transition-all disabled:opacity-50 flex items-center gap-1.5"
                >
                  {sending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-[#B9B3D0]">
              Select a conversation to begin chatting.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
