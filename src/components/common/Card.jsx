import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  as: Component = 'div',
  ...props
}) => {
  if (hoverEffect) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-colors ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Component
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
