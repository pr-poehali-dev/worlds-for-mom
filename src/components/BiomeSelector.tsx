import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icon';

interface Biome {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
}

const biomes: Biome[] = [
  {
    id: 'jungle',
    name: 'Джунгли',
    icon: 'Trees',
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-600',
    description: 'Тропический мир с водопадами и обезьянками',
  },
  {
    id: 'antarctica',
    name: 'Антарктида',
    icon: 'Snowflake',
    color: '#06B6D4',
    gradient: 'from-cyan-400 to-blue-500',
    description: 'Ледяной мир с северным сиянием',
  },
  {
    id: 'space',
    name: 'Космос',
    icon: 'Rocket',
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-indigo-600',
    description: 'Вид на Землю и звезды',
  },
];

const BiomeSelector = ({ onBiomeSelect }: { onBiomeSelect?: (biomeId: string) => void }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleBiomeClick = (biomeId: string) => {
    if (onBiomeSelect) {
      onBiomeSelect(biomeId);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl text-center text-white mb-8 font-heading"
      >
        Выбери свой мир
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {biomes.map((biome, index) => (
          <motion.div
            key={biome.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
            onMouseEnter={() => setHoveredId(biome.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleBiomeClick(biome.id)}
            className="cursor-pointer group"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: hoveredId === biome.id ? 1.1 : 1,
                  rotateY: hoveredId === biome.id ? 10 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className={`relative w-full aspect-square rounded-3xl bg-gradient-to-br ${biome.gradient} p-1 overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-spin-slow" />
                  
                  <div className="relative w-full h-full bg-space-black/40 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border-2 border-white/20">
                    <motion.div
                      animate={{
                        scale: hoveredId === biome.id ? [1, 1.2, 1] : 1,
                        rotate: hoveredId === biome.id ? [0, 360] : 0,
                      }}
                      transition={{ duration: 2, repeat: hoveredId === biome.id ? Infinity : 0 }}
                      className="mb-4"
                      style={{ color: biome.color }}
                    >
                      <Icon name={biome.icon as any} size={64} className="drop-shadow-2xl" />
                    </motion.div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-heading">
                      {biome.name}
                    </h3>

                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: hoveredId === biome.id ? 1 : 0,
                        height: hoveredId === biome.id ? 'auto' : 0,
                      }}
                      className="text-sm text-white/80 text-center px-4 font-body"
                    >
                      {biome.description}
                    </motion.p>

                    <motion.div
                      animate={{
                        opacity: hoveredId === biome.id ? 1 : 0,
                        y: hoveredId === biome.id ? 0 : 20,
                      }}
                      className="mt-4 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-body"
                    >
                      Войти
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  animate={{
                    scale: hoveredId === biome.id ? 1.3 : 0.8,
                    opacity: hoveredId === biome.id ? 0.6 : 0,
                  }}
                  className="absolute inset-0 rounded-3xl blur-3xl -z-10"
                  style={{ backgroundColor: biome.color }}
                />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                className="absolute -top-8 -right-8 text-4xl"
              >
                {biome.id === 'jungle' && '🌴'}
                {biome.id === 'antarctica' && '❄️'}
                {biome.id === 'space' && '🌍'}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BiomeSelector;