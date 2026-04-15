/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PiggyBank } from './components/modes/PiggyBank';
import { CountCoins } from './components/modes/CountCoins';
import { Shop } from './components/modes/Shop';
import { PiggyBank as PiggyBankIcon, Calculator, Store } from 'lucide-react';

type GameMode = 'piggy' | 'count' | 'shop';

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('count');

  return (
    <div className="min-h-screen bg-sand font-sans text-dark pb-12 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="m-5 bg-green-accent rounded-[40px] text-white shadow-[0_4px_0_rgba(0,0,0,0.1)] overflow-x-auto">
        <div className="max-w-6xl mx-auto px-10 py-4 flex flex-col xl:flex-row items-center justify-between gap-4 min-w-max">
          <div className="flex items-center gap-3">
            <h1 className="text-[1.5rem] font-[900] tracking-tight uppercase">Money Game</h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex gap-4">
            <button
              onClick={() => setCurrentMode('count')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-[20px] font-bold text-[1.2rem] transition-all ${
                currentMode === 'count' 
                  ? 'bg-white/40 shadow-md' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <Calculator size={20} />
              <span className="hidden sm:inline">Coin Purse</span>
            </button>
            <button
              onClick={() => setCurrentMode('shop')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-[20px] font-bold text-[1.2rem] transition-all ${
                currentMode === 'shop' 
                  ? 'bg-white/40 shadow-md' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <Store size={20} />
              <span className="hidden sm:inline">Shopping</span>
            </button>
            <button
              onClick={() => setCurrentMode('piggy')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-[20px] font-bold text-[1.2rem] transition-all ${
                currentMode === 'piggy' 
                  ? 'bg-white/40 shadow-md' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <PiggyBankIcon size={20} />
              <span className="hidden sm:inline">Piggy Bank</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 w-full flex-1 flex flex-col">
        {currentMode === 'count' && <CountCoins />}
        {currentMode === 'shop' && <Shop />}
        {currentMode === 'piggy' && <PiggyBank />}
      </main>
    </div>
  );
}

