import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { coins, CoinData, formatMoney } from '../../data/coins';
import { shopItems } from '../../data/items';
import { Coin } from '../Coin';
import { RefreshCcw, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/sounds';

export function Shop() {
  const [itemIndex, setItemIndex] = useState(() => Math.floor(Math.random() * shopItems.length));
  const [targetAmount, setTargetAmount] = useState(() => Math.floor(Math.random() * 60 + 2) * 5);
  const [currentCoins, setCurrentCoins] = useState<CoinData[]>([]);
  const [status, setStatus] = useState<'playing' | 'won' | 'over'>('playing');

  const currentItem = shopItems[itemIndex];
  const currentTotal = currentCoins.reduce((sum, coin) => sum + coin.value, 0);

  useEffect(() => {
    if (currentTotal === targetAmount && status === 'playing') {
      setStatus('won');
      sounds.playSuccess();
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.5 },
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
    setItemIndex(Math.floor(Math.random() * shopItems.length));
    setTargetAmount(Math.floor(Math.random() * 60 + 2) * 5);
    setCurrentCoins([]);
    setStatus('playing');
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-between">
      <div className="bg-white px-5 py-2.5 rounded-[30px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] font-bold text-green-accent mb-8">
        Drag the coins to pay for the {currentItem.name}!
      </div>

      <div className="flex flex-col md:flex-row w-full justify-center items-center gap-6 md:gap-[60px] flex-1 relative">
        {/* Store Shelf (Item to buy) */}
        <div className="bg-soft-white w-[90vw] max-w-[320px] h-[260px] md:h-[380px] rounded-[30px] md:rounded-[40px] border-8 border-clay flex flex-col items-center justify-center text-center p-5 relative mt-4 md:mt-0">
          <div className="absolute -top-6 -right-2 md:-right-6 bg-[#E85D04] text-white px-4 md:px-[30px] py-1 md:py-[10px] text-2xl md:text-[2.5rem] rounded-[15px] font-bold shadow-[0_5px_0_#9D0208] transform rotate-12 z-20">
            {formatMoney(targetAmount)}
          </div>
          
          <div className="text-[80px] md:text-[100px] mb-2 md:mb-5">
            {currentItem.emoji}
          </div>
          <div className="text-2xl md:text-[2rem] text-clay mb-2 font-bold leading-tight">
            {currentItem.name}
          </div>
        </div>

        {/* Payment Tray (POS Machine) */}
        <div className="relative w-[90vw] max-w-[400px] h-[280px] md:h-[360px] flex flex-col items-center mt-2 md:mt-4">
          
          {/* POS Screen Display */}
          <div className="w-[280px] h-[100px] bg-gradient-to-b from-slate-700 to-slate-900 rounded-t-[20px] border border-slate-600 flex flex-col items-center justify-center p-2 relative z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,0.2)]">
            <div className="w-full h-full bg-gradient-to-b from-[#0a2a1a] to-[#051505] rounded-lg font-mono text-[#4ade80] flex flex-col justify-center px-4 shadow-[inset_0_0_15px_rgba(0,0,0,1)] border-2 border-black relative overflow-hidden">
              {/* Screen Glare */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <div className="text-xs text-green-500/80 uppercase tracking-wider">Total Due</div>
              <div className="text-3xl font-bold text-right drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]">{formatMoney(targetAmount)}</div>
            </div>
            {/* Screen neck */}
            <div className="absolute -bottom-6 w-16 h-6 bg-gradient-to-b from-slate-800 to-slate-900 border-x border-slate-700" />
          </div>

          {/* POS Base / Cash Drawer */}
          <div className="w-full flex-1 bg-gradient-to-b from-[#3a3b3c] to-[#1a1a1a] rounded-[30px] shadow-[0_25px_50px_rgba(0,0,0,0.6),inset_0_2px_5px_rgba(255,255,255,0.2)] border border-[#111] relative flex flex-col items-center p-6 z-20 mt-4">
            
            {/* Keypad details */}
            <div className="absolute top-5 right-6 grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-5 h-4 bg-gradient-to-b from-slate-500 to-slate-700 rounded-sm shadow-[0_2px_2px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-slate-800" />
              ))}
              <div className="col-span-3 w-full h-4 bg-gradient-to-b from-green-500 to-green-700 rounded-sm mt-1 shadow-[0_2px_2px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-green-900" />
            </div>

            {/* Receipt printer slot */}
            <div className="absolute top-4 left-6 w-20 h-2 bg-black rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
            {/* Little receipt paper sticking out */}
            <div className="absolute top-0 left-8 w-16 h-8 bg-gradient-to-b from-white to-slate-100 border border-slate-300 rounded-t-sm -z-10 shadow-[0_-2px_5px_rgba(0,0,0,0.1)] flex flex-col items-center justify-end pb-1 gap-0.5">
              <div className="w-10 h-[1px] bg-slate-300" />
              <div className="w-8 h-[1px] bg-slate-300" />
              <div className="w-12 h-[1px] bg-slate-300" />
            </div>

            {/* Cash Drawer Area */}
            <div className="w-[90%] h-[120px] md:h-[160px] bg-gradient-to-b from-slate-900 to-black rounded-[15px] mt-6 md:mt-8 shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)] border-4 border-slate-800 relative overflow-hidden">
              {/* Drawer slots styling */}
              <div className="absolute inset-0 flex divide-x-4 divide-black/80">
                <div className="flex-1 bg-gradient-to-b from-slate-800/30 to-transparent" />
                <div className="flex-1 bg-gradient-to-b from-slate-800/30 to-transparent" />
                <div className="flex-1 bg-gradient-to-b from-slate-800/30 to-transparent" />
                <div className="flex-1 bg-gradient-to-b from-slate-800/30 to-transparent" />
              </div>

              {/* Dropped Coins */}
              <div className="absolute inset-0 p-3 flex flex-wrap justify-center content-start gap-2 z-10 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <AnimatePresence>
                  {currentCoins.map((coin, index) => (
                    <motion.div
                      key={`${coin.id}-${index}`}
                      initial={{ opacity: 0, y: -50, scale: 0.5 }}
                      animate={{ opacity: 1, y: 0, scale: 0.6 }}
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
          </div>
        </div>

        {/* Status Overlay */}
        <AnimatePresence>
          {status !== 'playing' && (
            <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/70 backdrop-blur-md flex flex-col items-center justify-center p-6 md:p-8 text-center rounded-[40px] md:rounded-[60px] shadow-2xl w-[90vw] max-w-[450px] min-h-[300px] md:min-h-[350px] pointer-events-auto"
              >
              {status === 'won' ? (
                <>
                  <div className="text-5xl md:text-6xl mb-4">{currentItem.emoji}</div>
                  <h3 className="text-2xl md:text-3xl font-black text-green-accent mb-2">Enjoy your {currentItem.name}!</h3>
                  <p className="text-base md:text-lg text-dark mb-6">Exact change paid: {formatMoney(targetAmount)}</p>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-[#FFB703] hover:bg-[#FB8500] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-lg md:text-xl shadow-[0_6px_0_#FB8500] hover:translate-y-[2px] md:hover:shadow-[0_4px_0_#FB8500] transition-all"
                  >
                    Buy Next Item <ArrowRight size={20} className="md:w-6 md:h-6" />
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-3xl md:text-4xl font-black text-red-500 mb-4">Oops!</h3>
                  <p className="text-lg md:text-xl text-dark mb-6 md:mb-8">That's too much money. Try again!</p>
                  <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 bg-[#FFB703] hover:bg-[#FB8500] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-lg md:text-xl shadow-[0_6px_0_#FB8500] hover:translate-y-[2px] md:hover:shadow-[0_4px_0_#FB8500] transition-all"
                  >
                    <RefreshCcw size={20} className="md:w-6 md:h-6" /> Take Coins Back
                  </button>
                </>
              )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Wallet / Coin Selection */}
      <div className="w-full mt-8 bg-green-accent rounded-t-[30px] md:rounded-t-[50px] p-4 md:p-5 px-4 md:px-10 flex flex-wrap justify-around items-center relative gap-2">
        <button 
          onClick={handleReset}
          className="absolute -top-12 right-6 md:right-10 flex items-center gap-2 bg-white text-green-accent font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md hover:bg-gray-50 transition-colors text-sm md:text-base"
        >
          <RefreshCcw size={16} className="md:w-5 md:h-5" /> Clear Tray
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
