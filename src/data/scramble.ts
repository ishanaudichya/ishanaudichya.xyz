interface Word {
  word: string;
  hint: string;
  category?: 'programming' | 'web' | 'general' | 'computer';
}

export const WORDS: Word[] = [
  { 
    word: 'REACT', 
    hint: 'A JavaScript library for building user interfaces',
    category: 'web'
  },
  { 
    word: 'TYPESCRIPT', 
    hint: 'JavaScript with syntax for types',
    category: 'programming'
  },
  { 
    word: 'NEXTJS', 
    hint: 'React framework for production',
    category: 'web'
  },
  { 
    word: 'TAILWIND', 
    hint: 'Utility-first CSS framework',
    category: 'web'
  },
  { 
    word: 'JAVASCRIPT', 
    hint: 'Programming language of the web',
    category: 'programming'
  },
  { 
    word: 'DEVELOPER', 
    hint: 'Person who writes code',
    category: 'general'
  },
  { 
    word: 'PROGRAMMING', 
    hint: 'Writing instructions for computers',
    category: 'general'
  },
  { 
    word: 'DATABASE', 
    hint: 'Organized collection of data',
    category: 'computer'
  },
  { 
    word: 'ALGORITHM', 
    hint: 'Step-by-step procedure for calculations',
    category: 'programming'
  },
  { 
    word: 'INTERFACE', 
    hint: 'Point of interaction between components',
    category: 'computer'
  },
  { 
    word: 'FRONTEND', 
    hint: 'Client-side of web applications',
    category: 'web'
  },
  { 
    word: 'BACKEND', 
    hint: 'Server-side of applications',
    category: 'web'
  },
  { 
    word: 'COMPILER', 
    hint: 'Translates code to machine language',
    category: 'computer'
  },
  { 
    word: 'FUNCTION', 
    hint: 'Reusable block of code',
    category: 'programming'
  },
  { 
    word: 'VARIABLE', 
    hint: 'Container for storing data',
    category: 'programming'
  },
  {
    word: 'FRAMEWORK',
    hint: 'Foundation for building applications',
    category: 'programming'
  },
  {
    word: 'DEBUGGING',
    hint: 'Finding and fixing code errors',
    category: 'programming'
  },
  {
    word: 'REPOSITORY',
    hint: 'Storage location for code projects',
    category: 'computer'
  },
  {
    word: 'COMPONENT',
    hint: 'Reusable UI building block',
    category: 'web'
  },
  {
    word: 'MIDDLEWARE',
    hint: 'Software that connects components',
    category: 'computer'
  },
  {
    word: 'RESPONSIVE',
    hint: 'Adapts to different screen sizes',
    category: 'web'
  },
  {
    word: 'DEPLOYMENT',
    hint: 'Process of making code live',
    category: 'general'
  },
  {
    word: 'ENCRYPTION',
    hint: 'Securing data with code',
    category: 'computer'
  },
  {
    word: 'ITERATION',
    hint: 'Repeating a process',
    category: 'programming'
  },
  {
    word: 'BOOTSTRAP',
    hint: 'Popular CSS framework',
    category: 'web'
  },
  {
    word: 'RECURSION',
    hint: 'Function calling itself',
    category: 'programming'
  },
  {
    word: 'SERVERLESS',
    hint: 'Cloud computing execution model',
    category: 'computer'
  },
  {
    word: 'PROTOTYPE',
    hint: 'Early version of a product',
    category: 'general'
  },
  {
    word: 'ANIMATION',
    hint: 'Making elements move on screen',
    category: 'web'
  },
  {
    word: 'REFACTOR',
    hint: 'Restructuring existing code',
    category: 'programming'
  }
]; 