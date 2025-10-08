'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { usePagination } from '@/registry/hooks/use-pagination';

export default function UsePaginationDemo() {
  const totalItems = 100;
  const {
    page,
    pageSize,
    totalPages,
    setPage,
    nextPage,
    prevPage,
    setPageSize,
  } = usePagination(totalItems, { initialPage: 1, initialPageSize: 10 });

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>usePagination</CardTitle>
        <CardDescription>
          Example of pagination using the <code>usePagination</code> hook.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p>
          Page: <strong>{page}</strong> of <strong>{totalPages}</strong>
        </p>
        <p>
          Items per page: <strong>{pageSize}</strong>
        </p>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2">
        <Button onClick={() => setPageSize(5)}>5 / page</Button>
        <Button onClick={() => setPageSize(10)}>10 / page</Button>
        <Button onClick={() => setPageSize(20)}>20 / page</Button>
        <Button onClick={prevPage} disabled={page <= 1}>
          Previous
        </Button>
        <Button onClick={nextPage} disabled={page >= totalPages}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
