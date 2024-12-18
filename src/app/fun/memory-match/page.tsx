'use client';

import { useState, useEffect } from 'react';
import BlurFade from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GiftIcon, HeartIcon, StarIcon, RocketIcon, 
  SmileIcon, SunIcon, MoonIcon, ZapIcon,
} from 'lucide-react';

type Card = {
  id: number;
  icon: JSX.Element;
  isFlipped: boolean;
  isMatched: boolean;
};

const ICONS = [
  <GiftIcon key="gift" className="size-8" />,
  <HeartIcon key="heart" className="size-8" />,
  <StarIcon key="star" className="size-8" />,
  <RocketIcon key="rocket" className="size-8" />,
  <SmileIcon key="smile" className="size-8" />,
  <SunIcon key="sun" className="size-8" />,
  <MoonIcon key="moon" className="size-8" />,
  <ZapIcon key="zap" className="size-8" />,
];

export default function MemoryMatchPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const initializeGame = () => {
    const duplicatedIcons = [...ICONS, ...ICONS];
    const shuffledCards = duplicatedIcons
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsGameComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (cardId: number) => {
    if (
      flippedCards.length === 2 || 
      flippedCards.includes(cardId) || 
      cards[cardId].isMatched
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstCard, secondCard] = newFlippedCards;
      
      if (cards[firstCard].icon.key === cards[secondCard].icon.key) {
        setCards(prev => prev.map((card, idx) => 
          idx === firstCard || idx === secondCard
            ? { ...card, isMatched: true }
            : card
        ));
        setMatches(prev => prev + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matches === ICONS.length) {
      setIsGameComplete(true);
    }
  }, [matches]);

  const BLUR_FADE_DELAY = 0.04;

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <div className="space-y-12 w-full py-12">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Memory Match
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find all matching pairs with the fewest moves possible!
              </p>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">
                  Moves: {moves}
                </Badge>
                <Badge variant="default">
                  Matches: {matches}/{ICONS.length}
                </Badge>
              </div>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-4 gap-1 max-w-[500px] w-full">
              {cards.map((card) => (
                <Button
                  key={card.id}
                  variant="outline"
                  className={`aspect-square p-0 transition-all duration-300 text-2xl ${
                    (card.isFlipped || card.isMatched || flippedCards.includes(card.id))
                      ? 'bg-primary/5'
                      : ''
                  }`}
                  onClick={() => handleCardClick(card.id)}
                  disabled={card.isMatched}
                >
                  <div className={`transition-all duration-300 ${
                    (card.isFlipped || card.isMatched || flippedCards.includes(card.id))
                      ? 'rotate-0 opacity-100'
                      : 'rotate-90 opacity-0'
                  }`}>
                    {card.icon}
                  </div>
                </Button>
              ))}
            </div>

            <div className="space-y-4 text-center">
              {isGameComplete && (
                <p className="text-xl font-semibold text-primary">
                  Congratulations! You completed the game in {moves} moves!
                </p>
              )}
              <Button 
                variant="default"
                onClick={initializeGame}
                className="px-8"
              >
                New Game
              </Button>
            </div>
          </div>
        </BlurFade>
      </div>
    </main>
  );
} 