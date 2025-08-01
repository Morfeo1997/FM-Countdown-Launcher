import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Timer = ({ targetDate, initialDays = 8, initialHours = 23, initialMinutes = 55, initialSeconds = 41 }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: initialDays,
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds
  });

  const [previousTimeLeft, setPreviousTimeLeft] = useState(timeLeft);
  const [startTime] = useState(() => new Date().getTime());

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (targetDate) {
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
        const now = new Date().getTime();
        const elapsed = Math.floor((now - startTime) / 1000);
        
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
      setPreviousTimeLeft(timeLeft);
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, startTime, initialDays, initialHours, initialMinutes, initialSeconds, timeLeft]);

  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  const timeUnits = [
    { value: timeLeft.days, previousValue: previousTimeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, previousValue: previousTimeLeft.hours, label: 'HOURS' },
    { value: timeLeft.minutes, previousValue: previousTimeLeft.minutes, label: 'MINUTES' },
    { value: timeLeft.seconds, previousValue: previousTimeLeft.seconds, label: 'SECONDS' }
  ];

  return (
    <div className="timer-container text-center py-5">
      <h1 className="timer-title mb-5">
        WE'RE LAUNCHING SOON
      </h1>

      <div className="timer-grid">
        {timeUnits.map((unit, index) => (
          <div key={index} className="timer-unit">
            
            <div className="timer-card-wrapper">
              <div className="timer-card-container">
                
                <div className="timer-half timer-half-top">
                  <span className="timer-number timer-number-top">
                    {formatNumber(unit.value)}
                  </span>
                </div>

                <div className="timer-half timer-half-bottom">
                  <span className="timer-number timer-number-bottom">
                    {formatNumber(unit.value)}
                  </span>
                </div>

                {unit.value !== unit.previousValue && (
                  <motion.div
                    className="timer-half-animated"
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: -90 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: "easeInOut"
                    }}
                  >
                    <span className="timer-number timer-number-bottom">
                      {formatNumber(unit.previousValue)}
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="timer-label">
              {unit.label}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Timer;