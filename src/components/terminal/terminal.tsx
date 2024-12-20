'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { games } from '@/data/fun';

interface Command {
  command: string;
  description: string;
  action: () => void;
}

interface TerminalProps {
  className?: string;
  initialMessage?: string;
}

export function Terminal({ className, initialMessage = "Type 'help' to see available commands" }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([initialMessage]);
  const router = useRouter();
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    {
      command: 'help',
      description: 'Show available commands',
      action: () => {
        setHistory(prev => [...prev, '> ' + input, 'Available commands:', 
          ...commands.map(cmd => `${cmd.command} - ${cmd.description}`)
        ]);
      }
    },
    {
      command: 'blog',
      description: 'Go to blog page',
      action: () => {
        router.push('/blog');
      }
    },
    {
      command: 'clear',
      description: 'Clear terminal',
      action: () => {
        setHistory([initialMessage]);
      }
    },
    {
      command: 'projects',
      description: 'Go to all projects',
      action: () => {
        router.push('/projects');
      }
    },
    {
      command: 'game',
      description: 'Play a game (usage: game <game-name> or game -a to list all games)',
      action: () => {
        const args = input.split(' ')[1];
        
        if (args === '-a') {
          setHistory(prev => [
            ...prev, 
            '> ' + input,
            'Available games:',
            ...games.map(game => 
              `${game.title} (${game.path.split('/').pop()})`
            ),
            'usage: game <game-name>' 
          ]);
          return;
        }

        const gameName = args;
        if (!gameName) {
          setHistory(prev => [
            ...prev, 
            '> ' + input, 
            'Error: Please specify a game name or use "game -a" to see all available games'
          ]);
          return;
        }

        const game = games.find(game => 
          game.path.split('/').pop() === gameName.toLowerCase()
        );

        if (!game) {
          setHistory(prev => [
            ...prev, 
            '> ' + input, 
            `Error: Game "${gameName}" not found. Use "game -a" to see available games`
          ]);
          return;
        }

        router.push(game.path);
      }
    },
    {
      command: 'google',
      description: 'Search me on Google',
      action: () => {
        const input = 'ishan+audichya';
        router.push(`https://www.google.com/search?q=${input}`);
      }
    },
    {
      command: 'home',
      description: 'Go to home page',
      action: () => {
        router.push('/');
      }
    }
  ];

  const handleCommand = () => {
    const trimmedInput = input.trim().toLowerCase();
    const command = commands.find(cmd => trimmedInput.startsWith(cmd.command));

    if (command) {
      command.action();
    } else {
      setHistory(prev => [...prev, '> ' + input, 'Command not found. Type "help" for available commands']);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand();
    }
  };

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal is clicked
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className={cn(
        "bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg",
        className
      )}
      onClick={handleTerminalClick}
    >
      <div className="flex items-center gap-1.5 p-2 border-b">
        <div className="size-3 rounded-full bg-red-500" />
        <div className="size-3 rounded-full bg-yellow-500" />
        <div className="size-3 rounded-full bg-green-500" />
      </div>
      <div 
        ref={terminalRef}
        className="p-4 h-[calc(100%-44px)] overflow-y-auto font-mono text-sm"
      >
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-green-500">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none px-2 font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
}
