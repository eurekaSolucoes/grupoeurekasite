export interface IntroBlockProps {
  headline: string
  paragraphs: string[]
}

export function IntroBlock({ headline, paragraphs }: Readonly<IntroBlockProps>) {
  return (
    <section className="container flex flex-col" aria-labelledby="intro-heading">
      {/* Título com HTML raw */}
      <h2
        id="intro-heading"
        className="mb-5 typography-subheading text-secondary lg:max-w-2/3 [&_strong]:text-accent"
        dangerouslySetInnerHTML={{ __html: headline }}
      />

      {/* Parágrafos com HTML raw */}
      <div className="space-y-2 lg:ml-54">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="typography-body-large [&_strong]:text-accent"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </div>
    </section>
  )
}
