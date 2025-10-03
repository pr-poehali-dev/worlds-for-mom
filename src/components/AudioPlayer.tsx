import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icon';

interface AudioPlayerProps {
  biome?: 'jungle' | 'antarctica' | 'space' | 'main';
}

const AudioPlayer = ({ biome = 'main' }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioSources = {
    main: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
    jungle: 'https://assets.mixkit.co/music/preview/mixkit-forest-treasure-138.mp3',
    antarctica: 'https://assets.mixkit.co/music/preview/mixkit-cold-moon-443.mp3',
    space: 'https://assets.mixkit.co/music/preview/mixkit-space-travel-999.mp3',
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [biome]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} loop>
        <source src={audioSources[biome]} type="audio/mpeg" />
      </audio>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-neon-purple/80 to-deep-purple/80 backdrop-blur-xl rounded-2xl p-4 border border-neon-purple/50 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          >
            <Icon name={isPlaying ? 'Pause' : 'Play'} size={24} className="text-white" />
          </motion.button>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Icon name="Volume2" size={16} className="text-white" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <span className="text-xs text-white/70 font-body">
              {biome === 'main' && '🎵 Космос'}
              {biome === 'jungle' && '🎵 Джунгли'}
              {biome === 'antarctica' && '🎵 Антарктида'}
              {biome === 'space' && '🎵 Космос'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AudioPlayer;
