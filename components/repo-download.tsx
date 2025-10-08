'use client';

import { useState } from 'react';

import Link from 'next/link';

import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';

interface RepoDownloadProps {
  url: string;
  free?: boolean;
}

export default function RepoDownload({ url, free = false }: RepoDownloadProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      window.location.href = url;
    } catch (error) {
      toast.error('Error occurred while downloading. Please try again.');
      console.error('error', error);
    } finally {
      setLoading(false);
    }
  };

  if (free) {
    return (
      <Button
        onClick={handleDownload}
        disabled={loading}
        className="not-prose group relative w-full gap-2"
      >
        {loading ? 'Downloading' : 'Free Download'}
        {!loading && <Icons.Download className="size-4" />}
        {loading && <Icons.Loader.One className="size-4 animate-spin" />}
      </Button>
    );
  }

  return (
    <Link
      href="https://pro.magicui.design/#pricing"
      target="_blank"
      className={cn(
        buttonVariants({
          variant: 'default',
        }),
        'not-prose group relative w-full gap-1',
      )}
    >
      Buy Now
      <Icons.Arrow.Left className="size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  );
}
