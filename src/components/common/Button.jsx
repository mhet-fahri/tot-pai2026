import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-slate-900 hover:bg-slate-800 text-white focus:ring-slate-900 shadow-sm',
    accent: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 shadow-sm',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-600 shadow-sm',
    secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 focus:ring-slate-500 shadow-sm',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus:ring-slate-400',
    danger: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 focus:ring-rose-500',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-3.5 py-2 rounded-xl gap-2',
    lg: 'text-sm px-5 py-2.5 rounded-2xl gap-2 font-semibold',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </motion.button>
  );
};
