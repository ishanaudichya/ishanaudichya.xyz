'use client';

import { useState, useEffect } from 'react';
import BlurFade from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type ColorOption = {
  name: string;
  bg: string;
  text: string;
};

const COLORS: ColorOption[] = [
  { name: 'RED', bg: 'bg-red-500', text: 'text-red-500' },
  { name: 'BLUE', bg: 'bg-blue-500', text: 'text-blue-500' },
  { name: 'GREEN', bg: 'bg-green-500', text: 'text-green-500' },
  { name: 'YELLOW', bg: 'bg-yellow-500', text: 'text-yellow-500' },
  { name: 'PURPLE', bg: 'bg-purple-500', text: 'text-purple-500' },
  { name: 'ORANGE', bg: 'bg-orange-500', text: 'text-orange-500' },
];

type GameState = 'idle' | 'playing' | 'gameOver';

export default function ColorMatchPage() {
  const [displayedColor, setDisplayedColor] = useState<ColorOption>(COLORS[0]);
  const [displayedText, setDisplayedText] = useState<ColorOption>(COLORS[0]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [remainingTime, setRemainingTime] = useState(30);
  const [options, setOptions] = useState<ColorOption[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('color-match-best-score');
    if (stored) setBestScore(parseInt(stored));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((time) => time - 1);
      }, 1000);
    } else if (remainingTime === 0 && gameState === 'playing') {
      endGame();
    }
    return () => clearInterval(interval);
  }, [remainingTime, gameState]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generateRound = () => {
    const shuffledColors = shuffleArray(COLORS);
    const targetColor = shuffledColors[0];
    const textColor = Math.random() > 0.5 
      ? targetColor 
      : shuffledColors.find(c => c !== targetColor) || targetColor;
    
    setDisplayedColor(targetColor);
    setDisplayedText(textColor);
    
    const otherOptions = shuffledColors
      .filter(color => color.name !== targetColor.name)
      .slice(0, 3);
    setOptions(shuffleArray([targetColor, ...otherOptions]));
  };

  const startGame = () => {
    setScore(0);
    setRemainingTime(30);
    setGameState('playing');
    generateRound();
  };

  const endGame = () => {
    setGameState('gameOver');
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('color-match-best-score', score.toString());
    }
  };

  const handleColorClick = (selectedColor: ColorOption) => {
    const isCorrect = selectedColor.name === displayedText.name;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      generateRound();
    } else {
      endGame();
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
                Color Match
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Match the color, not the word! Test your brain&apos;s response to color and text.
              </p>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">
                  Score: {score}
                </Badge>
                <Badge variant="default">
                  Best: {bestScore}
                </Badge>
                {gameState === 'playing' && (
                  <Badge variant={remainingTime <= 10 ? "destructive" : "outline"}>
                    Time: {remainingTime}s
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center gap-8">
            {gameState === 'playing' ? (
              <div className="space-y-8 w-full max-w-[400px]">
                <div className="flex justify-center">
                  <div className={cn(
                    "text-4xl font-bold px-8 py-4 rounded-lg",
                    displayedText.text
                  )}>
                    {displayedColor.name}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {options.map((color) => (
                    <Button
                      key={color.name}
                      onClick={() => handleColorClick(color)}
                      className={cn(
                        "h-20 text-white font-bold text-lg transition-transform hover:scale-105",
                        color.bg
                      )}
                    >
                      {color.name}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                {gameState === 'gameOver' && (
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-primary">
                      Game Over! Final Score: {score}
                    </p>
                    {score === bestScore && score > 0 && (
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
                  {gameState === 'idle' ? 'Start Game' : 'Play Again'}
                </Button>
              </div>
            )}

            <div className="text-center text-sm text-muted-foreground space-y-1">
              <p>Click the button matching the <strong>text color</strong> you see</p>
              <p>Don&apos;t be fooled by what the word says!</p>
            </div>
          </div>
        </BlurFade>
      </div>
    </main>
  );
} 