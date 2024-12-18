'use client';

import { useState, useEffect } from 'react';
import BlurFade from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { WORDS } from '@/data/scramble';

type GameState = 'playing' | 'won' | 'lost';

export default function WordScramblePage() {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [hint, setHint] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [remainingTime, setRemainingTime] = useState(30);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('word-scramble-best-score');
    if (stored) setBestScore(parseInt(stored));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((time) => time - 1);
      }, 1000);
    } else if (remainingTime === 0 && isActive) {
      setGameState('lost');
      setIsActive(false);
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem('word-scramble-best-score', score.toString());
      }
    }
    return () => clearInterval(interval);
  }, [remainingTime, isActive, score, bestScore]);

  const scrambleWord = (word: string) => {
    const array = word.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  };

  const getNewWord = () => {
    const wordObj = WORDS[Math.floor(Math.random() * WORDS.length)];
    let scrambled = scrambleWord(wordObj.word);
    // Make sure scrambled word is different from original
    while (scrambled === wordObj.word) {
      scrambled = scrambleWord(wordObj.word);
    }
    setCurrentWord(wordObj.word);
    setScrambledWord(scrambled);
    setHint(wordObj.hint);
  };

  const startGame = () => {
    setScore(0);
    setRemainingTime(30);
    setGameState('playing');
    setIsActive(true);
    setUserInput('');
    getNewWord();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.toUpperCase() === currentWord) {
      setScore((prev) => prev + 1);
      setUserInput('');
      getNewWord();
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
                Word Scramble
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Unscramble as many words as you can before time runs out!
              </p>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">
                  Score: {score}
                </Badge>
                <Badge variant="default">
                  Best: {bestScore}
                </Badge>
                {isActive && (
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
            {isActive ? (
              <div className="space-y-6 w-full max-w-[400px]">
                <div className="text-center space-y-2">
                  <p className="text-4xl font-bold tracking-wider">
                    {scrambledWord}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Hint: {hint}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your answer..."
                    className="text-center text-lg"
                    autoComplete="off"
                    autoFocus
                  />
                  <Button 
                    type="submit" 
                    className="w-full"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                {gameState === 'lost' && (
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
                  {gameState === 'playing' ? 'Start Game' : 'Play Again'}
                </Button>
              </div>
            )}

            <div className="text-center text-sm text-muted-foreground space-y-1">
              <p>Unscramble the word before time runs out</p>
              <p>Press Enter or click Submit to check your answer</p>
            </div>
          </div>
        </BlurFade>
      </div>
    </main>
  );
} 