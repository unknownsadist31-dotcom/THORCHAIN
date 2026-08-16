'use client'

interface IframePageProps {
  src: string
  title: string
}

export function IframePage({ src, title }: IframePageProps) {
  return (
    <iframe
      src={src}
      title={title}
      className="h-screen w-full border-0"
      allow="clipboard-write"
      loading="eager"
    />
  )
}
