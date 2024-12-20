"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import BlurFade from "./magicui/blur-fade";
import { useTheme } from "next-themes";
import { DATA } from "@/data/resume";
import { MagicCard } from "./ui/magic-card";
import dynamic from 'next/dynamic'

const BLUR_FADE_DELAY = 0.04;

// Create a client-side only video component
const VideoPlayer = dynamic(() => Promise.resolve(({ src, ...props }: { src: string } & React.VideoHTMLAttributes<HTMLVideoElement>) => (
  <video
    src={src}
    autoPlay
    loop
    muted
    playsInline
    className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
    {...props}
  />
)), { ssr: false })

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <MagicCard
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
      }
    >
      {(href || video || image) && (
        <div className={cn("block", className)}>
          {video ? (
            <VideoPlayer src={video} />
          ) : image ? (
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-40 w-full overflow-hidden object-cover object-top"
            />
          ) : null}
        </div>
      )}
      <CardHeader className="px-2">
        <div className="space-y-1">
          {href ? (
            <Link href={href}>
              <CardTitle className="mt-1 text-base">{title}</CardTitle>
            </Link>
          ) : (
            <CardTitle className="mt-1 text-base">{title}</CardTitle>
          )}
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </MagicCard>
  );
}

export function Projects() {
  const { theme } = useTheme();

  return (
    <>
      {DATA.projects.map((project, id) => (
        <BlurFade
          key={project.title}
          delay={BLUR_FADE_DELAY * 12 + id * 0.05}
        >
          <ProjectCard
            href={project.href}
            key={project.title}
            title={project.title}
            description={project.description}
            dates={project.dates}
            tags={project.technologies}
            image={project.image}
            video={project.video}
            links={project.links}
          />
        </BlurFade>
      ))}
    </>
  );
}
