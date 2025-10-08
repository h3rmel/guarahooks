import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { allShowcases } from 'content-collections';

import { Mdx } from '@/components/mdx-components';
import { ShowcaseCard } from '@/components/showcase-card';

import { cn } from '@/lib/utils';

import { siteConfig } from '@/config/site';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getPageFromParams(params: PageProps['params']) {
  const slug = (await params).slug?.join('/') || 'guarahooks';
  const page = allShowcases.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  const url = 'https://guarahooks.com';

  const ogUrl = new URL(`${url}/og`);
  ogUrl.searchParams.set('heading', page.title);
  ogUrl.searchParams.set('type', siteConfig.name);
  ogUrl.searchParams.set('mode', 'light');

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
      url: `${url}/${page.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <article
      className={cn(
        'size-full max-w-screen-2xl grow',
        'mx-auto lg:border-x px-3 py-16 lg:px-0',
        'flex flex-col items-center gap-8',
      )}
    >
      <div className={cn('max-w-lg w-full')}>
        <hgroup className={cn('mb-8')}>
          <h2 className="mb-4 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
            {page.title}
          </h2>
          <h3 className="mx-auto text-balance text-center text-lg font-medium tracking-tight text-muted-foreground">
            <Link
              href={page.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn('underline')}
            >
              {page.title}
            </Link>{' '}
            uses{' '}
            <span className="text-foreground">
              guara<span className={cn('font-bold')}>hooks</span>
            </span>{' '}
            to build their app.
          </h3>
        </hgroup>
        <ShowcaseCard
          title={page.title}
          href={page.href}
          image={page.image}
          affiliation={page.affiliation}
        />
      </div>
      <div className={cn('max-w-lg')}>
        <Mdx code={page.body.code} />
      </div>
    </article>
  );
}
