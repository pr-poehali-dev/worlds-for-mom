import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: 'explorer' | 'collector' | 'speed' | 'master' | 'special';
  requirement: number;
  current: number;
  unlocked: boolean;
  reward?: string;
}

const STORAGE_KEY = 'mama-achievements';

export default function Achievements() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_visit',
      title: 'Первый шаг',
      description: 'Зашла на сайт впервые',
      icon: '👣',
      color: '#10B981',
      category: 'special',
      requirement: 1,
      current: 1,
      unlocked: true,
      reward: 'Открыт доступ ко всем мирам'
    },
    {
      id: 'jungle_explorer',
      title: 'Исследователь джунглей',
      description: 'Посети мир джунглей',
      icon: '🌴',
      color: '#10B981',
      category: 'explorer',
      requirement: 1,
      current: 0,
      unlocked: false,
      reward: '+100 опыта'
    },
    {
      id: 'antarctica_explorer',
      title: 'Полярник',
      description: 'Посети Антарктиду',
      icon: '❄️',
      color: '#06B6D4',
      category: 'explorer',
      requirement: 1,
      current: 0,
      unlocked: false,
      reward: '+100 опыта'
    },
    {
      id: 'space_explorer',
      title: 'Космонавт',
      description: 'Посети космос',
      icon: '🚀',
      color: '#8B5CF6',
      category: 'explorer',
      requirement: 1,
      current: 0,
      unlocked: false,
      reward: '+100 опыта'
    },
    {
      id: 'all_worlds',
      title: 'Покоритель миров',
      description: 'Посети все три биома',
      icon: '🌍',
      color: '#F59E0B',
      category: 'explorer',
      requirement: 3,
      current: 0,
      unlocked: false,
      reward: 'Открыта карта воспоминаний'
    },
    {
      id: 'jungle_collector',
      title: 'Натуралист',
      description: 'Найди все объекты в джунглях (7/7)',
      icon: '🦜',
      color: '#10B981',
      category: 'collector',
      requirement: 7,
      current: 0,
      unlocked: false,
      reward: 'Секретное сообщение 1'
    },
    {
      id: 'antarctica_collector',
      title: 'Полярный исследователь',
      description: 'Найди все объекты в Антарктиде (7/7)',
      icon: '🐧',
      color: '#06B6D4',
      category: 'collector',
      requirement: 7,
      current: 0,
      unlocked: false,
      reward: 'Секретное сообщение 2'
    },
    {
      id: 'space_collector',
      title: 'Астроном',
      description: 'Найди все объекты в космосе (7/7)',
      icon: '⭐',
      color: '#8B5CF6',
      category: 'collector',
      requirement: 7,
      current: 0,
      unlocked: false,
      reward: 'Секретное сообщение 3'
    },
    {
      id: 'completionist',
      title: 'Коллекционер',
      description: 'Найди все 21 объект во всех мирах',
      icon: '💎',
      color: '#F59E0B',
      category: 'collector',
      requirement: 21,
      current: 0,
      unlocked: false,
      reward: 'Финальное послание от сына'
    },
    {
      id: 'speed_1',
      title: 'Быстрая',
      description: 'Найди 5 объектов за 2 минуты',
      icon: '⚡',
      color: '#FBBF24',
      category: 'speed',
      requirement: 5,
      current: 0,
      unlocked: false,
      reward: '+50 опыта'
    },
    {
      id: 'speed_2',
      title: 'Молниеносная',
      description: 'Найди 10 объектов за 5 минут',
      icon: '💨',
      color: '#FBBF24',
      category: 'speed',
      requirement: 10,
      current: 0,
      unlocked: false,
      reward: '+100 опыта'
    },
    {
      id: 'curious',
      title: 'Любопытная',
      description: 'Посети все разделы сайта',
      icon: '🔍',
      color: '#EC4899',
      category: 'master',
      requirement: 3,
      current: 1,
      unlocked: false,
      reward: 'Открыт режим фотографа'
    },
    {
      id: 'patient',
      title: 'Терпеливая',
      description: 'Провести 10 минут на сайте',
      icon: '⏰',
      color: '#EC4899',
      category: 'master',
      requirement: 600,
      current: 0,
      unlocked: false,
      reward: '+200 опыта'
    },
    {
      id: 'music_lover',
      title: 'Меломан',
      description: 'Послушать музыку во всех трех биомах',
      icon: '🎵',
      color: '#EC4899',
      category: 'master',
      requirement: 3,
      current: 0,
      unlocked: false,
      reward: 'Плейлист разблокирован'
    },
    {
      id: 'birthday',
      title: 'С Днем Рождения!',
      description: 'Зайди на сайт 5 октября',
      icon: '🎂',
      color: '#F59E0B',
      category: 'special',
      requirement: 1,
      current: 0,
      unlocked: false,
      reward: 'Специальный подарок'
    },
    {
      id: 'night_owl',
      title: 'Ночная сова',
      description: 'Посети сайт после полуночи',
      icon: '🦉',
      color: '#6366F1',
      category: 'special',
      requirement: 1,
      current: 0,
      unlocked: false,
      reward: 'Ночной режим разблокирован'
    },
    {
      id: 'early_bird',
      title: 'Ранняя пташка',
      description: 'Посети сайт до 6 утра',
      icon: '🌅',
      color: '#F97316',
      category: 'special',
      requirement: 1,
      current: 0,
      unlocked: false,
      reward: 'Утренний режим разблокирован'
    },
    {
      id: 'dedication',
      title: 'Преданность',
      description: 'Посещай сайт 3 дня подряд',
      icon: '💝',
      color: '#EF4444',
      category: 'special',
      requirement: 3,
      current: 0,
      unlocked: false,
      reward: 'Особое видео-сообщение'
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setAchievements(JSON.parse(saved));
    }

    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 6) {
      unlockAchievement('early_bird');
    }
    if (currentHour >= 0 && currentHour < 4) {
      unlockAchievement('night_owl');
    }

    const timer = setInterval(() => {
      setAchievements(prev => {
        const updated = prev.map(a => {
          if (a.id === 'patient' && !a.unlocked) {
            const newCurrent = a.current + 1;
            return {
              ...a,
              current: newCurrent,
              unlocked: newCurrent >= a.requirement
            };
          }
          return a;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const unlockAchievement = (id: string) => {
    setAchievements(prev => {
      const updated = prev.map(a => 
        a.id === id ? { ...a, current: a.requirement, unlocked: true } : a
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const categories = [
    { id: 'all', name: 'Все', icon: 'Trophy' },
    { id: 'explorer', name: 'Исследователь', icon: 'Compass' },
    { id: 'collector', name: 'Коллекционер', icon: 'Package' },
    { id: 'speed', name: 'Скорость', icon: 'Zap' },
    { id: 'master', name: 'Мастер', icon: 'Crown' },
    { id: 'special', name: 'Особые', icon: 'Sparkles' },
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const totalUnlocked = achievements.filter(a => a.unlocked).length;
  const totalProgress = Math.round((totalUnlocked / achievements.length) * 100);

  return (
    <div className="min-h-screen bg-space-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-8 px-6 py-3 bg-neon-purple/80 backdrop-blur-md text-white rounded-full hover:bg-neon-purple transition-all flex items-center gap-2 font-body border border-neon-purple/30"
        >
          <Icon name="ArrowLeft" size={20} />
          На главную
        </button>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-heading text-glow">
            🏆 Достижения
          </h1>
          <div className="text-2xl md:text-3xl text-golden-orange font-body mb-6">
            {totalUnlocked} / {achievements.length} разблокировано
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-deep-purple/50 backdrop-blur-md rounded-full h-8 overflow-hidden border-2 border-cyan-blue/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-neon-purple via-cyan-blue to-golden-orange flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">{totalProgress}%</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-3 flex-wrap justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-body transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-neon-purple text-white scale-105'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Icon name={cat.icon as any} size={20} />
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedAchievement(achievement)}
              className={`cursor-pointer relative overflow-hidden rounded-2xl p-6 border-2 transition-all hover:scale-105 ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-golden-orange/20 to-neon-purple/20 border-golden-orange/50 shadow-lg shadow-golden-orange/20'
                  : 'bg-deep-purple/30 border-white/10 grayscale'
              }`}
            >
              {achievement.unlocked && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute top-4 right-4 w-8 h-8 bg-golden-orange rounded-full flex items-center justify-center"
                >
                  <Icon name="Check" size={20} className="text-white" />
                </motion.div>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="text-5xl w-20 h-20 flex items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${achievement.color}40` }}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1 font-heading">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-white/70 font-body">
                    {achievement.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-cyan-blue font-body">
                  <span>Прогресс</span>
                  <span>{achievement.current} / {achievement.requirement}</span>
                </div>
                <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(achievement.current / achievement.requirement) * 100}%` }}
                    className="h-full bg-gradient-to-r from-cyan-blue to-neon-purple"
                  />
                </div>
              </div>

              {achievement.reward && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-golden-orange font-body flex items-center gap-2">
                    <Icon name="Gift" size={14} />
                    {achievement.reward}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-gradient-to-br from-deep-purple to-neon-purple/50 p-8 rounded-3xl max-w-md w-full border-2 border-golden-orange/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-8xl mb-4">{selectedAchievement.icon}</div>
                <h2 className="text-3xl font-bold text-white mb-2 font-heading">
                  {selectedAchievement.title}
                </h2>
                <p className="text-white/80 font-body mb-4">
                  {selectedAchievement.description}
                </p>
                
                {selectedAchievement.unlocked ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-golden-orange rounded-full text-white font-bold"
                  >
                    <Icon name="Trophy" size={24} />
                    РАЗБЛОКИРОВАНО!
                  </motion.div>
                ) : (
                  <div className="text-white/60 font-body">
                    Прогресс: {selectedAchievement.current} / {selectedAchievement.requirement}
                  </div>
                )}

                {selectedAchievement.reward && (
                  <div className="mt-6 p-4 bg-black/30 rounded-2xl border border-golden-orange/30">
                    <div className="text-sm text-golden-orange mb-1 font-body">Награда:</div>
                    <div className="text-white font-body">{selectedAchievement.reward}</div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedAchievement(null)}
                className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all font-body"
              >
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
