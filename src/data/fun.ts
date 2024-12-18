export interface Game {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  category?: 'Memory' | 'Puzzle' | 'Arcade' | 'Word' | 'Math';
}

export const games: Game[] = [
  {
    title: "Tic Tac Toe",
    description: "Classic two-player game of X's and O's. Challenge a friend or play against the computer!",
    path: "/fun/tic-tac-toe",
    imageUrl: "/images/games/tic-tac-toe.png",
    difficulty: "Easy",
    category: "Puzzle"
  },
  {
    title: "Memory Match",
    description: "Test your memory by matching pairs of cards. How fast can you clear the board?",
    path: "/fun/memory-match",
    imageUrl: "/images/games/memory-match.png",
    difficulty: "Medium",
    category: "Memory"
  },
  {
    title: "Word Scramble",
    description: "Unscramble letters to discover hidden words. Race against the clock!",
    path: "/fun/word-scramble",
    imageUrl: "/images/games/word-scramble.png",
    difficulty: "Medium",
    category: "Word"
  },
  {
    title: "2048",
    description: "Slide numbered tiles to combine them and reach 2048. Plan your moves carefully!",
    path: "/fun/2048",
    imageUrl: "/images/games/2048.png",
    difficulty: "Hard",
    category: "Puzzle"
  },
  {
    title: "Snake",
    description: "Guide the snake to collect food while avoiding walls and itself. Growing longer makes it trickier!",
    path: "/fun/snake",
    imageUrl: "/images/games/snake.png",
    difficulty: "Medium",
    category: "Arcade"
  },
  {
    title: "Color Match",
    description: "Quick! Match the color with the word. But watch out - it's trickier than it seems!",
    path: "/fun/color-match",
    imageUrl: "/images/games/color-match.png",
    difficulty: "Easy",
    category: "Memory"
  },
  {
    title: "Simon Says",
    description: "Remember and repeat the pattern. How long a sequence can you remember?",
    path: "/fun/simon-says",
    imageUrl: "/images/games/simon-says.png",
    difficulty: "Medium",
    category: "Memory"
  },
  {
    title: "Speed Math",
    description: "Test your mental math skills against the clock. Multiple modes and difficulty levels!",
    path: "/fun/speed-math",
    imageUrl: "/images/games/speed-math.png",
    difficulty: "Hard",
    category: "Math"
  }
]; 