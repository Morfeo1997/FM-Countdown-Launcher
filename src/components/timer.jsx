import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Timer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
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
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Inicializar inmediatamente
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

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

      <style jsx>{`
        .timer-container {
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .timer-title {
          font-size: clamp(1.5rem, 5vw, 3rem);
          font-weight: 300;
          letter-spacing: 0.3em;
          margin-bottom: 4rem !important;
          text-transform: uppercase;
        }

        .timer-card {
          background: rgba(63, 81, 117, 0.8);
          border-radius: 16px;
          padding: 1.5rem 1rem;
          margin: 0.5rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }

        .timer-number-container {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .timer-number {
          font-size: clamp(2rem, 8vw, 4rem);
          font-weight: 700;
          color: #FF6B6B;
          line-height: 1;
        }

        .timer-label {
          font-size: clamp(0.7rem, 2vw, 0.9rem);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.2em;
          margin-top: 0.5rem;
          text-transform: uppercase;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .timer-card {
            padding: 1rem 0.5rem;
            margin: 0.25rem;
          }
          
          .timer-title {
            margin-bottom: 2rem !important;
            line-height: 1.2;
          }
        }

        @media (max-width: 576px) {
          .timer-number-container {
            height: 50px;
          }
        }

        /* Hover effects para desktop */
        @media (hover: hover) {
          .timer-card:hover {
            background: rgba(73, 91, 127, 0.9);
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Timer;
