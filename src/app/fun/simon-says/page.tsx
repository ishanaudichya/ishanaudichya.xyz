'use client';

import { useState, useEffect } from 'react';
import BlurFade from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Color = 'red' | 'blue' | 'green' | 'yellow';
type GameState = 'idle' | 'sequence' | 'userInput' | 'gameOver';

const COLORS: Color[] = ['red', 'blue', 'green', 'yellow'];
const INITIAL_DELAY = 1000;
const SEQUENCE_DELAY = 500;

const colorStyles: Record<Color, string> = {
  red: 'bg-red-500 hover:bg-red-600 active:bg-red-700',
  blue: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700',
  green: 'bg-green-500 hover:bg-green-600 active:bg-green-700',
  yellow: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700'
};

const inactiveStyles: Record<Color, string> = {
  red: 'bg-red-500/30',
  blue: 'bg-blue-500/30',
  green: 'bg-green-500/30',
  yellow: 'bg-yellow-500/30'
};

export default function SimonSaysPage() {
  const [sequence, setSequence] = useState<Color[]>([]);
  const [userSequence, setUserSequence] = useState<Color[]>([]);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [activeColor, setActiveColor] = useState<Color | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('simon-says-best-score');
    if (stored) setBestScore(parseInt(stored));
  }, []);

  const playSound = (color: Color) => {
    const frequencies: Record<Color, number> = {
      red: 329.63,    // E4
      blue: 261.63,   // C4
      green: 392.00,  // G4
      yellow: 440.00  // A4
    };

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequencies[color], audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const startGame = () => {
    setSequence([]);
    setUserSequence([]);
    setScore(0);
    setGameState('sequence');
    setTimeout(addToSequence, INITIAL_DELAY);
  };

  const addToSequence = () => {
    const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const newSequence = [...sequence, newColor];
    setSequence(newSequence);
    playSequence(newSequence);
  };

  const playSequence = async (sequenceToPlay: Color[]) => {
    setGameState('sequence');
    
    for (let i = 0; i < sequenceToPlay.length; i++) {
      await new Promise(resolve => setTimeout(resolve, SEQUENCE_DELAY));
      setActiveColor(sequenceToPlay[i]);
      playSound(sequenceToPlay[i]);
      await new Promise(resolve => setTimeout(resolve, SEQUENCE_DELAY));
      setActiveColor(null);
    }
    
    setGameState('userInput');
  };

  const handleColorClick = (color: Color) => {
    if (gameState !== 'userInput') return;

    playSound(color);
    setActiveColor(color);
    setTimeout(() => setActiveColor(null), SEQUENCE_DELAY);

    const newUserSequence = [...userSequence, color];
    setUserSequence(newUserSequence);

    // Check if the user's sequence matches the game sequence
    if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      setGameState('gameOver');
      const finalScore = sequence.length - 1;
      if (finalScore > bestScore) {
        setBestScore(finalScore);
        localStorage.setItem('simon-says-best-score', finalScore.toString());
      }
      return;
    }

    // If user completed the sequence correctly
    if (newUserSequence.length === sequence.length) {
      setScore(sequence.length);
      setUserSequence([]);
      setTimeout(addToSequence, SEQUENCE_DELAY * 2);
    }
  };

  const BLUR_FADE_DELAY = 0.04;

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <div className="space-y-12 w-full py-12">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Simon Says
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Watch the sequence, then repeat it! How far can you go?
              </p>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">
                  Score: {score}
                </Badge>
                <Badge variant="default">
                  Best: {bestScore}
                </Badge>
              </div>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-2 gap-4 max-w-[400px] w-full">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorClick(color)}
                  disabled={gameState !== 'userInput'}
                  className={cn(
                    "aspect-square rounded-lg transition-all duration-200",
                    activeColor === color ? colorStyles[color] : inactiveStyles[color],
                    gameState === 'userInput' ? 'cursor-pointer' : 'cursor-not-allowed'
                  )}
                />
              ))}
            </div>

            <div className="space-y-4 text-center">
              {gameState === 'gameOver' && (
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-primary">
                    Game Over! Final Score: {sequence.length - 1}
                  </p>
                  {sequence.length - 1 === bestScore && (
                    <p className="text-sm text-muted-foreground">
                      New High Score! 🎉
                    </p>
                  )}
                </div>
              )}
              <Button 
                variant="default"
                onClick={startGame}
                className="px-8"
              >
                {gameState === 'idle' ? 'Start Game' : 'New Game'}
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground space-y-1">
              <p>Watch the sequence of colors</p>
              <p>Then click them in the same order</p>
            </div>
          </div>
        </BlurFade>
      </div>
    </main>
  );
} 