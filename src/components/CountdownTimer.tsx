import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let targetDate = new Date(currentYear, 9, 5, 20, 0, 0);
      
      if (now > targetDate) {
        targetDate = new Date(currentYear + 1, 9, 5, 20, 0, 0);
      }

      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsBirthday(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  if (isBirthday) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-golden-orange animate-pulse-glow font-heading">
          🎉 С Днем Рождения, Мама! 🎉
        </h2>
      </motion.div>
    );
  }

  const timeBlocks = [
    { label: 'ДНЕЙ', value: timeLeft.days },
    { label: 'ЧАСОВ', value: timeLeft.hours },
    { label: 'МИНУТ', value: timeLeft.minutes },
    { label: 'СЕКУНД', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <div className="bg-gradient-to-br from-neon-purple/20 via-deep-purple/30 to-cyan-blue/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-neon-purple/30 neon-glow">
        <h3 className="text-center text-xl md:text-2xl text-cyan-blue mb-6 font-heading tracking-wider">
          До дня рождения Оксаны
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative"
            >
              <div className="bg-deep-purple/50 backdrop-blur-md rounded-2xl p-4 md:p-6 border-2 border-cyan-blue/50 shadow-lg hover:shadow-cyan-blue/50 transition-all duration-300 hover:scale-105">
                <div className="relative overflow-hidden h-20 md:h-24">
                  <motion.div
                    key={block.value}
                    initial={{ rotateX: -90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="text-4xl md:text-6xl font-bold text-white text-center font-heading text-glow"
                  >
                    {formatNumber(block.value)}
                  </motion.div>
                </div>
                <div className="text-xs md:text-sm text-cyan-blue text-center mt-2 font-body tracking-widest">
                  {block.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <div className="inline-block">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="inline-block mx-1 text-2xl"
              >
                ✨
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
