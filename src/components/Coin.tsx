import { motion } from 'motion/react';
import { CoinData } from '../data/coins';
import { sounds } from '../utils/sounds';

interface CoinProps {
  coin: CoinData;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function Coin({ coin, onClick, className = '', disabled = false }: CoinProps) {
  const isDodecagon = coin.shape === 'dodecagon';
  
  const handleClick = () => {
    if (!disabled) {
      sounds.playCoinDrop();
      onClick?.();
    }
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.1, rotate: 5 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative flex items-center justify-center font-[900] 
        shadow-[inset_-2px_-4px_6px_rgba(0,0,0,0.4),inset_2px_4px_6px_rgba(255,255,255,0.7),0_6px_10px_rgba(0,0,0,0.3)]
        ${coin.color} ${className}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        overflow-hidden
      `}
      style={{
        width: `${coin.size * 4}px`,
        height: `${coin.size * 4}px`,
        borderRadius: isDodecagon ? '10%' : '50%',
        borderWidth: isDodecagon ? '0px' : '2px',
        borderColor: 'rgba(0,0,0,0.2)',
        clipPath: isDodecagon 
          ? 'polygon(50% 0%, 75% 6.7%, 93.3% 25%, 100% 50%, 93.3% 75%, 75% 93.3%, 50% 100%, 25% 93.3%, 6.7% 75%, 0% 50%, 6.7% 25%, 25% 6.7%)'
          : 'none',
        fontSize: `${coin.size * 1.2}px`,
        textShadow: '1px 1px 2px rgba(255,255,255,0.5), -1px -1px 2px rgba(0,0,0,0.2)'
      }}
    >
      {/* Metallic shine sweep */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
      
      {/* Inner ring for realism */}
      <div className={`absolute inset-1.5 rounded-full border-[1.5px] opacity-40 pointer-events-none ${isDodecagon ? 'border-transparent' : 'border-black/30 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]'}`} />
      
      <span className="z-10">{coin.label}</span>
    </motion.button>
  );
}
