import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Memory {
  id: string;
  biome: string;
  icon: string;
  message: string;
  color: string;
}

const allMemories: Memory[] = [
  { id: '1', biome: 'Джунгли', icon: '🐵', message: 'Мама, ты так же заботилась обо мне, как эта обезьянка о своем малыше!', color: '#10B981' },
  { id: '2', biome: 'Джунгли', icon: '🍌', message: 'Спасибо за все вкусные обеды, которые ты готовила с любовью!', color: '#FFD700' },
  { id: '3', biome: 'Джунгли', icon: '💧', message: 'Твоя любовь течет вечно, как этот водопад!', color: '#00CED1' },
  { id: '4', biome: 'Джунгли', icon: '🦋', message: 'Ты учила меня видеть красоту в каждом маленьком создании!', color: '#FF69B4' },
  { id: '5', biome: 'Джунгли', icon: '🌺', message: 'Твоя забота помогала мне расцветать, как этот цветок!', color: '#FF1493' },
  { id: '6', biome: 'Джунгли', icon: '🦜', message: 'Помнишь, как мы вместе учили стихи? Ты была таким терпеливым учителем!', color: '#FF4500' },
  { id: '7', biome: 'Джунгли', icon: '🏞️', message: 'Наша семья течет, как эта река - всегда вместе, всегда вперед!', color: '#4682B4' },
  
  { id: '8', biome: 'Антарктида', icon: '🐧', message: 'Ты всегда защищала нашу семью, как эти пингвины защищают своих птенцов!', color: '#00BFFF' },
  { id: '9', biome: 'Антарктида', icon: '❄️', message: 'Каждое твое доброе слово было уникальным, как эта снежинка!', color: '#E0FFFF' },
  { id: '10', biome: 'Антарктида', icon: '🌌', message: 'Твоя душа сияет так же ярко, как это северное сияние!', color: '#00FF7F' },
  { id: '11', biome: 'Антарктида', icon: '🧊', message: 'Твоя мудрость глубока, как подводная часть этого айсберга!', color: '#B0E0E6' },
  { id: '12', biome: 'Антарктида', icon: '⭐', message: 'Ты всегда была моей путеводной звездой!', color: '#FFD700' },
  { id: '13', biome: 'Антарктида', icon: '🐋', message: 'Твоя любовь безгранична, как океан, в котором плавает этот кит!', color: '#4169E1' },
  { id: '14', biome: 'Антарктида', icon: '🌙', message: 'Даже в самые холодные времена твоя забота согревала меня!', color: '#F0E68C' },
  
  { id: '15', biome: 'Космос', icon: '🌍', message: 'На этой прекрасной планете я встретил самого дорогого человека - тебя, мама!', color: '#1E90FF' },
  { id: '16', biome: 'Космос', icon: '☀️', message: 'Ты - мое солнце, которое всегда согревает меня своим теплом!', color: '#FFD700' },
  { id: '17', biome: 'Космос', icon: '🌙', message: 'Как луна отражает свет солнца, я стараюсь отражать твою доброту!', color: '#C0C0C0' },
  { id: '18', biome: 'Космос', icon: '⭐', message: 'Загадай желание! Я сделаю все, чтобы оно сбылось!', color: '#FFFFE0' },
  { id: '19', biome: 'Космос', icon: '🛰️', message: 'Как спутник следует за планетой, я всегда буду рядом с тобой!', color: '#708090' },
  { id: '20', biome: 'Космос', icon: '🚀', message: 'Ты дала мне крылья, чтобы лететь к самым смелым мечтам!', color: '#FF6347' },
  { id: '21', biome: 'Космос', icon: '✨', message: 'Ты - мой надежный ориентир в жизни, как это созвездие для мореплавателей!', color: '#E6E6FA' },
];

export default function MemoryMap() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBiome, setSelectedBiome] = useState<string>('Все');

  const filteredMemories = allMemories.filter(memory => {
    const matchesSearch = memory.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBiome = selectedBiome === 'Все' || memory.biome === selectedBiome;
    return matchesSearch && matchesBiome;
  });

  return (
    <div className="min-h-screen bg-space-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-8 px-6 py-3 bg-neon-purple/80 backdrop-blur-md text-white rounded-full hover:bg-neon-purple transition-all flex items-center gap-2 font-body border border-neon-purple/30"
        >
          <Icon name="ArrowLeft" size={20} />
          На главную
        </button>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-white mb-8 font-heading text-center text-glow"
        >
          🗺️ Карта Воспоминаний
        </motion.h1>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск по воспоминаниям..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-deep-purple/50 backdrop-blur-md border-2 border-cyan-blue/50 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-blue font-body"
            />
            <Icon name="Search" size={24} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-blue" />
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            {['Все', 'Джунгли', 'Антарктида', 'Космос'].map((biome) => (
              <button
                key={biome}
                onClick={() => setSelectedBiome(biome)}
                className={`px-6 py-2 rounded-full font-body transition-all ${
                  selectedBiome === biome
                    ? 'bg-neon-purple text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {biome}
              </button>
            ))}
          </div>

          <div className="text-center text-cyan-blue font-body">
            Найдено: {filteredMemories.length} из {allMemories.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-deep-purple/50 to-neon-purple/30 backdrop-blur-lg rounded-2xl p-6 border border-neon-purple/30 hover:border-cyan-blue/50 transition-all hover:scale-105 group"
            >
              <div className="flex items-start gap-4">
                <div 
                  className="text-4xl w-16 h-16 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${memory.color}40` }}
                >
                  {memory.icon}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-cyan-blue mb-2 font-body">{memory.biome}</div>
                  <p className="text-white font-body leading-relaxed">{memory.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
