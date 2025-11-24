'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Onboarding from '@/components/Onboarding';
import ArenaHub from '@/components/ArenaHub';

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <main className="min-h-screen bg-dark-bg">
      <AnimatePresence mode="wait">
        {showOnboarding ? (
          <Onboarding key="onboarding" onComplete={() => setShowOnboarding(false)} />
        ) : (
          <ArenaHub key="hub" />
        )}
      </AnimatePresence>
    </main>
  );
}
