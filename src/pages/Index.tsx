import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountdownTimer from '@/components/CountdownTimer';
import BiomeSelector from '@/components/BiomeSelector';
import ParticleBackground from '@/components/ParticleBackground';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-space-black overflow-hidden relative">
      <ParticleBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-heading tracking-wider text-glow">
            ВИРТУАЛЬНЫЕ МИРЫ
          </h1>
          <p className="text-lg md:text-xl text-cyan-blue font-body">
            Выбери мир для путешествия, мама! ✨
          </p>
        </motion.div>

        <CountdownTimer />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mt-16 w-full"
        >
          <BiomeSelector />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
