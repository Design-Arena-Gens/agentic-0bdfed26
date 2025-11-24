'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ArenaRoom from './ArenaRoom';

interface Arena {
  id: number;
  title: string;
  description: string;
  gradient: string;
  glowColor: string;
  personas: number;
  theme: string;
  tags: string[];
}

const arenas: Arena[] = [
  {
    id: 1,
    title: "Neon Philosophers",
    description: "Deep conversations with ancient wisdom in modern times",
    gradient: "from-neon-purple to-neon-magenta",
    glowColor: "purple",
    personas: 3,
    theme: "Philosophy & Wisdom",
    tags: ["Deep", "Thoughtful", "Introspective"]
  },
  {
    id: 2,
    title: "Cyber Dreamers",
    description: "Explore imaginary worlds and creative storytelling",
    gradient: "from-neon-cyan to-neon-purple",
    glowColor: "cyan",
    personas: 4,
    theme: "Creativity & Fiction",
    tags: ["Creative", "Imaginative", "Playful"]
  },
  {
    id: 3,
    title: "Future Architects",
    description: "Build tomorrow's innovations together",
    gradient: "from-neon-magenta to-neon-cyan",
    glowColor: "magenta",
    personas: 2,
    theme: "Innovation & Tech",
    tags: ["Visionary", "Ambitious", "Bold"]
  },
  {
    id: 4,
    title: "Midnight Confessions",
    description: "Late night talks about life, love, and everything",
    gradient: "from-purple-600 to-pink-600",
    glowColor: "purple",
    personas: 3,
    theme: "Life & Emotions",
    tags: ["Intimate", "Honest", "Vulnerable"]
  },
  {
    id: 5,
    title: "Quantum Mysteries",
    description: "Unravel the universe's greatest secrets",
    gradient: "from-blue-500 to-purple-600",
    glowColor: "cyan",
    personas: 2,
    theme: "Science & Mystery",
    tags: ["Curious", "Analytical", "Mind-bending"]
  },
  {
    id: 6,
    title: "Artistic Souls",
    description: "Express yourself through art, music, and beauty",
    gradient: "from-pink-500 to-rose-600",
    glowColor: "magenta",
    personas: 4,
    theme: "Art & Expression",
    tags: ["Aesthetic", "Emotional", "Free-spirited"]
  }
];

export default function ArenaHub() {
  const [selectedArena, setSelectedArena] = useState<Arena | null>(null);

  if (selectedArena) {
    return <ArenaRoom arena={selectedArena} onBack={() => setSelectedArena(null)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
    >
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-neon-purple blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-neon-cyan blur-[120px]"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pt-12 pb-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-gradient-purple">Arena Hub</h1>
          <p className="text-gray-400">Choose your conversation</p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex gap-4 mt-6"
        >
          <div className="flex-1 bg-dark-card border border-dark-border rounded-2xl p-4">
            <div className="text-2xl font-bold text-neon-cyan">12</div>
            <div className="text-xs text-gray-500 mt-1">Active Arenas</div>
          </div>
          <div className="flex-1 bg-dark-card border border-dark-border rounded-2xl p-4">
            <div className="text-2xl font-bold text-neon-purple">24</div>
            <div className="text-xs text-gray-500 mt-1">AI Personas</div>
          </div>
          <div className="flex-1 bg-dark-card border border-dark-border rounded-2xl p-4">
            <div className="text-2xl font-bold text-neon-magenta">∞</div>
            <div className="text-xs text-gray-500 mt-1">Stories</div>
          </div>
        </motion.div>
      </div>

      {/* Arena Grid */}
      <div className="relative z-10 px-6 pb-24">
        <div className="grid grid-cols-1 gap-4">
          {arenas.map((arena, index) => (
            <motion.div
              key={arena.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedArena(arena)}
              className="relative bg-dark-card border border-dark-border rounded-3xl p-6 cursor-pointer overflow-hidden group"
            >
              {/* Gradient Overlay */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${arena.gradient} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{arena.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{arena.description}</p>
                    <div className="text-xs text-gray-500">{arena.theme}</div>
                  </div>

                  {/* Persona Count Badge */}
                  <div className={`bg-gradient-to-br ${arena.gradient} rounded-full w-12 h-12 flex items-center justify-center font-bold shrink-0`}>
                    {arena.personas}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {arena.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-dark-bg border border-dark-border text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Hint */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${arena.gradient} animate-pulse`} />
                    <span className="text-xs text-gray-500">Active now</span>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-gray-500"
                  >
                    →
                  </motion.div>
                </div>
              </div>

              {/* Hover Border Glow */}
              <motion.div
                className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                style={{
                  background: `linear-gradient(135deg, transparent, ${
                    arena.glowColor === 'purple' ? 'rgba(183, 148, 246, 0.1)' :
                    arena.glowColor === 'cyan' ? 'rgba(103, 232, 249, 0.1)' :
                    'rgba(244, 114, 182, 0.1)'
                  })`,
                  border: `1px solid ${
                    arena.glowColor === 'purple' ? 'rgba(183, 148, 246, 0.3)' :
                    arena.glowColor === 'cyan' ? 'rgba(103, 232, 249, 0.3)' :
                    'rgba(244, 114, 182, 0.3)'
                  }`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-dark-card border-t border-dark-border backdrop-blur-xl z-20">
        <div className="flex items-center justify-around py-4 px-6 max-w-md mx-auto">
          {[
            { icon: '🏛️', label: 'Hub', active: true },
            { icon: '💬', label: 'Chats', active: false },
            { icon: '👤', label: 'Profile', active: false },
          ].map((item) => (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center gap-1 ${
                item.active ? 'text-neon-cyan' : 'text-gray-500'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
