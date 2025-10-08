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

import { useGeolocation } from '@/registry/hooks/use-geolocation';

export default function UseGeolocationDemo() {
  const { position, error, isLoading, clearWatch } = useGeolocation();

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useGeolocation</CardTitle>
        <CardDescription>
          Declarative Geolocation API hook demo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error.message}</p>}
        {position && (
          <div>
            <p>Latitude: {position.coords.latitude}</p>
            <p>Longitude: {position.coords.longitude}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={clearWatch}>Clear Watch</Button>
      </CardFooter>
    </Card>
  );
}
