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
    imageUrl: "https://placehold.co/1600x900",
    difficulty: "Easy",
    category: "Puzzle"
  },
  {
    title: "Memory Match",
    description: "Test your memory by matching pairs of cards. How fast can you clear the board?",
    path: "/fun/memory-match",
    imageUrl: "https://placehold.co/1600x900",
    difficulty: "Medium",
    category: "Memory"
  },
  {
    title: "Word Scramble",
    description: "Unscramble letters to discover hidden words. Race against the clock!",
    path: "/fun/word-scramble",
    imageUrl: "https://placehold.co/1600x900",
    difficulty: "Medium",
    category: "Word"
  },
  
  {
    title: "Color Match",
    description: "Quick! Match the color with the word. But watch out - it's trickier than it seems!",
    path: "/fun/color-match",
    imageUrl: "https://placehold.co/1600x900",
    difficulty: "Easy",
    category: "Memory"
  },
  {
    title: "Simon Says",
    description: "Remember and repeat the pattern. How long a sequence can you remember?",
    path: "/fun/simon-says",
    imageUrl: "https://placehold.co/1600x900",
    difficulty: "Medium",
    category: "Memory"
  },
  {
    title: "Speed Math",
    description: "Test your mental math skills against the clock. Multiple modes and difficulty levels!",
    path: "/fun/speed-math",
    imageUrl: "https://placehold.co/1600x900",
    difficulty: "Hard",
    category: "Math"
  }
]; 