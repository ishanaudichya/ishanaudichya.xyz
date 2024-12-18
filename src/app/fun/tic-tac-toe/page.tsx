'use client';

import { useState } from 'react';
import BlurFade from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Player = 'X' | 'O' | null;
type BoardState = Player[];

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export default function TicTacToePage() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player>(null);

  const checkWinner = (squares: BoardState): Player => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const isDraw = !winner && board.every(square => square !== null);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? "It's a draw!" 
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  const BLUR_FADE_DELAY = 0.04;

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <div className="space-y-12 w-full py-12">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Tic Tac Toe
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Classic X&apos;s and O&apos;s
              </h2>
              <div className="flex justify-center gap-2">
                <Badge variant={isXNext ? "default" : "secondary"}>
                  Player X
                </Badge>
                <Badge variant={!isXNext ? "default" : "secondary"}>
                  Player O
                </Badge>
              </div>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-3 gap-2 max-w-[300px] w-full">
              {board.map((square, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`h-24 text-3xl font-bold ${
                    square === 'X' ? 'text-primary' : 'text-secondary'
                  }`}
                  onClick={() => handleClick(index)}
                  disabled={!!square || !!winner}
                >
                  {square}
                </Button>
              ))}
            </div>

            <div className="space-y-4 text-center">
              <p className="text-xl font-semibold">
                {status}
              </p>
              <Button 
                variant="default"
                onClick={resetGame}
                className="px-8"
              >
                Reset Game
              </Button>
            </div>
          </div>
        </BlurFade>
      </div>
    </main>
  );
} 