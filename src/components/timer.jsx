import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../index.css'

const Timer = ({ targetDate, initialDays = 8, initialHours = 23, initialMinutes = 55, initialSeconds = 41 }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: initialDays,
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds
  });

  const [startTime] = useState(() => new Date().getTime());

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (targetDate) {
        // Si se proporciona targetDate, usar lógica original
        const now = new Date().getTime();
        const target = new Date(targetDate).getTime();
        const difference = target - now;

        if (difference > 0) {
          return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      } else {
        // Lógica de countdown automático desde valores iniciales
        const now = new Date().getTime();
        const elapsed = Math.floor((now - startTime) / 1000); // segundos transcurridos
        
        // Calcular tiempo total inicial en segundos
        const totalInitialSeconds = (initialDays * 24 * 60 * 60) + 
                                  (initialHours * 60 * 60) + 
                                  (initialMinutes * 60) + 
                                  initialSeconds;
        
        const remainingSeconds = Math.max(0, totalInitialSeconds - elapsed);
        
        if (remainingSeconds > 0) {
          return {
            days: Math.floor(remainingSeconds / (24 * 60 * 60)),
            hours: Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60)),
            minutes: Math.floor((remainingSeconds % (60 * 60)) / 60),
            seconds: remainingSeconds % 60
          };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Inicializar inmediatamente
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate, startTime, initialDays, initialHours, initialMinutes, initialSeconds]);

  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const numberVariants = {
    initial: { y: 0 },
    animate: { y: 0 },
    exit: { y: -20, opacity: 0 },
    enter: { y: 20, opacity: 0 }
  };

  const timeUnits = [
    { value: timeLeft.days, label: 'DAYS', key: 'days' },
    { value: timeLeft.hours, label: 'HOURS', key: 'hours' },
    { value: timeLeft.minutes, label: 'MINUTES', key: 'minutes' },
    { value: timeLeft.seconds, label: 'SECONDS', key: 'seconds' }
  ];

  return (
    <motion.div 
      className="timer-container text-center py-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Título */}
      <motion.h1 
        className="timer-title mb-5"
        variants={titleVariants}
      >
        WE'RE LAUNCHING SOON
      </motion.h1>

      {/* Contador */}
      <div className="container">
        <div className="row justify-content-center g-3 g-md-4">
          {timeUnits.map((unit, index) => (
            <div key={unit.key} className="col-6 col-md-3 col-lg-2">
              <motion.div
                className="timer-card"
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <div className="timer-number-container">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={unit.value}
                      className="timer-number"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {formatNumber(unit.value)}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="timer-label">
                  {unit.label}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Timer;
