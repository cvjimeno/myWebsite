import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

// --- Game Configuration ---
const CORRECT_COLOR = '#fd6a02';
const BASE_PALETTE = [
  '#eab308', '#84cc16', '#22c55e', '#14b8a6',
  CORRECT_COLOR,
  '#0ea5e9', '#6366f1', '#a855f7', '#ec4899',
  '#ef4444', '#f9fafb', '#1f2937',
];

const MAX_GUESSES = 3;
import personalityPhotoSrc from "../assets/images/whoami_16.webp";

const ColorPickerGame = () => {
  const [gameState, setGameState] = useState('playing');
  const [guesses, setGuesses] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const [shuffledPalette, setShuffledPalette] = useState([]);

  useEffect(() => {
    setShuffledPalette(BASE_PALETTE.sort(() => Math.random() - 0.5));
  }, []);

  const handleSelectColor = (color) => {
    if (gameState !== 'playing' || guesses.includes(color)) return;

    const newGuesses = [...guesses, color];
    setGuesses(newGuesses);

    if (color === CORRECT_COLOR) {
      setGameState('won'); // THE FIX: This is now the only action on win.
    } else {
      setIsWiggling(true);
      setTimeout(() => setIsWiggling(false), 400);
      if (newGuesses.length >= MAX_GUESSES) {
        setGameState('lost');
      }
    }
  };

  const handleRevealClick = () => { setIsFlipped(true); setGameState('revealed'); };

  const getFeedbackMessage = () => {
    if (gameState === 'won') return '¡Correcto! Has acertado. Haz click para saber algo más sobre mí.'; // Simple win message
    if (gameState === 'lost') return '¡Oh no! Bueno, siempre puedes refrescar la página...';
    const guessesLeft = MAX_GUESSES - guesses.length;
    if (guesses.length > 0) return `No es ese... Te quedan ${guessesLeft} intento${guessesLeft > 1 ? 's' : ''}.`;
    return '¿Adivinas cuál es? Tienes 3 intentos.';
  };

  return (
    <div className="color-game-container">
      <div className={`card-flipper ${isFlipped ? 'is-flipped' : ''}`}>
        
        <div className="card-face card-front">
          <div class="w-full h-full flex flex-col p-4 md:p-6">
            <div class="flex items-center gap-x-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-accent-primary"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996a3.375 3.375 0 0 0 3.375-3.375V12c0-5.5-4.5-10-10-10z"></path></svg>
              <h3 class="font-semibold text-text-primary text-base">Mi color favorito</h3>
            </div>
            <p class="text-sm text-text-secondary mb-4 h-10">{getFeedbackMessage()}</p>
            
            {/* THE FIX: This entire block is now hidden on win */}
            {gameState !== 'won' && (
              <div className={`grid grid-cols-4 gap-2 flex-grow items-center ${isWiggling ? 'is-wiggling' : ''}`}>
                {shuffledPalette.map(color => {
                  const isGuessed = guesses.includes(color);
                  return (
                    <button
                      key={color}
                      onClick={() => handleSelectColor(color)}
                      disabled={isGuessed || gameState !== 'playing'}
                      className={`w-10 h-10 mx-auto aspect-square rounded-full border-2 transition-all duration-200
                        ${isGuessed ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 hover:border-accent-primary cursor-pointer'}
                        border-border-card
                      `}
                      style={{ backgroundColor: color }}
                    />
                  );
                })}
              </div>
            )}

            {/* THE FIX: This block is now shown on win */}
            {gameState === 'won' && (
              <div class="flex-grow flex flex-col items-center justify-center">
                <button onClick={handleRevealClick} className="w-full px-4 py-3 text-base font-semibold rounded-lg bg-accent-primary text-white hover:bg-accent-primary-hover transition-colors">
                  Desvelar Premio
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="card-face card-back personality-card">
          <div className="text-center p-4">
            <h3 className="font-bold mb-2 text-sm">Aparentemente soy...</h3>
            <div className="mb-1"><div className="text-2xl font-bold">ISTP-A</div></div>
          </div>
          <div className="flex pr-4 py-4 justify-center">
            <img src={personalityPhotoSrc.src} alt="Personality illustration" width="70" height="70" class="max-w-[70px] w-full h-auto"/>
          </div>
        </div>

      </div>
      <style>{`
        /* ... all styles remain the same ... */
        .color-game-container { perspective: 1000px; width: 100%; height: 100%; }
        .card-flipper { position: relative; width: 100%; height: 100%; transition: transform 0.8s; transform-style: preserve-3d; }
        .card-flipper.is-flipped { transform: rotateY(180deg); }
        .card-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; flex-direction: column; border-radius: 1rem; }
        .card-front { align-items: flex-start; }
        .card-back { transform: rotateY(180deg); display: grid; grid-template-columns: 1fr auto; align-items: center; }
        .personality-card { background: linear-gradient(135deg, #f4c730, #bb7e13); color: white; }
        @keyframes wiggle { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
        .is-wiggling { animation: wiggle 0.4s ease-in-out; }
      `}</style>
    </div>
  );
};

export default ColorPickerGame;