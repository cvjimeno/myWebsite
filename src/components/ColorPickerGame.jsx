import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { createPortal } from 'preact/compat';

// --- Game Configuration ---
const CORRECT_COLOR = '#fd6a02';
const PALETTE = [
  CORRECT_COLOR, // The only orange
  '#eab308',   // Yellow
  '#84cc16',   // Lime
  '#22c55e',   // Green
  '#14b8a6',   // Teal
  '#0ea5e9',   // Sky Blue
  '#6366f1',   // Indigo
  '#a855f7',   // Purple
  '#ec4899',   // Pink
  '#ef4444',   // Red
  '#f9fafb',   // White (Off-white for visibility)
  '#1f2937',   // Black (Dark Gray for visibility)
].sort(() => Math.random() - 0.5); // Shuffle the palette every time


const ColorPickerGame = () => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [gameState, setGameState] = useState('idle'); // 'idle', 'correct', 'incorrect'
  const [feedback, setFeedback] = useState('¿Cuál es mi color favorito?');
  const [isClient, setIsClient] = useState(false); // To ensure portal only renders on client

  useEffect(() => {
    // This ensures createPortal is only called on the client, preventing SSR errors.
    setIsClient(true);
  }, []);

  const handleSelectColor = (color) => {
    setIsPickerOpen(false); // Close picker immediately
    if (color === CORRECT_COLOR) {
      setGameState('correct');
      setFeedback('¡Genial! Ese es.');
    } else {
      setGameState('incorrect');
      setFeedback('Hmm, no es ese...');
      // Reset the feedback and wiggle after a short delay
      setTimeout(() => {
        setGameState('idle');
        setFeedback('¿Cuál es mi color favorito?');
      }, 1200);
    }
  };

  const handleTriggerClick = (e) => {
    e.stopPropagation();
    if (gameState !== 'correct') {
      setIsPickerOpen(prev => !prev);
    }
  };

  // --- SVG Icons ---
  const PaletteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-text-secondary">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996a3.375 3.375 0 0 0 3.375-3.375V12c0-5.5-4.5-10-10-10z"></path>
    </svg>
  );
  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  const PickerPopup = () => (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
      onClick={() => setIsPickerOpen(false)} // Close on overlay click
    >
      <div 
        className="bg-white rounded-2xl p-6 border shadow-2xl transform transition-all duration-200 scale-100"
        style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border-card)', minWidth: '280px' }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="text-center mb-4">
          <h4 className="font-semibold text-lg text-text-primary">¿Cuál es mi color favorito?</h4>
          <p className="text-sm text-text-secondary mt-1">Haz clic en el color que crees que es</p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {PALETTE.map(color => (
            <button
              key={color}
              onClick={() => handleSelectColor(color)}
              className="w-12 h-12 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-125 hover:shadow-lg active:scale-110"
              style={{ backgroundColor: color, borderColor: 'var(--color-border-card)' }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
        <div className="text-center mt-4">
          <button 
            onClick={() => setIsPickerOpen(false)}
            className="text-xs text-text-secondary hover:text-text-primary transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
        <h3 className="font-bold text-text-primary mb-2">Mi color favorito</h3>
        <p className="text-sm text-text-secondary text-center mb-4 h-5">{feedback}</p>
        
        <button
          onClick={handleTriggerClick}
          className={`w-16 h-16 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 ${
            gameState === 'incorrect' ? 'animate-bounce' : ''
          }`}
          style={{ 
            backgroundColor: gameState === 'correct' ? CORRECT_COLOR : 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border-card)'
          }}
          aria-label="Open color picker"
        >
          {gameState !== 'correct' && <PaletteIcon />}
          {gameState === 'correct' && <CheckIcon />}
        </button>
      </div>

      {/* THE PORTAL FIX: Render the popup at the top level of the document body */}
      {isClient && isPickerOpen && createPortal(<PickerPopup />, document.body)}
    </>
  );
};

export default ColorPickerGame;