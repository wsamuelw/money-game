import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { coins, CoinData, formatMoney } from '../../data/coins';
import { Coin } from '../Coin';
import { RefreshCcw, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/sounds';

const TARGET_AMOUNTS = [15, 25, 30, 45, 60, 85, 120, 150, 250, 340];

export function PiggyBank() {
  const [targetIndex, setTargetIndex] = useState(0);
  const [currentCoins, setCurrentCoins] = useState<CoinData[]>([]);
  const [status, setStatus] = useState<'playing' | 'won' | 'over'>('playing');

  const targetAmount = TARGET_AMOUNTS[targetIndex];
  const currentTotal = currentCoins.reduce((sum, coin) => sum + coin.value, 0);

  useEffect(() => {
    if (currentTotal === targetAmount && status === 'playing') {
      setStatus('won');
      sounds.playSuccess();
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#7FA998', '#D4A373', '#FFB703']
      });
    } else if (currentTotal > targetAmount && status === 'playing') {
      setStatus('over');
      sounds.playError();
    }
  }, [currentTotal, targetAmount, status]);

  const handleAddCoin = (coin: CoinData) => {
    if (status !== 'playing') return;
    setCurrentCoins([...currentCoins, coin]);
  };

  const handleReset = () => {
    setCurrentCoins([]);
    setStatus('playing');
  };

  const handleNext = () => {
    setTargetIndex((prev) => (prev + 1) % TARGET_AMOUNTS.length);
    setCurrentCoins([]);
    setStatus('playing');
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-between">
      <div className="bg-white px-5 py-2.5 rounded-[30px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] font-bold text-green-accent mb-8">
        Make exactly {formatMoney(targetAmount)}!
      </div>

      <div className="flex-1 w-full flex justify-center items-center">
        {/* Piggy Bank Area */}
        <div className="relative w-[400px] h-[280px] flex items-center justify-center mt-4 mb-8">
          
          {/* Piggy Bank Body */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_#ffb3d9_0%,_#ff66a3_50%,_#cc0052_100%)] rounded-[120px] shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_-15px_30px_rgba(153,0,51,0.6),inset_0_10px_20px_rgba(255,255,255,0.6)] overflow-hidden z-10">
            {/* Coin Slot */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-3 bg-gradient-to-b from-black to-gray-800 rounded-full shadow-[inset_0_3px_5px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.4)]" />
            
            {/* Dropped Coins Container */}
            <div className="absolute inset-0 pt-16 p-8 flex flex-wrap justify-center content-start gap-2 z-10 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <AnimatePresence>
                {currentCoins.map((coin, index) => (
                  <motion.div
                    key={`${coin.id}-${index}`}
                    initial={{ opacity: 0, y: -100, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 0.7 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="origin-center"
                  >
                    <Coin coin={coin} disabled />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Piggy Bank Features */}
          {/* Ears */}
          <div className="absolute -top-4 right-[80px] w-14 h-14 bg-[radial-gradient(circle_at_30%_30%,_#ffb3d9_0%,_#ff66a3_80%)] rounded-tl-[20px] rotate-45 z-0 shadow-[inset_0_5px_10px_rgba(255,255,255,0.5)]" />
          <div className="absolute -top-2 right-[140px] w-12 h-12 bg-[radial-gradient(circle_at_30%_30%,_#ff99cc_0%,_#e6005c_100%)] rounded-tl-[20px] rotate-12 z-0 shadow-[inset_0_5px_10px_rgba(255,255,255,0.4)]" />
          
          {/* Snout */}
          <div className="absolute right-[-25px] top-[100px] w-[60px] h-[80px] bg-[radial-gradient(circle_at_20%_20%,_#ffb3d9_0%,_#ff66a3_100%)] rounded-[30px] border border-[#cc0052] flex flex-row justify-center items-center gap-3 shadow-[0_10px_15px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,0.6)] z-20">
            <div className="w-3 h-5 bg-gradient-to-b from-[#80002a] to-[#4d0019] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
            <div className="w-3 h-5 bg-gradient-to-b from-[#80002a] to-[#4d0019] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Eye */}
          <div className="absolute right-[60px] top-[70px] w-7 h-7 bg-gradient-to-br from-slate-700 to-black rounded-full z-20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_2px_2px_rgba(255,255,255,0.3)]">
            <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
          </div>

          {/* Legs */}
          <div className="absolute -bottom-6 right-[80px] w-12 h-16 bg-[radial-gradient(circle_at_50%_0%,_#ff66a3_0%,_#b30047_100%)] rounded-b-2xl z-0 shadow-[inset_0_-5px_10px_rgba(0,0,0,0.3)]" />
          <div className="absolute -bottom-6 left-[80px] w-12 h-16 bg-[radial-gradient(circle_at_50%_0%,_#e6005c_0%,_#80002a_100%)] rounded-b-2xl z-0 shadow-[inset_0_-5px_10px_rgba(0,0,0,0.4)]" />
          
          {/* Tail */}
          <div className="absolute left-[-20px] top-[120px] w-14 h-14 border-t-8 border-l-8 border-[#ff66a3] rounded-tl-full -rotate-45 z-0 drop-shadow-md" />

          {/* Status Overlay */}
          <AnimatePresence>
            {status !== 'playing' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-[-40px] bg-white/70 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center rounded-[60px] shadow-2xl"
              >
                {status === 'won' ? (
                  <>
                    <h3 className="text-4xl font-black text-green-accent mb-4">Great Job!</h3>
                    <p className="text-xl text-dark mb-8">You made exactly {formatMoney(targetAmount)}!</p>
                    <button 
                      onClick={handleNext}
                      className="flex items-center gap-2 bg-[#FFB703] hover:bg-[#FB8500] text-white px-8 py-4 rounded-full font-bold text-xl shadow-[0_8px_0_#FB8500] hover:translate-y-[4px] hover:shadow-[0_4px_0_#FB8500] transition-all"
                    >
                      Next Amount <ArrowRight size={24} />
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-4xl font-black text-red-500 mb-4">Oops!</h3>
                    <p className="text-xl text-dark mb-8">That's too much. Try again!</p>
                    <button 
                      onClick={handleReset}
                      className="flex items-center gap-2 bg-[#FFB703] hover:bg-[#FB8500] text-white px-8 py-4 rounded-full font-bold text-xl shadow-[0_8px_0_#FB8500] hover:translate-y-[4px] hover:shadow-[0_4px_0_#FB8500] transition-all"
                    >
                      <RefreshCcw size={24} /> Try Again
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="w-full mt-8 bg-green-accent rounded-t-[50px] p-5 px-10 flex justify-around items-center relative">
        <button 
          onClick={handleReset}
          className="absolute -top-12 right-10 flex items-center gap-2 bg-white text-green-accent font-bold px-4 py-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <RefreshCcw size={20} /> Empty Piggy Bank
        </button>
        {coins.map((coin) => (
          <Coin 
            key={coin.id} 
            coin={coin} 
            onClick={() => handleAddCoin(coin)} 
            disabled={status !== 'playing'}
          />
        ))}
      </div>
    </div>
  );
}
