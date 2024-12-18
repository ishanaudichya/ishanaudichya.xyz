import Link from 'next/link';
import Image from 'next/image';
import { games } from '@/data/fun';
import BlurFade from '@/components/magicui/blur-fade';
import { Badge } from '@/components/ui/badge';

export default function FunPage() {
  const BLUR_FADE_DELAY = 0.04;

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <div className="space-y-12 w-full py-12">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Take a Break & Play
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A collection of fun games and interactive experiences I&apos;ve built. 
                Challenge yourself or compete with friends!
              </p>
            </div>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
          {games.map((game, id) => (
            <BlurFade
              key={game.path}
              delay={BLUR_FADE_DELAY * 2 + id * 0.05}
            >
              <Link href={game.path}>
                <div className="group relative overflow-hidden rounded-lg border bg-background p-2">
                  <div className="flex flex-col space-y-2">
                    {game.imageUrl && (
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <Image
                          src={game.imageUrl}
                          alt={game.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="space-y-2 p-2">
                      <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {game.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Play Now</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </main>
  );
}
