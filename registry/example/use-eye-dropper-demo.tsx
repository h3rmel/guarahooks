'use client';

import React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useColorPicker } from '@/registry/hooks/use-eye-dropper';

export function ColorPickerExample() {
  const { color, error, isSupported, pickColor } = useColorPicker();

  return (
    <Card className="max-w-sm mx-auto mt-16 shadow-lg border-2 border-muted">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold tracking-tight">
          Color Picker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="w-full text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Click the button below to pick a color from anywhere on your
              screen.
            </p>
          </div>
          <div
            className="rounded-lg mb-2 h-20 w-20 flex items-center justify-center text-white font-semibold border-4 transition-all duration-300"
            style={{
              background: color || '#888',
              borderColor: color ? color : '#888',
              boxShadow: color ? `0 0 0 4px ${color}33` : undefined,
            }}
          >
            {color ? (
              <span className="text-xs font-medium drop-shadow">{color}</span>
            ) : (
              <span className="text-xs opacity-70">No color selected</span>
            )}
          </div>

          {isSupported() ? (
            <Button
              onClick={pickColor}
              className="w-full flex items-center gap-2"
              variant="default"
              size="lg"
            >
              Pick color
            </Button>
          ) : (
            <Alert variant="destructive" className="w-full">
              <AlertTitle>Not Supported</AlertTitle>
              <AlertDescription>
                EyeDropper API not supported in this browser.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="w-full">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
