import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'motion/react';

const variants = {
  initial: direction => ({
    marginLeft: direction > 0 ? 0 : '-100%',
    marginRight: direction > 0 ? '-100%' : 0
  }),
  animate: {
    marginLeft: 0,
    marginRight: 0
  },
  exit: direction => ({
    marginLeft: direction > 0 ? '-100%' : 0,
    marginRight: direction > 0 ? 0 : '-100%'
  }),
};

function Slider({ index, slides }) {
  const [currentIndex, setCurrentIndex] = useState(index);
  const [overflow, setOverflow] = useState('visible');
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (direction !== 0) setOverflow('hidden');
    setDirection(index - currentIndex >= 0 ? 1 : -1);
    setCurrentIndex(index);
  }, [index]);

  return (
    <div className={`d-flex overflow-${overflow}`}>
      <AnimatePresence initial={false} custom={direction} onExitComplete={() => setOverflow('visible')}>
        <m.div
          style={{ flex: '0 0 100%', order: currentIndex }}
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: .625 }}
        >
          {slides[currentIndex]}
        </m.div>
      </AnimatePresence>
    </div>
  );
}

export default Slider;