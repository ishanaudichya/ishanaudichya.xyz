'use client';

import { useState, useEffect } from 'react';
import BlurFade from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Operation = '+' | '-' | '×' | '÷';
type Difficulty = 'easy' | 'medium' | 'hard';

interface Problem {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  options: number[];
}

const OPERATIONS: Operation[] = ['+', '-', '×', '÷'];
const INITIAL_TIME = 30;

const generateNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const calculateAnswer = (num1: number, num2: number, operation: Operation): number => {
  switch (operation) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '×': return num1 * num2;
    case '÷': return num1;  // For division, num1 is actually the answer * num2
    default: return 0;
  }
};

const getDifficultySettings = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return { min: 1, max: 10, operations: ['+', '-'] as Operation[] };
    case 'medium':
      return { min: 1, max: 20, operations: ['+', '-', '×'] as Operation[] };
    case 'hard':
      return { min: 1, max: 50, operations: ['+', '-', '×', '÷'] as Operation[] };
  }
};

export default function SpeedMathPage() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(INITIAL_TIME);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('speed-math-best-score');
    if (stored) setBestScore(parseInt(stored));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((time) => time - 1);
      }, 1000);
    } else if (remainingTime === 0 && isPlaying) {
      endGame();
    }
    return () => clearInterval(interval);
  }, [remainingTime, isPlaying]);

  const generateProblem = () => {
    const settings = getDifficultySettings(difficulty);
    const operation = settings.operations[Math.floor(Math.random() * settings.operations.length)];
    let num1: number, num2: number, answer: number;

    if (operation === '÷') {
      // For division, generate numbers that divide evenly
      num2 = generateNumber(2, 10);
      answer = generateNumber(1, 10);
      num1 = answer * num2;
    } else {
      num1 = generateNumber(settings.min, settings.max);
      num2 = generateNumber(settings.min, settings.max);
      answer = calculateAnswer(num1, num2, operation);
    }

    // Generate wrong options
    const options = [answer];
    while (options.length < 4) {
      const wrongAnswer = answer + generateNumber(-5, 5);
      if (wrongAnswer !== answer && !options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }

    setCurrentProblem({
      num1,
      num2,
      operation,
      answer,
      options: options.sort(() => Math.random() - 0.5)
    });
  };

  const startGame = (selectedDifficulty: Difficulty) => {
    setScore(0);
    setStreak(0);
    setDifficulty(selectedDifficulty);
    setRemainingTime(INITIAL_TIME);
    setIsPlaying(true);
    generateProblem();
  };

  const endGame = () => {
    setIsPlaying(false);
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('speed-math-best-score', score.toString());
    }
  };

  const handleAnswer = (selectedAnswer: number) => {
    if (!currentProblem) return;

    if (selectedAnswer === currentProblem.answer) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(prev => prev + (newStreak * (difficulty === 'hard' ? 3 : difficulty === 'medium' ? 2 : 1)));
      generateProblem();
    } else {
      setStreak(0);
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
                Speed Math
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Test your mental math skills! How many can you solve?
              </p>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">
                  Score: {score}
                </Badge>
                <Badge variant="default">
                  Best: {bestScore}
                </Badge>
                {isPlaying && (
                  <>
                    <Badge variant={remainingTime <= 10 ? "destructive" : "outline"}>
                      Time: {remainingTime}s
                    </Badge>
                    <Badge variant="secondary">
                      Streak: {streak}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center gap-8">
            {isPlaying && currentProblem ? (
              <div className="space-y-8 w-full max-w-[400px]">
                <div className="text-center space-y-2">
                  <p className="text-4xl font-bold tracking-wider">
                    {currentProblem.num1} {currentProblem.operation} {currentProblem.num2}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {currentProblem.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="h-20 text-2xl font-bold hover:scale-105 transition-transform"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                {score > 0 && (
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-primary">
                      Game Over! Final Score: {score}
                    </p>
                    {score === bestScore && (
                      <p className="text-sm text-muted-foreground">
                        New High Score! 🎉
                      </p>
                    )}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="default"
                    onClick={() => startGame('easy')}
                    className="px-8"
                  >
                    Easy Mode
                  </Button>
                  <Button 
                    variant="default"
                    onClick={() => startGame('medium')}
                    className="px-8"
                  >
                    Medium Mode
                  </Button>
                  <Button 
                    variant="default"
                    onClick={() => startGame('hard')}
                    className="px-8"
                  >
                    Hard Mode
                  </Button>
                </div>
              </div>
            )}

            <div className="text-center text-sm text-muted-foreground space-y-1">
              <p>Select the correct answer as quickly as you can</p>
              <p>Keep your streak going for bonus points!</p>
            </div>
          </div>
        </BlurFade>
      </div>
    </main>
  );
} 