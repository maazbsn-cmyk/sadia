import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, User } from '../types';

interface ChatScreenProps {
  user: User;
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  user,
  messages,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isSending) return;

    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setIsSending(true);
    try {
      await onSendMessage(text);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className="pt-20 pb-44 px-4 max-w-3xl mx-auto flex flex-col min-h-screen">
      {/* Welcome Banner */}
      <div className="flex flex-col items-center justify-center text-center py-8 space-y-3">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center rotate-3 shadow-sm">
          <span className="material-symbols-outlined text-primary text-3xl fill-1">
            auto_awesome
          </span>
        </div>
        <h2 className="font-headline text-2xl font-bold text-on-surface">
          Transform your space with AI
        </h2>
        <p className="text-on-surface-variant text-xs md:text-sm max-w-md mx-auto leading-relaxed">
          Upload a photo of your room or ask me anything about interior design, color palettes, or furniture arrangement.
        </p>
      </div>

      {/* Chat Messages */}
      <div className="space-y-6 flex-1">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                isBot ? '' : 'justify-end'
              }`}
            >
              {isBot && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm fill-1">
                    smart_toy
                  </span>
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                  isBot
                    ? 'glass-card text-on-surface rounded-bl-sm'
                    : 'bg-primary text-white rounded-br-sm shadow-md'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* Bullet Points */}
                {msg.bulletPoints && msg.bulletPoints.length > 0 && (
                  <ul className="list-disc ml-5 mt-3 space-y-1.5 text-on-surface-variant font-medium">
                    {msg.bulletPoints.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                )}

                {/* Image Recommendation */}
                {msg.suggestedImage && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-white/40 shadow-sm">
                    <img
                      src={msg.suggestedImage}
                      alt="AI Interior Suggestion"
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                )}

                <span
                  className={`text-[10px] mt-2 block ${
                    isBot ? 'text-outline' : 'text-white/80 text-right'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {!isBot && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden border border-white/20">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Suggestion Chips (show when message list is short) */}
        {messages.length < 5 && (
          <div className="flex flex-wrap gap-2 py-2">
            {[
              "How can I make my room look bigger?",
              "Suggest budget-friendly furniture",
              "Trending colors for 2024"
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="bg-white dark:bg-[#1a233a] border border-outline-variant/60 px-4 py-2 rounded-full text-xs font-semibold text-primary hover:bg-primary/5 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-base">aspect_ratio</span>
                {chip}
              </button>
            ))}
          </div>
        )}

        {isSending && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-sm fill-1 animate-spin">
                sync
              </span>
            </div>
            <div className="glass-card px-4 py-3 rounded-2xl text-xs text-on-surface-variant font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              Lumina AI is generating interior advice...
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Floating Input Bar */}
      <div className="fixed bottom-20 left-0 w-full z-40 px-4 pb-2">
        <div className="max-w-3xl mx-auto glass-card-elevated rounded-[2rem] p-2 flex items-end gap-2 shadow-2xl border border-white/50 dark:border-white/10">
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
            title="Attach Room Photo"
          >
            <span className="material-symbols-outlined text-xl">add_a_photo</span>
          </button>

          <div className="flex-grow relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              placeholder="Describe your dream space..."
              className="w-full bg-transparent border-none focus:ring-0 py-2.5 px-2 resize-none text-sm text-on-surface placeholder:text-outline/60 outline-none max-h-32"
            />
          </div>

          <button
            id="chat-send-btn"
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isSending}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-white transition-all cursor-pointer shadow-md ${
              inputText.trim() && !isSending
                ? 'bg-primary hover:scale-105 active:scale-95'
                : 'bg-outline-variant/50 opacity-50 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-lg">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
