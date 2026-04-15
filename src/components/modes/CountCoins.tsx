import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { coins, CoinData, formatMoney } from '../../data/coins';
import { Coin } from '../Coin';
import { ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/sounds';

// Helper to get random coins
const generateRandomCoins = (difficulty: number): CoinData[] => {
  const numCoins = Math.floor(Math.random() * 3) + difficulty + 1; // 2 to 5 coins initially
  const result: CoinData[] = [];
  
  // Limit to smaller coins for early levels
  const availableCoins = difficulty < 3 ? coins.slice(0, 4) : coins;
  
  for (let i = 0; i < numCoins; i++) {
    const randomCoin = availableCoins[Math.floor(Math.random() * availableCoins.length)];
    result.push(randomCoin);
  }
  return result;
};

// Helper to generate wrong answers
const generateOptions = (correctAmount: number): number[] => {
  const options = new Set<number>();
  options.add(correctAmount);
  
  while (options.size < 3) {
    // Generate an amount close to the correct one
    const variance = (Math.floor(Math.random() * 5) + 1) * 5; // 5, 10, 15, 20, 25
    const isPlus = Math.random() > 0.5;
    let wrongAmount = isPlus ? correctAmount + variance : correctAmount - variance;
    
    if (wrongAmount <= 0) wrongAmount = correctAmount + variance + 5;
    options.add(wrongAmount);
  }
  
  // Shuffle
  return Array.from(options).sort(() => Math.random() - 0.5);
};

export function CountCoins() {
  const [level, setLevel] = useState(1);
  const [currentCoins, setCurrentCoins] = useState<CoinData[]>([]);
  const [options, setOptions] = useState<number[]>([]);
  const [status, setStatus] = useState<'playing' | 'won' | 'wrong'>('playing');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const correctAmount = currentCoins.reduce((sum, coin) => sum + coin.value, 0);

  const startNewRound = () => {
    const newCoins = generateRandomCoins(level);
    const newAmount = newCoins.reduce((sum, coin) => sum + coin.value, 0);
    setCurrentCoins(newCoins);
    setOptions(generateOptions(newAmount));
    setStatus('playing');
    setSelectedOption(null);
  };

  // Initialize first round
  useEffect(() => {
    startNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const handleOptionClick = (amount: number) => {
    if (status !== 'playing') return;
    
    setSelectedOption(amount);
    
    if (amount === correctAmount) {
      setStatus('won');
      sounds.playSuccess();
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#7FA998', '#D4A373', '#FFB703']
      });
    } else {
      setStatus('wrong');
      sounds.playError();
      // Auto reset wrong after a short delay
      setTimeout(() => {
        setStatus('playing');
        setSelectedOption(null);
      }, 1500);
    }
  };

  const handleNext = () => {
    setLevel(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-between">
      <div className="bg-white px-5 py-2.5 rounded-[30px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] font-bold text-green-accent mb-8">
        Level {level}: How much do you have?
      </div>

      <div className="flex-1 w-full flex flex-col justify-center items-center gap-10">
        <div className="relative w-[420px] min-h-[280px] flex flex-col items-center mt-6">
          {/* Metal Frame Top */}
          <div className="absolute -top-6 w-[280px] h-14 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-400 rounded-t-[40px] z-0 flex justify-between px-10 shadow-[inset_0_2px_5px_rgba(255,255,255,0.8),0_5px_10px_rgba(0,0,0,0.3)] border border-slate-400">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-400 border border-slate-500 -mt-4 shadow-[0_3px_5px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.9)]" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-400 border border-slate-500 -mt-4 shadow-[0_3px_5px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.9)]" />
          </div>

          {/* Purse Body */}
          <div className="w-full flex-1 bg-gradient-to-b from-[#8B253E] to-[#4A1120] rounded-b-[140px] rounded-t-[50px] shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_-10px_20px_rgba(0,0,0,0.5),inset_0_5px_15px_rgba(255,255,255,0.2)] border border-[#3A0D18] relative flex flex-col items-center p-6 z-10">
            
            {/* Purse stitching */}
            <div className="absolute inset-3 border-2 border-dashed border-white/20 rounded-b-[130px] rounded-t-[40px] pointer-events-none" />

            {/* Inner dark area representing the inside of the purse */}
            <div className="absolute top-6 w-[85%] h-36 bg-gradient-to-b from-black/90 to-black/40 rounded-full shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)] pointer-events-none blur-[2px]" />

            {/* Coins Container */}
            <div className="relative z-20 flex flex-wrap justify-center content-start gap-[10px] w-full h-full min-h-[180px] pt-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <AnimatePresence>
                {currentCoins.map((coin, index) => (
                  <motion.div
                    key={`${coin.id}-${index}`}
                    initial={{ opacity: 0, y: -50, scale: 0, rotate: -45 }}
                    animate={{ opacity: 1, y: 0, scale: 0.8, rotate: 0 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                  >
                    <Coin coin={coin} disabled />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {status === 'won' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-[-20px] bg-white/70 backdrop-blur-md rounded-[60px] flex flex-col items-center justify-center z-30 shadow-2xl"
              >
                <div className="bg-soft-white p-6 rounded-[30px] shadow-xl text-center border-4 border-green-accent">
                  <h3 className="text-3xl font-black text-green-accent mb-2">Correct!</h3>
                  <p className="text-xl text-dark mb-6">It is {formatMoney(correctAmount)}</p>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-[#FFB703] hover:bg-[#FB8500] text-white px-8 py-3 rounded-full font-bold text-xl shadow-[0_8px_0_#FB8500] hover:translate-y-[4px] hover:shadow-[0_4px_0_#FB8500] transition-all mx-auto"
                  >
                    Next Level <ArrowRight size={24} />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {options.map((amount) => {
            const isSelected = selectedOption === amount;
            const isCorrect = amount === correctAmount;
            
            let buttonClass = "bg-soft-white border-clay text-clay hover:bg-clay hover:text-white";
            
            if (status !== 'playing' && isSelected) {
              if (isCorrect) {
                buttonClass = "bg-green-accent border-green-accent text-white scale-110";
              } else {
                buttonClass = "bg-red-500 border-red-600 text-white animate-shake";
              }
            }

            return (
              <button
                key={amount}
                onClick={() => handleOptionClick(amount)}
                disabled={status === 'won'}
                className={`
                  px-8 py-4 rounded-[20px] border-4 font-black text-3xl shadow-md transition-all
                  ${buttonClass}
                `}
              >
                {formatMoney(amount)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
