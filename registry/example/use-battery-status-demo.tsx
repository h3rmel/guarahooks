'use client';

import React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { useBatteryStatus } from '@/registry/hooks/use-battery-status';

export default function UseBatteryStatusDemo() {
  const { supported, level, charging, chargingTime, dischargingTime } =
    useBatteryStatus();

  if (!supported) {
    return (
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>useBatteryStatus</CardTitle>
          <CardDescription>
            Battery Status API is not supported in this browser.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const percentage = Math.round(level * 100);

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>useBatteryStatus</CardTitle>
        <CardDescription>
          Live system battery status using the Battery Status API.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="font-medium">Level:</span>{' '}
          <span className="text-lg font-semibold">{percentage}%</span>
        </div>
        <div className="w-full">
          <progress
            className="w-full h-2 rounded bg-gray-200"
            value={percentage}
            max={100}
          />
        </div>
        <Badge
          variant="secondary"
          className={cn(
            'w-fit',
            charging
              ? 'bg-green-500/30 border-green-500 text-green-300'
              : 'bg-red-500/30 border-red-500 text-red-300',
          )}
        >
          {charging ? 'Charging' : 'Discharging'}
        </Badge>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Charging Time: {chargingTime}s, Discharging Time: {dischargingTime}s
          </p>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
