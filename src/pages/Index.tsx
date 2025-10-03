import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from '@/components/CountdownTimer';
import BiomeSelector from '@/components/BiomeSelector';
import ParticleBackground from '@/components/ParticleBackground';
import BiomeJungle from '@/components/BiomeJungle';
import BiomeAntarctica from '@/components/BiomeAntarctica';
import BiomeSpace from '@/components/BiomeSpace';
import AudioPlayer from '@/components/AudioPlayer';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [currentBiome, setCurrentBiome] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBiomeSelect = (biomeId: string) => {
    setCurrentBiome(biomeId);
  };

  const handleBackToMain = () => {
    setCurrentBiome(null);
  };

  if (currentBiome === 'jungle') {
    return (
      <>
        <BiomeJungle onBack={handleBackToMain} />
        <AudioPlayer biome="jungle" />
      </>
    );
  }

  if (currentBiome === 'antarctica') {
    return (
      <>
        <BiomeAntarctica onBack={handleBackToMain} />
        <AudioPlayer biome="antarctica" />
      </>
    );
  }

  if (currentBiome === 'space') {
    return (
      <>
        <BiomeSpace onBack={handleBackToMain} />
        <AudioPlayer biome="space" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-space-black overflow-hidden relative">
      <ParticleBackground />
      <AudioPlayer biome="main" />
      
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        <button
          onClick={() => navigate('/memory-map')}
          className="px-6 py-3 bg-neon-purple/80 backdrop-blur-md text-white rounded-full hover:bg-neon-purple transition-all flex items-center gap-2 font-body border border-neon-purple/30"
        >
          <Icon name="Map" size={20} />
          <span className="hidden md:inline">Карта</span>
        </button>
        <button
          onClick={() => navigate('/achievements')}
          className="px-6 py-3 bg-golden-orange/80 backdrop-blur-md text-white rounded-full hover:bg-golden-orange transition-all flex items-center gap-2 font-body border border-golden-orange/30"
        >
          <Icon name="Trophy" size={20} />
          <span className="hidden md:inline">Достижения</span>
        </button>
      </div>
      
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
          <BiomeSelector onBiomeSelect={handleBiomeSelect} />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;