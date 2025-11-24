'use client';

import { motion } from 'framer-motion';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Animated Background Glows */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-purple blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-cyan blur-[100px]"
        />
      </div>

      {/* AI Silhouettes */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 mb-12"
      >
        <div className="flex gap-8 items-end">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
                className={`w-${i === 2 ? '32' : '24'} h-${i === 2 ? '32' : '24'} rounded-full relative`}
              >
                {/* Glowing Avatar */}
                <div className={`absolute inset-0 rounded-full ${
                  i === 1 ? 'bg-gradient-to-br from-neon-purple to-neon-magenta' :
                  i === 2 ? 'bg-gradient-to-br from-neon-cyan to-neon-purple' :
                  'bg-gradient-to-br from-neon-magenta to-neon-cyan'
                } opacity-80`} />

                {/* Glow Effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                  className={`absolute inset-0 rounded-full ${
                    i === 1 ? 'bg-neon-purple' :
                    i === 2 ? 'bg-neon-cyan' :
                    'bg-neon-magenta'
                  } blur-xl opacity-50`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Title and Tagline */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center z-10 space-y-4 mb-16"
      >
        <h1 className="text-6xl font-bold mb-4">
          <span className="text-gradient-purple">Design Arena</span>
        </h1>
        <p className="text-xl text-gray-400 font-light">
          Enter the Arena.
        </p>
        <p className="text-xl text-gray-400 font-light">
          Create your narrative.
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="relative z-10 px-12 py-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-semibold text-lg overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <span className="relative z-10">Enter the Arena</span>
      </motion.button>

      {/* Bottom indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-12 rounded-full bg-gradient-to-b from-transparent via-neon-cyan to-transparent"
        />
      </motion.div>
    </motion.div>
  );
}
