'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Persona {
  id: number;
  name: string;
  role: string;
  avatar: string;
  gradient: string;
  personality: string[];
  status: 'active' | 'typing' | 'idle';
}

interface Message {
  id: number;
  personaId: number | null;
  content: string;
  timestamp: string;
  isUser: boolean;
}

interface ArenaRoomProps {
  arena: {
    id: number;
    title: string;
    description: string;
    gradient: string;
    theme: string;
  };
  onBack: () => void;
}

const mockPersonas: Persona[] = [
  {
    id: 1,
    name: "Aria",
    role: "The Philosopher",
    avatar: "🧠",
    gradient: "from-neon-purple to-neon-magenta",
    personality: ["Wise", "Thoughtful", "Deep"],
    status: 'active'
  },
  {
    id: 2,
    name: "Zephyr",
    role: "The Dreamer",
    avatar: "✨",
    gradient: "from-neon-cyan to-neon-purple",
    personality: ["Creative", "Whimsical", "Inspiring"],
    status: 'idle'
  },
  {
    id: 3,
    name: "Nova",
    role: "The Visionary",
    avatar: "🚀",
    gradient: "from-neon-magenta to-neon-cyan",
    personality: ["Bold", "Innovative", "Future-focused"],
    status: 'idle'
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    personaId: 1,
    content: "Welcome to the arena. What questions weigh on your mind today?",
    timestamp: "2m ago",
    isUser: false
  },
  {
    id: 2,
    personaId: 2,
    content: "I sense a creative energy here... are we ready to explore new ideas?",
    timestamp: "1m ago",
    isUser: false
  }
];

export default function ArenaRoom({ arena, onBack }: ArenaRoomProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [personas] = useState<Persona[]>(mockPersonas);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      personaId: null,
      content: inputValue,
      timestamp: 'Just now',
      isUser: true
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const randomPersona = personas[Math.floor(Math.random() * personas.length)];
      const aiResponse: Message = {
        id: messages.length + 2,
        personaId: randomPersona.id,
        content: "That's a fascinating perspective. Let me explore that with you...",
        timestamp: 'Just now',
        isUser: false
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen flex flex-col bg-dark-bg"
    >
      {/* Header */}
      <div className="relative z-20 bg-dark-card border-b border-dark-border backdrop-blur-xl">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 mb-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back
            </motion.button>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{arena.title}</h2>
              <p className="text-xs text-gray-500">{arena.theme}</p>
            </div>
          </div>

          {/* Persona Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {personas.map((persona) => (
              <motion.div
                key={persona.id}
                whileHover={{ scale: 1.05 }}
                className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-dark-bg border border-dark-border"
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${persona.gradient} flex items-center justify-center text-sm`}>
                  {persona.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium">{persona.name}</div>
                  <div className="text-xs text-gray-500">{persona.role}</div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  persona.status === 'active' ? 'bg-green-500' :
                  persona.status === 'typing' ? 'bg-yellow-500 animate-pulse' :
                  'bg-gray-600'
                }`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message, index) => {
          const persona = message.personaId ? personas.find(p => p.id === message.personaId) : null;

          return (
            <motion.div
              key={message.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {!message.isUser && persona && (
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${persona.gradient} flex items-center justify-center text-lg shrink-0`}>
                  {persona.avatar}
                </div>
              )}

              <div className={`flex flex-col gap-1 max-w-[75%] ${message.isUser ? 'items-end' : 'items-start'}`}>
                {!message.isUser && persona && (
                  <div className="text-xs text-gray-500 px-2">{persona.name}</div>
                )}

                <div className={`rounded-3xl px-5 py-3 ${
                  message.isUser
                    ? `bg-gradient-to-br ${arena.gradient} text-white`
                    : 'bg-dark-card border border-dark-border'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>

                <div className="text-xs text-gray-600 px-2">{message.timestamp}</div>
              </div>

              {message.isUser && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-lg shrink-0">
                  👤
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Typing Indicator */}
        {personas.some(p => p.status === 'typing') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-lg">
              💭
            </div>
            <div className="bg-dark-card border border-dark-border rounded-3xl px-5 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-2 h-2 rounded-full bg-gray-600"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="relative z-20 bg-dark-card border-t border-dark-border backdrop-blur-xl">
        <div className="px-6 py-4">
          {/* Quick Actions */}
          <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
            {["🎤 Voice", "📷 Image", "✨ Inspire me"].map((action) => (
              <button
                key={action}
                className="shrink-0 text-xs px-4 py-2 rounded-full bg-dark-bg border border-dark-border text-gray-400 hover:text-white hover:border-neon-cyan transition-colors"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Text Input */}
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Share your thoughts..."
                className="w-full bg-dark-bg border border-dark-border rounded-3xl px-6 py-4 text-sm focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${arena.gradient} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="text-xl">→</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
